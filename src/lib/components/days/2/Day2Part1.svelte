<script lang="ts">
	import { parse_data, OurPickType } from './day_two';

	export let input_data: string;

	let total_score: number;

	$: if (input_data) {
		const rounds = parse_data(input_data, OurPickType.OurPick);
		total_score = 0;

		rounds.forEach((round) => {
			total_score += round.get_score();
		});
	}
</script>

{#if input_data}
	<p>
		The total score is: {total_score}, assuming the second input is our pick!
	</p>
{:else}
	<p>please select an input file!</p>
{/if}
