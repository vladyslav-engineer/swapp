/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#323A47',
        grey: '#6C727C',
        border: '#EBECF2',
        background: '#FFFFFF',
      },
      padding: {
        1: '8px',
        1.5: '12px',
        2: '16px',
        2.5: '20px',
        3: '24px',
      },
    },
  },
  plugins: [],
};
