import {StyleSheet, View} from "react-native";
import { Txt } from "../TXT/Txt";

export const s=StyleSheet.create({
    container:{
        flexDirection:"row",
        flex:1,
        alignItems:"center",
        justifyContent:"space-evenly",
        borderColor:"white",
        borderRadius:15,
        borderWidth:2,
        backgroundColor:"#00000052",
    },

})

export function StyledContainer({children}){
    return <View style={{alignItems:"center"}}>
        {children}
    </View>
};

export function StyledField({children}){
    return <Txt style={{fontSize:15}}>
        {children}
    </Txt>
};

export function StyledValue({children}){
    return <Txt style={{fontSize:20}}>
        {children}
    </Txt>
};