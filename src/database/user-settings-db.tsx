import { matchSorter } from "match-sorter";
import { validateLocaleAndSetLanguage } from "typescript";

import {
  db,
  deleteDocumentById,
  getCollection,
  getDocumentById,
  updateCollection,
} from "./firestore";

interface ContactInterface {
  id: string;
  createdAt: Date;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
}

const USER_COLLECTION_NAME = "user-settings";

// export async function getContacts(query?: any) {
//   await fakeNetwork(`getContacts:${query}`);
//   let contacts = await getCollection({
//     db,
//     collectionName: USER_COLLECTION_NAME,
//   });
//   if (!contacts) contacts = [];
//   if (query) {
//     contacts = matchSorter(contacts, query, {
//       keys: ["data.first", "data.last"],
//     });
//   }
//   return contacts.sort((a, b) => a.data.createdAt - b.data.createdAt);
// }

// export async function createContact() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let userSettings = { id, createdAt: Date.now() };

//   updateCollection({
//     db,
//     collectionName: USER_COLLECTION_NAME,
//     docId: id,
//     newValue: userSettings,
//   });
//   // let contacts = await getContacts();
//   // contacts.unshift(userSettings);
//   // await set(contacts);
//   return userSettings;
// }

export async function getUserSettings(id: string) {
  await fakeNetwork(`userSettings:${id}`);
  let userSettings = await getDocumentById({
    db,
    collectionName: USER_COLLECTION_NAME,
    docId: id,
  });

  return (userSettings as { [key: string]: string }) ?? null;
}

export async function updateUserSettings(
  id: string,
  updates: { [key: string]: any }
) {
  await fakeNetwork();

  console.log("dbg125 id: ", id);
  console.log("dbg125 updates: ", updates);

  const userSettings = await updateCollection({
    db,
    collectionName: USER_COLLECTION_NAME,
    docId: id,
    newValue: updates,
  });

  console.log("dbg125 updated userSettings", userSettings);

  return userSettings;
}

export async function deleteUserSettings(id: string) {
  deleteDocumentById({
    docId: id,
    db,
    collectionName: USER_COLLECTION_NAME,
  });

  // return true;

  // let contacts = await localforage.getItem("contacts");
  // let index = contacts.findIndex((userSettings) => userSettings.id === id);
  // if (index > -1) {
  //   contacts.splice(index, 1);
  //   await set(contacts);
  //   return true;
  // }
  // return false;
}

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {} as { [key: string]: any };

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = {};
  }
  if (key && fakeCache[key]) {
    return;
  }
  // start coded by me
  if (!key)
    return new Promise((res) => {
      setTimeout(res, Math.random() * 1800);
    });
  // end coded by me
  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 1800);
  });
}
