/* eslint-disable no-unused-vars */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';
import loadLocalResource from 'react-native-local-resource';
import RNFetchBlob from 'rn-fetch-blob';
import {openSettings} from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {WebView} from 'react-native-webview';
import Share from 'react-native-share';
import CameraView from './CameraView';
import PushNotification from 'react-native-push-notification';

const SimpleTests = () => {
  Geolocation.getCurrentPosition(info => console.log(info));

  // send http request in a new thread (using native code)
  RNFetchBlob.fetch(
    'GET',
    'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    {
      // Authorization: 'Bearer access-token...',
      // more headers  ..
    },
  )
    .then(res => {
      let status = res.info().status;

      if (status === 200) {
        // the conversion is done in native code
        let base64Str = res.base64();
        console.log('RNFetchBlob 2000');
        console.log(base64Str);
        // the following conversions are done in js, it's SYNC
        let text = res.text();
        let json = res.json();
        console.log(text);
        console.log(json);
      } else {
        // handle other status codes
        console.log('RNFetchBlob else');
        console.log(res);
      }
    })
    // Something went wrong:
    .catch((errorMessage, statusCode) => {
      // error handling
      console.log('RNFetchBlob err');
      console.log(errorMessage);
    });

  if (false) {
    return <CameraView />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
              <Button
                title="Press me"
                color="#f194ff"
                onPress={() =>
                  Alert.alert('Button with adjusted color pressed')
                }
              />
              <Button
                title="Open settings with react-native-permissions"
                onPress={() => openSettings()}
              />

              <Button
                title="Open settings with AndroidOpenSettings.locationSourceSettings()"
                color="#f194ff"
                onPress={() =>
                  // Open location source settings menu
                  Platform.OS === 'ios'
                    ? Linking.openSettings()
                    : AndroidOpenSettings.locationSourceSettings()
                }
              />
              <Button
                title="react-native-share"
                onPress={() =>
                  Share.open({message: 'message', title: 'title'})
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => {
                      err && console.log(err);
                    })
                }
              />
              <Button
                title="Push notification"
                color="#f194ff"
                onPress={() =>
                  PushNotification.localNotification({
                    /* Android Only Properties */
                    channelId: 'your-channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
                    actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more

                    /* iOS and Android properties */

                    title: 'My Notification Title', // (optional)
                    message: 'My Notification Message', // (required)
                  })
                }
              />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <WebView
              source={{html: '<h1>Hello world</h1>'}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{marginTop: 20}}
            />

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default SimpleTests;
