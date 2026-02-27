import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		// Updated to heroui path
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",

				/* ========== Ebbergen Technologies Brand Foundation ========== */
				brand: {
					navy: "#002D5B",
					blue: "#004B93",
					light: "#E6F0F9",
				},

				background: "#FFFFFF",
				surface: "#FFFFFF",
				panel: "#F7F7F7",
				dark: "#0A0A0A",

				// Shop primary – Ebbergen green
				shop: {
					DEFAULT: "#38CB89",
					dark: "#22A86E",
					light: "#E6F9F0",
				},

				primary: {
					100: "#38CB89",
					200: "#22A86E",
					300: "#1a8f5c",
					400: "#14754a",
					DEFAULT: "#38CB89",
				},

				// Tech-focused Grays
				gray: {
					50: "#F9FAFB",
					100: "#F3F4F6",
					200: "#E5E7EB",
					300: "#D1D5DB",
					400: "#9CA3AF",
					500: "#6B7280",
					600: "#4B5563",
					700: "#374151",
					800: "#1F2937",
					900: "#111827",
				},

				// Standard E-commerce feedback colors
				success: {
					light: "#E6F9F0",
					DEFAULT: "#10B981",
					dark: "#059669",
				},
				danger: {
					light: "#FEF2F2",
					DEFAULT: "#EF4444",
					dark: "#DC2626",
				},

				// Accents
				accent: "#8AA3A0",
				price: "#1a1a1a",
				whatsapp: "#25D366",
			},

			animation: {
				"spin-slow": "spin 8s linear infinite",
				"fade-in": "fadeIn 0.5s ease-in-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
		},
		screens: {
			xs: "400px",
			xmd: "800px",
			slg: "999px",
			...require("tailwindcss/defaultTheme").screens,
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#38CB89",
							foreground: "#FFFFFF",
						},
						focus: "#22A86E",
					},
				},
			},
		}),
	],
};
export default config;
