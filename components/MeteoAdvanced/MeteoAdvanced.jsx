import { View } from "react-native";
import {s, StyledContainer, StyledField, StyledValue} from "./MeteoAdvanced.style";
import {Txt} from "../TXT/Txt";

export function MeteoAdvanced({sunrise,sunset,windspeed}){
    return <View style={s.container}>
        <StyledContainer>
            <StyledField>{sunrise}</StyledField>
            <StyledValue>Sunrise</StyledValue>
        </StyledContainer>
        <StyledContainer>
            <StyledField>{sunset}</StyledField>
            <StyledValue>Sunset</StyledValue>
        </StyledContainer>
        <StyledContainer>
            <StyledField>{windspeed} km/h</StyledField>
            <StyledValue>Windspeed</StyledValue>
        </StyledContainer>
    </View>
}