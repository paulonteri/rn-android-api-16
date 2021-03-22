import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export default class CameraView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
    };
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 1,
        // fixOrientation: true,
        // forceUpOrientation: true,
        exif: true,
        // writeExif: {
        //   GPSLatitude: this.props.latitude,
        //   GPSLongitude: this.props.longitude,
        //   GPSAltitude: this.props.altitude,
        // },
      };

      this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        this.setState({takingPic: false}, () => {
          // taken picture
          this.props.onTakePictureSuccess(data);
          if (__DEV__) {
            console.log('taken picture');
            console.log(data);
          }
        });
      } catch (err) {
        // taking picture failed
        this.setState({takingPic: false});
        this.props.onTakePictureFail(err);
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        this.setState({takingPic: false});
      }
    }
  };

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={styles.btnContainer} center>
          <TouchableOpacity activeOpacity={0.5} onPress={this.takePicture}>
            <View style={styles.btnAlignment} center middle />
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
  }
}

CameraView.propTypes = {
  onTakePictureSuccess: PropTypes.func.isRequired,
  onTakePictureFail: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  altitude: PropTypes.number.isRequired,
};

const btnSize = 70;
const styles = StyleSheet.create({
  btnAlignment: {
    height: btnSize,
    width: btnSize,
    borderRadius: btnSize / 2,
    backgroundColor: 'gray',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    // backgroundColor: 'green',
    width: Dimensions.get('window').width,
  },
});
