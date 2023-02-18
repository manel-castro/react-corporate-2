import { redirect } from "react-router-dom";
import { deleteContact } from "../helpers/contacts-db-helpers";

export async function deleteContactAction({ params }: any) {
  await deleteContact(params.contactId);
  return redirect("/");
  throw new Error("oh dang!");
}
