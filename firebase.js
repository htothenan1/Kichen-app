import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDUV6wlhFLC1Jg_2-8VpHklJYKzRIwTOYE",
  authDomain: "kichen-63c96.firebaseapp.com",
  projectId: "kichen-63c96",
  storageBucket: "kichen-63c96.appspot.com",
  messagingSenderId: "365207364356",
  appId: "1:365207364356:web:8ea8fb5432d0656f68a651",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
