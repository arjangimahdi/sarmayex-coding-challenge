export default defineNuxtConfig({
    devtools: { enabled: false },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ['nuxt-icon'],
    css: ["~/assets/css/main.css"],
});
