import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native"
import * as Animatable from "react-native-animatable"
import Accordion from "react-native-collapsible/Accordion"
import { db, auth } from "../firebase"
import { addDoc, collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"

const CONTENT = [
  {
    title: "Broccoli",
    quantity: 3,
    expired: false,
  },
  {
    title: "Ham",
    quantity: 5,
    expired: false,
  },
  {
    title: "Cheese",
    quantity: 5,
    expired: true,
  },
  {
    title: "Bacon",
    quantity: 3,
    expired: false,
  },
]

const AnimationTest = () => {
  const [newFridgeItem, setNewFridgeItem] = useState("")
  const [activeSections, setActiveSections] = useState([])
  const [multipleSelect] = useState(true)
  const userId = auth.currentUser.uid
  const query = collection(db, `users/${userId}/fridgeItems`)
  const [data, loading, error] = useCollectionData(query)

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections)
  }

  //   useEffect(() => {
  //     setActiveSections(data)
  //   }, [])

  const addFridgeItem = async () => {
    const payload = {
      title: newFridgeItem,
      quantity: 1,
      expired: false,
    }
    await addDoc(query, payload)
    setActiveSections(...activeSections, payload)
    setNewFridgeItem("")
  }

  const logData = () => {
    console.log(data)
  }

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    )
  }

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text
          //   animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "center" }}
        >
          {section.quantity}
        </Text>
        <Text
          //   animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "center" }}
        >
          {section.expired ? "yes" : "no"}
        </Text>
      </Animatable.View>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <Accordion
            animation={false}
            activeSections={activeSections}
            sections={data}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
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
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AnimationTest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 24,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  textInputContainer: {
    flex: 1,
    marginVertical: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-end",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    margin: 10,
    backgroundColor: "pink",
    textAlign: "center",
  },
})
