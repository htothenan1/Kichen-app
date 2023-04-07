import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View } from "react-native"
import ButtonWithIcon from "../common/components/ButtonWithIcon"
import styles from "./styles/kichen"

const Kichen = () => {
  const navigation = useNavigation()

  const handleNav = (screen) => {
    navigation.navigate(screen, { name: screen })
  }

  return (
    <View style={styles.container}>
      <ButtonWithIcon
        onPress={() => handleNav("Fridge")}
        icon={"fridge-top"}
        buttonText={"Fridge"}
      />
      <ButtonWithIcon
        onPress={() => handleNav("Freezer")}
        icon={"fridge-bottom"}
        buttonText={"Freezer"}
      />
      <ButtonWithIcon
        onPress={() => handleNav("Pantry")}
        icon={"fridge-off"}
        buttonText={"Pantry"}
      />
    </View>
  )
}

export default Kichen
