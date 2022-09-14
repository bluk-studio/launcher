const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
			colors: {
				//
				"dark-background": "#101213",
				"background": "#131517",
				"foreground": "#1a1c20",
				"light-foreground": "#2d2f33"
				

				//
				// "background": "#0a0e0f",
				// "foreground": "#171b1d",
				// "light-foreground": "#202426"
				
				//
				// "background": "#17181f",
				// "foreground": "#20212c",
				// "light-foreground": "#292a33",
			}
		}
  },

  plugins: [],
};

module.exports = config;
