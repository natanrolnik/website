<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import MouseParallax from './MouseParallax.svelte';
	import Lighting from './Lighting.svelte';
	import Stars from './Stars.svelte';
	import FloatingObject from './FloatingObject.svelte';
	import CharacterAvatar from './CharacterAvatar.svelte';
	import { floatingObjects } from '$lib/data/content';
	import { interactivity } from '@threlte/extras';

	interface Props {
		tier?: 'high' | 'medium' | 'low';
		reducedMotion?: boolean;
	}

	let { tier = 'high', reducedMotion = false }: Props = $props();

	interactivity();

	const { size } = useThrelte();

	// Detect portrait/mobile from actual canvas dimensions
	const mobile = $derived($size.width < $size.height);

	const shapes: Array<'box' | 'sphere' | 'cylinder' | 'torus'> = ['cylinder', 'sphere', 'box', 'torus'];

	const starCount = $derived(tier === 'high' ? 1200 : tier === 'medium' ? 600 : 300);
</script>

<MouseParallax />
<Lighting />
<Stars count={starCount} {reducedMotion} />

{#each floatingObjects as obj, i}
	<FloatingObject
		position={mobile ? obj.mobilePosition : obj.position}
		color={obj.color}
		rotationSpeed={obj.rotationSpeed}
		floatAmplitude={obj.floatAmplitude}
		floatSpeed={obj.floatSpeed}
		scale={mobile ? obj.scale * (obj.mobileScale ?? 1) : obj.scale}
		shape={shapes[i % shapes.length]}
		modelUrl={obj.modelUrl}
		baseRotationY={obj.baseRotationY}
		wiggleAmplitude={obj.wiggleAmplitude}
		builtinModel={obj.builtinModel}
		delay={i * 0.2}
		{reducedMotion}
	/>
{/each}

<CharacterAvatar {reducedMotion} {mobile} />
