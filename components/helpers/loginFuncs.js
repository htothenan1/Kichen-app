import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from "../../firebase"

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

const createUserDb = async (userId, userEmail) => {
  const docRef = doc(db, "users", userId)
  await setDoc(docRef, {
    email: userEmail,
  })
  createFridge(userId)
  createFreezer(userId)
  createPantry(userId)
  console.log("DB successfully created")
}

const createFridge = async (userId) => {
  const docRef = doc(db, `users/${userId}/fridgeItems`, "firstFridgeItem")
  await setDoc(docRef, {
    title: "first fridge item",
    quantity: 1,
    expired: false,
  })
}

const createFreezer = async (userId) => {
  const docRef = doc(db, `users/${userId}/freezerItems`, "firstFreezerItem")
  await setDoc(docRef, {
    title: "first freezer item",
    quantity: 1,
    expired: false,
  })
}

const createPantry = async (userId) => {
  const docRef = doc(db, `users/${userId}/pantryItems`, "firstPantryItem")
  await setDoc(docRef, {
    title: "first pantry item",
    quantity: 1,
    expired: false,
  })
}
