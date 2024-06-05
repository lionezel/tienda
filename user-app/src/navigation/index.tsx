import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import { GLOBAL_COLOR } from "../GLOBAL/COLOR_GLOBAL";
import { TouchableOpacity } from "react-native";
import { View } from "native-base";
import { HomeStack } from "./stacks/HomeStack";
import { AuthStack } from "./stacks";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  const PedidoButton = ({ children, onPress }: any) => (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "white",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  const styles = {
    shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    tabBarShadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarShadow,
          tabBarActiveTintColor: GLOBAL_COLOR,
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
            headerShown: false,
            tabBarActiveTintColor: GLOBAL_COLOR,
          }}
        />

        <Tab.Screen
          name="Usuario"
          component={AuthStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={size} color={color} />
            ),
            headerTitleAlign: "center",
            headerShown: false,
            tabBarActiveTintColor: GLOBAL_COLOR,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
