import { View } from "native-base";
import { useFetchTranference } from "../../../../hooks/useFetchTranference";
import { ShowTransference } from "./components/ShowTransference";
import React, { useEffect, useState } from 'react';
import { Tranferences } from "../../../../interfaces/Tranference";

export const Tranference = () => {
  const [image, setImage] = useState<Tranferences | null>(null);
  const fetchedImages = useFetchTranference() as Tranferences[];

  useEffect(() => {
    if (fetchedImages && fetchedImages.length > 0) {
      setImage(fetchedImages[0]);
    }
  }, [fetchedImages]);

  return (
    <View>
      {image && <ShowTransference image={image} />}
    </View>
  );
};
