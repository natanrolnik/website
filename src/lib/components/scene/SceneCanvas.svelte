<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	interface Props {
		tier?: 'high' | 'medium' | 'low';
		reducedMotion?: boolean;
	}

	let { tier = 'high', reducedMotion = false }: Props = $props();
</script>

<Canvas>
	<Scene {tier} {reducedMotion} />
</Canvas>
