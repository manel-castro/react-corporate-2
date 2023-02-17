import { redirect } from "react-router-dom";
import { deleteContact } from "../helpers/contacts-db-helpers";

export async function deleteContactAction({ params }: any) {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}
