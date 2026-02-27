import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture";

const services = [
	{
		image: "/images/maintenance-image.png",
		title: "Computer Maintenance",
		href: "/contact-us",
	},
	{
		image: "/images/sales-image.png",
		title: "Computer Hardware Sales",
		href: "/category",
	},
	{
		image: "/images/supply-image.png",
		title: "Computer Hardware Supply",
		href: "/contact-us",
	},
	{
		image: "/images/design-image.png",
		title: "Web Design Service",
		href: "/contact-us",
	},
];

const ServicesSection = () => {
	return (
		<section style={{ background: "#0d0d0d" }} className='py-16 md:py-20'>
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
				{/* Header */}
				<h2 className='text-2xl sm:text-3xl font-extrabold text-white mb-8'>
					Our Services
				</h2>

				{/* Image grid */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
					{services.map(({ image, title, href }) => (
						<Link
							key={title}
							href={href}
							className='group flex flex-col gap-3'
						>
							<div
								className='overflow-hidden aspect-[4/3]'
								style={{ background: "#1a1a1a" }}
							>
								<Picture
									src={image}
									alt={title}
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
								/>
							</div>
							<p
								className='text-[11px] sm:text-xs font-semibold uppercase tracking-widest'
								style={{ color: "rgba(255,255,255,0.7)" }}
							>
								{title}
							</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
