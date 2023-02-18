import React, { useEffect } from "react";

import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import "./root.css";

import { createContact, getContacts } from "../helpers/contacts-db-helpers";

export const contactsLoader = async ({ request }: any) => {
  console.log("root loader request: ", request);

  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const contacts = await getContacts(q);

  return { contacts, q };
};

export async function contactAction({ ...args }) {
  console.log("contactAction:", args);

  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const navigation = useNavigation();

  const { contacts, q } = useLoaderData() as any;

  console.log("contacts: ", contacts);

  useEffect(() => {
    //this solves going back button for search input
    (document.getElementById("q") as HTMLInputElement).value = q;
  }, [q]);

  const submit = useSubmit();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form
            id="search-form"
            role="search"
            replace={q != null}
            // Since method is get it gets the page again with the new URL, as URLSearchParams
            // By using 'Form' instead of 'form' we capture that get request for being used as Client Side Routing
            // method="post
            method="get"
          >
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              // refresh page keeps state of URL
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
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
                  <NavLink
                    to={`contacts/${contact.data.id}`}
                    className={({ isActive, isPending }) => {
                      return isActive ? "active" : isPending ? "pending" : "";
                    }}
                  >
                    {contact.data.first || contact.data.last ? (
                      <>
                        {contact.data.first} {contact.data.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.data.favorite && <span>★</span>}
                  </NavLink>
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
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet></Outlet>
      </div>
    </>
  );
}
