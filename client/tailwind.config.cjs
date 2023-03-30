/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			textColor: {
				muted: "#b8c3d3",
			},

			backgroundColor: {
				login: "#f2f5ff",
			},
			flex: {
				2: "2 2 0%",
				3: "3 3 0%",
				4: "4 4 0%",
				5: "5 5 0%",
				6: "6 6 0%",
				7: "7 7 0%",
				8: "8 8 0%",
				9: "9 9 0%",
				10: "10 10 0%",
			},
		},
	},
	plugins: [],
};
