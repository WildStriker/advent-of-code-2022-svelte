<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import '../app.postcss';
	import 'flowbite/dist/flowbite.css';
</script>

<NavBar />
<div class="mt-16 md:container md:mx-auto">
	<slot />
</div>
