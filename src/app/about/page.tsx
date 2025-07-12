"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import backgroundAboutUs from "../../assets/images/background-about-us.png"

export default function Home() {
  return (
    <div className="relative bg-white text-white text-lg">
      <Header />
      <div className="relative z-10">
        <Image src={backgroundAboutUs} alt="background image"/>
        <div className="bg-blue-900 opacity-70 h-full w-full absolute top-0" />
        <div className="absolute top-0 w-full h-full">
          <div className="w-full lg:w-[580px] h-full flex flex-col justify-center p-5 md:p-10 xl:p-20">
            <h1 className="font-bold text-6xl leading-20">About Us</h1>
            <div className="flex flex-col gap-5 mt-5">
              <p>We are a vehicle rental company based in Indonesia, committed to providing safe, convenient, and reliable transportation 
                solutions. Whether you need a family car, city vehicle, or operational fleet, our wide selection of vehicles is ready to 
                support your personal, business, or travel needs.</p>
              <p>With a seamless booking system and responsive customer support, we aim to deliver the best rental experience across 
                Indonesia. Your safety and comfort are our top priorities.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
