const production = process.env.NODE_ENV === 'production';

module.exports = {
  purge: {
    mode: 'all',
    enabled: production,
    content: [
      './public/index.html',
      './src/components/**/*.js',
      './src/containers/**/*.js',
    ],
  },
  theme: {
    extend: {
      inset: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
      },
      screens: {
        xs: { max: '430px' },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
};
