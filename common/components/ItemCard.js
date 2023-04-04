import { Text, View } from "react-native"
import React from "react"
import styles from "./styles/itemCard"

const ItemCard = ({ title, quantity, expired }) => {
  return (
    <View style={[styles.cardContainer, expired && styles.expiredBackground]}>
      <Text style={[styles.text, expired && styles.expiredText]}>{title}</Text>
      <Text style={[styles.text, expired && styles.expiredText]}>
        {`Quantity: ${quantity}`}
      </Text>
      <Text style={[styles.text, expired && styles.expiredText]}>
        {`Expired: ${expired ? "YES!" : "Not Yet"}`}
      </Text>
    </View>
  )
}

export default ItemCard
