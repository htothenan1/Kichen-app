import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from "../../firebase"
import uuid from "react-native-uuid"

export const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user
      console.log("Logged in with:", user.email)
    })
    .catch((error) => alert(error.message))
}

export const handleSignUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCreds) => {
      const userEmail = userCreds.user.email
      const userId = userCreds.user.uid
      createUserDb(userId, userEmail)
      console.log("Registered with:", userEmail)
    })
    .catch((error) => alert(error.message))
}

export const createId = () => {
  return uuid.v4().split("-")[0]
}

const createUserDb = async (userId, userEmail) => {
  const docRef = doc(db, "users", userId)
  await setDoc(docRef, {
    id: userId,
    email: userEmail,
    firstName: "",
    lastName: "",
  })
  createFridge(userId)
  createFreezer(userId)
  createPantry(userId)
  console.log("DB successfully created")
}

const createFridge = async (userId) => {
  const docId = createId()
  const docRef = doc(db, `users/${userId}/fridgeItems`, docId)
  await setDoc(docRef, {
    id: docId,
    title: "Humility",
    quantity: 1,
    unit: "unit",
  })
}

const createFreezer = async (userId) => {
  const docId = createId()
  const docRef = doc(db, `users/${userId}/freezerItems`, docId)
  await setDoc(docRef, {
    id: docId,
    title: "Gratitude",
    quantity: 1,
    unit: "unit",
  })
}

const createPantry = async (userId) => {
  const docId = createId()
  const docRef = doc(db, `users/${userId}/pantryItems`, docId)
  await setDoc(docRef, {
    id: docId,
    title: "Happiness",
    quantity: 1,
    unit: "unit",
  })
}

export const unitOptions = [
  { key: "2", value: "unit" },
  { key: "3", value: "pound" },
  { key: "4", value: "bag" },
  { key: "5", value: "ounce" },
  { key: "6", value: "piece" },
  { key: "7", value: "box" },
  { key: "8", value: "package" },
  { key: "9", value: "gallon" },
  { key: "10", value: "cup" },
  { key: "11", value: "quart" },
  { key: "12", value: "pint" },
  { key: "13", value: "carton" },
  { key: "14", value: "jar" },
  { key: "15", value: "bottle" },
  { key: "16", value: "can" },
  { key: "17", value: "bunch" },
  { key: "18", value: "jug" },
  { key: "19", value: "roll" },
  { key: "20", value: "loaf" },
]
