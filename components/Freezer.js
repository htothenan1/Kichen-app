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
import AddItemCard from "../common/components/AddItemCard"

const Freezer = () => {
  const [newItemUnit, setNewItemUnit] = useState("")
  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(null)
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/freezerItems`)
  const [data] = useCollectionData(query)

  const addFreezerItem = async () => {
    const itemId = createId()
    const payload = {
      id: itemId,
      title: newItemTitle,
      quantity: newItemQuantity,
      unit: newItemUnit,
    }
    await setDoc(doc(db, `users/${userId}/freezerItems`, itemId), payload)

    setNewItemTitle("")
    setNewItemUnit("")
    setNewItemQuantity(null)
  }

  const deleteFreezerItem = async (id) => {
    await deleteDoc(doc(db, `users/${userId}/freezerItems`, id))
  }

  return (
    <View style={styles.container}>
      <AddItemCard
        newItemTitle={newItemTitle}
        setNewItemTitle={setNewItemTitle}
        newItemQuantity={newItemQuantity}
        setNewItemQuantity={setNewItemQuantity}
        setNewItemUnit={setNewItemUnit}
        addFridgeItem={addFreezerItem}
      />
      {/* <View style={styles.textInputContainer}>
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
            onPress={addFreezerItem}
          >
            Add Item
          </Button>
        </View>
      </View> */}
      <FlatList
        renderItem={({ item }) => (
          <ItemCard
            title={item.title}
            quantity={item.quantity}
            unit={item.unit}
            handleDelete={() => deleteFreezerItem(item.id)}
          />
        )}
        data={data}
      />
    </View>
  )
}

export default Freezer
