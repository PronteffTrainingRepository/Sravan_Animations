import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import React, { Component } from "react";
import Tab from "../components/Tab";
import { images } from "../components/Images";
import { Transition, Transitioning } from "react-native-reanimated";
import GridImage from "../components/Grid";

const width = Dimensions.get("window").width;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      images: images,
      fadeAnim: new Animated.Value(0),
      //   translateX: new Animated.Value(width * 0.99),
      startValue: new Animated.Value(width),
      endValue: 0,
      duration: 2000,
    };
    // this.animatedValue = new Animated.Value(0);
    this.ref = React.createRef();
  }

  //   animate() {
  //     this.animatedValue.setValue(0);
  //     Animated.timing(this.animatedValue, {
  //       toValue: 1,
  //       duration: 5000,
  //       easing: Easing.linear,
  //       useNativeDriver: false,
  //     }).start();
  //   }

  selectTab = (tabIndex) => {
    this.ref.current.animateNextTransition();
    this.setState({ selectedTab: tabIndex });
  };

  transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
        propagation="right"
      />
      <Transition.In type="fade" durationMs={2000} />
      <Transition.Change />
      <Transition.Out type="fade" duration={2000} />
    </Transition.Together>
  );

  componentDidMount = () => {
    this.ref.current.animateNextTransition();
    this.setState({ images: images });
    this.fadeIn();
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  randomizeImages = (images) => {
    const shuffledImages = images.sort(() => 0.4 - Math.random());
    this.ref.current.animateNextTransition();
    // console.log(this.ref.current.animateNextTransition());
    this.setState({ images: shuffledImages });
  };

  deleteImages = (images) => {
    images.pop();
    this.ref.current.animateNextTransition();
    this.setState({ images: images });
  };

  render() {
    return (
      <Transitioning.View
        ref={this.ref}
        transition={this.transition}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={{
            ...styles.tabContainer,
            opacity: this.state.fadeAnim,
            transform: [
              {
                translateX: this.state.startValue,
              },
            ],
          }}
        >
          <View
            style={[
              {
                position: "absolute",
                height: width * 0.13,
                width: (width - 30) / 2,
                backgroundColor: "green",
                left: this.state.selectedTab == 0 ? 0 : null,
                right: this.state.selectedTab == 1 ? 0 : null,
              },
            ]}
          />

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.selectTab(0)}
          >
            <Tab
              icon="md-photos"
              isSelected={this.state.selectedTab == 0 ? true : false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.selectTab(1)}
          >
            <Tab
              icon="md-grid"
              isSelected={this.state.selectedTab == 1 ? true : false}
            />
          </TouchableOpacity>
        </Animated.View>
        {this.state.selectedTab == 0 ? (
          <View style={{ ...styles.imageContainer }}>
            {this.state.images.map((image) => (
              <GridImage key={image.id} image={image} width={width / 2 - 20} />
            ))}
          </View>
        ) : (
          <View style={styles.imageContainer}>
            {this.state.images.map((image) => (
              <GridImage key={image.id} image={image} width={width / 3} />
            ))}
          </View>
        )}
        {this.state.selectedTab == 0 && (
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
        <TouchableWithoutFeedback
          onPress={() => {
            this.deleteImages(this.state.images);
          }}
        >
          <View
            style={{
              height: width * 0.13,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: this.state.selectedTab == 0 ? -width * 0.13 : 0,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24, color: "white" }}>Delete Images</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.randomizeImages(this.state.images);
          }}
        >
          <Animated.View
            style={{
              height: width * 0.13,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: this.state.selectedTab == 0 ? 0 : -width * 0.13,
              backgroundColor: "green",
              alignItems: "center",
              justifyContent: "center",
              transform: [
                {
                  translateX: this.state.startValue,
                },
              ],
            }}
          >
            <Text style={{ fontSize: 24, color: "white" }}>
              Randomize Images
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Transitioning.View>
    );
  }
}
export default Home;

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
