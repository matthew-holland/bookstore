import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import {
  List,
  ListItem,
  SearchBar,
  Image,
  Divider,
  Text,
  Header,
  Button
} from "react-native-elements";
import axios from "axios";
import Drawer from "react-native-drawer";

export default class App extends React.Component {
  state = {
    bookId: null,
    bookResults: {},
    isLoading: true,
    hasError: false,
    drawerOpen: false
  };

  componentDidMount = () => {
    let url = "http://localhost:7000/book/" + this.props.location.state.bookId;

    axios
      .get(url)
      .then(response => {
        this.setState({
          bookResults: response,
          isLoading: false,
          hasError: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true
        });
      });
  };

  renderDrawer = () => {
    return (
      <SafeAreaView>
        <Button raised title="I want to read this book" />
        <Button raised title="I am currently reading this book" />
        <Button raised title="I have read this book" />
        <Button raised title="Go to my bookshelf" />
      </SafeAreaView>
    );
  };

  openDrawer = () => {
    this.setState({ drawerOpen: true });
  };

  closeDrawer = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    //console.log(this.state);
    return (
      <Drawer
        open={this.state.drawerOpen}
        //ref={ref => (this.drawer = ref)}
        type="displace"
        tapToClose={true}
        openDrawerOffset={0.5}
        closedDrawerOffset={0}
        content={this.renderDrawer()}
        //tweenHandler={0.5}
        //tweenEasing={400}
      >
        <SafeAreaView>
          {/* <Text>{this.props.location.state.bookId}</Text> */}
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: () => this.openDrawer()
            }}
            centerComponent={{
              text: "Shelf Life",
              style: { color: "#fff", fontSize: 16 }
            }}
            rightComponent={{
              icon: "search",
              color: "#fff",
              onPress: () => this.props.history.push("/")
            }}
          />

          <Image
            source={
              this.state.bookResults.data && {
                uri: this.state.bookResults.data.book.imageLinks.thumbnail
              }
            }
            style={{
              alignSelf: "center",
              width: 200,
              height: 200,
              borderRadius: 100
            }}
          />
          <Text style={{ fontFamily: "Didot", fontSize: 20 }}>
            {this.state.bookResults.data &&
              this.state.bookResults.data.book.title}
          </Text>
          <Divider style={{ backgroundColor: "blue" }} />
          <Text style={{ fontFamily: "Didot", fontSize: 16 }}>
            Author:{" "}
            {this.state.bookResults.data &&
              this.state.bookResults.data.book.authors[0]}
          </Text>
          <Divider style={{ backgroundColor: "blue" }} />
          <Text style={{ fontFamily: "Didot", fontSize: 16 }}>
            Publisher:{" "}
            {this.state.bookResults.data &&
              this.state.bookResults.data.book.publisher}
          </Text>
          <Divider style={{ backgroundColor: "blue" }} />
          <Text style={{ fontFamily: "Didot", fontSize: 14 }}>
            {this.state.bookResults.data &&
              this.state.bookResults.data.book.description}
          </Text>
          <Divider style={{ backgroundColor: "blue" }} />
        </SafeAreaView>
      </Drawer>
    );
  }
}
