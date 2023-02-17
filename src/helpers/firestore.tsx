// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTXWg0DbArrMRiCxE8lxqOBUAz9W9m5t8",
  authDomain: "art-gallery-7973a.firebaseapp.com",
  projectId: "art-gallery-7973a",
  storageBucket: "art-gallery-7973a.appspot.com",
  messagingSenderId: "151487908538",
  appId: "1:151487908538:web:70efafbac30364eed1d083",
  measurementId: "G-29SDN6Y7H7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { validateLocaleAndSetLanguage } from "typescript";

export const db = getFirestore(app);

// Get a list of cities from your database
export async function getCollection({
  db,
  collectionName,
}: {
  db: any;
  collectionName: string;
}) {
  const citiesCol = collection(db, collectionName);
  const citySnapshot = await getDocs(citiesCol);
  console.log("citySnapshot: ", citySnapshot);
  const cityList = citySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  console.log("cityList: ", cityList);
  return cityList;
}

export async function updateCollection({
  db,
  collectionName,
  docId,
  newValue,
}: {
  db: any;
  collectionName: string;
  docId: string;
  newValue: { [key: string]: any };
}) {
  const docRef = doc(db, collectionName, docId);

  console.log("docRef: ", docRef);

  await setDoc(
    doc(db, collectionName, docId),
    {
      ...newValue,
    },
    {
      merge: !!docRef,
    }
  );

  return { id: docRef.id, data: newValue };
}

export async function getDocumentById({
  db,
  collectionName,
  docId,
}: {
  db: any;
  collectionName: string;
  docId: string;
}) {
  const docRef = doc(db, collectionName, docId);
  const documentSnap = await getDoc(docRef);

  return documentSnap?.data();
}

export async function deleteDocumentById({
  db,
  collectionName,
  docId,
}: {
  db: any;
  collectionName: string;
  docId: string;
}) {
  const docRef = doc(db, collectionName, docId);

  console.log("dbg123 docRef: ", docRef);

  await deleteDoc(docRef);
}
