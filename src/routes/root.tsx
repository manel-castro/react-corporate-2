import React from "react";

import { Outlet, Link, useLoaderData, Form } from "react-router-dom";

import "./root.css";

export default function Root() {
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
            <li>
              {/* Avoids rerendering the whole document, and takes advantage of Client Side Routing */}
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      {/* This outlet for where we render childrens */}
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}
