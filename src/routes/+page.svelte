<script lang="ts">
	import Background3D from '$lib/components/layout/Background3D.svelte';
	import ProfileCard from '$lib/components/ui/ProfileCard.svelte';
	import ScrollHint from '$lib/components/ui/ScrollHint.svelte';
	import SocialLinks from '$lib/components/ui/SocialLinks.svelte';
	import { trackMouse } from '$lib/stores/mouse';
	import { onMount } from 'svelte';

	let reducedMotion = $state(false);
	let scrollHintLeft = $state('50vw');

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handler = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
		};
		mediaQuery.addEventListener('change', handler);

		const updateScrollHintPosition = () => {
			const card = document.querySelector('.profile-card') as HTMLElement | null;
			if (!card) return;
			const rect = card.getBoundingClientRect();
			scrollHintLeft = `${rect.left + rect.width / 2}px`;
		};

		updateScrollHintPosition();
		window.addEventListener('resize', updateScrollHintPosition, { passive: true });

		return () => {
			mediaQuery.removeEventListener('change', handler);
			window.removeEventListener('resize', updateScrollHintPosition);
		};
	});
</script>

<svelte:window onmousemove={trackMouse} />

<svelte:head>
	<!-- Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-134052334-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-134052334-1');
	</script>
</svelte:head>

<div class="page">
	<Background3D {reducedMotion} />

	<main>
		<ProfileCard />
		<div class="scroll-hint-anchor" style:left={scrollHintLeft}>
			<ScrollHint />
		</div>
	</main>

	<SocialLinks />
</div>

<style>
	.page {
		min-height: 100vh;
		position: relative;
		--profile-pane-width: 65%;
	}

	main {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: 1fr;
	}

	main > :global(*) {
		grid-area: 1 / 1;
	}

	.scroll-hint-anchor {
		position: fixed;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		pointer-events: none;
		bottom: 84px;
		z-index: 25;
	}

	.scroll-hint-anchor :global(.scroll-hint) {
		pointer-events: auto;
	}

	/* On mobile, allow scrolling past the 3D area to reach the card */
	@media screen and (max-width: 900px) {
		main {
			padding-bottom: 72px;
		}
	}
</style>
