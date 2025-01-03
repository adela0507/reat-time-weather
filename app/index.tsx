import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import {s} from "./App.style.js";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {Home} from "../pages/Home";
import {Forecasts} from "../pages/Forecasts/Forecasts.jsx"
import backgroundImage from "../assets/images/background.png";
import { useEffect, useState } from "react";
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from "expo-location";
import {MeteoAPI} from "../api/meteo.js"
import {useFonts} from "expo-font";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";

const Stack=createNativeStackNavigator();

import { DefaultTheme } from "@react-navigation/native";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent", 
  },
};


export default function Page() {

  const [coordinate,setCoordinate]=useState();
  const [weather, setWeather]=useState();
  const [city, setCity]=useState();

  const[isFontLoaded]=useFonts({
    "Alata-Regular":require("../assets/fonts/Alata-Regular.ttf")
  })

  useEffect(()=>{
    getUserCoordinates();
  },[])

  useEffect(()=>{
    if(coordinate){
      fetchWeatherByCoords(coordinate);
      fetcCityByCoords(coordinate);
    }
  },[coordinate]);
  
  async function fetchWeatherByCoords(coords) {
    const weatherResp=await MeteoAPI.fetchWeatherByCoords(coords);
    setWeather(weatherResp)
  }
  async function fetcCityByCoords(coords) {
    const cityResp=await MeteoAPI.fetcCityByCoords(coords);
    setCity(cityResp);
  }
  async function fetchCoordsByCity(city) {
    try{
    const coordsResp=await MeteoAPI.fetchCoordsByCity(city);
    setCoordinate(coordsResp);
  }catch(err){
    Alert.alert("Aouch!", err);
  }
  }

  async function getUserCoordinates(){
  const {status}=await requestForegroundPermissionsAsync();
  if(status==="granted"){
    const location=await getCurrentPositionAsync();
    setCoordinate({ lat:location.coords.latitude,lng:location.coords.longitude
    });
  }else {
    setCoordinate({ lat:"48.85", lng:"2.35"});
  }
  }

  return( 
    <NavigationIndependentTree >
    <NavigationContainer theme={navTheme}>
    <ImageBackground imageStyle={s.img} 
    style={s.image_background} 
    source={backgroundImage}>
  <SafeAreaProvider>
    <SafeAreaView style={s.container}>
     {isFontLoaded && weather &&
     <Stack.Navigator 
     screenOptions={{headerShown:false, animation:"fade"}}
     initialRouteName="Home">
      <Stack.Screen name="Home">
       {()=> <Home city={city} weather={weather} onSubmitSearch={fetchCoordsByCity}/>}
        </Stack.Screen>
      <Stack.Screen name="Forecasts" component={Forecasts} />
     </Stack.Navigator>
     }
    </SafeAreaView>
  </SafeAreaProvider>
  </ImageBackground>
  </NavigationContainer>
  </NavigationIndependentTree> 
  );
}