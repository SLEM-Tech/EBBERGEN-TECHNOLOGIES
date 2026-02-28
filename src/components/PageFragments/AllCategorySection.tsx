"use client";
import Link from "next/link";
import Picture from "../picture/Picture";
import { useRef, useState, useEffect } from "react";
import { useCategories } from "../lib/woocommerce";
import { convertToSlug } from "@constants";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { LuTag } from "react-icons/lu";

const PRIMARY = "#38CB89";

// ── Hero Slides ──────────────────────────────────────────────
const heroSlides = [
	{
		image: "/images/hero-bg.png",
		badge: "NEW ARRIVALS",
		heading: "Premium Tech\nAccessories",
		sub: "Up to 50% off on selected items",
		cta: "Shop Now",
	},
	{
		image: "/images/hero-img-1.png",
		badge: "BEST SELLERS",
		heading: "Top-Rated\nComputer Gear",
		sub: "Quality products at unbeatable prices",
		cta: "Browse Products",
	},
	{
		image: "/images/hero-img-2.png",
		badge: "LIMITED OFFER",
		heading: "Build Your\nDream Setup",
		sub: "Everything you need in one place",
		cta: "Explore Now",
	},
];

const HeroSlider = () => {
	const [current, setCurrent] = useState(0);
	const [showBanner, setShowBanner] = useState(true);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % heroSlides.length);
		}, 4500);
	};

	useEffect(() => {
		startTimer();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goTo = (i: number) => {
		if (timerRef.current) clearInterval(timerRef.current);
		setCurrent(i);
		startTimer();
	};

	const slide = heroSlides[current];

	return (
		<section className='relative overflow-hidden' style={{ background: "#0d0d0d", minHeight: "520px" }}>
			{/* Background */}
			<div className='absolute inset-0 transition-opacity duration-700'>
				<Picture
					src={slide.image}
					alt='hero'
					className='w-full h-full object-cover'
				/>
				<div
					className='absolute inset-0'
					style={{
						background:
							"linear-gradient(to right, rgba(0,0,0,0.82) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.25))",
					}}
				/>
			</div>

			{/* Content */}
			<div className='relative z-10 flex flex-col justify-center h-full min-h-[520px] px-6 sm:px-12 lg:px-20 py-20'>
				<span
					className='inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit'
					style={{ background: "rgba(56,203,137,0.18)", color: PRIMARY }}
				>
					{slide.badge}
				</span>
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4 whitespace-pre-line max-w-xl'>
					{slide.heading}
				</h1>
				<p className='text-sm sm:text-base mb-8 max-w-sm' style={{ color: "rgba(255,255,255,0.55)" }}>
					{slide.sub}
				</p>
				<Link
					href='/category'
					className='inline-block rounded-full text-white text-sm font-bold px-10 py-3.5 transition-opacity hover:opacity-90 w-fit'
					style={{ background: PRIMARY }}
				>
					{slide.cta}
				</Link>
			</div>

			{/* Dot navigation */}
			<div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10'>
				{heroSlides.map((_, i) => (
					<button
						key={i}
						onClick={() => goTo(i)}
						className='rounded-full transition-all duration-300'
						style={{
							width: i === current ? 24 : 8,
							height: 8,
							background: i === current ? PRIMARY : "rgba(255,255,255,0.35)",
						}}
					/>
				))}
			</div>

			{/* Promo banner overlay */}
			{showBanner && (
				<div
					className='absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2 pl-3 pr-2 py-2 rounded-lg text-xs text-white shadow-lg'
					style={{ background: PRIMARY, maxWidth: 220 }}
				>
					<span className='text-[18px]'>
						<LuTag className="text-black"/>
					</span>
					<div className='flex-1'>
						<p className='font-bold text-[11px] leading-tight text-black'>30% off storewide, Limited time!</p>
						{/* <p className='text-[10px] opacity-80'>Limited time!</p> */}
						<Link href='/category' className='text-[10px] font-semibold underline'>
							Shop Now →
						</Link>
					</div>
					<button
						onClick={() => setShowBanner(false)}
						className='text-black/70 hover:text-black text-sm ml-1 flex-shrink-0'
					>
						✕
					</button>
				</div>
			)}
		</section>
	);
};

// ── Shop by Categories ─────────────────────────────────────
const ShopByCategories = () => {
	const dispatch = useDispatch();
	const { data: categoriesData } = useCategories("");
	const categories: CategoryType[] = ((categoriesData as CategoryType[]) || [])
		.filter((c: CategoryType) => c.count > 0)
		.slice(0, 6);

	const handleCategoryClick = (cat: CategoryType) => {
		const slug = `${convertToSlug(cat.name)}-${cat.id}`;
		dispatch(updateCategorySlugId({ categorySlugId: slug }));
	};

	// Fallback category images from WooCommerce category image field
	const getCatImage = (cat: CategoryType) =>
		(cat as any).image?.src || "/images/hero-img-1.png";

	return (
		<section className='bg-white py-10'>
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
				{/* Title */}
				<h2
					className='text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-3'
				>
					<span className='w-1 h-6 rounded-full inline-block flex-shrink-0' style={{ background: PRIMARY }} />
					Shop by Categories
				</h2>

				{/* Category circles */}
				<div className='grid grid-cols-3 sm:grid-cols-6 gap-4'>
					{categories.length > 0
						? categories.map((cat) => (
								<Link
									key={cat.id}
									href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
									onClick={() => handleCategoryClick(cat)}
									className='flex flex-col items-center gap-2 group'
								>
									<div
										className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#38CB89] transition-colors'
										style={{ background: "#F3F4F6" }}
									>
										<Picture
											src={getCatImage(cat)}
											alt={cat.name}
											className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
										/>
									</div>
									<span
										className='text-xs font-medium text-gray-700 text-center truncate w-full'
										dangerouslySetInnerHTML={{ __html: cat.name }}
									/>
								</Link>
							))
						: // Skeleton placeholders
							Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className='flex flex-col items-center gap-2'>
									<div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 animate-pulse' />
									<div className='h-3 w-14 bg-gray-100 rounded animate-pulse' />
								</div>
							))}
				</div>
			</div>
		</section>
	);
};

// ── Features Strip ─────────────────────────────────────────
const FeaturesStrip = () => (
	<section className='bg-white' style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
		<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-0'>
			{[
				{ emoji: "📦", title: "Product Packing", sub: "Every item packed with care" },
				{ emoji: "🎧", title: "24x7 Support", sub: "Dedicated around the clock" },
				{ emoji: "🚚", title: "Delivery in 5 Days", sub: "Fast nationwide shipping" },
				{ emoji: "🔒", title: "Payment Secure", sub: "Your data is always safe" },
			].map(({ emoji, title, sub }, i) => (
				<div
					key={title}
					className='flex flex-col sm:flex-row items-center sm:items-start gap-3 px-4 py-4 text-center sm:text-left'
					style={{ borderLeft: i > 0 ? "1px solid #F3F4F6" : "none" }}
				>
					<span
						className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base'
						style={{ background: "#E6F9F0" }}
					>
						{emoji}
					</span>
					<div>
						<p className='font-semibold text-sm text-gray-900'>{title}</p>
						<p className='text-xs mt-0.5 text-gray-500'>{sub}</p>
					</div>
				</div>
			))}
		</div>
	</section>
);

const AllCategorySection = () => {
	return (
		<div>
			<HeroSlider />
			<ShopByCategories />
			<FeaturesStrip />
		</div>
	);
};

export default AllCategorySection;
