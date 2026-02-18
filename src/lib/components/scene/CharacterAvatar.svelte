<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { MeshoptDecoder } from 'meshoptimizer';
	import * as THREE from 'three';

	interface Props {
		reducedMotion?: boolean;
		mobile?: boolean;
	}

	let { reducedMotion = false, mobile = false }: Props = $props();

	let group: THREE.Group | undefined = $state();
	let elapsed = 0;
	let entranceProgress = $state(0);
	let pointsGeometry: THREE.BufferGeometry | undefined = $state();
	let basePositions: Float32Array | undefined = undefined;
	let baseColors: Float32Array | undefined = undefined;
	let offsets: Float32Array | undefined = undefined;
	let pointsMinY = 0;
	let pointsMaxY = 0;
	let modelScene: THREE.Group | undefined = $state();

	const gltf = useGltf('/models/Natan.glb', { meshoptDecoder: MeshoptDecoder });
	const maxPoints = 35000;

	// Transition timing
	const revealStart = 1.5; // seconds before dots start fading
	const revealDuration = 14.0; // seconds for the crossfade

	const pointsMaterial = new THREE.PointsMaterial({
		color: '#ffffff',
		vertexColors: true,
		size: 0.018,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.85,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	// Extract vertices and prepare both the point cloud and the real model
	$effect(() => {
		const gltfData = $gltf;
		if (!gltfData) return;

		// Point cloud
		const rawPositions: number[] = [];
		const pointScene = gltfData.scene.clone();

		pointScene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.geometry) {
				const geo = child.geometry;
				const pos = geo.attributes.position;
				if (!pos) return;

				child.updateWorldMatrix(true, false);
				const vertex = new THREE.Vector3();
				for (let i = 0; i < pos.count; i++) {
					vertex.set(pos.getX(i), pos.getY(i), pos.getZ(i));
					vertex.applyMatrix4(child.matrixWorld);
					rawPositions.push(vertex.x, vertex.y, vertex.z);
				}
			}
		});

		const totalVertices = rawPositions.length / 3;
		const step = Math.max(1, Math.floor(totalVertices / maxPoints));
		const sampled: number[] = [];
		for (let i = 0; i < totalVertices; i += step) {
			sampled.push(
				rawPositions[i * 3],
				rawPositions[i * 3 + 1],
				rawPositions[i * 3 + 2]
			);
		}

		if (sampled.length > 0) {
			basePositions = new Float32Array(sampled);
			offsets = new Float32Array(sampled.length / 3 * 4);
			for (let i = 0; i < offsets.length; i++) {
				offsets[i] = Math.random() * Math.PI * 2;
			}

			pointsMinY = Infinity;
			pointsMaxY = -Infinity;
			for (let i = 0; i < sampled.length / 3; i++) {
				const y = sampled[i * 3 + 1];
				if (y < pointsMinY) pointsMinY = y;
				if (y > pointsMaxY) pointsMaxY = y;
			}

			const geo = new THREE.BufferGeometry();
			geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(sampled), 3));
			const colors = new Float32Array((sampled.length / 3) * 3);
			const techBlue = new THREE.Color('#29b8ff');
			const techGreen = new THREE.Color('#00f5a4');
			const techCyan = new THREE.Color('#63ffe2');
			for (let i = 0; i < sampled.length / 3; i++) {
				const base = (Math.random() < 0.5 ? techBlue : techGreen).clone();
				const mixed = base.lerp(techCyan, Math.random() * 0.35);
				const brightness = 0.8 + Math.random() * 0.24;
				colors[i * 3] = mixed.r * brightness;
				colors[i * 3 + 1] = mixed.g * brightness;
				colors[i * 3 + 2] = mixed.b * brightness;
			}
			baseColors = new Float32Array(colors);
			geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
			pointsGeometry = geo;
		}

		// Real model - start fully transparent
		const realScene = gltfData.scene.clone();
		realScene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material) {
				const mat = child.material as THREE.MeshStandardMaterial;
				mat.transparent = true;
				mat.opacity = 0;
			}
		});
		modelScene = realScene;
	});

	useTask((delta) => {
		if (!group) return;
		elapsed += delta;

		// Reveal transition progress (0 = all dots, 1 = all model)
		const revealT = Math.max(0, Math.min(1, (elapsed - revealStart) / revealDuration));
		const revealEased = revealT * revealT * (3 - 2 * revealT); // smoothstep

		// Moving scan-line: only points near the line "agitate" for a tech reveal.
		if (pointsGeometry && basePositions && baseColors && offsets) {
			const pos = pointsGeometry.attributes.position as THREE.BufferAttribute;
			const colors = pointsGeometry.attributes.color as THREE.BufferAttribute;
			const scanT = (Math.sin(elapsed * 2.1) + 1) * 0.5;
			const scanY = THREE.MathUtils.lerp(pointsMinY, pointsMaxY, scanT);
			const bandHalfWidth = 0.14;
			const baseJitter = 0.0014 * (1 - revealEased * 0.35);
			const bandJitter = 0.0085 * (1 - revealEased * 0.5);
			const highlight = new THREE.Color('#7dffef');

			for (let i = 0; i < basePositions.length / 3; i++) {
				const bx = basePositions[i * 3];
				const by = basePositions[i * 3 + 1];
				const bz = basePositions[i * 3 + 2];

				const bandWeight = Math.max(0, 1 - Math.abs(by - scanY) / bandHalfWidth);
				const phaseA = offsets[i * 4];
				const phaseB = offsets[i * 4 + 1];
				const jitter = baseJitter + bandJitter * bandWeight;

				pos.setXYZ(
					i,
					bx + Math.sin(elapsed * 16 + phaseA) * jitter,
					by + Math.cos(elapsed * 14 + phaseB) * jitter * 0.7,
					bz + Math.sin(elapsed * 12 + phaseA) * jitter
				);

				const br = baseColors[i * 3];
				const bg = baseColors[i * 3 + 1];
				const bb = baseColors[i * 3 + 2];
				const colorBoost = bandWeight * 0.62;
				colors.setXYZ(
					i,
					THREE.MathUtils.lerp(br, highlight.r, colorBoost),
					THREE.MathUtils.lerp(bg, highlight.g, colorBoost),
					THREE.MathUtils.lerp(bb, highlight.b, colorBoost)
				);
			}
			pos.needsUpdate = true;
			colors.needsUpdate = true;

			const brightnessFalloff = Math.pow(1 - revealEased, 1.65);
			pointsMaterial.opacity = Math.max(0, 0.9 * brightnessFalloff);
			pointsMaterial.size = 0.0165;
		}

		// Fade in real model
		if (modelScene) {
			modelScene.traverse((child) => {
				if (child instanceof THREE.Mesh && child.material) {
					const mat = child.material as THREE.MeshStandardMaterial;
					mat.opacity = revealEased;
					// Once fully revealed, disable transparency for proper rendering
					if (revealEased >= 1) {
						mat.transparent = false;
					}
				}
			});
		}

		// Entrance
		if (entranceProgress < 1) {
			const t = Math.max(0, elapsed - 0.5);
			entranceProgress = Math.min(1, t / 1.0);
		}

		const eased = 1 - Math.pow(1 - entranceProgress, 3);
		const baseScale = mobile ? 1.24 : 1.7;
		group.scale.setScalar(eased * baseScale);

		// Update position based on mobile
		const baseY = mobile ? 1.18 : -1.2;
		group.position.x = mobile ? 0.12 : 2.3;
		group.position.z = 2.0;

		if (reducedMotion) {
			group.position.y = baseY;
			return;
		}

		const initialRotationPhase = -Math.PI / 2;
		group.rotation.y = -Math.PI / 2 + Math.sin(elapsed * 0.3 + initialRotationPhase) * 0.8;
		group.position.y = baseY + Math.sin(elapsed * 0.8) * 0.03;
	});
</script>

<T.Group bind:ref={group} position={[0, 0, 2.0]} scale={0}>
	{#if pointsGeometry}
		<T.Points>
			<T is={pointsGeometry} />
			<T is={pointsMaterial} />
		</T.Points>
	{/if}
	{#if modelScene}
		<T is={modelScene} />
	{/if}
</T.Group>
