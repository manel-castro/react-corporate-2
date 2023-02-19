import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../../database/contacts-db";

export const editContactAction = async ({ params, request }: any) => {
  console.log("editContactAction args, ", { params, request });

  const formData = await request.formData();
  console.log("editContactAction formData, ", formData);
  const updates = Object.fromEntries(formData);
  console.log("editContactAction updates, ", updates);

  const contact = updateContact(params.contactId, updates);

  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
  const contact = useLoaderData() as any;
  const navigate = useNavigate() as any;

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
