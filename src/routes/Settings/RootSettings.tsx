import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import UserSettings, {
  userSettingsAction,
  userSettingsLoader,
} from "./UserSettings";

export const settingsChildren = {
  Colors: {
    label: "Colors",
    path: "/settings/colors",
    element: <div>Test element colors</div>,
  },
  User: {
    label: "User",
    path: "/settings/user",
    element: <UserSettings></UserSettings>,
    action: userSettingsAction,
    loader: userSettingsLoader,
  },
  Logout: {
    label: "Logout",
    path: "/settings/logout",
    element: <div>Test element Logout</div>,
  },
};

export default function RootSettings() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
      <div>
        <nav>
          <ul style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {Object.values(settingsChildren).map((item, index) => {
              return (
                <li key={index}>
                  <NavLink to={item.path}>{item.label}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div style={{ padding: 20 }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
