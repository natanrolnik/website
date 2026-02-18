import { writable } from 'svelte/store';

/** Normalized mouse position from -1 to 1 */
export const mousePosition = writable({ x: 0, y: 0 });

export function trackMouse(event: MouseEvent) {
	mousePosition.set({
		x: (event.clientX / window.innerWidth) * 2 - 1,
		y: -(event.clientY / window.innerHeight) * 2 + 1
	});
}
