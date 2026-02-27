import Link from "next/link";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { MdMailOutline, MdOutlineQuestionAnswer } from "react-icons/md";

const PRIMARY = "#38CB89";

const HelpConnectSection = () => {
	return (
		<section className='bg-white py-12' style={{ borderTop: "1px solid #F3F4F6" }}>
			<div className='max-w-[1440px] mx-auto px-4 sm:px-8'>
				<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10'>

					{/* Need Help card */}
					<div
						className='w-full sm:max-w-xs rounded-xl px-6 py-7 text-white'
						style={{ background: PRIMARY }}
					>
						<h3 className='text-lg font-bold mb-4'>Need Help ?</h3>
						<div className='space-y-2 mb-5'>
							<div className='flex items-center gap-2 text-sm'>
								<MdMailOutline className='text-base flex-shrink-0' />
								<span className='opacity-90'>Mail Us → xyz@gmail.com</span>
							</div>
							<div className='flex items-center gap-2 text-sm'>
								<MdOutlineQuestionAnswer className='text-base flex-shrink-0' />
								<span className='opacity-90'>→ FAQs</span>
							</div>
						</div>
						<Link
							href='/contact-us'
							className='inline-block text-xs font-bold px-5 py-2.5 rounded-sm border border-white text-white hover:bg-white/10 transition-colors'
						>
							Help Center
						</Link>
					</div>

					{/* Connect with Us */}
					<div className='flex flex-col items-center gap-4'>
						<h3 className='text-base font-bold text-gray-900'>Connect with Us</h3>
						<div className='flex items-center gap-5'>
							<a
								href='#'
								className='w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 text-lg'
								style={{ background: PRIMARY }}
								aria-label='Instagram'
							>
								<BiLogoInstagram />
							</a>
							<a
								href='#'
								className='w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 text-lg'
								style={{ background: PRIMARY }}
								aria-label='Facebook'
							>
								<BiLogoFacebook />
							</a>
							<a
								href='#'
								className='w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80 text-lg'
								style={{ background: PRIMARY }}
								aria-label='Twitter'
							>
								<BiLogoTwitter />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HelpConnectSection;
