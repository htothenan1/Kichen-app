import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import { Text, View } from "react-native"
import dayjs from "dayjs"
import ButtonWithIcon from "../common/components/ButtonWithIcon"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import styles from "./styles/home"

const Home = () => {
  const [displayName, setDisplayName] = useState("")
  const navigation = useNavigation()

  const nowArray = dayjs().toString().split(" ")
  const now = `${nowArray[0]} ${nowArray[2]} ${nowArray[1]}`

  useEffect(() => {
    setDisplayName(auth.currentUser.displayName)
  }, [])

  const userTitle =
    auth.currentUser.displayName !== null
      ? `${displayName}'s Kichen!`
      : `Welcome, ${auth.currentUser.email}!`

  const handleNav = (screen) => {
    navigation.navigate(screen, { name: screen })
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
        <Text style={styles.titleText}>{userTitle}</Text>
        <Text
          style={styles.dateText}
        >{`Today is ${now}, and it's a great day to change your wasteful ways!`}</Text>
        <ButtonWithIcon
          onPress={() => handleNav("Kichen")}
          icon={"fridge"}
          buttonText={"Take Stock"}
        />
        <ButtonWithIcon
          onPress={() => handleNav("EditProfile")}
          icon={"account-circle"}
          buttonText={"Edit Profile"}
        />
        <ButtonWithIcon
          onPress={handleLogout}
          icon={"logout"}
          buttonText={"Logout"}
        />
      </View>
    </View>
  )
}

export default Home
