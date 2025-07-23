"use client"
import Image from "next/image";
import notFound from "../../public/images/no-data.png"
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter()
  const navigateToHome = () => {
    router.push("/")
  }
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="relative w-60 h-60">
        <Image src={notFound} fill alt="404 page not found" className="o object-cover" />
      </div>
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <div className="w-48 mt-5">
        <Button onClick={navigateToHome}>Back to home</Button>
      </div>
    </div>
  );
}
  