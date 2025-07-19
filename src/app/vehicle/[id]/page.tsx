"use client";
// import Image from "next/image";
// import { fetchWithToken } from "../../../../lib/fetchWithToken";
// import { useEffect, useState } from "react";

// import serverError from "../../assets/images/server-error.png";
// import noData from "../../assets/images/no-data.png";
// import Button from "@/components/Button";
// import { IoLocationSharp } from "react-icons/io5";

export default function Home() {
  // const [isLoadVehicle, setIsLoadVehicle] = useState(true)
  // const [isError, setIsError] = useState(false)
  // const [showVehicle, setShowVehicle] = useState(false)
  // const [offset, setOffset] = useState('0')
  // const [canFetchMore, setCanFetchMore] = useState(false)
  // const [totalData, setTotalData] = useState(0)
  // const [totalShowedData, setTotalShowedData] = useState(0)
  // const vehicleObj = {
  //   id: 1,
  //   brand: '',
  //   model: '',
  //   images: [],
  //   city: '',
  //   province: '',
  //   rentPrice: 0
  // }
  // const [vehicleList, setVehicleList] = useState([vehicleObj])
  
  // useEffect(() => {
  //   fetchVehicle()
  // }, []);
    
    
  // const fetchVehicle = async (offset = '0') => {
  //   const query: Record<string,string> = {
  //     order: 'createdAt',
  //     sort: 'desc',
  //     limit: '4',
  //     offset
  //   }
  //   const params = new URLSearchParams(query);
  //   const data = await fetchWithToken(`/api/vehicle/list?${params}`);
  //   const rest = await data.json()
  //   if (rest.code === 200) {
  //     const total = rest.total
  //     const result = rest.result
  //     let newList = []
  //     if (offset === '0') {
  //       newList = result
  //     } else {
  //       newList = [...vehicleList,...result]
  //     }
  //     setTotalData(total)
  //     setTotalShowedData(newList.length)
  //     if (newList.length < total) {
  //       setCanFetchMore(true)
  //     } else {
  //       setCanFetchMore(false)
  //     }
  //     console.log(newList)
  //     setVehicleList(newList)
  //     setIsLoadVehicle(false)
  //     setShowVehicle(true)
  //   } else {
  //     setIsLoadVehicle(false)
  //     setIsError(true)
  //   }
  // }
  
  // const formatRupiah = (value: number) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'IDR',
  //     minimumFractionDigits: 0
  //   }).format(value);
  // };

  // const getMorePage = () => {
  //   const oldOffset = parseInt(offset)
  //   const newOffset = String(oldOffset + 4)
  //   setOffset(newOffset)
  //   fetchVehicle(newOffset)
  // }
  return (
    <div>
      <p>HELLO WORLD</p>
    </div>
  );
}
