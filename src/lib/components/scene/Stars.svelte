<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { mousePosition } from '$lib/stores/mouse';
	import * as THREE from 'three';

	interface Props {
		count?: number;
		radius?: number;
		reducedMotion?: boolean;
	}

	const { count = 800, radius = 30, reducedMotion = false }: Props = $props();

	let points: THREE.Points | undefined = $state();

	const targetOffset = new THREE.Vector2(0, 0);
	const currentOffset = new THREE.Vector2(0, 0);

	const unsubscribe = mousePosition.subscribe((mouse) => {
		targetOffset.set(mouse.x * 0.15, mouse.y * 0.1);
	});

	const { geometry, colors } = (() => {
		const positions = new Float32Array(count * 3);
		const sizes = new Float32Array(count);
		const cols = new Float32Array(count * 3);

		for (let i = 0; i < count; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = radius * (0.4 + Math.random() * 0.6);

			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);

			sizes[i] = 0.5 + Math.random() * 1.5;

			// Random brightness per star (0.3 to 1.0)
			const brightness = 0.3 + Math.random() * 0.7;
			cols[i * 3] = brightness;
			cols[i * 3 + 1] = brightness;
			cols[i * 3 + 2] = brightness;
		}

		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
		geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
		return { geometry: geo, colors: cols };
	})();

	useTask((delta) => {
		if (!points) return;

		// Lerp toward mouse offset
		currentOffset.x += (targetOffset.x - currentOffset.x) * 0.03;
		currentOffset.y += (targetOffset.y - currentOffset.y) * 0.03;

		points.rotation.x = currentOffset.y * 0.3;
		points.rotation.z = currentOffset.x * 0.2;

		if (reducedMotion) return;
		points.rotation.y += delta * 0.005;
	});
</script>

<T.Points bind:ref={points}>
	<T is={geometry} />
	<T.PointsMaterial
		vertexColors={true}
		size={0.1}
		sizeAttenuation={true}
		transparent={true}
		opacity={0.9}
	/>
</T.Points>
