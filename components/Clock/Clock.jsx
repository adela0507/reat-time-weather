import {s} from "./Clock.style";
import { Txt } from "../TXT/Txt";
import {nowToHHMM} from "../../utils/date-time";
import { useEffect, useState } from "react";

export function Clock (){

    const [time,setTime]=useState(nowToHHMM());
    useEffect(()=>{
        setInterval(()=>{
setTime(nowToHHMM());
        },1000);
    },[]);

    return <>
    <Txt style={s.time}>{time}</Txt>
    </>
}