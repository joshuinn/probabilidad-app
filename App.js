import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from 'expo-constants'

import HomeScreen from "./src/screens/HomeScreen.js";
import ChartScreen from './src/screens/ChartScreen'
import { StatusBar } from "expo-status-bar";
import Table from './src/components/Table'

export default function App() {
  const AppStack = createStackNavigator();
  const TabStack = createBottomTabNavigator()
  screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#1e1e1e",
      borderTopColor: "1e1e1e",
      paddingBottom: 10,
      height: 55,
    },
    tabBarIcon: ({ focused }) => {
      let icon = "";
      const color = focused ? "#5750f0" : "#828282"
      const size = 24

      switch (route.name) {
        case "Charts":
          icon = "stacked-bar-chart";
          break;
        case "Tables":
          icon = "table-view";
          break;
        default:
          icon = "dashboard"
      }
      return <MaterialIcons name={icon} size={size} color={color} />
    },
    tabBarActiveTintColor: "#5750f0",
  })
  /*const TabStackScreen = () => {
    return (
      <TabStack.Navigator screenOptions={screenOptions}>
        <TabStack.Screen name="Home" component={HomeScreen} />
        <TabStack.Screen name="Tables" component={Table} options={{ title: "Tabla" }} />
        <TabStack.Screen name="Charts" component={ChartScreen} options={{ title: "Gráficas" }} />
      </TabStack.Navigator>
    )
  }*/

  return (
    <>
      <NavigationContainer>
        <TabStack.Navigator screenOptions={screenOptions}>
          <TabStack.Screen name="Home" component={HomeScreen} />
          <TabStack.Screen name="Tables" component={Table} options={{ title: "Tabla" }} />
          <TabStack.Screen name="Charts" component={ChartScreen} options={{ title: "Gráficas" }} />
        </TabStack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  )
}
/*
        <AppStack.Navigator headerShown={false} screenOptions={{
          headerShown: false,
          cardStyle: {
          }
        }} >
          <AppStack.Screen name="Tabs" component={TabStackScreen} />
        </AppStack.Navigator>
        */