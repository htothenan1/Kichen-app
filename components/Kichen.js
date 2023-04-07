import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View, Text } from "react-native"
import { Button } from "react-native-paper"
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
      <Button
        style={styles.button}
        textColor={"#000"}
        mode="elevated"
        icon={"fridge-bottom"}
        onPress={navToFreezer}
      >
        <Text style={styles.buttonText}>{"Freezer"}</Text>
      </Button>
      <Button
        style={styles.button}
        textColor={"#000"}
        mode="elevated"
        icon={"fridge-top"}
        onPress={navToFridge}
      >
        <Text style={styles.buttonText}>{"Fridge"}</Text>
      </Button>
      <Button
        style={styles.button}
        textColor={"#000"}
        mode="elevated"
        icon={"fridge-off"}
        onPress={navToPantry}
      >
        <Text style={styles.buttonText}>{"Pantry"}</Text>
      </Button>
    </View>
  )
}

export default Kichen
