
import { createStackNavigator } from "@react-navigation/stack";
import { CartPage, Checkout, Home, MyOrderInComing, Order, ProductDetail } from "../../../page";
import { PaymentMethod } from "../../../page/Order/components";
import { Cart } from "../../../shared";
import { UserInfo } from "../../../page/auth/page";


const Stack = createStackNavigator();

interface Stacks {
  component: React.ComponentType<any>;
  name: string;
}

export const HomeStack = () => {
  const stacks: Stacks[] = [
    { component: Home, name: "Home" },
    { component: ProductDetail, name: "ProductDetail" },
    { component: Order, name: "Order" },
    { component: MyOrderInComing, name: "MyOrderInComing" },
    { component: PaymentMethod, name: "PaymentMethod" },
    { component: Checkout, name: "Checkout" },
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
