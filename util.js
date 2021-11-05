function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const CONVERT_TO_BASE = {
    "m": 1,
    "px": 0.1
}

const CONVERT_FROM_BASE = {
    "m": 1,
    "px": 10
}

class Unit {
    constructor (value, unit) {
        this.value = value
        this.unit = unit
    }

    static convert(unitObject, new_unit) {
        const new_value =  unitObject.value *  CONVERT_TO_BASE[unitObject.unit] * CONVERT_FROM_BASE[new_unit]
        return new Unit(new_value, new_unit)
    }
}