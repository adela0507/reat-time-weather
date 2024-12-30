import { Text } from "react-native";
import { View } from "react-native";
import {s} from "./Home.style";
import {Txt} from "../components/TXT/Txt";
import {MeteoBasic} from "../components/MeteoBasci/MeteoBasic";
import {getWeatherInterpretation} from "../utils/mete-utils";
import {MeteoAdvanced} from "../components/MeteoAdvanced/MeteoAdvanced";

export  function Home({weather, city}){
    const currentWeather=weather.current_weather;
    const currentInterpretation=getWeatherInterpretation(currentWeather.weathercode);

    return <> 
    <View style={s.meteo_basic}> 
        <MeteoBasic 
        dailyWeather={weather.daily}
        city={city}
        interpretation={currentInterpretation}
        temperature={Math.round(currentWeather.temperature)} ></MeteoBasic>
        </View>
    <View style={s.searchbar_container}>
        <Txt style={s.txt}>Search bar</Txt>
        </View>
    <View style={s.meteo_advanced}>
        <MeteoAdvanced 
        sunrise={weather.daily.sunrise[0].split("T")[1]} 
        sunset={weather.daily.sunset[0].split("T")[1]} 
        windspeed={currentWeather.windspeed}/>
        </View>
    </>;
}