import { ReactNode } from "react";
import Header from "./Navbars/Header";
import Footer from "./Footers/Footer";

interface AppLayoutProps {
	children: ReactNode;
	className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
	return (
		<main className={`relative`}>
			<Header />
			{/*
			  pt offsets the fixed header:
			  mobile  ≈ 120 px  (logo row + search row)
			  desktop ≈ 68 px   (single-bar header)
			*/}
			<div className={`min-h-screen pt-[120px] slg:pt-[68px] ${className}`}>
				{children}
			</div>
			<Footer />
		</main>
	);
};

export default AppLayout;
