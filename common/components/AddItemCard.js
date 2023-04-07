import { StyleSheet, View } from "react-native"
import React from "react"
import { Button, TextInput } from "react-native-paper"
import { SelectList } from "react-native-dropdown-select-list"
import { unitOptions } from "../../components/helpers/handyFuncs"
import styles from "./styles/addItemCard"

const AddItemCard = ({
  newItemTitle,
  setNewItemTitle,
  newItemQuantity,
  setNewItemQuantity,
  setNewItemUnit,
  addFridgeItem,
}) => {
  return (
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
  )
}

export default AddItemCard
