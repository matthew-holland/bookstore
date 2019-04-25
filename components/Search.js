import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from "axios";

export default class App extends React.Component {
  state = {
    userInput: "",
    bookResults: {},
    isLoading: true,
    hasError: false,
    testStuff: ["hey", "bro", "how", "you", "doin"]
  };

  handleInput = searchTerm => {
    this.setState({ userInput: searchTerm });
    this.searchBooks(searchTerm);
  };

  componentDidMount = () => {
    let url = "http://localhost:7000/books/search/dogs";

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

  searchBooks = term => {
    let url = "http://localhost:7000/books/search/" + term;

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

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Find a book..."
        lightTheme
        round
        value={this.state.userInput}
        onChangeText={userInput => this.handleInput(userInput)}
        autoCorrect={false}
      />
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    );
  };

  render() {
    const { testStuff, bookResults, isLoading, hasError } = this.state;

    return (
      <SafeAreaView>
        {this.renderHeader()}
        <FlatList
          data={bookResults.data.books}
          renderItem={({ items }) => {
            console.log(items);
            return <ListItem roundAvatar title={items.title} />;
          }}
          ItemSeparatorComponent={this.renderSeparator}
        />
        }{/* {<Text>{JSON.stringify(bookResults)}</Text>} */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});