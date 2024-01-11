export default defineNuxtConfig({
    devtools: { enabled: false },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ["nuxt-icon", "@vee-validate/nuxt"],

    veeValidate: {
        autoImports: true,
        componentNames: {
            Form: "VForm",
            Field: "VField",
            FieldArray: "VFieldArray",
            ErrorMessage: "VErrorMessage",
        },
    },

    css: ["~/assets/css/main.css"],
});
