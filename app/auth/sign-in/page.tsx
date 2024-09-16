import { LoginForm } from "@/components/auth/login-form";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              Only admin can sign in.
            </p>
          </div>
          <div className="grid gap-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
