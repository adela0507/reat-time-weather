import { StyleSheet } from "react-native"

export const s=StyleSheet.create({
    clock:{ 
        alignItems:"flex-end",
    },
    city:{
        
    },
    interpretation:{
        alignSelf:"flex-end",
        transform:[{rotate:"-90deg"}],
        fontSize:20,
    },
    temp_box:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"baseline"
    },
    temperature:{
        fontSize:150,
    },
    image:{
        height:90,
        width:90,
    },
    
})