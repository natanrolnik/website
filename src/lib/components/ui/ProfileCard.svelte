<script lang="ts">
	import { bio } from '$lib/data/content';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		requestAnimationFrame(() => {
			visible = true;
		});
	});
</script>

<div class="card-container" class:visible>
	<div class="profile-card">
		<img
			src={bio.gravatarUrl}
			alt="Natan Rolnik"
			class="avatar"
			loading="eager"
		/>

		<h1 class="greeting">{bio.greeting}</h1>

		{#each bio.paragraphs as paragraph}
			<p class="bio-text">
				{paragraph.text}{#if paragraph.link}<a
						href={paragraph.link.url}
						target="_blank"
						rel="noopener noreferrer">{paragraph.link.label}</a
					>{/if}{#if paragraph.suffix}{paragraph.suffix}{/if}
			</p>
		{/each}

		<div class="bottom-links">
			You can read my website focused on Tooling with Swift,
			<a href={bio.links.swiftToolkit.url} target="_blank" rel="noopener noreferrer"
				>{bio.links.swiftToolkit.label}</a
			>,
			<br />
			my previous articles at
			<a href={bio.links.kodeco.url} target="_blank" rel="noopener noreferrer"
				>{bio.links.kodeco.label}</a
			>,
			<br />
			<a href={bio.links.blog.url} target="_blank" rel="noopener noreferrer"
				>{bio.links.blog.label}</a
			>, or find me in the links below.
		</div>
	</div>
</div>

<style>
	.card-container {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: calc(100vh - 72px);
		padding: 40px 60px 100px;
		width: var(--profile-pane-width, 65%);
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	.card-container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.profile-card {
		background: rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 40px;
		max-width: 660px;
		width: 100%;
		text-align: center;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.avatar {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}

	.greeting {
		margin-top: 16px;
		color: rgba(255, 255, 255, 0.95);
		font-weight: 600;
		font-size: 2rem;
	}

	.bio-text {
		color: rgba(255, 255, 255, 0.8);
		margin-top: 8px;
		font-weight: 400;
		font-size: 1.05rem;
		text-align: justify;
		line-height: 1.6;
	}

	.bio-text a,
	.bottom-links a {
		color: #6dd5ed;
		font-weight: 600;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.bio-text a:hover,
	.bottom-links a:hover {
		color: #9be5f5;
		text-decoration: underline;
	}

	.bottom-links {
		margin-top: 16px;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 500;
		font-size: 1.1rem;
		line-height: 1.6;
	}

	@media screen and (max-width: 900px) {
		.card-container {
			width: 100%;
			padding: 0 20px;
			padding-top: 60vh;
			padding-bottom: 20px;
			min-height: auto;
			justify-content: center;
		}

		.profile-card {
			max-width: 100%;
		}
	}

	@media screen and (max-width: 600px) {
		.card-container {
			padding-top: 55vh;
			padding-left: 16px;
			padding-right: 16px;
		}

		.profile-card {
			padding: 24px 20px;
		}

		.avatar {
			width: 140px;
			height: 140px;
		}

		.greeting {
			font-size: 1.5rem;
		}

		.bio-text {
			text-align: left;
			margin-top: 12px;
			font-size: 1rem;
		}

		.bottom-links {
			font-size: 1rem;
			padding-bottom: 20px;
		}
	}
</style>
