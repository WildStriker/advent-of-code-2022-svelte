import type { Day } from '$lib/models/day';
import { type Readable, readable, get } from 'svelte/store';
import Day1Part1 from '$lib/components/days/1/Day1Part1.svelte';
import Day1Part2 from '$lib/components/days/1/Day1Part2.svelte';
import Day2Part1 from '$lib/components/days/2/Day2Part1.svelte';
import Day2Part2 from '$lib/components/days/2/Day2Part2.svelte';
import Day3Part1 from '$lib/components/days/3/Day3Part1.svelte';
import Day3Part2 from '$lib/components/days/3/Day3Part2.svelte';
import Day4Part1 from '$lib/components/days/4/Day4Part1.svelte';
import Day4Part2 from '$lib/components/days/4/Day4Part2.svelte';
import Day5Part1 from '$lib/components/days/5/Day5Part1.svelte';
import Day5Part2 from '$lib/components/days/5/Day5Part2.svelte';
import Day6Part1 from '$lib/components/days/6/Day6Part1.svelte';
import Day6Part2 from '$lib/components/days/6/Day6Part2.svelte';

function create_days_store() {
	let days: Day[] = [
		{
			id: '1',
			name: 'Calorie Counting',
			parts: [
				{ id: '1', component: Day1Part1 },
				{ id: '2', component: Day1Part2 }
			]
		},
		{
			id: '2',
			name: 'Rock Paper Scissors',
			parts: [
				{ id: '1', component: Day2Part1 },
				{ id: '2', component: Day2Part2 }
			]
		},
		{
			id: '3',
			name: 'Rucksack Reorganization',
			parts: [
				{ id: '1', component: Day3Part1 },
				{ id: '2', component: Day3Part2 }
			]
		},
		{
			id: '4',
			name: 'Camp Cleanup',
			parts: [
				{ id: '1', component: Day4Part1 },
				{ id: '2', component: Day4Part2 }
			]
		},
		{
			id: '5',
			name: 'Supply Stacks',
			parts: [
				{ id: '1', component: Day5Part1 },
				{ id: '2', component: Day5Part2 }
			]
		},
		{
			id: '6',
			name: 'Tuning Trouble',
			parts: [
				{ id: '1', component: Day6Part1 },
				{ id: '2', component: Day6Part2 }
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
