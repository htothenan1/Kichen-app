import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styles from "./styles/navButton"

const NavButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default NavButton
