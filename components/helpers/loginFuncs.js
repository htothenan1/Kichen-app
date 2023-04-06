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
    title: "Welcome!",
    quantity: 1,
    expired: false,
  })
}

const createFreezer = async (userId) => {
  const docId = createId()
  const docRef = doc(db, `users/${userId}/freezerItems`, docId)
  await setDoc(docRef, {
    id: docId,
    title: "Welcome!",
    quantity: 1,
    expired: false,
  })
}

const createPantry = async (userId) => {
  const docId = createId()
  const docRef = doc(db, `users/${userId}/pantryItems`, docId)
  await setDoc(docRef, {
    id: docId,
    title: "Welcome!",
    quantity: 1,
    expired: false,
  })
}
