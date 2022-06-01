function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const CONVERT_TO_BASE = {
    "m": 1,
    "px": 1/10,
    "s": 1,
    "frames": 1/16,
}

const CONVERT_FROM_BASE = {}
for (const u in CONVERT_TO_BASE) {
    CONVERT_FROM_BASE[u] = 1 / CONVERT_TO_BASE[u]
}
console.log(CONVERT_FROM_BASE)

class Unit {
    constructor (value, unit) {
        this.v = value
        this.u = unit
    }

    static convert(unitObject, new_unit) {
        const new_value =  unitObject.v *  CONVERT_TO_BASE[unitObject.u] * CONVERT_FROM_BASE[new_unit]
        return new Unit(new_value, new_unit)
    }
}