<script lang="ts">
	import { T } from '@threlte/core';
</script>

<!-- Soft ambient for space feel -->
<T.AmbientLight color="#7fa6cf" intensity={0.78} />

<!-- Sky/ground fill so lower and side faces are not crushed -->
<T.HemisphereLight skyColor="#9ecbff" groundColor="#0a1a24" intensity={0.5} />

<!-- Main directional - cool white from upper-right -->
<T.DirectionalLight
	position={[5, 8, 3]}
	intensity={1.95}
	color="#e8f0ff"
	castShadow={false}
/>

<!-- Front fill light to illuminate models facing the camera -->
<T.DirectionalLight
	position={[0, 2, 6]}
	intensity={0.95}
	color="#f3fbff"
	castShadow={false}
/>

<!-- Tech accents around the floating objects area -->
<T.PointLight position={[3.8, 0.8, 2.8]} intensity={0.55} color="#56c7ff" distance={15} />
<T.PointLight position={[2.6, -1.1, 2.4]} intensity={0.5} color="#ffd27a" distance={13} />

<!-- Neutral front-right fill to keep face tones cleaner -->
<T.PointLight position={[2.9, 0.4, 4.8]} intensity={0.6} color="#f1f6ff" distance={12} />

<!-- Focused neutral key/rim near iPhone so aluminum edges don't read black -->
<T.PointLight position={[1.5, 0.7, 1.9]} intensity={0.75} color="#ffffff" distance={6.5} />

<!-- Keep skin tones readable without turning scene warm -->
<T.PointLight position={[-4.5, 2.2, 4]} intensity={0.45} color="#ffe6cd" distance={12} />

<!-- Lower fill to illuminate objects in the bottom half -->
<T.PointLight position={[1, -1, 5]} intensity={0.8} color="#e5efff" distance={13} />
