import { View, FlatList } from "react-native"
import React, { useState } from "react"
import ItemCard from "../common/components/ItemCard"
import AddItemCard from "../common/components/AddItemCard"
import { db, auth } from "../firebase"
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import dayjs from "dayjs"
import { createId, oneWeeklater } from "./helpers/handyFuncs"
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
    // const inOneWeek = Timestamp.fromDate(new Date()).seconds * 1000
    // const todayTimestamp = new Date(timestamp)
    // const oneWeekAhead = todayTimestamp.setDate(todayTimestamp.getDate() + 7)
    const payload = {
      id: itemId,
      title: newItemTitle,
      quantity: newItemQuantity,
      unit: newItemUnit,
      useByDate: Timestamp.fromDate(new Date(oneWeeklater)),
    }
    await setDoc(doc(db, `users/${userId}/fridgeItems`, itemId), payload)

    setNewItemTitle("")
    setNewItemUnit("")
    setNewItemQuantity(null)
    console.log(now.seconds * 1000)
  }

  const deleteFridgeItem = async (id) => {
    await deleteDoc(doc(db, `users/${userId}/fridgeItems`, id))
  }

  return (
    <View style={styles.container}>
      <AddItemCard
        newItemTitle={newItemTitle}
        setNewItemTitle={setNewItemTitle}
        newItemQuantity={newItemQuantity}
        setNewItemQuantity={setNewItemQuantity}
        setNewItemUnit={setNewItemUnit}
        addFridgeItem={addFridgeItem}
      />
      <FlatList
        renderItem={({ item }) => (
          <ItemCard
            id={item.id}
            title={item.title}
            quantity={item.quantity}
            unit={item.unit}
            useByDate={item.useByDate}
            handleDelete={() => deleteFridgeItem(item.id)}
          />
        )}
        data={data}
      />
    </View>
  )
}

export default Fridge
