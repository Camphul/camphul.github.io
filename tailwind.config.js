module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'content/**/*.md',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'utils/*.js',
      'nuxt.config.js',
      'node_modules/tv-*/dist/tv-*.umd.min.js'
    ]
  }
}
