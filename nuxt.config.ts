export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	future: {
		compatibilityVersion: 5,
	},

	experimental: {
		viteEnvironmentApi: true
	},

	devtools: { enabled: true },

	devServer: { port: 3005 },

	// GitHub Pages serves this project repo under /www-kab/, so assets and
	// routes must be prefixed with that base.
	app: { baseURL: '/www-kab/' },

	nitro: {
		prerender: { crawlLinks: true, routes: ['/', '/services'] },
	},

	css: ['~/assets/main.css'],
	modules: [
		'@nuxt/fonts',
		'@nuxt/content',
	],
	content: {
		experimental: { sqliteConnector: 'native' },
	},
});