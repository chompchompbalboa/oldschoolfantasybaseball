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
			'@draft': path.resolve(__dirname, 'resources/js/bundles/Draft')
		},
	},
	devtool: 'inline-source-map'
})

mix.ts('resources/js/bundles/Draft.tsx', 'public/js/draft.js').sourceMaps(true, 'source-map')