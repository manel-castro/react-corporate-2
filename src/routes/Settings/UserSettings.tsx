import React from "react";
import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
} from "react-router-dom";
import {
  getUserSettings,
  updateUserSettings,
} from "../../database/user-settings-db";
import InputFields, { InputFieldType } from "./SettingsComponents/InputFields";

enum InputFieldOptions {
  firstName = "first-name",
  lastName = "last-name",
}

const defaultInputs: {
  [Property in InputFieldOptions]: InputFieldType<InputFieldOptions>;
} = {
  [InputFieldOptions.firstName]: {
    label: "First Name",
    name: InputFieldOptions.firstName,
    defaultValue: "Miguel Angel",
    placeholder: "Input your first name",
  },
  [InputFieldOptions.lastName]: {
    label: "Last Name",
    name: InputFieldOptions.lastName,
    defaultValue: "Martinez",
    placeholder: "Input your last name",
  },
};

const testUser = "xuPWTzWV65SQoX6yJ8Xd";

export const userSettingsLoader: LoaderFunction = async ({
  request,
  params,
  context,
  ...etc
}) => {
  // get user from firestore-auth

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
  const formData = await request.formData();

  console.log("dbg127 A userSettingsAction formData: ", formData);

  const updates = Object.fromEntries(formData as any) as {
    [key: string]: string;
  };

  console.log("dbg127 A userSettingsAction updates: ", updates);

  const userSettings = await updateUserSettings(testUser, updates);

  return null;
};

export default function UserSettings() {
  const { userSettings } = useLoaderData() as {
    userSettings: { [Property in InputFieldOptions]: string };
  };

  console.log("dbg128 userSettings after: ", userSettings);

  for (let [key, value] of Object.entries(userSettings)) {
    // @ts-ignore
    if (defaultInputs[key]) defaultInputs[key].defaultValue = value;
  }

  return <InputFields inputs={Object.values(defaultInputs)} />;
}
