import CreateResponderForm from "@/components/responders/create-form";
import BackButton from "@/components/back-button";

export default function CreateResponder() {
  return (
    <>
      <BackButton href="./"/>
      <div className="flex justify-center items-center">
        <CreateResponderForm />
      </div>
    </>
  );
}
