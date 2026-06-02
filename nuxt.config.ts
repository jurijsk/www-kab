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

	css: ['~/assets/main.css'],
	modules: [
		'@nuxt/fonts',
		'@nuxt/content',
	],
	content: {
		experimental: { sqliteConnector: 'native' },
	},
});