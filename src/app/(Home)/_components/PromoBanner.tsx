"use client";
import Link from "next/link";
import Picture from "@src/components/picture/Picture";
import { useEffect, useState } from "react";

const PRIMARY = "#38CB89";

// Target: 3 days from now (re-computed on client)
const getTarget = () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const calcTimeLeft = (target: Date): TimeLeft => {
	const diff = Math.max(0, target.getTime() - Date.now());
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / 1000 / 60) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
};

const TimeBox = ({ value, label }: { value: number; label: string }) => (
	<div className='flex flex-col items-center'>
		<span
			className='flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-md text-gray-900 text-xl sm:text-2xl font-extrabold'
			style={{ background: "#ffffff" }}
		>
			{String(value).padStart(2, "0")}
		</span>
		<span className='text-[10px] text-gray-300 mt-1 uppercase tracking-widest'>{label}</span>
	</div>
);

const PromoBanner = () => {
	const [target] = useState(getTarget);
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(target));

	useEffect(() => {
		const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
		return () => clearInterval(id);
	}, [target]);

	return (
		<section className='w-full overflow-hidden' style={{ background: "#111111" }}>
			<div className='max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[340px]'>
				{/* Left – product image */}
				<div
					className='relative overflow-hidden flex items-end justify-center min-h-[200px] md:min-h-[340px]'
					style={{ background: "#1a1a1a" }}
				>
					<Picture
						src='/images/hero-bg.png'
						alt='Limited edition setup'
						className='w-full h-full object-cover opacity-80'
					/>
					<div
						className='absolute inset-0'
						style={{
							background: "linear-gradient(to right, rgba(0,0,0,0) 40%, rgba(17,17,17,0.9))",
						}}
					/>
				</div>

				{/* Right – copy + countdown */}
				<div className='flex flex-col justify-center px-8 sm:px-12 py-10 md:py-0'>
					<span
						className='text-xs font-bold uppercase tracking-widest mb-3'
						style={{ color: PRIMARY }}
					>
						Limited Edition
					</span>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2'>
						Hurry up! 30% OFF
					</h2>
					<p className='text-sm text-gray-400 mb-6'>The best set up ever!!!</p>

					<p className='text-xs text-gray-500 uppercase tracking-widest mb-3'>
						Offer expires in:
					</p>
					<div className='flex items-start gap-3 mb-8'>
						<TimeBox value={timeLeft.days} label='Days' />
						<TimeBox value={timeLeft.hours} label='Hours' />
						<TimeBox value={timeLeft.minutes} label='Minutes' />
						<TimeBox value={timeLeft.seconds} label='Seconds' />
					</div>

					<Link
						href='/category'
						className='inline-block text-white text-sm font-bold px-8 py-3 rounded-sm transition-opacity hover:opacity-85 w-fit'
						style={{ background: PRIMARY }}
					>
						Shop now
					</Link>
				</div>
			</div>
		</section>
	);
};

export default PromoBanner;
