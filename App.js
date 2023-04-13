import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider as PaperProvider } from "react-native-paper"
import Login from "./components/Login"
import Home from "./components/Home"
import Kichen from "./components/Kichen"
import Fridge from "./components/Fridge"
import Pantry from "./components/Pantry"
import Freezer from "./components/Freezer"
import EditProfile from "./components/EditProfile"
import EditFridgeItem from "./components/EditFridgeItem"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Kichen" component={Kichen} />
          <Stack.Screen name="Fridge" component={Fridge} />
          <Stack.Screen name="Pantry" component={Pantry} />
          <Stack.Screen name="Freezer" component={Freezer} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="EditFridgeItem" component={EditFridgeItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
