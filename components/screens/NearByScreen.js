import React, { Component } from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import * as Permissions from "expo-permissions";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import { Container, Text, Content, Icon, Badge } from "native-base";
import Carousel from 'react-native-snap-carousel';
import { HitTestResultTypes } from "expo/build/AR";

const locations = require("../../assets/location.json");

const { width, height } = Dimensions.get('screen')

class NearByScreen extends Component{
  state = {
    latitude: null,
    longitude: null,
    locations: locations,
    markers: []
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )

    const { locations: [ sampleLocation ] } = this.state

    this.setState({
      desLatitude: sampleLocation.coords.latitude,
      desLongitude: sampleLocation.coords.longitude
    }, this.mergeCoords)
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyAHgpbKmG3IhW-jrAytQ9RAUsyiFiLmN1c`)
      const respJson = await resp.json();
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      const distance = distanceTime.distance.text
      const time = distanceTime.duration.text
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, time })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  onMarkerPress = (location, idx) => () => {
    const { coords: { latitude, longitude } } = location
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)

    this._carousel.snapToItem(idx)
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <View>
        {
          locations.map((location, idx) => {
            const {
              coords: { latitude, longitude }
            } = location
            return (
              <Marker
                key={location.name}
                ref={ref => this.state.markers[idx] = ref}
                onPress={()=>{this.onMarkerPress(location, idx)}}
                coordinate={{ latitude, longitude }}
              >
                <Callout>
            <Text>{location.name}</Text>
                </Callout>
              </Marker>
            )
          })
        }
      </View>
    )
  }

  _renderItem = ({item})=>
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.name} </Text>
            <Image style={styles.cardImage} source={require("../../assets/images/default_map_img.png")} />
              <Badge style={styles.cardPhone}>
            <Text>
              <Icon name="call"></Icon>
              {item.phoneNumber}
               </Text>
              </Badge>
        </View>


onCarouselItemChange = (index) => {
  const {
    coords: { latitude, longitude }
  } = this.state.locations[index]

  this._map.animateToRegion({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  this.state.markers[index].showCallout()
}

  render() {
    const {
      time,
      coords,
      distance,
      latitude,
      longitude,
      destination
    } = this.state

    if (latitude) {
      return (
        <Container style={styles.container, {...StyleSheet.absoluteFillObject}}>

        <MapView
          showsUserLocation
          style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
          ref={map=>this._map = map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
        {this.renderMarkers()}
      </MapView>

      <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.locations}
              renderItem={this._renderItem}
              containerCustomStyle={styles.carousel}
              sliderWidth={width}
              itemWidth={250}
              removeClippedSubviews={false}
              onSnapToItem={(index) => this.onCarouselItemChange(index)}
            />
        </Container>

      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission!</Text>
      </View>
    )
  }

}


NearByScreen.navigationOptions = {
  header: null
};


export default NearByScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maps: {
    height: "100%",
    width: "100%"
  },
carousel:{
  position:'absolute',
  bottom: 0,
 marginBottom: 68
},
cardContainer:{
backgroundColor: "rgba(0,0,0,0.6)",
height: 250,
width: 250,
padding: 24,
paddingLeft:0,
borderRadius: 24
},
cardImage:{
  height:120,
  width: 250
},
cardPhone:{
  position: 'absolute',
  bottom: 0,
  marginBottom:50,
  justifyContent: "center",
  alignContent: 'center',
  alignSelf: 'center'
},
cardTitle:{
color:'white',
fontSize: 22,
alignSelf: 'center',
alignContent: 'center',
alignItems:'center',
justifyContent: 'center'
}
  
});