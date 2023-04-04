import { View, FlatList, TextInput, Button } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import { db, auth } from "../firebase"
import { collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import styles from "./styles/fridge"

const Freezer = () => {
  const [newFreezerItem, setNewFreezerItem] = useState("")
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/freezerItems`)
  const [data, loading, error] = useCollectionData(query)

  const addFreezerItem = async () => {
    console.log("fridge item added -> ", newFreezerItem)
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
          value={newFreezerItem}
          onChangeText={(text) => setNewFreezerItem(text)}
        />
        <Button
          onPress={addFreezerItem}
          title="Add Freezer Item"
          color="#841584"
          accessibilityLabel="add freezer item"
        />
      </View>
    </View>
  )
}

export default Freezer
