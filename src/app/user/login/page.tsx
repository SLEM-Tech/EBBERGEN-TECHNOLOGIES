import { SEODATA } from "@constants/seoContants";
import AppLayout from "@src/components/AppLayout";
import LoginForm from "@src/components/Form/LoginForm";
import { Metadata } from "next";
import React from "react";

const { description, title, ogImage, keywords } = SEODATA.login;
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
			<main className='grid place-items-center h-screen px-3 md:px-0 lg:mt-10'>
				<LoginForm />
			</main>
			</AppLayout>
	);
};

export default page;
