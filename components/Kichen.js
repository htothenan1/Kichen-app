import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View } from "react-native"
import NavButton from "../common/components/NavButton"
import styles from "./styles/kichen"

const Kichen = () => {
  const navigation = useNavigation()
  const navToFridge = () => {
    navigation.navigate("Fridge", { name: "Fridge" })
  }
  const navToFreezer = () => {
    navigation.navigate("Freezer", { name: "Freezer" })
  }
  const navToPantry = () => {
    navigation.navigate("Pantry", { name: "Pantry" })
  }
  return (
    <View style={styles.container}>
      <NavButton text={"Fridge"} onPress={navToFridge} />
      <NavButton text={"Freezer"} onPress={navToFreezer} />
      <NavButton text={"Pantry"} onPress={navToPantry} />
    </View>
  )
}

export default Kichen
