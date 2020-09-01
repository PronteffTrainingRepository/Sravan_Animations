import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component, useEffect, useState, useRef } from "react";
import Tab from "../components/Tab";
import { images } from "../components/Images";
import { Transition, Transitioning } from "react-native-reanimated";
import GridImage from "../components/Grid";

const width = Dimensions.get("window").width;

let image = images;

function Index() {
  // const ref = useRef({ animateNextTransition: () => {} });
  let ref = React.createRef();

  let [selectedTab, setselectedTab] = useState(0);
  let [images, setimages] = useState(image);

  useEffect(() => {
    ref.current.animateNextTransition();
    setimages(images);
  }, []);

  selectTab = (tabIndex) => {
    ref.current.animateNextTransition();
    setselectedTab(tabIndex);
  };

  transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={1000} />
      <Transition.Change type="fade" />
      <Transition.Out type="fade" duration={1000} />
    </Transition.Together>
  );

  randomizeImages = (images) => {
    const shuffledImages = images.sort(() => 0.4 - Math.random());
    ref.current.animateNextTransition();
    setimages(shuffledImages);
  };

  deleteImages = (images) => {
    images.pop();
    ref.current.animateNextTransition();
    setimages(images);
  };

  return (
    <Transitioning.View ref={ref} transition={transition} style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        <View
          style={{
            position: "absolute",
            height: width * 0.13,
            width: (width - 30) / 2,
            backgroundColor: "#11e110",
            left: selectedTab == 0 ? 0 : null,
            right: selectedTab == 1 ? 0 : null,
          }}
        />

        <TouchableOpacity style={{ flex: 1 }} onPress={() => selectTab(0)}>
          <Tab icon="md-photos" isSelected={selectedTab == 0 ? true : false} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => selectTab(1)}>
          <Tab icon="md-grid" isSelected={selectedTab == 1 ? true : false} />
        </TouchableOpacity>
      </View>

      {selectedTab == 0 ? (
        <View style={styles.imageContainer}>
          {images.map((image) => (
            <GridImage key={image.id} image={image} width={width / 2 - 20} />
          ))}
        </View>
      ) : (
        <View style={styles.imageContainer}>
          {images.map((image) => (
            <GridImage key={image.id} image={image} width={width / 3 - 20} />
          ))}
        </View>
      )}

      {selectedTab == 0 && (
        <View
          style={{
            marginBottom: 80,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Images</Text>
        </View>
      )}

      <TouchableWithoutFeedback onPress={() => deleteImages(images)}>
        <View
          style={{
            height: width * 0.13,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: selectedTab == 0 ? -width * 0.13 : 0,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Delete Images</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => randomizeImages(images)}>
        <View
          style={{
            height: width * 0.13,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: selectedTab == 0 ? 0 : -width * 0.13,
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Shuffle Images</Text>
        </View>
      </TouchableWithoutFeedback>
    </Transitioning.View>
  );
  // }
}
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    height: width * 0.13,
    flexDirection: "row",
    marginTop: width * 0.13,
    borderRadius: width * 0.13,
    width: width - 30,
    marginHorizontal: width * 0.06,
    backgroundColor: "lightgrey",
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
