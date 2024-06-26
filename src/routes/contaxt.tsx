import React from "react";
import {
  Form,
  useLoaderData,
  useFetcher,
  ActionFunction,
} from "react-router-dom";
import { getContact, updateContact } from "../helpers/contacts-db-helpers";

export const loaderContact = async ({ params }: any) => {
  console.log(params);

  const contact = await getContact(params.contactId);

  console.log("contact: ", contact);

  return { contact };
};

export default function Contact() {
  const { contact: _contact } = useLoaderData() as any;

  if (!_contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  console.log("contact before:", _contact);
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
    ..._contact,
  };
  console.log("contact after:", contact);

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            // destroy will submit the form to contact/:contactId/destroy when clicked.
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const favoriteAction: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();

  const favoriteAttribute = formData.get("favorite");
  const favorite = favoriteAttribute === "true";
  console.log();

  // return null;
  return updateContact(params.contactId!, {
    favorite,
  });
};

function Favorite({ contact }: any) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;

  const fetcher = useFetcher();

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
