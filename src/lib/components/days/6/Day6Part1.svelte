<script lang="ts">
	import { parse_data } from './day_six';

	export let input_data: string;

	let length: number;

	$: if (input_data) {
		length = parse_data(input_data, 4);
	}
</script>

{#if input_data}
	first packet marker after character {length}
{:else}
	<p>please select an input file!</p>
{/if}
