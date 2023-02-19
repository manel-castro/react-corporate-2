import React from "react";
import { contactAction, contactsLoader } from "./routes/Avatars/RootAvatars";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Contact, {
  favoriteAction,
  loaderContact,
} from "./routes/Avatars/Contact";
import { db, deleteDocumentById, getCollection } from "./database/firestore";
import {
  CONTACTS_COLLECTION_NAME,
  createContact,
} from "./database/contacts-db";
import EditContact, { editContactAction } from "./routes/Avatars/EditContact";
import { deleteContactAction } from "./routes/Avatars/DeleteContact";
import Index from "./routes/Avatars";
import Menu, { menuItems } from "./routes/Main/Menu";

import "./routes/Avatars/RootAvatars.css";
import RootAvatars from "./routes/Avatars/RootAvatars";
import RootSettings, { settingsChildren } from "./routes/Settings/RootSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: `/${menuItems.home.path}`,
      },
      {
        path: `/${menuItems.settings.path}`,
        element: <RootSettings />,
        children: Object.values(settingsChildren),
      },
      {
        path: `/${menuItems.avatars.path}`,
        element: <RootAvatars />,
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
                path: `/${menuItems.avatars.path}/:contactId`,
                element: <Contact />,
                loader: loaderContact,
                // favorite click action, components populate actions of parent routes.
                // favorites action has no navigation implied since we use fetcher.Form
                action: favoriteAction,
              },
              {
                path: "/avatars/:contactId/edit",
                element: <EditContact />,
                loader: loaderContact,
                action: editContactAction,
              },
              {
                path: "/avatars/:contactId/destroy",

                action: deleteContactAction,
                // The error is encapsulated to the route
                errorElement: <div>Ooops! Couldn't complete this action </div>,
              },
            ],
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
