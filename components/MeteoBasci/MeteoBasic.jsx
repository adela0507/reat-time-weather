import {s} from "./MeteoBasic.style";
import { Text, View , Image, TouchableOpacity} from "react-native";
import {Txt} from "../TXT/Txt";
import {Clock} from "../Clock/Clock";
import { useNavigation } from "@react-navigation/native";

export function MeteoBasic({temperature, interpretation, city, dailyWeather}){
    const nav=useNavigation();

    return <>
    <View style={s.clock}> 
        <Clock/>
    </View>
    <View style={s.city}>
        <Txt>{city}</Txt>
    </View>
    <View style={s.interpretation}>
        <Txt>{interpretation.label}</Txt>
    </View>
    <View style={s.temp_box}>
        <TouchableOpacity onPress={()=>nav.navigate("Forecasts" ,{city, ...dailyWeather})}>
        <Txt style={s.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={s.image} source={interpretation.image} />
    </View>
    </>
}