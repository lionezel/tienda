import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Auth,
  CartPage,
  Home,
  MyOrderInComing,
  Order,
  ProductDetail,
} from "../page";
import { UserInfo } from "../page/auth/page";
import { Cart } from "../shared";
import { PaymentMethod } from "../page/Order/components";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface Stacks {
  component: React.ComponentType<any>;
  name: string;
}

const HomeStack = () => {
  const stacks: Stacks[] = [
    { component: Home, name: "Home" },
    { component: ProductDetail, name: "ProductDetail" },
    { component: Order, name: "Order" },
    { component: MyOrderInComing, name: "MyOrderInComing" },
    { component: PaymentMethod, name: "PaymentMethod" },
  ];
  return (
    <Stack.Navigator>
      {stacks.map((stack) => (
        <Stack.Screen
          component={stack.component}
          name={stack.name}
          options={{
            headerTitleAlign: "center",
            headerRight: () => <Cart />,
          }}
        />
      ))}
      <Stack.Screen component={UserInfo} name="UserInfo" />
      <Stack.Screen
        component={CartPage}
        name="Carrito"
        options={{ headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
            headerShown: false,
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
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
