import { View, FlatList, TextInput, Button } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import { db, auth } from "../firebase"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { createId } from "./helpers/loginFuncs"
import styles from "./styles/fridge"

const Fridge = () => {
  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(1)
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/fridgeItems`)
  const [data, loading, error] = useCollectionData(query)

  const addFridgeItem = async () => {
    const itemId = createId()
    const payload = {
      id: itemId,
      title: newItemTitle,
      quantity: newItemQuantity,
      expired: false,
    }
    await setDoc(doc(db, `users/${userId}/fridgeItems`, itemId), payload)

    setNewItemTitle("")
    setNewItemQuantity(1)
  }

  const deleteFridgeItem = async (id) => {
    await deleteDoc(doc(db, `users/${userId}/fridgeItems`, id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Enter Item Name"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={newItemTitle}
          onChangeText={(text) => setNewItemTitle(text)}
        />
        <TextInput
          placeholder="Enter Quantity"
          placeholderTextColor={"white"}
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(quantity) => setNewItemQuantity(quantity)}
          value={newItemQuantity}
          maxLength={10}
        />
        <Button
          onPress={addFridgeItem}
          title="Add Pantry Item"
          color="#841584"
          accessibilityLabel="add pantry item"
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          renderItem={({ item }) => (
            <ItemCard
              title={item.title}
              quantity={item.quantity}
              expired={item.expired}
              handleDelete={() => deleteFridgeItem(item.id)}
            />
          )}
          data={data}
        />
      </View>
    </View>
  )
}

export default Fridge
