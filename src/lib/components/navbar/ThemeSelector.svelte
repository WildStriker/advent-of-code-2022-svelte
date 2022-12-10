<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	let hidden = true;
	let themes = [
		{
			theme: 'Light',
			icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
		},
		{
			theme: 'Dark',
			icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
		},
		{
			theme: 'System',
			icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		}
	];

	let theme_store: Writable<string>;
	onMount(() => {
		theme_store = writable(localStorage.getItem('theme') || 'System');
		theme_store.subscribe((value) => {
			localStorage.setItem('theme', value);

			if (
				value === 'Dark' ||
				(value === 'System' && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	});

	function toggle() {
		hidden = !hidden;
	}

	function updateTheme(theme: string) {
		theme_store.set(theme);
		hidden = true;
	}
</script>

<svelte:head />

<div class="relative">
	<button
		class="rounded-full p-1 text-sky-500
		     hover:bg-sky-100
	         dark:hover:bg-gray-600"
		on:click={toggle}
	>
		{#each themes as { theme, icon }}
			{#if theme === $theme_store}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d={icon} />
				</svg>
			{/if}
		{/each}
	</button>
	<ul
		class="absolute top-full right-0 z-50 rounded-lg
             bg-white
               py-1 shadow-md
             dark:bg-gray-800 dark:text-gray-300"
		class:hidden
	>
		{#each themes as { theme, icon }}
			<li
				role="presentation"
				on:click={() => updateTheme(theme)}
				class="{$theme_store === theme ? 'text-sky-500' : ''}
                       flex cursor-pointer flex-nowrap
                       rounded px-2 py-1 
					 hover:bg-sky-100
                     dark:hover:bg-gray-600"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d={icon} />
				</svg>
				{theme}
			</li>
		{/each}
	</ul>
</div>
