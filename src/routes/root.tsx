import React from "react";

import { Outlet, Link, useLoaderData, Form } from "react-router-dom";

import "./root.css";

import { createContact, getContacts } from "../helpers/contacts-db-helpers";

export const contactsLoader = async ({ ...args }) => {
  console.log("loader args: ", args);

  const contacts = await getContacts();
  return { contacts };
};

export async function contactAction({ ...args }) {
  console.log("contactAction:", args);

  const contact = await createContact();
  return { contact };
  return null;
}

export default function Root() {
  const { contacts } = useLoaderData() as any;
  console.log("contacts: ", contacts);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          {/* It controls the post method from inside router, so that info can be managed without whole document rerenderings: it trigers an action event into Root route */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            example contacts
            <li>
              {/* Avoids rerendering the whole document, and takes advantage of Client Side Routing */}
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
            end example contacts
          </ul>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: any) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.data.id}`}>
                    {contact.data.first || contact.data.last ? (
                      <>
                        {contact.data.first} {contact.data.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.data.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      {/* This outlet for where we render childrens */}
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}
