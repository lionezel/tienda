import { createStackNavigator } from "@react-navigation/stack";
import { Auth, CartPage } from "../../../page";
import {
 
  UserInfo,
} from "../../../page/auth/page";
import { Login } from "../../../page/auth/page/Login";
import { Register } from "../../../page/auth/page/Register";
import { ResetPassword } from "../../../page/auth/page/ResetPassword";

const Stack = createStackNavigator();

interface Stacks {
  component: React.ComponentType<any>;
  name: string;
}

export const AuthStack = () => {
  const stacks: Stacks[] = [
    { component: Auth, name: "Auth" },
    { component: Login, name: "Login" },
    { component: Register, name: "Register" },
    { component: ResetPassword, name: "ResetPassword" },
  ];
  return (
    <Stack.Navigator>
      {stacks.map((stack) => (
        <Stack.Screen
          component={stack.component}
          name={stack.name}
          options={{
            headerTitleAlign: "center",
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
