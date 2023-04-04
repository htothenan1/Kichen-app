import { View, FlatList, TextInput, Button } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import { db, auth } from "../firebase"
import { collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import styles from "./styles/fridge"

const Pantry = () => {
  const [newPantryItem, setNewPantryItem] = useState("")
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/pantryItems`)
  const [data, loading, error] = useCollectionData(query)

  const addPantryItem = () => {
    console.log("pantry item added -> ", newPantryItem)
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
          value={newPantryItem}
          onChangeText={(text) => setNewPantryItem(text)}
        />
        <Button
          onPress={addPantryItem}
          title="Add Pantry Item"
          color="#841584"
          accessibilityLabel="add pantry item"
        />
      </View>
    </View>
  )
}

export default Pantry
