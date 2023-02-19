import React from "react";
import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
} from "react-router-dom";
import { validateLocaleAndSetLanguage } from "typescript";
import { getUserSettings } from "../../database/user-settings-db";
import InputFields, { InputFieldType } from "./SettingsComponents/InputFields";

const defaultInputs: { [key: string]: InputFieldType } = {
  ["first-name"]: {
    label: "First Name",
    name: "firstName",
    idFirebase: "last-name",
    defaultValue: "Miguel Angel",
    placeholder: "Input your first name",
  },
  ["last-name"]: {
    label: "Last Name",
    name: "lastName",
    idFirebase: "last-name",
    defaultValue: "Martinez",
    placeholder: "Input your last name",
  },
};

export const userSettingsLoader: LoaderFunction = async ({
  request,
  params,
  context,
  ...etc
}) => {
  // get user from firestore-auth
  const testUser = "xuPWTzWV65SQoX6yJ8Xd";

  const userSettings = await getUserSettings(testUser);
  console.log("dbg128 userSettings: ", userSettings);

  // console.log("dbg127 L userSettingsLoader params: ", params);
  // console.log("dbg127 L userSettingsLoader request: ", request);
  // console.log("dbg127 L userSettingsLoader context: ", context);
  // console.log("dbg127 L userSettingsLoader etc: ", etc);
  return { userSettings };
};
export const userSettingsAction: ActionFunction = async ({
  request,
  params,
  context,
}) => {
  console.log("dbg127 A userSettingsAction params: ", params);
  console.log("dbg127 A userSettingsAction request: ", request);
  console.log("dbg127 A userSettingsAction context: ", context);
  return null;
};

export default function UserSettings() {
  const { userSettings } = useLoaderData() as {
    userSettings: { [key: string]: string };
  };

  console.log("dbg128 userSettings after: ", userSettings);
  // if (userSettings?.length) {
  for (const [key, value] of Object.entries(userSettings)) {
    defaultInputs[key].defaultValue = value;
  }
  // }

  return <InputFields inputs={Object.values(defaultInputs)} />;
}
