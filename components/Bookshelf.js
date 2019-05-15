import React from "react";
import { SafeAreaView, FlatList, View, Row } from "react-native";
import { Text, ListItem, Button, Header } from "react-native-elements";
import axios from "axios";
import Drawer from "react-native-drawer";

export default class App extends React.Component {
  state = {
    bookResults: {},
    drawerOpen: false,
    workingId: ""
  };

  componentWillMount = () => {
    let url = "http://localhost:7000/bookshelf";

    axios
      .get(url)
      .then(response => {
        this.setState({
          bookResults: response.data.books,
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

  addBook = shelfKey => {
    let url =
      "http://localhost:7000/bookshelf/update/" +
      this.state.workingId +
      "/" +
      shelfKey;
    console.log("pre state", this.state);

    axios
      .get(url)
      .then(response => {
        console.log("RESPONSE", response);
        this.setState(
          {
            bookResults: response.data.books,
            update: response,
            isLoading: false,
            hasError: false
          },
          () => console.log(this.state)
        );
      })
      .catch(() => {
        console.log("CATCH");
        this.setState({
          isLoading: false,
          hasError: true
        });
      });

    this.setState({ drawerOpen: false });
  };

  renderDrawer = () => {
    return (
      <SafeAreaView>
        <Button
          raised
          title="Move to want to read"
          onPress={() => this.addBook("wantToRead")}
        />
        <Button
          raised
          title="Move to currently reading"
          onPress={() => this.addBook("currentlyReading")}
        />
        <Button
          raised
          title="Move to read"
          onPress={() => this.addBook("read")}
        />
        <Button
          raised
          title="Delete from my bookshelf"
          onPress={() => this.addBook("none")}
        />
      </SafeAreaView>
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

  openDrawer = id => {
    this.setState({ drawerOpen: true, workingId: id });
  };

  closeDrawer = () => {
    this.setState({ drawerOpen: false });
  };

  render(props) {
    const { bookResults } = this.state;
    return (
      <Drawer
        open={this.state.drawerOpen}
        //ref={ref => (this.drawer = ref)}
        type="displace"
        tapToClose={true}
        openDrawerOffset={0.5}
        closedDrawerOffset={0}
        content={this.renderDrawer()}
        side={"right"}

        //tweenHandler={0.5}
        //tweenEasing={400}
      >
        <SafeAreaView>
          {/* <Text>
          {bookResults &&
            bookResults.wantToRead[0].title +
              bookResults.wantToRead[1].title +
              bookResults.wantToRead[2].title}
        </Text> */}

          <Header
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

          <Text>Books I want to read...</Text>
          <FlatList
            data={bookResults && bookResults.wantToRead}
            renderItem={items => {
              return (
                <ListItem
                  key={items.item.id}
                  roundAvatar
                  chevron={true}
                  title={items.item.title}
                  subtitle={items.item.authors && items.item.authors[0]}
                  leftAvatar={
                    items.item.imageLinks && {
                      source: { uri: items.item.imageLinks.smallThumbnail }
                    }
                  }
                  onPress={() =>
                    this.props.history.push("/books", {
                      bookId: items.item.id
                    })
                  }
                  onLongPress={() => this.openDrawer(items.item.id)}
                />
              );
            }}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <Text>Books I am currently reading...</Text>
          <FlatList
            data={bookResults && bookResults.currentlyReading}
            renderItem={items => {
              return (
                <ListItem
                  key={items.item.id}
                  roundAvatar
                  chevron={true}
                  title={items.item.title}
                  subtitle={items.item.authors && items.item.authors[0]}
                  leftAvatar={
                    items.item.imageLinks && {
                      source: { uri: items.item.imageLinks.smallThumbnail }
                    }
                  }
                  onPress={() =>
                    this.props.history.push("/books", {
                      bookId: items.item.id
                    })
                  }
                  onLongPress={() => this.openDrawer(items.item.id)}
                />
              );
            }}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <Text>Books I have read...</Text>
          <FlatList
            data={bookResults && bookResults.read}
            renderItem={items => {
              return (
                <ListItem
                  key={items.item.id}
                  roundAvatar
                  chevron={true}
                  title={items.item.title}
                  subtitle={items.item.authors && items.item.authors[0]}
                  leftAvatar={
                    items.item.imageLinks && {
                      source: { uri: items.item.imageLinks.smallThumbnail }
                    }
                  }
                  onPress={() =>
                    this.props.history.push("/books", {
                      bookId: items.item.id
                    })
                  }
                  onLongPress={() => this.openDrawer(items.item.id)}
                />
              );
            }}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </SafeAreaView>
      </Drawer>
    );
  }
}
