<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	interface Props {
		reducedMotion?: boolean;
	}

	let { reducedMotion = false }: Props = $props();

	let tier: 'high' | 'medium' | 'low' = $state('high');
	let mounted = $state(false);
	let SceneModule: typeof import('$lib/components/scene/SceneCanvas.svelte') | null = $state(null);

	onMount(async () => {
		const cores = navigator.hardwareConcurrency || 2;
		const width = document.documentElement.clientWidth;

		if (width < 768) {
			tier = 'low';
		} else if (cores < 4 || width < 1024) {
			tier = 'medium';
		} else {
			tier = 'high';
		}

		if (!reducedMotion) {
			SceneModule = await import('$lib/components/scene/SceneCanvas.svelte');
		}

		mounted = true;
	});
</script>

<div class="background-3d">
	<!-- CSS gradient fallback renders immediately -->
	<div class="gradient-fallback"></div>

	{#if browser && mounted && SceneModule}
		<div class="canvas-wrapper">
			<SceneModule.default {tier} {reducedMotion} />
		</div>
	{/if}
</div>

<style>
	.background-3d {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.gradient-fallback {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 30% 50%, #0c1a35 0%, #071224 50%, #030a18 100%);
	}

	.canvas-wrapper {
		position: absolute;
		inset: 0;
	}
</style>
