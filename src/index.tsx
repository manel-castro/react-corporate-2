import React from "react";
import Root from "./routes/root";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Contact from "./routes/contaxt";
import { db, getCollection } from "./helpers/firestore";
import { createContact } from "./helpers/contacts-db-helpers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader, // DATA LOADING in sync with UI: https://reactrouter.com/en/main/start/tutorial#loading-data
    // https://reactrouter.com/en/main/route/loader
    // action: rootAction, // Automatically controls updates from Forms: https://reactrouter.com/en/main/start/tutorial#creating-contacts. It keeps record of the data created to be used just before rerendering the document.
    // Actions Better documented: https://reactrouter.com/en/main/route/action
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
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

createContact();
