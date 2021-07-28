import { writable } from 'svelte/store';

export const signAttendanceIsOpen = writable(false);
export const confirmModalIsOpen = writable(false);