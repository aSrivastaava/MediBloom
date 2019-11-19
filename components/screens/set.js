import React, { Component } from "react";
import { Image, Alert } from "react-native";
import firebase from "firebase";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Badge,
  Footer,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { reload } from "expo/build/Updates/Updates";
export default class Set extends Component {
  state = {
    name: "",
    phone: ""
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        alert("You have successfully logged out..");
      })
      .catch(function(error) {
        // An error happened.
        alert("Something went wrong, try again in some time.");
      });
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        alert("You have successfully logged out..");
      })
      .catch(function(error) {
        // An error happened.
        alert("Something went wrong, try again in some time.");
      });
  };
  render() {
    var user = firebase.auth().currentUser;
    if (true) {
      if (user.phoneNumber === null && user.displayName === null) {
        return (
          <Container>
            <Header />
            <Content>
              <Card>
                <CardItem header>
                  <Text>Please Enter these basic Informations.</Text>
                </CardItem>
                <Form>
                  <Item floatingLabel>
                    <Label>Name</Label>
                    <Input onChangeText={name => this.setState({ name })} />
                  </Item>
                </Form>

                <CardItem footer>
                  <Button
                    block
                    success
                    onPress={() => {
                      user
                        .updateProfile({
                          displayName: this.state.name
                        })
                        .then(()=>
                          {this.logout;})
                        .catch(function(error) {
                          // An error happened.
                          alert(error);
                        });
                    }}
                  >
                    <Text>Save Changes</Text>
                  </Button>
                  <Right>
                    <Button
                      bordered
                      danger
                      onPress={() => {
                        Alert.alert(
                          "Logout",
                          "Are you Sure, you want to logout?",
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "Yes",
                              onPress: () => {
                                this.logout;
                              }
                            }
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Text>Logout</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </Content>
          </Container>
        );
      }
    }
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://st2.depositphotos.com/3867453/9825/v/950/depositphotos_98253710-stock-illustration-letter-a-cross-plus-logo.jpg"
                  }}
                  style={{ borderWidth: 1, borderColor: "red" }}
                />
                <Body>
                  <Text>{user.displayName}</Text>
                  <Text note>{user.email}</Text>
                </Body>
              </Left>
              <Badge success>
                <Text style={{ fontSize: 12 }}>verified</Text>
              </Badge>
            </CardItem>
            <CardItem cardBody></CardItem>

            <CardItem>
              <Body>
                <Button
                  transparent
                  onPress={() => {
                    Alert.alert(
                      "Delete user",
                      "Are you Sure, you want to Delete you account?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            firebase
                              .auth()
                              .currentUser.delete()
                              .then(function() {
                                // User deleted.
                                alert(
                                  "Your account has been deleted Successfully."
                                );
                              })
                              .catch(function(error) {
                                // An error happened.
                                alert(error);
                              });
                          }
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Icon active name="trash" />
                  <Text>Delete Account</Text>
                </Button>
              </Body>
              <Right>
                <Button
                  bordered
                  danger
                  onPress={() => {
                    Alert.alert(
                      "Logout",
                      "Are you Sure, you want to logout?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            firebase
                              .auth()
                              .signOut()
                              .then(function() {
                                // Sign-out successful.
                                alert("You have successfully logged out..");
                              })
                              .catch(function(error) {
                                // An error happened.
                                alert(
                                  "Something went wrong, try again in some time."
                                );
                              });
                          }
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Text>Logout</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
