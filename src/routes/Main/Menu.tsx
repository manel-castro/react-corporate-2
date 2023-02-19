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

import "./Menu.css";

import { createContact, getContacts } from "../../database/contacts-db";

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

export const menuItems = {
  home: {
    path: "home",
    label: "Home",
  },
  avatars: {
    path: "avatars",
    label: "Avatars",
  },
  settings: {
    path: "settings",
    label: "Settings",
  },
};

export default function Menu() {
  const navigation = useNavigation();
  console.log("dbg126 navigation ", navigation);

  // const { contacts, q } = useLoaderData() as any;

  // console.log("contacts: ", contacts);

  // useEffect(() => {
  //   //this solves going back button for search input
  //   (document.getElementById("q") as HTMLInputElement).value = q;
  // }, [q]);

  const submit = useSubmit();

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div>
        <nav>
          <ul style={{ display: "flex", gap: 20, listStyleType: "none" }}>
            {Object.values(menuItems).map((item: any) => (
              <li key={item.path}>
                <NavLink
                  to={`/${item.path}`}
                  className={({ isActive, isPending }) => {
                    return isActive
                      ? "menu-active"
                      : isPending
                      ? "menu-loading"
                      : "menu-inactive";
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* This outlet for where we render childrens */}
      <div
        // id="detail"
        // className={navigation.state === "loading" ? "loading" : ""}
        style={{ display: "flex", height: "100%" }}
      >
        <Outlet></Outlet>
      </div>
    </div>
  );
}
