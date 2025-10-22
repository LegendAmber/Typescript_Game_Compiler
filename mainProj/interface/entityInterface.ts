import {terrain} from "./worldInterface.js";
interface entityWildcard {
    type: string;
    booleanProp: boolean;
}
interface entity{
    id: string;
    health: number;
    position: {
        x: number;
        y: number;
    };
    wildcard?: entityWildcard;
    envCondition: terrain;
    envRate: number;
    dmgOut: number;
    critChance: number;
    critMultiplier: number;
    dmgResist: number;
}
export {entity, entityWildcard};