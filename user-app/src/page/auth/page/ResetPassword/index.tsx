import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePasswordReset = async () => {
    if (email.trim() === "") {
      setMessage("Por favor, introduce tu correo electrónico");
      return;
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Correo de restablecimiento de contraseña enviado. Revisa tu bandeja de entrada."
      );
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Restablecer Contraseña" onPress={handlePasswordReset} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  message: {
    marginTop: 12,
    textAlign: "center",
    color: "red",
  },
});

