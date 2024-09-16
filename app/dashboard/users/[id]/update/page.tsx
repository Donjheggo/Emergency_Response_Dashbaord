import { GetUserById } from "@/lib/actions/users";
import { notFound } from "next/navigation";
import UpdateUserForm from "@/components/users/update-user-form";
import BackButton from "@/components/back-button";

export default async function UpdateUser({
  params,
}: {
  params: { id: string };
}) {
  const user = await GetUserById(params.id);
  if (!user) notFound();
  const serializedUser = JSON.parse(JSON.stringify(user));

  return (
    <>
      <BackButton href="../" />
      <div className="flex justify-center">
        <UpdateUserForm user={serializedUser} />
      </div>
    </>
  );
}
