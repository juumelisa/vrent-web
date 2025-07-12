'use client';
import {
  FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="w-full text-black bg-blue-400/10 p-5 md:p-10 xl:p-20">
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
      <div className="w-full border-t border-gray-300 mt-5 py-5 flex justify-center gap-5">
        <Link href="/"><FaTwitter /></Link>
        <Link href="/"><FaFacebookF /></Link>
        <Link href="/"><FaInstagram /></Link>
        <Link href="/"><FaLinkedinIn /></Link>
        <Link href="/"><FaYoutube /></Link>
      </div>
      <div className="flex justify-center">
        <p>©{year} vrent Center. All rights reserved</p>
      </div>
    </div>
  );
}
