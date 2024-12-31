import { s } from "./SearchBar.style";
import { Txt } from "../TXT/Txt";
import { TextInput } from "react-native";

export function SearchBar({ onSubmit }) {
  return (
    <TextInput
      onSubmitEditing={(e) => {
      
        if (typeof onSubmit === 'function') {
          onSubmit(e.nativeEvent.text); 
        } else {
          console.warn("onSubmit is not a function");
        }
      }}
      style={s.input}
      placeholder="Type a city... Ex: Paris"
    />
  );
}
