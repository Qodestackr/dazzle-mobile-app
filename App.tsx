import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Camera, CameraType } from 'expo-camera';


const App = () => {

  const [hasPermission, setHasPermission] = useState(null);

  const [type, setType] = useState(CameraType.back);


  useEffect(() => {

    (async () => {

      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === 'granted');

    })();

  }, []);


  if (hasPermission === null) {

    return <View />;

  }

  function req() {
    Camera.requestCameraPermissionsAsync()
  }

  if (hasPermission === false) {

    return <View>
      <Text style={styles.textAccess}>
        No access to camera
      </Text>
      <TouchableOpacity onPress={req}><Text>Give Access</Text></TouchableOpacity>
    </View>

  }


  return (

    <View style={styles.container}>

      <Camera style={styles.camera} type={type} ratio="16:9">

        <View style={styles.buttonContainer}>

          <TouchableOpacity

            style={styles.button}

            onPress={() => {

              setType(type === CameraType.back ? CameraType.front : CameraType.back);

            }}>

            <Text style={styles.text}> Flip </Text>

          </TouchableOpacity>

        </View>

      </Camera>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

  camera: {

    flex: 1,

  },

  buttonContainer: {

    flex: 1,

    backgroundColor: 'transparent',

    flexDirection: 'row',

    margin: 20,

  },

  button: {

    flex: 0.1,

    alignSelf: 'flex-end',

    alignItems: 'center',

  },

  text: {

    fontSize: 18,

    color: 'white',

  },
  textAccess: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 400,
    backgroundColor: 'blue',
    padding: 10,
    color: '#fff'
  }

});


export default App;