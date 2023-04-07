import React from "react"
import { Text } from "react-native"
import { Button } from "react-native-paper"
import styles from "./styles/buttonWithIcon"

const ButtonWithIcon = ({ onPress, icon, buttonText }) => {
  return (
    <Button
      style={styles.button}
      textColor={"#000"}
      mode="elevated"
      icon={icon}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>{" "}
    </Button>
  )
}

export default ButtonWithIcon
