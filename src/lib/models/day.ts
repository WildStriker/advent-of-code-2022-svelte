import type { Part } from './part';

export interface Day {
	id: string;
	name: string;
	parts: Array<Part>;
}
