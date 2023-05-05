import { Combatant } from "./Combatant";
import { Encounter } from "./Encounter";

export type CombatData = {
    type: string;
    Encounter: Encounter | undefined;
    Combatants: Combatant[];
    isActive: boolean;
};

export type CombatDataReceive = {
    type: string;
    Encounter: Encounter;
    Combatant: Combatants;
    isActive: boolean;
};

// export interface Combatants {
//     [key: string]: Combatant
// }

export type Combatants = Record<string, Combatant>;


