/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-color': 'var(--primary)',
                'text-color': 'var(--text-color)',
                'text-color-secondnary': 'var(--text-color-secondnary)',
                'text-color-link': 'var(--text-color-link)',
                'text-color-link-hightlight': 'var(--text-color-link-hightlight)',
                'background-color': 'var(--background-color)',
                'background-color-secondnary': 'var(--background-color-secondnary)',
                'background-button': 'var(--background-button)',
                'background-button-red': 'var(--background-button-red)',
            },
        },
    },
    plugins: [],
};
