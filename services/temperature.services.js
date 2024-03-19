import { UNITS } from "../constant"

function getOppositUnit(unit) {
    return unit === UNITS.CELSIUS ? UNITS.FAHRENHEIT : UNITS.CELSIUS;
}

function convertTemperatureTo(unit, value) {
    if(unit === UNITS.CELSIUS) {
        return (value -32 ) / 1.8;
    }else {
        return value * 1.8 + 32;
    }
}

function isIceTemperature (value, unit) {
    if(unit === UNITS.CELSIUS) {
        return value <= 0;
    } else {
        return value <= 32;
    }
}
export { getOppositUnit, convertTemperatureTo, isIceTemperature}