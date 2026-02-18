<script lang="ts">
	import { onMount } from 'svelte';

	let show = $state(false);

	onMount(() => {
		const showTimer = setTimeout(() => {
			if (window.scrollY <= 10) {
				show = true;
			}
		}, 3000);

		const handleScroll = () => {
			if (window.scrollY > 10) {
				show = false;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			clearTimeout(showTimer);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if show}
	<div class="scroll-hint" aria-hidden="true">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</div>
{/if}

<style>
	.scroll-hint {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.7);
		z-index: 25;
		animation: fadeInBounce 0.6s ease-out forwards, bounce 2s ease-in-out 0.6s infinite;
	}

	.scroll-hint svg {
		width: 22px;
		height: 22px;
	}

	@keyframes fadeInBounce {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6px);
		}
	}

	@media screen and (max-width: 900px) {
		.scroll-hint {
			display: none;
		}
	}
</style>
