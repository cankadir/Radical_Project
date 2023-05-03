import { writable } from "svelte/store";

let map = {}
export const LMap = writable(map);

// States Here
export const app_state = writable("world");

export const country = writable('');
export const region = writable('');
export const source = writable('radical');

export const active_event = writable('');
