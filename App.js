import { ImageBackground, Text, View } from "react-native";
import { s } from "./App.style.js";
import hotBackground from './assets/hot.png';
import coldBackground from './assets/cold.png';
import { InputTemperature } from "./components/inputTemperature/InputTemperature.jsx";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay.jsx";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert.jsx";
import { useState, useEffect } from "react";
import { DEFAULT_TEMPERATURE, DEFAULT_UNITS, UNITS } from "./constant.js";
import { getOppositUnit, convertTemperatureTo, isIceTemperature } from "./services/temperature.services.js";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNITS);
  const oppositeUnit = getOppositUnit(currentUnit);
  const [ currentBackground, setCurrentBackground] = useState();

  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if(!isNaN(temperatureAsFloat)) {
      const isColdBackground = isIceTemperature(inputValue, currentUnit)
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  },[inputValue]);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat) 
    ? ""
    : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
  }

  return (
    <ImageBackground 
      source= {currentBackground} 
      style= {s.container}>
        <View style = {s.workspace}>
          <TemperatureDisplay 
            value={getConvertedTemperature()} 
            unit={oppositeUnit} />
          <View>
          <Text>Temperature</Text>
          </View>
          <InputTemperature 
            onChangeText={setInputValue} 
            defaultValue={DEFAULT_TEMPERATURE}
            unit= {currentUnit} />    
          <View>
          <ButtonConvert
            onPress={() => {
            setCurrentUnit(oppositeUnit);
            }}
            unit={currentUnit} />
        </View>
      </View>
    </ImageBackground>
  );
}

