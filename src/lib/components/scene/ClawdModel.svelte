<script lang="ts">
	import { T } from '@threlte/core';

//  ▐▛███▜▌
// ▝▜█████▛▘
//   ▘▘ ▝▝

	// Pixel grid: 0 = empty, 1 = body, 2 = eye (18 columns, symmetrical)
	const grid = [
		[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], // head
		[0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],   // eyes

		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],   // body
		[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],

		[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],   // legs
	];

	const cols = grid[0].length;
	const rows = grid.length;
	const cellWidth = 0.8;
	const cellHeight = 1.2;
	const depth = 3;
	const boxWidth = cellWidth;
	const boxHeight = cellHeight;

	// Build pixel list centered at origin
	const pixels: Array<{ x: number; y: number; color: string }> = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const val = grid[r][c];
			if (val === 0) continue;
			pixels.push({
				x: (c - (cols - 1) / 2) * cellWidth,
				y: ((rows - 1) / 2 - r) * cellHeight,
				color: val === 2 ? '#1a1a1a' : '#eb8646'
			});
		}
	}
</script>

<T.Group>
	{#each pixels as pixel}
		<!-- Front face (main color) -->
		<T.Mesh position={[pixel.x, pixel.y, depth / 2 + 0.02]}>
			<T.PlaneGeometry args={[boxWidth, boxHeight]} />
			<T.MeshStandardMaterial
				color={pixel.color}
				roughness={0.4}
				metalness={0.05}
				emissive={pixel.color}
				emissiveIntensity={0.08}
			/>
		</T.Mesh>
		<!-- Darker box for top, sides, and back -->
		<T.Mesh position.x={pixel.x} position.y={pixel.y}>
			<T.BoxGeometry args={[boxWidth, boxHeight, depth]} />
			<T.MeshStandardMaterial
				color={pixel.color === '#1a1a1a' ? '#111111' : '#b5612e'}
				roughness={0.6}
				metalness={0.05}
			/>
		</T.Mesh>
	{/each}
</T.Group>
