import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { auth, db } from "../firebase"
import styles from "./styles/login"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"

const EditProfile = () => {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const userId = auth.currentUser.uid

  const handleUpdate = async () => {
    updateDisplayName()
    console.log(`${firstName} ${lastName}`)
    await updateDoc(doc(db, "users", userId), {
      firstName,
      lastName,
    })
    navigation.navigate("Home", { name: "Home" })
  }

  const updateDisplayName = async () => {
    await updateProfile(auth.currentUser, {
      displayName: firstName,
    })
  }

  const handleCancel = () => {
    navigation.navigate("Home", { name: "Home" })
  }

  const getUserInfo = async () => {
    const data = await getDoc(doc(db, "users", userId))
    const dataObj = data.data()
    setFirstName(dataObj.firstName)
    setLastName(dataObj.lastName)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default EditProfile
