"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import backgroundImage from "../assets/images/background-image.png"
import edwardNewGate from "../assets/images/edward-newgate.png"

export default function Home() {
  return (
    <div className="relative bg-white text-lg text-black">
      <Header />
      <div className="relative z-10">
        <Image src={backgroundImage} alt="background image z-10"/>
        <div className="bg-blue-900 opacity-70 h-full w-full absolute top-0" />
        <div className="absolute top-0 w-full h-full">
          <div className="w-full lg:w-[580px] h-full flex flex-col justify-center p-5 md:p-10 xl:p-20 text-white">
            <h1 className="font-bold text-6xl leading-20">Explore and Travel</h1>
            <div className="w-full">
              <p className="font-bold text-xl my-6">Vehicle Finder</p>
              <div className="border-t w-12" />
              <div className="mt-10">
                <form className="grid gap-3 md:gap-5 text-black">
                  <input name="type" placeholder="type" className="w-full py-2 px-3 bg-blue-100/90 rounded outline-0" />
                  <div className="flex flex-row gap-3">
                    <input name="location" placeholder="location" className="w-full py-2 px-3 bg-blue-100/90 rounded outline-0" />
                    <input name="date" placeholder="date" className="w-full py-2 px-3 bg-blue-100/90 rounded outline-0" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white py-2 font-bold rounded cursor-pointer">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5 md:p-10 xl:p-20">
        <div>
          <h2 className="font-bold text-5xl">Testimonials</h2>
          <div className="w-full flex p-5 md:p-10 xl:p-20 gap-5">
            <div className="w-1/2 flex flex-col justify-center items-start text-left gap-5">
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p>{`"It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!"`}</p>
              <p className="font-bold">Edward Newgate</p>
              <p className="font-semibold">Founder Circle</p>
            </div>
            <div className="w-1/2 flex justify-end">
              <Image src={edwardNewGate} alt="background image z-10" className="w-4/5" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
