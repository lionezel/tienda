import { Input, Text, View } from "native-base";
import { Feather } from "@expo/vector-icons";
import { GLOBAL_COLOR } from "../../../../GLOBAL/COLOR_GLOBAL";
import { Product } from "../../../../interfaces/Products";
import { useState } from "react";
import { ListProducts } from "../ListProducts";

interface Props {
  products: Product[];
}

export const SearchProduct = ({ products }: Props) => {
  const [searchProduct, setSearchProduct] = useState<string>("");

  const filteredProduct = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        typeof value === "string" &&
        value.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase())
    )
  );

  return (
    <View>
      <Input
        borderRadius="15px"
        margin="5%"
        placeholder="Buscar..."
        type="text"
        leftElement={<Feather name="search" size={20} color={GLOBAL_COLOR} />}
        value={searchProduct}
        onChangeText={setSearchProduct}
      />
      <ListProducts products={filteredProduct} />
    </View>
  );
};
