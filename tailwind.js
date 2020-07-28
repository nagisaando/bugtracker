module.exports = {
	purge: [],
	theme: {
		extend: {},
		neumorphismColor: {
			gray: {
				100: '#F7FAFC',
				200: '#EDF2F7',
				300: '#E2E8F0',
				400: '#CBD5E0',
				500: '#A0AEC0',
				600: '#718096',
      },
			green: {
				100: '#F0FFF4',
				200: '#C6F6D5',
				300: '#9AE6B4',
				400: '#68D391',
				500: '#48BB78',
				600: '#38A169',
			},
			orange: {
				100: '#FFFAF0',
				200: '#FEEBC8',
				300: '#FBD38D',
				400: '#F6AD55'
			}
		},
	},
	variants: {},
	plugins: [require('tailwindcss-neumorphism')],
};
