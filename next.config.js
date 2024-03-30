module.exports = {
	trailingSlash: true,
	exportPathMap: function () {
		return {
			"/": { page: "/" }
		}
	},
	webpack(config)
	{
		config.resolve.fallback = {
			...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
			// by next.js will be dropped. Doesn't make much sense, but how it is
			fs: false, // the solution
			async_hooks: false,
		};

		return config;
	}
};
