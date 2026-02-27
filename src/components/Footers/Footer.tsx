"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import useToken from "../hooks/useToken";

const PRIMARY = "#38CB89";

const pageLinks = [
	{ label: "Home", href: "/" },
	{ label: "Shop", href: "/category" },
	{ label: "Product", href: "/category" },
	{ label: "Articles", href: "/faq" },
	{ label: "Contact Us", href: "/contact-us" },
];

const infoLinks = [
	{ label: "Shipping Policy", href: "/terms-of-use?terms-of-use" },
	{ label: "Return & Refund", href: "/terms-of-use?privacy-policy" },
	{ label: "Support", href: "/contact-us" },
	{ label: "FAQs", href: "/faq" },
];

// Simple payment method badges rendered as styled spans
const paymentMethods = ["Visa", "Mastercard", "Discover", "Apple Pay"];

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();

	const { data: customer } = useCustomer("");
	const wc_customer_info: Woo_Customer_Type | undefined = useMemo(
		() => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
		[customer, email],
	);

	const firstName = wc_customer_info?.first_name;

	return (
		<footer style={{ background: "#1a1a2e" }} className='text-white w-full'>
			{/* ── Main columns ── */}
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8'>

				{/* Column 1 – Brand */}
				<div className='col-span-2 md:col-span-1 space-y-4'>
					<Link href='/' className='flex items-center gap-2'>
						<Image
							src='/images/logo-tiny.svg'
							alt={CompanyName}
							width={36}
							height={36}
							className='h-9 w-9 shrink-0'
						/>
						<span className='text-sm font-black text-white tracking-tight leading-none'>
							<span style={{ color: PRIMARY }}>E</span>BBERGEN
						</span>
					</Link>
					<p className='text-sm text-gray-400 leading-relaxed max-w-xs'>
						Your trusted destination for quality tech accessories and electronics
						delivered nationwide.
					</p>
				</div>

				{/* Column 2 – Page */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-white uppercase tracking-wide'>
						Page
					</h3>
					{pageLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className='block text-sm text-gray-400 hover:text-white transition-colors leading-relaxed'
						>
							{link.label}
						</Link>
					))}
					{firstName && (
						<button
							onClick={signOut}
							className='block text-sm text-red-400 hover:text-red-300 transition-colors text-left'
						>
							Log Out
						</button>
					)}
				</div>

				{/* Column 3 – Info */}
				<div className='space-y-3'>
					<h3 className='text-sm font-bold text-white uppercase tracking-wide'>
						Info
					</h3>
					{infoLinks.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className='block text-sm text-gray-400 hover:text-white transition-colors leading-relaxed'
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>

			{/* ── Bottom bar ── */}
			<div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
				<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3'>
					<p className='text-xs text-gray-500'>
						Copyright &copy; {currentYear} {CompanyName}. All rights reserved
					</p>

					{/* Payment badges */}
					<div className='flex items-center gap-2'>
						{paymentMethods.map((method) => (
							<span
								key={method}
								className='inline-flex items-center justify-center text-[9px] font-bold px-2 py-1 rounded border'
								style={{
									background: "#ffffff",
									color: "#1a1a2e",
									borderColor: "rgba(255,255,255,0.15)",
								}}
							>
								{method}
							</span>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
