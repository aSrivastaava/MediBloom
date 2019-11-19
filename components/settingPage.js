import Constants from 'expo-constants';
import React from 'react';
import { SectionList, Image, StyleSheet, Text, View, Alert, StatusBar } from 'react-native';
import firebase from 'firebase';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

export default class ExpoConfigView extends React.Component {
  render() {
    const { manifest = {} } = Constants;
    const sections = [
      { data: [{ value: manifest.sdkVersion }], title: 'sdkVersion' },
      { data: [{ value: manifest.privacy }], title: 'privacy' },
      { data: [{ value: manifest.version }], title: 'version' },
      { data: [{ value: manifest.orientation }], title: 'orientation' },
      {
        data: [{ value: manifest.primaryColor, type: 'color' }],
        title: 'primaryColor',
      },
      {
        data: [{ value: manifest.splash && manifest.splash.image }],
        title: 'splash.image',
      },
      {
        data: [
          {
            value: manifest.splash && manifest.splash.backgroundColor,
            type: 'color',
          },
        ],
        title: 'splash.backgroundColor',
      },
      {
        data: [
          {
            value: manifest.splash && manifest.splash.resizeMode,
          },
        ],
        title: 'splash.resizeMode',
      },
      {
        data: [
          {
            value: manifest.ios && manifest.ios.supportsTablet ? 'true' : 'false',
          },
        ],
        title: 'ios.supportsTablet',
      },
    ];

    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={ListHeader}
        sections={sections}
      />
    );
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };

  _renderItem = ({ item }) => {
    if (item.type === 'color') {
      return <SectionContent>{item.value && <Color value={item.value} />}</SectionContent>;
    } else {
      return (
        <SectionContent>
          <Text style={styles.sectionContentText}>{item.value}</Text>
        </SectionContent>
      );
    }
  };
}

const ListHeader = () => {
  const { manifest } = Constants;

  var user = firebase.auth().currentUser;
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={user.photoURL} />
      </View>

      <View style={styles.titleTextContainer}>
        <TextInput style={styles.nameText} numberOfLines={1} editable={false}>
        {user.displayName}
        </TextInput>

        <TextInput style={styles.slugText} numberOfLines={1} editable={false}>
          {user.email}
        </TextInput>
        <View style={{flexDirection:'row'}}>
         <TouchableOpacity onPress={()=>{
            Alert.alert(
              'Logout',
              'Are you Sure, you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                  firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    alert("You have successfully logged out..")
                  }).catch(function(error) {
                    // An error happened.
                    alert("Something went wrong, try again in some time.")
                  });
                }},
              ],
              {cancelable: false},
            );

         }}><Text style={{color:"skyblue" ,marginRight:5}}>Logout</Text></TouchableOpacity>
        <Text> | </Text>
         <TouchableOpacity><Text style={{color:"skyblue", marginLeft:5}}>Edit</Text></TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>{manifest.description}</Text>
      </View>
    </View>
  );
};

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
};

const SectionContent = props => {
  return <View style={styles.sectionContentContainer}>{props.children}</View>;
};

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl = 'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
  }

  return <Image source={{ uri: iconUrl }} style={{ width: 64, height: 64 }} resizeMode="cover" />;
};

const Color = ({ value }) => {
  if (!value) {
    return <View />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <View style={styles.colorTextContainer}>
          <Text style={styles.sectionContentText}>{value}</Text>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  colorTextContainer: {
    flex: 1,
  },
});
