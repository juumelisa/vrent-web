"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import backgroundImage from "../assets/images/background-image.png"
import edwardNewGate from "../assets/images/edward-newgate.png"
import rose from "../assets/images/rose.jpg"
import michael from "../assets/images/michael.jpg"
import jonas from "../assets/images/jonas.jpg"

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
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-5 md:py-10 xl:py-20 gap-5">
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-3">
              <Image src={edwardNewGate} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Edward, Germany</p>
              <p>{`"It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!"`}</p>
            </div>
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-2">
              <Image src={rose} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Rose, Australia</p>
              <p>{`"The entire booking process was smooth and fast. The car was delivered directly to my hotel in Ubud and it was in excellent condition. Highly recommend for anyone traveling around Bali!"`}</p>
            </div>
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-2">
              <Image src={michael} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Michael, Singapore</p>
              <p>{`"I needed a car for a business trip in Jakarta, and this service exceeded my expectations. The vehicle was clean, reliable, and the driver was very professional. Will definitely use again."`}</p>
            </div>
            <div className="border border-gray-100 rounded-md p-5 flex flex-col justify-start items-center text-left gap-2">
              <Image src={jonas} alt="background image z-10" className="w-40 h-40 object-cover rounded-full" />
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p className="font-bold">Jonas, USA</p>
              <p>{`"I stayed in Indonesia for two months and needed a long-term rental. The company gave me a great deal and even provided free maintenance support. Super convenient!"`}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
