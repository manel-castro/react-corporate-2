import React from "react";
import Root, { contactAction, contactsLoader } from "./routes/root";
import { createRoot } from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Contact, { favoriteAction, loaderContact } from "./routes/contaxt";
import { db, deleteDocumentById, getCollection } from "./helpers/firestore";
import { COLLECTION_NAME, createContact } from "./helpers/contacts-db-helpers";
import EditContact, { editContactAction } from "./routes/EditContact";
import { deleteContactAction } from "./routes/DeleteContact";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: contactsLoader, // DATA LOADING in sync with UI: https://reactrouter.com/en/main/start/tutorial#loading-data
    // https://reactrouter.com/en/main/route/loader
    action: contactAction, // Automatically controls updates from Forms: https://reactrouter.com/en/main/start/tutorial#creating-contacts. It keeps record of the data created to be used just before rerendering the document.
    // Actions Better documented: https://reactrouter.com/en/main/route/action
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: loaderContact,
            // favorite click action, components populate actions of parent routes.
            // favorites action has no navigation implied since we use fetcher.Form
            action: favoriteAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: loaderContact,
            action: editContactAction,
          },
          {
            path: "contacts/:contactId/destroy",

            action: deleteContactAction,
            // The error is encapsulated to the route
            errorElement: <div>Ooops! Couldn't complete this action </div>,
          },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
