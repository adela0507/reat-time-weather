import {s} from "./MeteoBasic.style";
import { Text, View , Image} from "react-native";
import {Txt} from "../TXT/Txt";

export function MeteoBasic({temperature, interpretation}){
    return <>
    <View style={s.clock}> 
        <Txt>Clock</Txt>
    </View>
    <View style={s.city}>
        <Txt>City</Txt>
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