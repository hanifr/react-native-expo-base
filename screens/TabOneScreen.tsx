// import * as React from 'react';
// import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React ,{useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Image} from 'react-native';

var mqtt = require('@taoqf/react-native-mqtt')
var client  = mqtt.connect('wss://nex.airmode.live:8083/mqtt')

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

client.on('connect', function () {
  client.subscribe('gps', function (err) {
    if (!err) {
    //client.publish('qwazx', 'Hello mqtt111')
    }
  })

})

export default function TabOneScreen() {
  const [GID,setGID] = useState(()=> '')
  const [Lat,setLat] = useState(()=> '')
  const [Lon,setLon] = useState(()=> '')


  useEffect(() => {
    client.on('message', function (topic, message) {
      // message is Buffer
      // const data = JSON.parse(message.toString())
      setGID(JSON.parse(message.toString()).GID)
      setLat(JSON.parse(message.toString()).Lat)
      setLon(JSON.parse(message.toString()).Lon)
      // console.log('hello')
      // const data= message
    })
  }, []); //only re-run the effect if new message comes in
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Text style={styles.data}>GID - {GID}</Text>
        <Text style={styles.data}>Lat - {Lat}</Text>
        <Text style={styles.data}>Lon - {Lon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  droidSafeArea: {
    // flex: 1,
    // backgroundColor: npLBlue,
    paddingTop: Platform.OS === 'android' ? 25 : 0
},
  header:{
    // backgroundColor:'dodgerblue',
    padding:15,
    width:'100%',
    marginBottom:10,
    alignItems: 'center',
  },
  headerText:{
    color:'white',
    alignItems: 'center',
    fontSize:15
  },
  logo:{
    width:280,
    height:90
  }, 
  logoView:{
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
  },
  data:{
    marginTop:20,
    color:'green',
    fontSize:20
  }
});
