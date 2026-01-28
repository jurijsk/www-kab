export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	future: {
		compatibilityVersion: 5,
	},

	experimental: {
		viteEnvironmentApi: true
	},

	devtools: { enabled: true },

	css: [
		//'@picocss/pico',
		'~/assets/main.css'],
	modules: [
		'@nuxtjs/i18n',
		'@nuxt/fonts',
		'@nuxt/content',
		'nuxt-studio',
	],
	i18n: {
		defaultLocale: 'en',
		locales: [
			{ code: 'en', name: 'English', file: 'en.json' },
			{ code: 'de', name: 'Deutsch', file: 'de.json' },
			{ code: 'da', name: 'Dansk', file: 'da.json' },
		]
	},
	content: false || {
		experimental: { sqliteConnector: 'native' },
	},
});