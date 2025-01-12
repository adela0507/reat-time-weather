import { s } from "./Forecasts.style";
import { Txt } from "../../components/TXT/Txt";
import { useRoute } from "@react-navigation/native";
import { Header } from "../../components/Header/Header";
import { ForecastListItem } from "../../components/ForecastListItem/ForecastListItem";
import { View, Button, FlatList, Text, Alert } from "react-native";
import { getWeatherInterpretation, DAYS } from "../../utils/mete-utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

export function Forecasts({}) {
  const [locations, setLocations] = useState([]);
  const { params } = useRoute();

  const clearLocations = async () => {
    try {
      await AsyncStorage.removeItem("locations");
      console.log("Locațiile au fost șterse.");
      setLocations([]); 
    } catch (error) {
      console.error("Eroare la ștergerea locațiilor:", error);
    }
  };

  const getLocations = async () => {
    try {
      const locations = await AsyncStorage.getItem('locations');
      return locations ? JSON.parse(locations) : [];
    } catch (error) {
      console.error('Eroare la obținerea locațiilor:', error);
      return [];
    }
  };

  const addLocation = async (name, temperature) => {
    try {
      const newLocation = { id: Date.now().toString(), name, temperature };

      const storedLocations = await getLocations();
      console.log("Stored locations before add:", storedLocations); 

      const locationExists = storedLocations.some(
        (location) => location.name === name
      );

      if (locationExists) {
        Alert.alert("Locația există deja", `${name} este deja adăugată.`);
        return; 
      }

      storedLocations.push(newLocation); 
      await AsyncStorage.setItem('locations', JSON.stringify(storedLocations)); 
      console.log("Stored locations after add:", storedLocations); 

      setLocations(storedLocations); 
      Alert.alert("Locație adăugată!", `${name} a fost adăugat cu succes.`);

      setTimeout(() => {
        clearLocations(); 
      }, 24 * 60 * 60 * 1000); 
    } catch (error) {
      console.error('Eroare la adăugarea locației:', error);
    }
  };

  const handleAddLocation = async () => {
    const cityName = params.city; 
    const temperature = params.temperature_2m_max[0]; 

    if (!temperature) {
      Alert.alert("Eroare", "Temperatura pentru acest oraș nu este disponibilă.");
      return;
    }

    addLocation(cityName, temperature);
  };

  const renderLocations = () => {
    return (
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Temperatura: {item.temperature}°C</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const forecastList = (
    <View style={{ marginTop: 50 }}>
      {params.time.map((time, index) => {
        const weatherCode = params.weathercode[index];
        const image = getWeatherInterpretation(weatherCode).image;
        const temperature = params.temperature_2m_max[index];
        const date = new Date(time);
        const dayOfTheWeek = DAYS[date.getDay()];
        const formatedDate = date.toLocaleDateString("default", {
          day: "numeric",
          month: "numeric",
        });
        return (
          <ForecastListItem
            key={time}
            image={image}
            day={dayOfTheWeek}
            date={formatedDate}
            temperature={temperature.toFixed(0)}
          />
        );
      })}
    </View>
  );

  return (
    <>
      <Header city={params.city} />
      {forecastList}
      <View>
        <Button title="Adaugă locația acestui oraș" onPress={handleAddLocation} />
      </View>
      {renderLocations()}
    </>
  );
}
