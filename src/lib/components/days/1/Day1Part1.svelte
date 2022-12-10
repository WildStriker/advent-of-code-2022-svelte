<script lang="ts">
	import { parse_data } from './day_one';

	export let input_data: string;

	let most_calories: number;

	$: if (input_data) {
		const elfs = parse_data(input_data);
		most_calories = Math.max(...elfs.map((elf) => elf.total_calories));
	}
</script>

{#if input_data}
	<p>
		The most amount of calories is: {most_calories}
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
