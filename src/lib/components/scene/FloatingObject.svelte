<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { MeshoptDecoder } from 'meshoptimizer';
	import * as THREE from 'three';
	import ClawdModel from './ClawdModel.svelte';

	interface Props {
		position?: [number, number, number];
		color?: string;
		rotationSpeed?: number;
		floatAmplitude?: number;
		floatSpeed?: number;
		scale?: number;
		shape?: 'box' | 'sphere' | 'cylinder' | 'torus';
		delay?: number;
		reducedMotion?: boolean;
		modelUrl?: string;
		baseRotationY?: number;
		wiggleAmplitude?: number;
		builtinModel?: string;
	}

	let {
		position = [0, 0, 0],
		color = '#ffffff',
		rotationSpeed = 0.3,
		floatAmplitude = 0.15,
		floatSpeed = 1.0,
		scale = 1,
		shape = 'box',
		delay = 0,
		reducedMotion = false,
		modelUrl,
		baseRotationY = 0,
		wiggleAmplitude = 0.12,
		builtinModel
	}: Props = $props();

	let group: THREE.Group | undefined = $state();
	let hovered = $state(false);
	let elapsed = 0;
	let entranceProgress = $state(0);
	const phaseOffset = Math.random() * Math.PI * 2;

	const hasModel = $derived(!!modelUrl);
	const hasBuiltin = $derived(!!builtinModel);
	const isModel = $derived(hasModel || hasBuiltin);
	// svelte-ignore state_referenced_locally
	const gltf = modelUrl ? useGltf(modelUrl, { meshoptDecoder: MeshoptDecoder }) : undefined;

	useTask((delta) => {
		if (!group) return;
		elapsed += delta;

		// Entrance animation
		if (entranceProgress < 1) {
			const t = Math.max(0, elapsed - delay);
			entranceProgress = Math.min(1, t / 0.8);
		}

		const eased = 1 - Math.pow(1 - entranceProgress, 3);
		const currentScale = scale * eased * (hovered ? 1.15 : 1);
		group.scale.setScalar(currentScale);

		if (reducedMotion) return;

		// Float
		group.position.y = position[1] + Math.sin(elapsed * floatSpeed + phaseOffset) * floatAmplitude;

		// Rotate: continuous for primitives, gentle wiggle for models
		if (isModel) {
			group.rotation.y = baseRotationY + Math.sin(elapsed * rotationSpeed * 2) * wiggleAmplitude;
		} else {
			group.rotation.y += rotationSpeed * delta;
		}
	});
</script>

<T.Group
	bind:ref={group}
	position.x={position[0]}
	position.y={position[1]}
	position.z={position[2]}
	scale={0}
	onpointerenter={() => (hovered = true)}
	onpointerleave={() => (hovered = false)}
>
	{#if hasBuiltin && builtinModel === 'clawd'}
		<ClawdModel />
	{:else if gltf && $gltf}
		<T is={$gltf.scene.clone()} />
	{:else if !isModel}
		{#if shape === 'box'}
			<T.Mesh>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshStandardMaterial
					color={hovered ? '#ffffff' : color}
					roughness={0.3}
					metalness={0.6}
					emissive={hovered ? color : '#000000'}
					emissiveIntensity={hovered ? 0.3 : 0}
				/>
			</T.Mesh>
		{:else if shape === 'sphere'}
			<T.Mesh>
				<T.SphereGeometry args={[0.6, 32, 32]} />
				<T.MeshStandardMaterial
					color={hovered ? '#ffffff' : color}
					roughness={0.2}
					metalness={0.7}
					emissive={hovered ? color : '#000000'}
					emissiveIntensity={hovered ? 0.3 : 0}
				/>
			</T.Mesh>
		{:else if shape === 'cylinder'}
			<T.Mesh>
				<T.CylinderGeometry args={[0.4, 0.4, 1.4, 32]} />
				<T.MeshStandardMaterial
					color={hovered ? '#ffffff' : color}
					roughness={0.3}
					metalness={0.5}
					emissive={hovered ? color : '#000000'}
					emissiveIntensity={hovered ? 0.3 : 0}
				/>
			</T.Mesh>
		{:else if shape === 'torus'}
			<T.Mesh>
				<T.TorusGeometry args={[0.5, 0.2, 16, 32]} />
				<T.MeshStandardMaterial
					color={hovered ? '#ffffff' : color}
					roughness={0.2}
					metalness={0.8}
					emissive={hovered ? color : '#000000'}
					emissiveIntensity={hovered ? 0.3 : 0}
				/>
			</T.Mesh>
		{/if}
	{/if}
</T.Group>
