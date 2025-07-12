import Image from "next/image";
import Link from "next/link"

import backgroundImage from "../assets/images/background-image.png"
import edwardNewGate from "../assets/images/edward-newgate.png"

export default function Home() {
  const year = new Date().getFullYear()
  return (
    <div className="relative bg-white text-black text-lg">
      <div className="fixed z-30 w-full bg-transparent text-black flex flex-row justify-between p-5 md:px-10 xl:px-20">
        <Link href="/" className="font-bold text-blue-600 text-3xl">Seran</Link>
        <div className="flex gap-5">
          <Link href="/about">About</Link>
          <Link href="/login">Login or Sign Up</Link>
        </div>
      </div>
      <div className="relative z-10">
        <Image src={backgroundImage} alt="background image z-10"/>
        <div className="bg-blue-900 opacity-20 h-full w-full absolute top-0" />
        <div className="absolute top-0 w-full h-full">
          <div className="w-full lg:w-[580px] h-full flex flex-col justify-center p-5 md:p-10 xl:p-20">
            <h1 className="font-bold text-6xl leading-20">Explore and Travel</h1>
            <div className="w-full">
              <p className="font-bold text-xl my-6">Vehicle Finder</p>
              <div className="border-t w-12" />
              <div className="mt-10">
                <form className="grid gap-3 md:gap-5">
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
      <div className="w-full bg-blue-400/10 p-5 md:p-10 xl:p-20">
        <div className="w-full flex flex-col xl:flex-row gap-5 xl:gap-10">
          <div className="w-full xl:w-1/3">
            <p>
              Plan and book your perfect trip with expert advice, travel tips for vehicle information from us.
            </p>
          </div>
          <div className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-bold mb-2">Destination</h3>
              <p>Jakarta</p>
              <p>Bali</p>
              <p>Yogyakarta</p>
              <p>Bandung</p>
              <p>Medan</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">Vehicles</h3>
              <p>Bike</p>
              <p>Cars</p>
              <p>Motorbike</p>
              <p>Return Times</p>
              <p>FAQs</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">Interests</h3>
              <p>Advanture Travel</p>
              <p>Art and Culture</p>
              <p>Wildlife and Nature</p>
              <p>Family Holiday</p>
              <p>Culinary Trip</p>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-300 mt-5">
          <p>hola</p>
        </div>
        <div>
          <p>©{year} Seran Center. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
