"use client";
import React, { useState } from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { convertToSlug, headerNavLinks } from "@constants";
import { usePathname, useRouter } from "next/navigation";
import { useCategories } from "../lib/woocommerce";
import {
	FiHome,
	FiShoppingBag,
	FiBox,
	FiUser,
	FiLogIn,
	FiChevronRight,
} from "react-icons/fi";
import useToken from "../hooks/useToken";
import { useCustomer } from "../lib/woocommerce";
import { filterCustomersByEmail } from "@constants";
import { useOrders } from "../lib/woocommerce";

interface MobileNavProps {
	closeDrawer: () => void;
	drawerVisible: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
	closeDrawer,
	drawerVisible,
}) => {
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;
	const [activeTab, setActiveTab] = useState<string>("allCategory");
	const pathname = usePathname();
	const router = useRouter();

	const { email } = useToken();
	const { data: customer } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);
	const firstName = wc_customer_info?.first_name;
	const isLoggedIn = !!firstName;

	const { data: ordersData } = useOrders(undefined, 1, 1);
	const totalOrderedItems = ordersData?.totalItems || 0;

	const handleNavClick = (url: string) => {
		router.push(url);
		closeDrawer();
	};

	const quickLinks = [
		{
			id: "home",
			label: "Home",
			href: "/",
			icon: FiHome,
		},
		{
			id: "shop",
			label: totalOrderedItems > 0 ? "My Orders" : "Shop",
			href: totalOrderedItems > 0 ? "/user/my-orders" : "/category",
			icon: totalOrderedItems > 0 ? FiBox : FiShoppingBag,
		},
		{
			id: "account",
			label: isLoggedIn ? `Hi, ${firstName}` : "Login",
			href: isLoggedIn ? "/user/dashboard" : "/user/login",
			icon: isLoggedIn ? FiUser : FiLogIn,
		},
	];

	return (
		<AnimatePresence>
			{drawerVisible && (
				<motion.div
					initial={{ x: "-100%" }}
					animate={{ x: 0 }}
					exit={{ x: "-100%" }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<Drawer
						width='85%'
						open={drawerVisible}
						onClose={closeDrawer}
						placement={"left"}
					>
						<div className='flex flex-col h-full bg-white'>
							{/* Header */}
							<div className='flex items-center justify-between px-4 py-4 border-b border-gray-100'>
								<span className='text-sm font-bold text-gray-900 tracking-wide uppercase'>
									Menu
								</span>
								<button
									onClick={closeDrawer}
									className='p-1.5 rounded-full hover:bg-gray-100 transition-colors'
								>
									<IoMdClose size={20} className='text-gray-600' />
								</button>
							</div>

							<div className='flex-1 overflow-y-auto'>
								{/* Quick nav links */}
								<div className='px-3 py-3 border-b border-gray-100'>
									{quickLinks.map((link) => {
										const Icon = link.icon;
										const isActive = pathname === link.href;
										return (
											<button
												key={link.id}
												onClick={() => handleNavClick(link.href)}
												className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
													isActive
														? "bg-gray-900 text-white"
														: "text-gray-700 hover:bg-gray-50"
												}`}
											>
												<Icon className='text-base shrink-0' />
												<span>{link.label}</span>
											</button>
										);
									})}
								</div>

								{/* Category / Others tabs */}
								<div className='px-3 pt-4'>
									<div className='flex gap-1 bg-gray-100 p-1 rounded-lg mb-4'>
										<motion.button
											whileTap={{ scale: 0.97 }}
											className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
												activeTab === "allCategory"
													? "bg-white text-gray-900 shadow-sm"
													: "text-gray-500"
											}`}
											onClick={() => setActiveTab("allCategory")}
										>
											Categories
										</motion.button>
										<motion.button
											whileTap={{ scale: 0.97 }}
											className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
												activeTab === "others"
													? "bg-white text-gray-900 shadow-sm"
													: "text-gray-500"
											}`}
											onClick={() => setActiveTab("others")}
										>
											More
										</motion.button>
									</div>

									{activeTab === "allCategory" && (
										<div className='flex flex-col gap-1'>
											{categoryWpIsLoading && (
												<p className='text-xs text-gray-400 px-3 py-2'>
													Loading…
												</p>
											)}
											{Categories &&
												Categories.filter(
													(item) =>
														item.name.toLowerCase() !== "uncategorized",
												).map((item) => (
													<button
														key={item?.id}
														onClick={() => {
															router.push(
																`/category/${convertToSlug(item?.name)}-${item?.id}`,
															);
															closeDrawer();
														}}
														className='flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors group'
													>
														<span
															dangerouslySetInnerHTML={{ __html: item?.name }}
														/>
														<FiChevronRight className='text-gray-300 group-hover:text-gray-500 transition-colors' />
													</button>
												))}
										</div>
									)}

									{activeTab === "others" && (
										<div className='flex flex-col gap-1'>
											{headerNavLinks.map((link) => (
												<Link
													key={link.id}
													href={link.href}
													onClick={closeDrawer}
													className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
														pathname === link.href
															? "bg-gray-900 text-white"
															: "text-gray-700 hover:bg-gray-50"
													}`}
												>
													<span>{link.text}</span>
													<FiChevronRight
														className={`transition-colors ${pathname === link.href ? "text-white/50" : "text-gray-300 group-hover:text-gray-500"}`}
													/>
												</Link>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</Drawer>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileNav;
