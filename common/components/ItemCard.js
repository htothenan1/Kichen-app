import { Text, TouchableWithoutFeedback, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import styles from "./styles/itemCard"

const ItemCard = ({ id, title, quantity, unit, useByDate, handleDelete }) => {
  const [open, setOpen] = useState(false)
  const height = open ? 125 : 42
  const navigation = useNavigation()
  const justOneUnit = quantity === "1" || quantity === 1
  const correctedDescription = `${quantity} ${unit}${justOneUnit ? "" : "s"}`

  const handleNavToEdit = () => {
    navigation.navigate("EditFridgeItem", {
      id,
      title,
      quantity,
      unit,
      useByDate,
    })
  }

  return (
    <View
      style={[
        styles.cardContainer,
        { height: height, overflow: "hidden" },
        styles.shadowProp,
      ]}
    >
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Text style={styles.titleText}>{title}</Text>
      </TouchableWithoutFeedback>
      <Text style={styles.text}>{correctedDescription}</Text>
      <TouchableWithoutFeedback onPress={() => handleNavToEdit()}>
        <Text style={styles.updateButton}>UPDATE ITEM</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleDelete}>
        <Text style={styles.deleteButton}>DELETE ITEM</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ItemCard
