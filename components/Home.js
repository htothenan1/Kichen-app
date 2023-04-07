import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import { Text, View } from "react-native"
import { Button } from "react-native-paper"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import styles from "./styles/home"
import { stringToByteArray } from "@firebase/util"

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
        <Text
          style={{
            fontSize: 36,
            marginVertical: 25,
            color: "#3d405b",
            fontFamily: "Arial Rounded MT Bold",
          }}
        >
          {userTitle}
        </Text>
        <Button
          style={styles.button}
          textColor={"#000"}
          mode="elevated"
          icon={"fridge"}
          onPress={navToKitchen}
        >
          <Text style={styles.buttonText}>{"Take Stock"}</Text>{" "}
        </Button>
        <Button
          style={styles.button}
          textColor={"#000"}
          mode="elevated"
          icon="account-circle"
          onPress={navToEditProfile}
        >
          <Text style={styles.buttonText}>{"Edit Profile"}</Text>
        </Button>
        <Button
          style={styles.button}
          textColor={"#000"}
          icon={"logout"}
          mode="elevated"
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>{"Logout"}</Text>
        </Button>
      </View>
    </View>
  )
}

export default Home
