import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/Screens/Home";
import Index from "./src/Screens/Index";
import Blinking from "./src/Screens/Blinking";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      {/* <Index /> */}
      <Blinking />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
