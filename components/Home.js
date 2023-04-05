import React from "react"
import { useNavigation } from "@react-navigation/core"
import { Text, TouchableOpacity, View } from "react-native"
import NavButton from "../common/components/NavButton"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import styles from "./styles/home"

const Home = () => {
  const navigation = useNavigation()

  const navToKitchen = () => {
    navigation.navigate("Kichen", { name: "Kichen" })
  }

  const navToScanCam = () => {
    navigation.navigate("ScanCam", { name: "ScanCam" })
  }

  const navToAnimationTest = () => {
    navigation.navigate("AnimationTest", { name: "AnimationTest" })
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text
          style={styles.titleText}
        >{`Kichen of ${auth.currentUser.email} `}</Text>
        <NavButton text={"Check your stock"} onPress={navToKitchen} />
        <NavButton text={"Scan an Item"} onPress={navToScanCam} />
        <NavButton text={"Go to Animations"} onPress={navToAnimationTest} />
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home
