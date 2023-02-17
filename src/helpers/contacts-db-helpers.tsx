import { matchSorter } from "match-sorter";

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

export const COLLECTION_NAME = "contacts";

export async function getContacts(query?: any) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await getCollection({ db, collectionName: COLLECTION_NAME });
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort((a, b) => a.data.createdAt - b.data.createdAt);
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };

  updateCollection({
    db,
    collectionName: COLLECTION_NAME,
    docId: id,
    newValue: contact,
  });
  // let contacts = await getContacts();
  // contacts.unshift(contact);
  // await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  let contact = await getDocumentById({
    db,
    collectionName: COLLECTION_NAME,
    docId: id,
  });

  return contact ?? null;
}

export async function updateContact(
  id: string,
  updates: { [key: string]: any }
) {
  await fakeNetwork();

  const contact = await updateCollection({
    db,
    collectionName: COLLECTION_NAME,
    docId: id,
    newValue: updates,
  });

  return contact;
}

export async function deleteContact(id: string) {
  deleteDocumentById({ docId: id, db, collectionName: COLLECTION_NAME });

  // return true;

  // let contacts = await localforage.getItem("contacts");
  // let index = contacts.findIndex((contact) => contact.id === id);
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
      setTimeout(res, Math.random() * 800);
    });
  // end coded by me

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
