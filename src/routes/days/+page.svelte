<script>
	import { days_store } from "$lib/stores/days";
</script>

<ul>
	{#each $days_store as day}
		<li>
			<a href="days/{day.id}">Day {day.id}: {day.name}</a>
		</li>
	{/each}
</ul>