<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { mousePosition } from '$lib/stores/mouse';
	import * as THREE from 'three';

	let camera: THREE.PerspectiveCamera | undefined = $state();

	const { size } = useThrelte();

	const targetPosition = new THREE.Vector3();
	const lerpFactor = 0.05;

	const unsubscribe = mousePosition.subscribe((mouse) => {
		const portrait = $size.width < $size.height;
		// In portrait: pull camera slightly back and reduce parallax to avoid side clipping.
		const baseX = 0;
		const baseY = portrait ? 2.0 : 0;
		const baseZ = portrait ? 9.4 : 8;
		const parallaxX = portrait ? 0.28 : 0.5;
		const parallaxY = portrait ? 0.2 : 0.3;

		targetPosition.set(
			baseX + mouse.x * parallaxX,
			baseY + mouse.y * parallaxY,
			baseZ
		);
	});

	useTask((delta) => {
		if (!camera) return;
		const portrait = $size.width < $size.height;
		const targetFov = portrait ? 50 : 45;
		if (camera.fov !== targetFov) {
			camera.fov = targetFov;
			camera.updateProjectionMatrix();
		}
		camera.position.lerp(targetPosition, lerpFactor);
		camera.lookAt(0, portrait ? 0.55 : 0, 0);
	});
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	position={[0, 0, 8]}
	fov={45}
/>
