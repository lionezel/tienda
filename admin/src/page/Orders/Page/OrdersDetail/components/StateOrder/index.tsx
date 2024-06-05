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
import { StateProduct, TimeLine } from "./components";
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

  console.log(order)

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

      if (querySnapshot.empty) {
        console.error(
          `No se encontró el pedido con id ${orderId} en OrderIncoming`
        );
        return;
      }

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
          console.log(`Documento con id ${orderId} eliminado de OrderIncoming`);

          const ordersQuery = query(
            collection(db, "orders"),
            where("user_uid", "==", order.user_uid)
          );
          const ordersSnapshot = await getDocs(ordersQuery);
          if (ordersSnapshot.empty) {
            console.error(
              `No se encontró el pedido con id ${order.user_uid} en orders`
            );
          } else {
            ordersSnapshot.forEach(async (orderDoc) => {
              await deleteDoc(orderDoc.ref);
              console.log(
                `Documento con id ${order.user_uid} eliminado de orders`
              );
            });
          }

          const cartQuery = query(
            collection(db, "cart"),
            where("user_uid", "==", order.user_uid)
          );
          const cartSnapshot = await getDocs(cartQuery);
          if (cartSnapshot.empty) {
            console.error(
              `No se encontró el pedido con id ${order.user_uid} en cart` 
            );
          } else {
            cartSnapshot.forEach(async (cartDoc) => {
              await deleteDoc(cartDoc.ref);
              console.log(
                `Documento con id ${order.user_uid} eliminado de cart`
              );
            });
          }

          const orderCompletedCollectionRef = collection(db, "orderCompleted");
          await addDoc(orderCompletedCollectionRef, {
            orderId,
            order: order,
            createdAt: formatDate(new Date()),
          });
          console.log(`Documento con id ${orderId} añadido a orderCompleted`);
        }
      });
    } catch (error) {
      console.error("Error actualizando el estado del pedido:", error);
    }
  };

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
                  StateProduct.find(
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
                  StateProduct.find(
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
