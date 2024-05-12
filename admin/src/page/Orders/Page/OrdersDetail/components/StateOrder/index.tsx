import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { Container } from "./styled";

import { GLOBAL_COLOR } from "../../../../../../Global/GLOBAL_COLOR";
import { Order } from "../../../../../../interfaces/Orders";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TimeLine } from "./components";
import notes from "./assets/notas-adhesivas.png";
import { formatDate } from "../../../../../../Global/FormatDate";

interface Props {
  order: Order;
  orderId: string | undefined;
}

interface OrderState {
  [key: string]: Order;
}

export const StateOrder: React.FC<Props> = ({ orderId, order }: Props) => {
  const [orderState, setOrderState] = useState<OrderState>({});

  useEffect(() => {
    if (orderId) {
      const fetchOrderState = async () => {
        try {
          const orderQuery = query(
            collection(db, "OrderIncoming"),
            where("id", "==", orderId)
          );
          const querySnapshot = await getDocs(orderQuery);
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Order;
            setOrderState((prevState) => ({
              ...prevState,
              [orderId]: data,
            }));
          });
        } catch (error) {
          console.error("Error obteniendo el estado del pedido:", error);
        }
      };

      fetchOrderState();
    }
  }, [orderId]);

  const changeStateOrder = async (orderId: string) => {
    try {
      const orderQuery = query(
        collection(db, "OrderIncoming"),
        where("id", "==", orderId)
      );
      const querySnapshot = await getDocs(orderQuery);
      querySnapshot.forEach(async (doc) => {
        let newState: string = "";
        if (orderState[orderId]?.state === "pendiente") {
          newState = "preparando";
        } else if (orderState[orderId]?.state === "preparando") {
          newState = "listo";
        } else if (orderState[orderId]?.state === "listo") {
          newState = "completado";
        }

        await updateDoc(doc.ref, { state: newState });
        setOrderState((prevState) => ({
          ...prevState,
          [orderId]: { ...orderState[orderId], state: newState },
        }));

        if (newState === "completado") {
          await deleteDoc(doc.ref);

          const cartCollectionRefs = collection(db, `orders`);
          const cartQuerySnapshots = await getDocs(cartCollectionRefs);
          cartQuerySnapshots.forEach(async (cartDoc) => {
            if (cartDoc.id === orderId) {
              await deleteDoc(cartDoc.ref);
            }
          });

          const cartCollectionRef = collection(db, `cart`);
          const cartQuerySnapshot = await getDocs(cartCollectionRef);
          cartQuerySnapshot.forEach(async (cartDoc) => {
            if (cartDoc.id === orderId) {
              await deleteDoc(cartDoc.ref);
            }
          });
          const orderCompletedCollectionRef = collection(db, "orderCompleted");
          await addDoc(orderCompletedCollectionRef, {
            orderId,
            order: order,
            createdAt: formatDate(new Date()),
          });
        }
      });
    } catch (error) {
      console.error("Error actualizando el estado del pedido:", error);
    }
  };

  const stateProduct = [
    {
      state: "pendiente",
      image: { notes },
      nameButton: "Aceptar pedido",
    },
    {
      state: "preparando",
      image: { notes },
      nameButton: "Producto Listo",
    },
    {
      state: "listo",
      image: { notes },
      nameButton: "Completado",
    },
  ];

  return (
    <Container>
      <div style={{ marginRight: "100px" }}>
        <TimeLine orderState={orderState} orderId={orderId} />
      </div>
      <div style={{ padding: "20px" }}>
        {orderId &&
          ["pendiente", "preparando", "listo"].includes(
            orderState[orderId]?.state
          ) && (
            <div>
              <img
                src={
                  stateProduct.find(
                    (item) => item.state === orderState[orderId]?.state
                  )?.image?.notes
                }
                alt="notes"
                style={{
                  width: "100px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <Button
                style={{
                  backgroundColor: GLOBAL_COLOR,
                  color: "black",
                  display: "block",
                }}
                variant="contained"
                onClick={() => changeStateOrder(orderId)}
              >
                {
                  stateProduct.find(
                    (item) => item.state === orderState[orderId]?.state
                  )?.nameButton
                }
              </Button>
            </div>
          )}
        {orderId && orderState[orderId]?.state === "completado" && (
          <div
            style={{
              position: "relative",
              top: "70px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "25px" }}>Producto completado </div>
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: 40, mt: "20px" }}
            />
          </div>
        )}
      </div>
    </Container>
  );
};
