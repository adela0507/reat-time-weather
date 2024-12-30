import { View,Image } from "react-native"
import { Txt } from "../TXT/Txt"
import {s} from "./ForecastListItem.style"

export function ForecastListItem({image,day,date,temperature}){
    return <> 
    <View style={s.container}>
       <Image style={s.img} source={image} />
       <Txt style={s.day}>{day}</Txt>
       <Txt style={s.date}>{date}</Txt>
       <Txt style={s.temp}>{temperature}°</Txt>
    </View>
    </>
}