import { Metadata } from "next";

// 1. Core Configuration Constants
export const SITE_NAME = "Qualteva";
export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://krestlogic.com";
export const TWITTER_HANDLE = "@krestlogic";

interface SEOConfig {
	title: string;
	description: string;
	keywords: string[];
	url?: string;
	ogImage?: string;
	noIndex?: boolean;
}
// 2. The SEO Database
export const SEODATA: Record<string, SEOConfig> = {
	default: {
		title: `${SITE_NAME} | Your Trusted Electronics & Tech Marketplace`,
		description:
			"Qualteva provides quality tech accessories, electronics, and home appliances delivered nationwide at the best prices.",
		keywords: [
			"Qualteva",
			"Electronics Nigeria",
			"Tech Accessories",
			"Online Shopping Nigeria",
			"Home Appliances",
			"Quality Electronics",
		],
		url: SITE_URL,
		ogImage: `${SITE_URL}/og-main.png`, // Recommended: 1200x630px image
	},
	home: {
		title: `${SITE_NAME} | Shop Electronics, Gadgets & More`,
		description:
			"Shop at Qualteva for the best deals on electronics, gadgets, phones, tablets, and home appliances delivered to your doorstep.",
		keywords: [
			"Buy Electronics Online",
			"Gadgets Nigeria",
			"Phone Deals",
			"Tablet Discounts",
			"Home Appliances",
			"Online Marketplace Nigeria",
		],
		url: SITE_URL,
	},
	services: {
		title: `Our Products | Shop All Categories at ${SITE_NAME}`,
		description:
			"Browse our wide range of electronics, accessories, phones, tablets, and home appliances at competitive prices.",
		keywords: [
			"Electronics",
			"Accessories",
			"Phones",
			"Tablets",
			"Home Appliances",
			"Tech Products",
		],
	},
	portfolio: {
		title: `Our Products | Best Deals at ${SITE_NAME}`,
		description:
			"Explore our catalogue of products with the best deals and discounts. Quality guaranteed.",
		keywords: [
			"Product Deals",
			"Electronics Discounts",
			"Best Prices",
			"Quality Products",
		],
	},
	consultation: {
		title: `Contact Us | Get Support at ${SITE_NAME}`,
		description:
			"Need help? Contact our support team at Qualteva for assistance with your orders and inquiries.",
		keywords: [
			"Customer Support",
			"Order Help",
			"Contact",
			"Support",
		],
	},
	login: {
		title: `Login | ${SITE_NAME}`,
		description:
			"Log in to your Qualteva account to track your orders, manage your profile, and shop your favourite products.",
		keywords: [
			"Login",
			"Account Access",
			"Qualteva login",
		],
	},
	register: {
		title: `Create Account | Join ${SITE_NAME}`,
		description:
			"Create an account on Qualteva to start shopping quality electronics and tech accessories delivered nationwide.",
		keywords: [
			"Register",
			"Create Account",
			"Join Qualteva",
		],
	},
	user_dashboard: {
		title: `My Dashboard | ${SITE_NAME}`,
		description:
			"View your orders, track deliveries, and manage your account on Qualteva.",
		keywords: [
			"Order tracking",
			"My orders",
			"Account dashboard",
		],
		noIndex: true,
	},
};

/**
 * Helper to generate Next.js Metadata objects
 */
export function constructMetadata(
	pageKey: keyof typeof SEODATA = "default",
): Metadata {
	const config = SEODATA[pageKey] || SEODATA.default;

	// Merge page-specific keywords with default brand keywords
	const allKeywords = Array.from(
		new Set([...config.keywords, ...SEODATA.default.keywords]),
	);

	return {
		title: config.title,
		description: config.description,
		keywords: allKeywords.join(", "),
		openGraph: {
			title: config.title,
			description: config.description,
			url: config.url || SITE_URL,
			siteName: SITE_NAME,
			images: [{ url: config.ogImage || SEODATA.default.ogImage! }],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: config.title,
			description: config.description,
			creator: TWITTER_HANDLE,
			images: [config.ogImage || SEODATA.default.ogImage!],
		},
		robots: config.noIndex ? "noindex, nofollow" : "index, follow",
		alternates: {
			canonical: config.url || SITE_URL,
		},
	};
}
