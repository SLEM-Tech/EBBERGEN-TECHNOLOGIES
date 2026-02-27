import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import PromoBanner from "./(Home)/_components/PromoBanner";
import HelpConnectSection from "./(Home)/_components/HelpConnectSection";

const { description, title, ogImage, keywords } = SEODATA.home;
export const metadata: Metadata = {
	title: title,
	description: description,
	keywords: keywords,
	icons: ogImage,
	openGraph: {
		images: [
			{
				url: ogImage ?? "",
			},
		],
	},
};

const page = () => {
	return (
		<AppLayout>
			{/* ── 1. Hero + Categories + Features Strip ── */}
			<AllCategorySection />

			{/* ── 2. Best Seller + New Launched Products (with promo banner in between) ── */}
			<SortedProducts middleBanner={<PromoBanner />} />

			{/* ── 3. Help & Connect ── */}
			<HelpConnectSection />
		</AppLayout>
	);
};

export default page;
