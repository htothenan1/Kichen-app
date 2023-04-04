import { View, FlatList, TextInput, Button } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import { db, auth } from "../firebase"
import { addDoc, collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import styles from "./styles/fridge"

const Fridge = () => {
  const [newFridgeItem, setNewFridgeItem] = useState("")
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/fridgeItems`)
  const [data, loading, error] = useCollectionData(query)

  const addFridgeItem = async () => {
    const payload = {
      title: newFridgeItem,
      quantity: 1,
      expired: false,
    }
    await addDoc(query, payload)
    setNewFridgeItem("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          renderItem={({ item }) => (
            <ItemCard
              title={item.title}
              quantity={item.quantity}
              expired={item.expired}
            />
          )}
          data={data}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={newFridgeItem}
          onChangeText={(text) => setNewFridgeItem(text)}
        />
        <Button
          onPress={addFridgeItem}
          title="Add Fridge Item"
          color="#841584"
          accessibilityLabel="add fridge item"
        />
      </View>
    </View>
  )
}

export default Fridge
