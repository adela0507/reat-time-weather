import {s} from "./MeteoBasic.style";
import { Text, View , Image} from "react-native";
import {Txt} from "../TXT/Txt";
import {Clock} from "../Clock/Clock";

export function MeteoBasic({temperature, interpretation, city}){
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
        <Txt style={s.temperature}>{temperature}°</Txt>
        <Image style={s.image} source={interpretation.image} />
    </View>
    </>
}