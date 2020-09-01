import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  Easing,
} from "react-native";
const ht = Dimensions.get("window").height;

class Blinking extends Component {
  constructor() {
    super();
    this.state = {
      height: new Animated.Value(ht * 0.06),
      viewState: true,
      time: "",
    };
  }

  Started = () => {
    let myvar = setInterval(
      () => {
        this.setState((previousState) => {
          return { viewState: !previousState.viewState };
        });
        // console.log(this.state.viewState);
      },
      // Define any blinking time.
      1000
    );

    Animated.timing(this.state.height, {
      toValue: ht * 0.3,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        viewState: false,
        time: myvar,
      });
    });
    // this.setState({ time: myvar });
  };

  Pause = () => {
    clearInterval(this.state.time);
    Animated.timing(this.state.height, {
      toValue: this.state.height,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  Stop = () => {
    clearInterval(this.state.time);
    Animated.timing(this.state.height, {
      toValue: ht * 0.06,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(this.setState({ viewState: true }));
  };

  render() {
    const animatedStyle = {
      width: this.state.height,
      height: this.state.height,
      borderRadius: this.state.height,
      backgroundColor: "green",
    };

    return (
      <View style={styles.Container}>
        {this.state.viewState == true ? (
          <Animated.View
            style={[styles.animatedBox, animatedStyle]}
          ></Animated.View>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={this.Started}>
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.Stop}>
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.Pause}>
            <Text style={styles.text}>Pause</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Blinking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedBox: {
    width: ht * 0.06,
    height: ht * 0.06,
    borderRadius: (ht * 0.06) / 2,

    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: ht * 0.03,
    width: ht * 0.06,
    backgroundColor: "red",
    margin: ht * 0.009,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ht * 0.02,
  },
  text: {
    color: "white",
  },
});
