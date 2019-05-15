import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import Link from "react-router-native";
import axios from "axios";

export default class App extends React.Component {
  state = {
    userInput: "",
    bookResults: {},
    isLoading: true,
    hasError: false
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

  render(props) {
    const { testStuff, bookResults, isLoading, hasError } = this.state;

    return (
      <SafeAreaView>
        {this.renderHeader()}
        <Header
          leftComponent={{
            icon: "book",
            color: "#fff",
            onPress: () => this.props.history.push("/bookshelf")
          }}
        />
        <FlatList
          data={bookResults.data && bookResults.data.books}
          renderItem={(items, i) => {
            return (
              <ListItem
                key={items.item.id ? items.item.id : i}
                roundAvatar
                title={items.item.title}
                subtitle={items.item.authors && items.item.authors[0]}
                rightAvatar={
                  items.item.imageLinks && {
                    source: { uri: items.item.imageLinks.smallThumbnail }
                  }
                }
                onPress={() =>
                  this.props.history.push("/books", {
                    bookId: items.item.id
                  })
                }
              />
            );
          }}
          ItemSeparatorComponent={this.renderSeparator}
        />
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
