import { KeyboardAvoidingView, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { TextInput } from "react-native-paper"
import { useRoute } from "@react-navigation/native"
import { Timestamp } from "firebase/firestore"
import DateTimePicker from "@react-native-community/datetimepicker"
import { SelectList } from "react-native-dropdown-select-list"
import { updateDoc, doc } from "firebase/firestore"
import { unitOptions } from "./helpers/handyFuncs"
import ButtonWithIcon from "../common/components/ButtonWithIcon"
import { auth, db } from "../firebase"
import styles from "./styles/editFridgeItem"

const EditFridgeItem = () => {
  const [itemTitle, setItemTitle] = useState("")
  const [itemQuantity, setItemQuantity] = useState(1)
  const [itemUnit, setItemUnit] = useState("")
  const [expirationDate, setExpirationDate] = useState(new Date())
  const { id, title, quantity, unit, useByDate } = useRoute().params
  const navigation = useNavigation()
  const userId = auth.currentUser.uid

  useEffect(() => {
    setItemTitle(title)
    setItemQuantity(quantity)
    setItemUnit(unit)
    setExpirationDate(useByDate.toDate())
  }, [])

  const setDate = (date) => {
    setExpirationDate(date)
  }

  const handleConfirmChanges = async () => {
    await updateDoc(doc(db, `users/${userId}/fridgeItems`, id), {
      title: itemTitle,
      quantity: itemQuantity,
      unit: itemUnit,
      useByDate: Timestamp.fromDate(new Date(expirationDate)).toDate(),
    })
    navigation.navigate("Fridge")
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Enter New Item Title"
          value={itemTitle}
          onChangeText={(text) => setItemTitle(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter New Item Quantity"
          value={itemQuantity}
          onChangeText={(text) => setItemQuantity(text)}
          keyboardType="number-pad"
          style={styles.input}
        />
        <SelectList
          searchPlaceholder="Choose the unit"
          setSelected={(unit) => setItemUnit(unit)}
          data={unitOptions}
          save="value"
        />
        <View style={styles.useByContainer}>
          <View style={styles.useByText}>
            <Text>Use By:</Text>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={useByDate.toDate()}
            // minimumDate={new Date()}
            mode={"date"}
            onChange={setDate}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon
          icon={"arrow-collapse-down"}
          buttonText={"Confirm Changes"}
          onPress={handleConfirmChanges}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default EditFridgeItem
