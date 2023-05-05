import { Component, Show, createSignal } from 'solid-js';
import { createStore } from "solid-js/store";
import styles from './App.module.css';
import * as OverlayPlugin from './ACTOverlay';
import { CombatData, CombatDataReceive } from './types/CombatData';
import CombatantList from './components/CombatantList/CombatantList';
import dummy from '../dummy-encounter.json'

const [combatData, setCombatData] = createStore<CombatData>({ isActive: false, Combatants: [], Encounter: undefined, type: "" });

const App: Component = () => {
  if (import.meta.env.DEV) {
    const combatTestData = dummy as CombatData;
    combatTestData.Combatants = combatTestData.Combatants.sort((n1, n2) => {
      if (parseInt(n1.ENCDPS) < parseInt(n2.ENCDPS)) {
        return 1;
      }

      if (parseInt(n1.ENCDPS) > parseInt(n2.ENCDPS)) {
        return -1;
      }

      return 0;
    })
    setCombatData(combatTestData)
  }
  else {
    OverlayPlugin.addOverlayListener("CombatData", (e: CombatDataReceive) => {
      setCombatData({
        isActive: e.isActive,
        type: e.type,
        Encounter: e.Encounter,
        Combatants: Object.entries(e.Combatant).map(v => (
          v[1]
        )).sort((n1, n2) => {
          if (parseInt(n1.ENCDPS) > parseInt(n2.ENCDPS)) {
            return 1;
          }

          if (parseInt(n1.ENCDPS) < parseInt(n2.ENCDPS)) {
            return -1;
          }

          return 0;
        })
      })
    });
    OverlayPlugin.startOverlayEvents();
  }
  return (
    <div class={styles.App} style={{ "min-width": "1280px" }}>

      < Show when={combatData.isActive} >
        <CombatantList combatants={combatData.Combatants} />
      </Show >

    </div >
  );
};

export default App;

