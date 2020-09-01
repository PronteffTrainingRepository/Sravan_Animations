import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Grid = ({ image, width }) => {
  return (
    <View
      key={image.id}
      style={{
        width: width,
        height: width,
        marginVertical: 10,
      }}
    >
      <Image
        source={image.uri}
        style={{
          flex: 1,
          height: null,
          width: null,
        }}
      />
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
