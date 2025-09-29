"use client"
import React, { useEffect, useState } from "react";
import Select from "@/components/Select";
import { fetchWithToken } from "@/app/lib/fetchWithToken";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

type Option = {
  key: string;
  value: string;
};

interface City {
  id: string;
  name: string;
  state: string;
}

interface Brand {
  id: string;
  name: string;
}


type Form = {
  model: string,
  city?: Option,
  brand?: Option,
  type?: string,
  seat: string,
  price: string,
  unit: string[]
}
export default function App() {
  const [cityList, setCityList] = useState<Option[]>([]);
  const [brandList, setBrandList] = useState<Option[]>([]);
  const [form, setForm] = useState<Form>({
    model: "",
    seat: "",
    price: "",
    unit: []
  });
  const vehicleType = ["car", "motorcycle"];
  const [imageList, setImageList] = useState<string[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [tempUnit, setTempUnit] = useState<string>("")

  useEffect(() => {
    fetchCity()
    fetchBrand()
  }, [])
  const fetchCity = async (search: string = '') => {
    const query: Record<string,string> = {
      order: "name",
      sort: "asc",
      limit: "20",
      offset: "0",
      q: search
    }
    const params = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/city/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const tempCityList: Option[] = []
      const result: City[] = rest.result
      result.forEach((city) => {
        tempCityList.push({
          key: city.id,
          value: `${city.name}, ${city.state}`
        })
      })
      setCityList(tempCityList)
    }
  }

  const fetchBrand = async (search: string = '') => {
    const query: Record<string,string> = {
      order: "name",
      sort: "asc",
      limit: "20",
      offset: "0",
      q: search
    }
    const params = new URLSearchParams(query);
    const data = await fetchWithToken(`/api/brand/list?${params}`);
    const rest = await data.json()
    if (rest.code === 200) {
      const tempBrandList: Option[] = []
      const result: Brand[] = rest.result
      result.forEach((brand) => {
        tempBrandList.push({
          key: brand.id,
          value: brand.name
        })
      })
      setBrandList(tempBrandList)
    }
  }

  const changeForm = <K extends keyof Form>(name: K, value: Form[K]) => {
    const currentForm: Form = {...form}
    currentForm[name] = value
    if(name === "type" && value === "motorcycle") {
      currentForm.seat = "2"
    }
    setForm(currentForm)
  }
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || [])
    images.forEach(async (image) => {
      const index = imageList.length
      const objectUrl = URL.createObjectURL(image);
      setImageList((prev) => [...prev, objectUrl])
      const formData = new FormData();
      formData.append("file", image);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const rest = await res.json()
      if (rest.code === 200) {
        const result = rest.result[0]
        const url = result.url
        setImageUrls((prev) => {
          const newArr = [...prev]
          newArr[index] = url
          return newArr
        })
      } else{
        console.log(rest)
      }
    })
  }
  const updateUnit = () => {
    changeForm("unit", [...form.unit, tempUnit])
    setTempUnit("")
  }
  const submit = async () => {
    // e.preventDefault()
    const body = {
      brandId: form.brand?.key,
      name: form.model,
      locationId: form.city?.key,
      seat: parseInt(form.seat),
      price: form.price,
      type: form.type,
      unit: form.unit,
      images: imageUrls
    }

    const res = await fetchWithToken("/api/vehicle/add", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await res.json()
    console.log(result)
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Add Vehicle</h1>
      <div className="py-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label>
            <span className="block mb-1">Model</span>
            <input
              value={form.model}
              onChange={(e) => changeForm("model", e.target.value)}
              placeholder="Vehicle Model"
              className="w-full outline-0 border border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded px-3 py-2" />
          </label>
          <Select
            options={brandList}
            value={form.brand}
            label="brand"
            placeholder="Select brand"
            onChange={(value: string | null, key: string | null) => changeForm('brand', {value: value || "", key: key || ""})}
            search={true}
            onSearch={fetchBrand}
          />
          <Select
            options={vehicleType}
            value={form.type}
            label="type"
            placeholder="Select type"
            onChange={(value: string | null) => changeForm("type", value || "")}
            search={false}
          />
          <label>
            <span className="block mb-1">Seat</span>
            <input
              placeholder="Seat"
              value={form.seat}
              onChange={(e) => changeForm("seat", e.target.value)}
              disabled={form.type === "motorcycle"}
              type="number"
              className="w-full outline-0 border border-gray-200 dark:border-gray-700 placeholder-gray-400 
              dark:placeholder-gray-500 rounded px-3 py-2 disabled:bg-gray-100 dark:disabled:bg-gray-800" />
          </label>
          <Select
            options={cityList}
            value={form.city}
            label="location"
            placeholder="Select location"
            searchPlaceholder="Search location"
            onChange={(value: string | null, key: string | null) => changeForm('city', {value: value || "", key: key || ""})}
            search={true}
            onSearch={fetchCity}
          />
          <label>
            <span className="block mb-1">Rent Price</span>
            <input
              placeholder="Rent price per day"
              value={form.price}
              onChange={(e) => changeForm("price", e.target.value)}
              type="number"
              className="w-full outline-0 border border-gray-200 dark:border-gray-700 placeholder-gray-400 
              dark:placeholder-gray-500 rounded px-3 py-2 disabled:bg-gray-100 dark:disabled:bg-gray-800" />
          </label>
        </div>
        <div className="mt-5">
          <label className="font-semibold block mb-1">Images</label>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {imageList.map((image, index) => <div key={index} className="relative w-full h-40">
              <Image
                src={image}
                alt={`vehicle_${index}`}
                fill
                style={{ objectFit: "cover" }}
              />
              {!imageUrls[index] && <div className="absolute bg-black/50 w-full h-full top-0 left-0 flex justify-center items-center">
                <div className="w-8 h-8 border-3 border-white border-t-transparent animate-spin rounded-full"></div>
              </div>}
            </div>)}
            <div className="relative">
              <div className="w-full h-40 flex flex-col justify-center items-center border rounded border-gray-200 
              text-gray-400 dark:text-gray-500 dark:border-gray-700">
                <CiImageOn size={60} />
                <p>Click or drag and drop file here</p>
              </div>
              <input
                type="file"
                accept="image/webp,image/jpeg,image/png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={fileHandler} />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-semibold">Unit</h2>
          <table className="w-full">
            <thead className="bg-blue-100 dark:bg-gray-700">
              <tr>
                <th className="py-2">No.</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {form.unit.map((unit, index) => <tr key={`unit-${index}`}>
                <td className="text-center py-2">{index + 1}</td>
                <td>{unit}</td>
                <td>
                  <button>
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>)}
              <tr>
                <td className="text-center">{form.unit.length + 1}</td>
                <td>
                  <input
                    value={tempUnit}
                    onChange={(e) => setTempUnit(e.target.value)}
                    placeholder="Unit Number"
                    className="w-full outline-0 border border-gray-200 dark:border-gray-700 placeholder-gray-400 
                  dark:placeholder-gray-500 rounded px-3 py-2 my-2 disabled:bg-gray-100 dark:disabled:bg-gray-800" />
                </td>
                <td className="w-full h-full flex justify-center items-center py-4">
                  <button
                    onClick={updateUnit}
                    className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-gray-700">
                    <IoMdAdd />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={submit}>submit</button>
      </div>
    </div>
  );
}
