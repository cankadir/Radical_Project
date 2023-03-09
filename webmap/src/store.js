import { writable } from "svelte/store";

let map = {}
export const count = writable(map);
export const active = writable("");