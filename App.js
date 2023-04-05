import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "./components/Login"
import Home from "./components/Home"
import Kichen from "./components/Kichen"
import ScanCam from "./components/ScanCam"
import Fridge from "./components/Fridge"
import Pantry from "./components/Pantry"
import Freezer from "./components/Freezer"
import AnimationTest from "./components/AnimationTest"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Kichen" component={Kichen} />
        <Stack.Screen name="ScanCam" component={ScanCam} />
        <Stack.Screen name="Fridge" component={Fridge} />
        <Stack.Screen name="Pantry" component={Pantry} />
        <Stack.Screen name="Freezer" component={Freezer} />
        <Stack.Screen name="AnimationTest" component={AnimationTest} />
      </Stack.Navigator>
    </NavigationContainer>
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
