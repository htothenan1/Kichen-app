import { Text, TouchableWithoutFeedback, View } from "react-native"
import React, { useState } from "react"
import styles from "./styles/itemCard"

const ItemCard = ({ title, quantity, unit, handleDelete }) => {
  const [open, setOpen] = useState(false)
  const height = open ? 90 : 42
  const justOneUnit = quantity === "1" || quantity === 1
  const correctedDescription = `${quantity} ${unit}${justOneUnit ? "" : "s"}`

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
      <TouchableWithoutFeedback onPress={handleDelete}>
        <Text style={styles.deleteButton}>DELETE ITEM</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ItemCard
