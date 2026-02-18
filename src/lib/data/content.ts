export const bio = {
	name: 'Natan',
	greeting: "Hi. I'm Natan.",
	gravatarUrl:
		'https://gravatar.com/avatar/8b4c0cfb0d4e39a482964f89f39eaac4861d3e6df358917d5e8121e5db3e65c7?s=400',
	paragraphs: [
		{
			text: "I'm a programmer, mostly focused on iOS development and Apple platforms, working at ",
			link: { url: 'https://www.monday.com/', label: 'monday.com' },
			suffix:
				'. Although I learned how to program in Objective-C (and I love it!), coding in Swift is much more fun!'
		},
		{
			text: "I also have experience with server-side applications in Node.js, Vapor and Hummingbird (Swift), web development (Svelte & SvelteKit, React, Vue and Rails), and did some basic DevOps engineering, mostly with Docker and AWS. These technologies I learned in my side projects."
		},
		{
			text: "Oh, and of course, agentic engineering empowers me to easily build on different tools and languages, such as this website with Threlte (Three.js + Svelte)."
		},
		{
			text: 'As someone passionate about design and interacting with people, every pixel and every person is important.'
		},
		{
			text: "I grew up in São Paulo 🇧🇷, where I got my BSc in Pharmacy and Biochemistry at Universidade de São Paulo. In the end of my graduation, I decided to do my first iPhone app – it was a huge challenge! Then, I did some other apps, and discovered a new passion in my life."
		}
	],
	links: {
		swiftToolkit: { url: 'https://SwiftToolkit.dev/', label: 'SwiftToolkit.dev' },
		kodeco: { url: 'https://www.kodeco.com/u/natanrolnik', label: 'Kodeco.com' },
		blog: { url: 'https://blog.natanrolnik.me/', label: 'my blog' }
	}
};

export const socialLinks = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/natanrolnik/',
		icon: 'linkedin'
	},
	{
		name: 'GitHub',
		url: 'https://www.github.com/natanrolnik',
		icon: 'github'
	},
	{
		name: 'Twitter',
		url: 'https://www.twitter.com/natanrolnik',
		icon: 'twitter'
	},
	{
		name: 'E-mail',
		url: '/api/mail',
		icon: 'email'
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/natanrolnik',
		icon: 'instagram'
	},
	{
		name: 'YouTube',
		url: 'https://www.youtube.com/@swifttoolkit',
		icon: 'youtube'
	}
];

export interface FloatingObjectConfig {
	name: string;
	position: [number, number, number];
	mobilePosition: [number, number, number];
	mobileScale?: number;
	scale: number;
	rotationSpeed: number;
	floatAmplitude: number;
	floatSpeed: number;
	color: string;
	modelUrl?: string;
	baseRotationY?: number;
	wiggleAmplitude?: number;
	builtinModel?: string;
}

// Desktop: objects on the right side. Mobile: centered, spread vertically above the card.
export const floatingObjects: FloatingObjectConfig[] = [
	{
		name: 'iPhone',
		position: [1.7, 0.4, 0],
		mobilePosition: [-1.35, 1.6, -0.35],
		mobileScale: 0.74,
		scale: 0.5,
		rotationSpeed: 0.15,
		floatAmplitude: 0.06,
		floatSpeed: 0.6,
		color: '#e0e0e0',
		modelUrl: '/models/iPhone.glb',
		baseRotationY: -Math.PI / 2,
		wiggleAmplitude: 0.48
	},
	{
		name: 'Swift',
		position: [3.9, 0.8, -1],
		mobilePosition: [1.15, 2.8, -1.0],
		mobileScale: 0.68,
		scale: 1.2,
		rotationSpeed: 0.25,
		floatAmplitude: 0.12,
		floatSpeed: 0.5,
		color: '#FF6B35',
		modelUrl: '/models/Swift.glb',
		baseRotationY: -Math.PI / 2
	},
	{
		name: 'XcodeHammer',
		position: [2.8, 1.4, -0.5],
		mobilePosition: [0.0, 3.55, -0.9],
		mobileScale: 0.72,
		scale: 1.0,
		rotationSpeed: 0.15,
		floatAmplitude: 0.06,
		floatSpeed: 0.45,
		color: '#4a90d9',
		modelUrl: '/models/XcodeHammer.glb',
		baseRotationY: -Math.PI / 2
	},
	{
		name: 'Macintosh',
		position: [4.2, -1.6, -0.5],
		mobilePosition: [1.55, 1.58, -0.55],
		mobileScale: 0.66,
		scale: 0.036,
		rotationSpeed: 0.2,
		floatAmplitude: 0.07,
		floatSpeed: 0.55,
		color: '#d4c5a9',
		modelUrl: '/models/Macintosh.glb',
		baseRotationY: Math.PI
	},
	{
		name: 'Clawd',
		position: [1.2, -1.4, 1],
		mobilePosition: [-0.9, 2.55, 0.85],
		mobileScale: 0.78,
		scale: 0.11,
		rotationSpeed: 0.15,
		floatAmplitude: 0.06,
		floatSpeed: 0.7,
		color: '#E8A07A',
		builtinModel: 'clawd',
		wiggleAmplitude: 0.13
	}
];
