import { Image, Text, View } from "native-base";
import { OrderInComing } from "../../../../interfaces/OrderInComing";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { useNavigation } from "@react-navigation/native";

const restaurante = require("./assets/restaurante (1).png");
const repartidor = require("./assets/repartidor.png");

interface Props {
  order: OrderInComing;
}

interface Nav {
  navigate(arg0: string): unknown;
}

export const Ready = ({ order }: Props) => {
  const navigation = useNavigation<Nav>();

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      {order && order.OpcionDeEntrega === "irPorElPedido" ? (
        <View alignItems="center">
          <Text bold fontSize={30} numberOfLines={10}>
            Tu pedido está listo, ya puedes ir
          </Text>
          <View mt={10}>
            <Image
              source={restaurante}
              alt="restaurant"
              style={{ width: 300, height: 300 }}
            />
          </View>
        </View>
      ) : order && order.OpcionDeEntrega === "Repartidor" ? (
        <View alignItems="center">
          <Text bold fontSize={30} numberOfLines={10}>
            Tu pedido está listo, el repartidor está yendo a tu casa
          </Text>
          <View mt={10}>
            <Image
              source={repartidor}
              alt="repartidor"
              style={{ width: 300, height: 300 }}
            />
          </View>
        </View>
      ) : (
        <Text>fd</Text>
      )}
      <ButtonBase onPress={handleNavigate}>Seguir viendo</ButtonBase>
    </View>
  );
};
