import { Text } from "react-native";
import { View } from "react-native";
import {s} from "./Home.style";

export  function Home(){

    return <> 
    <View style={s.meteo_basic}> 
        <Text style={s.txt}>Basic info</Text>
        </View>
    <View style={s.searchbar_container}>
        <Text style={s.txt}>Search bar</Text>
        </View>
    <View style={s.meteo_advanced}>
        <Text style={s.txt}>Advanced info</Text>
        </View>
    </>;
}