// import * as React from 'react';
// import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React ,{useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Image} from 'react-native';

var mqtt = require('@taoqf/react-native-mqtt')
var client  = mqtt.connect('wss://tron.airmode.live:8083/mqtt')

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

client.on('connect', function () {
  client.subscribe('station1', function (err) {
    if (!err) {
    //client.publish('qwazx', 'Hello mqtt111')
    }
  })

})

export default function TabOneScreen() {
  const [O2,setO2] = useState(()=> '')
  const [LEL,setLEL] = useState(()=> '')
  const [VOC,setVOC] = useState(()=> '')


  useEffect(() => {
    client.on('message', function (topic, message) {
      // message is Buffer
      // const data = JSON.parse(message.toString())
      setO2(JSON.parse(message.toString()).O2)
      setLEL(JSON.parse(message.toString()).LEL)
      setVOC(JSON.parse(message.toString()).VOC)
      // console.log('hello')
      // const data= message
    })
  }, []); //only re-run the effect if new message comes in
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Text style={styles.data}>O2 - {O2}</Text>
        <Text style={styles.data}>LEL - {LEL}</Text>
        <Text style={styles.data}>VOC - {VOC}</Text>
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
