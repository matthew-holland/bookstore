/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Search from "./components/Search.js";
import Books from "./components/Books.js";
import Bookshelf from "./components/Bookshelf.js";

//type Props = {};

//<Props>  this came after Component
export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Search} />
        <Route exact path="/Books" component={Books} />
        <Route exact path="/Bookshelf" component={Bookshelf} />
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
