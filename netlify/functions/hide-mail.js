exports.handler = async function() {
  // hiding email from bots
  return {
    statusCode: 301,
    headers: {
      'Cache-control': 'public, max-age=0, must-revalidate',
      'location': `mailto:me+ws@natanrolnik.me`
    },
  }
}