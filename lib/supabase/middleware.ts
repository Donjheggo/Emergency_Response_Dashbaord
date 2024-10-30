import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const isLoginPage = request.nextUrl.pathname.startsWith("/auth"); // login and register page

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  // Routes Authorization Filter by User Role
  if (user) {
    const { data: userData } = await supabase
      .from("user")
      .select("*")
      .eq("id", user.id)
      .single();

    const isAdmin = userData.role === "ADMIN";
    if (!isAdmin) {
      // If the user is not an admin, sign them out
      await supabase.auth.signOut(); // Sign out the user
      revalidatePath("/");
      redirect("/"); // Optionally, redirect to home page or another page
    }
  }

  return supabaseResponse;
}
