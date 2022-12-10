import type { ComponentType } from 'svelte';

export interface Part {
	id: string;
	component: ComponentType;
}
