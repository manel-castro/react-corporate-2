import { redirect } from "react-router-dom";
import { deleteContact } from "../../database/contacts-db";

export async function deleteContactAction({ params }: any) {
  await deleteContact(params.contactId);
  return redirect("/avatars");
  throw new Error("oh dang!");
}
