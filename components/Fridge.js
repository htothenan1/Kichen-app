import { View, FlatList } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import { Button, TextInput } from "react-native-paper"
import { SelectList } from "react-native-dropdown-select-list"
import { db, auth } from "../firebase"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { createId, unitOptions } from "./helpers/handyFuncs"
import styles from "./styles/fridge"

const Fridge = () => {
  const [newItemUnit, setNewItemUnit] = useState("")
  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(null)
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/fridgeItems`)
  const [data] = useCollectionData(query)

  const addFridgeItem = async () => {
    const itemId = createId()
    const payload = {
      id: itemId,
      title: newItemTitle,
      quantity: newItemQuantity,
      unit: newItemUnit,
    }
    await setDoc(doc(db, `users/${userId}/fridgeItems`, itemId), payload)

    setNewItemTitle("")
    setNewItemUnit("")
    setNewItemQuantity(null)
  }

  const deleteFridgeItem = async (id) => {
    await deleteDoc(doc(db, `users/${userId}/fridgeItems`, id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          label="What are you adding?"
          mode="outlined"
          value={newItemTitle}
          onChangeText={(text) => setNewItemTitle(text)}
        />
        <TextInput
          label="How many?"
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={(quantity) => setNewItemQuantity(quantity)}
          value={newItemQuantity}
        />
        <SelectList
          searchPlaceholder="Choose the unit"
          setSelected={(unit) => setNewItemUnit(unit)}
          data={unitOptions}
          save="value"
        />
        <View style={styles.buttonContainer}>
          <Button
            uppercase
            style={styles.addItemButton}
            textColor={"#000"}
            mode="outlined"
            icon={"plus"}
            onPress={addFridgeItem}
          >
            Add Item
          </Button>
        </View>
      </View>
      <FlatList
        renderItem={({ item }) => (
          <ItemCard
            title={item.title}
            quantity={item.quantity}
            unit={item.unit}
            handleDelete={() => deleteFridgeItem(item.id)}
          />
        )}
        data={data}
      />
    </View>
  )
}

export default Fridge
