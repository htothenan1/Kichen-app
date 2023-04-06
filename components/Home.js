import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import { Text, TouchableOpacity, View } from "react-native"
import NavButton from "../common/components/NavButton"
import { Button } from "react-native-paper"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import styles from "./styles/home"

const Home = () => {
  const [displayName, setDisplayName] = useState("")
  const navigation = useNavigation()

  const navToKitchen = () => {
    navigation.navigate("Kichen", { name: "Kichen" })
  }

  const navToEditProfile = () => {
    navigation.navigate("EditProfile", { name: "EditProfile" })
  }

  const getDisplayName = () => {
    setDisplayName(auth.currentUser.displayName)
  }

  useEffect(() => {
    getDisplayName()
  }, [getDisplayName])

  // const navToScanCam = () => {
  //   navigation.navigate("ScanCam", { name: "ScanCam" })
  // }

  // const navToAnimationTest = () => {
  //   navigation.navigate("AnimationTest", { name: "AnimationTest" })
  // }

  const logdata = () => {
    console.log(auth.currentUser.displayName === null)
  }

  const firstNameEntered = auth.currentUser.displayName !== null

  const userTitle = firstNameEntered
    ? `${displayName}'s Kichen!`
    : `Welcome, ${auth.currentUser.email}!`

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
        <Text style={{ fontSize: 40, marginVertical: 20, color: "#3d405b" }}>
          {userTitle}
        </Text>
        <Button
          uppercase
          style={{ marginBottom: 10 }}
          textColor={"#000"}
          mode="elevated"
          icon={"fridge"}
          onPress={navToKitchen}
        >
          {"Take Stock"}
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          uppercase
          textColor={"#000"}
          mode="elevated"
          icon="account-circle"
          onPress={navToEditProfile}
        >
          {"Edit Profile"}
        </Button>
        <Button
          buttonColor="118ab2"
          uppercase
          textColor={"#000"}
          icon={"logout"}
          mode="elevated"
          onPress={handleLogout}
        >
          {"Logout"}
        </Button>
        {/* <NavButton text={"Check your stock"} onPress={navToKitchen} /> */}
        {/* <NavButton text={"Scan an Item"} onPress={navToScanCam} /> */}
        {/* <NavButton text={"Edit Profile"} onPress={navToEditProfile} />
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default Home
