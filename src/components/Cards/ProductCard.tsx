"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";

interface ProductCardProps {
	id: string;
	image: string;
	oldAmount?: number;
	newAmount: number;
	description: string;
	category?: string;
	rating?: number;
}

const ProductCard = ({
	id,
	image,
	oldAmount,
	newAmount,
	description,
	category,
	rating = 5,
}: ProductCardProps) => {
	const { addItem, removeItem, updateItem, getItem } = useCart();
	const [count, setCount] = useState(0);
	const cartItem = getItem(id);
	const cartItemCount = cartItem ? cartItem.quantity : 0;

	const handleCartClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const newCount = count + 1;
		setCount(newCount);
		addItem({
			id,
			name: description,
			price: newAmount,
			quantity: newCount,
			image,
		});
	};

	const handleMinusCartClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const newCount = Math.max(count - 1, 0);
		if (newCount === 0) {
			removeItem(id);
		} else {
			updateItem(id, { quantity: newCount });
		}
		setCount(newCount);
	};

	const handlePlusCartClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const newCount = count + 1;
		addItem({
			id,
			name: description,
			price: newAmount,
			quantity: newCount,
			image,
		});
		setCount(newCount);
	};

	const slugDesc = convertToSlug(description);
	const clampedRating = Math.min(5, Math.max(0, Math.round(rating)));

	return (
		<Link
			href={`/home-item/product/${slugDesc}-${id}`}
			className='flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full'
		>
			{/* Image area */}
			<div className='bg-gray-50 flex items-center justify-center p-4 aspect-square relative'>
				<Picture
					src={image || ""}
					alt={description}
					className='object-contain h-full w-full'
					loading='lazy'
				/>
			</div>

			{/* Content */}
			<div className='p-3 flex flex-col gap-1'>
				{/* Name + Stars */}
				<div className='flex items-start justify-between gap-2'>
					<h4 className='text-sm font-semibold text-gray-900 leading-snug line-clamp-2 flex-1'>
						{description}
					</h4>
					<div className='flex items-center gap-0.5 shrink-0 mt-0.5'>
						{Array.from({ length: 5 }).map((_, i) => (
							<FaStar
								key={i}
								className={`text-[11px] ${i < clampedRating ? "text-amber-400" : "text-gray-200"}`}
							/>
						))}
					</div>
				</div>

				{/* Category */}
				{category && (
					<span className='text-[11px] text-gray-400'>{category}</span>
				)}

				{/* Price + Add to cart */}
				<div className='flex items-center justify-between mt-2'>
					<span className='text-sm font-bold text-gray-900'>
						<FormatMoney2 value={newAmount} />
					</span>

					{cartItemCount === 0 ? (
						<button
							onClick={handleCartClick}
							className='bg-gray-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-full hover:bg-gray-700 active:scale-95 transition-all'
						>
							Add to cart
						</button>
					) : (
						<div className='flex items-center gap-1.5 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-full'>
							<button
								onClick={handleMinusCartClick}
								className='hover:text-gray-300 transition-colors'
							>
								<AiOutlineMinus className='text-[11px]' />
							</button>
							<span className='min-w-[14px] text-center text-[11px] font-semibold'>
								{cartItemCount}
							</span>
							<button
								onClick={handlePlusCartClick}
								className='hover:text-gray-300 transition-colors'
							>
								<AiOutlinePlus className='text-[11px]' />
							</button>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
