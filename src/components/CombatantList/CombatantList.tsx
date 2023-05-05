import { Component, For } from "solid-js"
import { Combatant } from "../../types/Combatant";
import { Stack } from "@suid/material";
import CombatantView from "./CombatantView";

const CombatantList: Component<{ combatants: Combatant[] }> = (props) => {
    console.log(props.combatants.length)
    return (
        <div>
            <Stack direction={"row"} justifyContent="center" paddingRight={'22px'}>
                <For each={props.combatants}>
                    {(combatant, i) => <CombatantView combatant={combatant} />}
                </For>
            </Stack>
        </div>
    );
}

export default CombatantList;