"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { convertToSlug } from "@constants";
import { useCategories, WooCommerce, cacheGet, cacheSet } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import { useRouter } from "next/navigation";

const PRIMARY = "#38CB89";

/* ── Star Rating ────────────────────────── */
const StarRating = ({ rating }: { rating: number }) => {
	const stars = Array.from({ length: 5 }, (_, i) => {
		const full = i + 1;
		if (rating >= full) return <AiFillStar key={i} style={{ color: PRIMARY }} className='text-sm' />;
		if (rating >= full - 0.5) return <BsStarHalf key={i} style={{ color: PRIMARY }} className='text-sm' />;
		return <AiOutlineStar key={i} className='text-gray-300 text-sm' />;
	});
	return <>{stars}</>;
};

/* ── Product Card ───────────────────────── */
const HomeProductCard = ({ product, label }: { product: ProductType; label?: string }) => {
	const { addItem, getItem, updateItem, removeItem } = useCart();
	const ID = product.id.toString();
	const cartItem = getItem(ID);
	const qty = cartItem?.quantity || 0;
	const price = parseInt(product.price);
	const oldPrice = parseInt(product.regular_price);
	const rating = parseFloat((product as any).average_rating) || 4;
	const slugDesc = convertToSlug(product.name);
	const discountPct =
		oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

	const handleAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (qty === 0) {
			addItem({ id: ID, name: product.name, price, quantity: 1, image: product.images?.[0]?.src });
		} else {
			updateItem(ID, { quantity: qty + 1 });
		}
	};

	const handleDecrease = (e: React.MouseEvent) => {
		e.preventDefault();
		if (qty <= 1) removeItem(ID);
		else updateItem(ID, { quantity: qty - 1 });
	};

	return (
		<div
			className='relative flex flex-col bg-white border border-gray-100 hover:shadow-md transition-shadow duration-200 flex-shrink-0'
			style={{ width: 200, minWidth: 200 }}
		>
			{/* Badges */}
			{label && (
				<span
					className='absolute top-2 left-2 z-10 text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm text-white'
					style={{ background: PRIMARY }}
				>
					{label}
				</span>
			)}
			{discountPct > 0 && (
				<span className='absolute top-2 right-2 z-10 text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-sm'>
					-{discountPct}%
				</span>
			)}
			{/* Wishlist */}
			<button className='absolute top-8 right-2 z-10 p-1 text-gray-300 hover:text-red-400 transition-colors'>
				<FiHeart className='text-sm' />
			</button>

			{/* Image */}
			<Link
				href={`/home-item/product/${slugDesc}-${product.id}`}
				className='flex items-center justify-center overflow-hidden'
				style={{ height: 180, background: "#F9FAFB" }}
			>
				<Picture
					src={product.images?.[0]?.src}
					alt={product.name}
					className='w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300'
				/>
			</Link>

			{/* Add to cart button overlaying bottom of image */}
			<div className='px-3 pt-1 pb-0'>
				{qty === 0 ? (
					<button
						onClick={handleAdd}
						className='w-full flex items-center justify-center gap-1.5 text-white text-xs font-semibold py-2 transition-opacity hover:opacity-85 rounded-sm'
						style={{ background: PRIMARY }}
					>
						<RiShoppingCartLine className='text-sm' />
						Add to cart
					</button>
				) : (
					<div
						className='flex items-center rounded-sm overflow-hidden'
						style={{ border: `1px solid ${PRIMARY}` }}
					>
						<button
							onClick={handleDecrease}
							className='flex-1 py-1.5 font-bold text-sm transition-colors hover:opacity-80'
							style={{ color: PRIMARY }}
						>
							−
						</button>
						<span className='px-3 text-xs font-bold text-gray-700'>{qty}</span>
						<button
							onClick={handleAdd}
							className='flex-1 py-1.5 text-white text-sm font-bold'
							style={{ background: PRIMARY }}
						>
							+
						</button>
					</div>
				)}
			</div>

			{/* Info */}
			<div className='px-3 pt-2 pb-3 flex flex-col gap-1'>
				{/* Stars */}
				<div className='flex items-center gap-0.5'>
					<StarRating rating={rating} />
				</div>

				{/* Name */}
				<Link
					href={`/home-item/product/${slugDesc}-${product.id}`}
					className='text-xs font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-[#38CB89] transition-colors'
					dangerouslySetInnerHTML={{ __html: product.name }}
				/>

				{/* Price */}
				<div className='flex items-center gap-2 mt-0.5'>
					<span className='text-sm font-bold' style={{ color: PRIMARY }}>
						{price ? <FormatMoney2 value={price} /> : "N/A"}
					</span>
					{oldPrice > price && (
						<span className='text-xs line-through text-gray-400'>
							<FormatMoney2 value={oldPrice} />
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

/* ── Skeleton Card ──────────────────────── */
const ProductSkeleton = () => (
	<div
		className='bg-white border border-gray-100 flex-shrink-0'
		style={{ width: 200, minWidth: 200 }}
	>
		<div className='h-[180px] bg-gray-100 animate-pulse' />
		<div className='px-3 py-3 space-y-2'>
			<div className='h-7 bg-gray-100 rounded animate-pulse' />
			<div className='h-3 bg-gray-100 rounded animate-pulse w-2/3' />
			<div className='h-3 bg-gray-100 rounded animate-pulse w-3/4' />
			<div className='h-4 bg-gray-100 rounded animate-pulse w-1/2' />
		</div>
	</div>
);

/* ── Carousel Section ───────────────────── */
interface CarouselSectionProps {
	title: string;
	cardLabel?: string;
	products: ProductType[];
	isLoading: boolean;
	showLeftArrow?: boolean;
}

const CarouselSection = ({
	title,
	cardLabel,
	products,
	isLoading,
	showLeftArrow = false,
}: CarouselSectionProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (dir: "left" | "right") => {
		if (!scrollRef.current) return;
		scrollRef.current.scrollBy({ left: dir === "right" ? 420 : -420, behavior: "smooth" });
	};

	return (
		<section className='bg-white py-8' style={{ borderBottom: "1px solid #F3F4F6" }}>
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
				{/* Header */}
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-3'>
						<span
							className='w-1 h-6 rounded-full inline-block flex-shrink-0'
							style={{ background: PRIMARY }}
						/>
						{title}
					</h2>
					<div className='flex items-center gap-2'>
						{showLeftArrow && (
							<button
								onClick={() => scroll("left")}
								className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#38CB89] hover:text-[#38CB89] transition-colors'
							>
								<FiChevronLeft className='text-sm' />
							</button>
						)}
						<button
							onClick={() => scroll("right")}
							className='w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors hover:opacity-85'
							style={{ background: PRIMARY }}
						>
							<FiChevronRight className='text-sm' />
						</button>
					</div>
				</div>

				{/* Carousel */}
				<div
					ref={scrollRef}
					className='flex gap-3 overflow-x-auto scroll-smooth pb-2 no-scrollbar'
				>
					{isLoading
						? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
						: products.map((p) => (
								<HomeProductCard key={p.id} product={p} label={cardLabel} />
							))}
				</div>
			</div>
		</section>
	);
};

/* ── Main exported component ────────────── */
const SortedProducts = ({ middleBanner }: { middleBanner?: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});

	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const filteredCategories: CategoryType[] = (categories || [])
		.filter((cat: CategoryType) => cat.count > 0)
		.slice(0, 6);

	useEffect(() => {
		if (!filteredCategories.length) return;

		const fetchCategoryProducts = async () => {
			setIsLoading(true);
			try {
				const promises = filteredCategories.map(async (cat: CategoryType) => {
					const cacheKey = `sorted_products_${cat.id}`;
					const cached = cacheGet<ProductType[]>(cacheKey);
					if (cached) return { id: cat.id.toString(), products: cached };
					const response = await WooCommerce.get(
						`products?category=${cat.id}&per_page=10`,
					);
					cacheSet(cacheKey, response.data);
					return { id: cat.id.toString(), products: response.data };
				});
				const results = await Promise.all(promises);
				const map = results.reduce(
					(acc: any, r) => ({ ...acc, [r.id]: r.products }),
					{},
				);
				setCategoryProductsMap(map);
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategoryProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories]);

	if (categoryIsError) return null;

	const allProducts = filteredCategories
		.flatMap((c) => categoryProductsMap[c.id.toString()] || [])
		.slice(0, 12);

	const newProducts = filteredCategories
		.flatMap((c) => categoryProductsMap[c.id.toString()] || [])
		.slice(4, 16);

	const loading = isLoading || categoryWpIsLoading;

	return (
		<>
			<CarouselSection
				title='Best Seller'
				cardLabel='BESTSELLER'
				products={allProducts}
				isLoading={loading}
				showLeftArrow={false}
			/>

			{middleBanner}

			<CarouselSection
				title='New Launched Products'
				products={newProducts}
				isLoading={loading}
				showLeftArrow={true}
			/>
		</>
	);
};

export default SortedProducts;
