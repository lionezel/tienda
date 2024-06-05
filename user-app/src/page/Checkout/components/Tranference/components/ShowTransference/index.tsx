import { Image, ScrollView, Text, View } from "native-base";
import { Tranferences } from "../../../../../../interfaces/Tranference";
import { ButtonPayOrder } from "../../../ButtonPayOrder";

const bancolombia = require("../assets/bancolombia.jpg");

interface Props {
  image: Tranferences;
}

export const ShowTransference = ({ image }: Props) => {
  return (
    <ScrollView h="auto">
      <Text fontWeight="bold" margin="20px" textAlign="center" fontSize="20px">
        Como quieres pagar hoy ?
      </Text>
      <View backgroundColor="#f58484" padding="10px" borderRadius="5px">
        <Text color="white">
          Puedes pedes pagar mientras preparan tu pedido, no te olvides de pagar
        </Text>
      </View>
      <View
        backgroundColor="white"
        margin="25px"
        alignItems="center"
        textAlign="center"
        padding="20px"
        borderRadius="20px"
      >
        <Text fontSize="25px" marginBottom="20px">
          Bancolombia
        </Text>
        <View>
          <Image
            size="150px"
            source={{
              uri: image.imageURL,
            }}
            alt="product"
          />
        </View>
        <View margin="25px">
          <Text fontWeight="bold" marginRight="5px" fontSize="20px">
            Numero
          </Text>
          <Text>31212312</Text>
        </View>
      </View>
      <View
        backgroundColor="white"
        margin="25px"
        alignItems="center"
        textAlign="center"
        padding="20px"
        borderRadius="20px"
      >
        <Text fontSize="25px" marginBottom="20px">
          Nequi
        </Text>
        <View>
          <Image
            size="150px"
            source={{
              uri: image.imageURL,
            }}
            alt="product"
          />
        </View>
        <View margin="25px">
          <Text fontWeight="bold" marginRight="5px" fontSize="20px">
            Numero
          </Text>
          <Text>31212312</Text>
        </View>
      </View>
      <ButtonPayOrder />
    </ScrollView>
  );
};
