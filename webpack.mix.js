let mix = require('laravel-mix')

mix.disableNotifications()

mix.options({
	hmrOptions: {
		host: 'oldschoolfantasybaseball.dev',
		port: '8080'
	}
})

mix.webpackConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'resources/js'),
			'@draft': path.resolve(__dirname, 'resources/js/bundles/Draft'),
			'@site': path.resolve(__dirname, 'resources/js/bundles/Site')
		},
	}
})

mix.ts('resources/js/bundles/Draft.tsx', 'public/js/draft.js').sourceMaps()
mix.ts('resources/js/bundles/Site.tsx', 'public/js/site.js').sourceMaps()