import type { Day } from '$lib/models/day';
import { type Readable, readable, get } from 'svelte/store';
import Day1Part1 from '$lib/components/days/1/Day1Part1.svelte';
import Day1Part2 from '$lib/components/days/1/Day1Part2.svelte';

function create_days_store() {
	let days: Day[] = [
		{
			id: '1',
			name: 'Calorie Counting',
			parts: [
				{ id: '1', component: Day1Part1 },
				{ id: '2', component: Day1Part2 }
			]
		}
	];
	const { subscribe }: Readable<Day[]> = readable(days);

	return {
		subscribe,
		get: (id: string) => {
			let day = get({ subscribe }).find((day) => day.id === id);
			return day;
		}
	};
}

export const days_store = create_days_store();
