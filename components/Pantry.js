import { View, FlatList, TextInput, Button } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import { db, auth } from "../firebase"
import { collection, deleteDoc } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { createId } from "./helpers/loginFuncs"
import styles from "./styles/fridge"

const Pantry = () => {
  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(1)
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/pantryItems`)
  const [data, loading, error] = useCollectionData(query)

  const addPantryItem = async () => {
    const itemId = createId()
    const payload = {
      id: itemId,
      title: newItemTitle,
      quantity: newItemQuantity,
      expired: false,
    }
    await setDoc(doc(db, `users/${userId}/pantryItems`, itemId), payload)

    setNewItemTitle("")
    setNewItemQuantity(1)
  }

  const deletePantryItem = async (id) => {
    await deleteDoc(doc(db, `users/${userId}/pantryItems`, id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="enter title"
          placeholderTextColor={"white"}
          style={styles.textInput}
          value={newItemTitle}
          onChangeText={(text) => setNewItemTitle(text)}
        />
        <TextInput
          placeholder="enter quantity"
          placeholderTextColor={"white"}
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(quantity) => setNewItemQuantity(quantity)}
          value={newItemQuantity}
          maxLength={10}
        />
        <Button
          onPress={addPantryItem}
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
              handleDelete={() => deletePantryItem(item.id)}
            />
          )}
          data={data}
        />
      </View>
    </View>
  )
}

export default Pantry
