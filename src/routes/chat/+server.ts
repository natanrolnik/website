import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const DESTINATION = 'https://riverside.com/studio/meetings-CZlL1?t=9d4818e599d366ff77a7';

const OG_TITLE = "Natan's Chat Room";
const OG_DESCRIPTION = "Chat with Natan on Riverside.fm";
const OG_IMAGE = 'https://natanrolnik.me/pic-large';
const OG_URL = 'https://natanrolnik.me/chat';

const CRAWLER_UA = /facebookexternalhit|facebookcatalog|meta-externalagent|twitterbot|slackbot|linkedinbot|whatsapp|telegrambot|discordbot|skypeuripreview|applebot|pinterest|redditbot|embedly|quora|googlebot|bingbot|yandex|baiduspider|duckduckbot|vkshare|w3c_validator|nuzzel|outbrain|tumblr|bitlybot|iframely|mastodon|pleroma|misskey|threads|bluesky/i;

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function ogHtml(): string {
	const title = escapeHtml(OG_TITLE);
	const desc = escapeHtml(OG_DESCRIPTION);
	const image = escapeHtml(OG_IMAGE);
	const url = escapeHtml(OG_URL);
	const dest = escapeHtml(DESTINATION);
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${image}" />
<link rel="canonical" href="${dest}" />
</head>
<body><a href="${dest}">${title}</a></body>
</html>`;
}

export const GET: RequestHandler = ({ request }) => {
	const ua = request.headers.get('user-agent') ?? '';
	if (CRAWLER_UA.test(ua)) {
		return new Response(ogHtml(), {
			status: 200,
			headers: {
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 'public, max-age=300, s-maxage=300'
			}
		});
	}
	redirect(301, DESTINATION);
};
