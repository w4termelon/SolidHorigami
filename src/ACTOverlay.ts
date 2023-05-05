import { CombatDataReceive } from "./types/CombatData";
declare global {
    interface Window { OverlayPluginApi: any; }
}

declare global {
    interface Window { dispatchOverlayEvent: any; }
}
declare global {
    interface Window { __OverlayCallback: (msg: CombatDataReceive) => void; }
}

let subscribers: Record<string, Array<(msg: CombatDataReceive) => void>> = {};
let eventsStarted = false;

const sendMessage = (obj: { call: string, events: Array<string> }, cb: any = undefined) => {
    window.OverlayPluginApi.callHandler(JSON.stringify(obj), cb);
};

function waitForApi() {
    if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) {
        setTimeout(waitForApi, 300);
        return;
    }

    window.__OverlayCallback = processEvent;

}

waitForApi();


function processEvent(msg: CombatDataReceive) {
    if (subscribers[msg.type]) {
        for (let sub of subscribers[msg.type]) sub(msg);
    }
}

window.dispatchOverlayEvent = processEvent;

export function addOverlayListener(event: string, cb: (e: CombatDataReceive) => void) {
    if (eventsStarted && subscribers[event]) {
        console.warn(`A new listener for ${event} has been registered after event transmission has already begun.
  Some events might have been missed and no cached values will be transmitted.
  Please register your listeners before calling startOverlayEvents().`);
    }

    if (subscribers[event] == null) {
        subscribers[event] = new Array<(msg: CombatDataReceive) => void>
    }

    subscribers[event].push(cb);
}

export function removeOverlayListener(event: string, cb: (e: CombatDataReceive) => void) {
    if (subscribers[event]) {
        let list = subscribers[event];
        let pos = list.indexOf(cb);

        if (pos > -1) list.splice(pos, 1);
    }
}

// export function callOverlayHandler(msg) {
//     let p;

//         p = new Promise((resolve) => {
//             sendMessage(msg, (data) => {
//                 resolve(data == null ? null : JSON.parse(data));
//             });
//         });

//     return p;
// }

export function startOverlayEvents() {
    eventsStarted = false;

    sendMessage({
        call: "subscribe",
        events: Object.keys(subscribers),
    });
}
