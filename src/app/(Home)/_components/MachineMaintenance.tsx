import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture";

const items = [
	"Custom Design PC",
	"Mouse",
	"Keyboard",
	"All kind of accessory",
];

const MachineMaintenance = () => {
	return (
		<section className='w-full overflow-hidden' style={{ background: "#111111" }}>
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
				{/* Left – two images side by side */}
				<div className='grid grid-cols-2 gap-3 order-2 md:order-1'>
					<div
						className='overflow-hidden rounded-lg'
						style={{ background: "#1a1a1a" }}
					>
						<Picture
							src='/images/hero-img-1.png'
							alt='Computer peripherals'
							className='w-full h-full object-cover'
						/>
					</div>
					<div
						className='overflow-hidden rounded-lg'
						style={{ background: "#1a1a1a" }}
					>
						<Picture
							src='/images/hero-img-2.png'
							alt='Computer setup'
							className='w-full h-full object-cover'
						/>
					</div>
				</div>

				{/* Right – copy */}
				<div className='order-1 md:order-2 space-y-5'>
					<span
						className='text-xs tracking-[0.25em] uppercase font-semibold'
						style={{ color: "#38CB89" }}
					>
						In Stock
					</span>

					<h2 className='text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight'>
						We Make It Easy
						<br />
						For You
					</h2>

					<p
						className='text-sm leading-relaxed max-w-sm'
						style={{ color: "rgba(255,255,255,0.5)" }}
					>
						Cum ut patrioque complectitur, agam erat dicam cu has. No ludus
						timeam eligendi per ludus.
					</p>

					<ul className='space-y-2'>
						{items.map((item) => (
							<li
								key={item}
								className='flex items-center gap-2.5 text-sm font-semibold text-white'
							>
								<span
									className='w-1.5 h-1.5 rounded-full flex-shrink-0'
									style={{ background: "#38CB89" }}
								/>
								{item}
							</li>
						))}
					</ul>

					<Link
						href='/category'
						className='inline-block text-white text-sm font-medium px-7 py-2.5 transition-opacity hover:opacity-80'
						style={{ border: "1px solid rgba(255,255,255,0.2)" }}
					>
						Explore
					</Link>
				</div>
			</div>
		</section>
	);
};

export default MachineMaintenance;
