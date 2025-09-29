"use client"
import React, { useEffect, useState } from "react";
import Select from "@/components/Select";
import { fetchWithToken } from "@/app/lib/fetchWithToken";

type Option = {
  key: string;
  value: string;
};

interface City {
  id: string;
  name: string;
  state: string;
}
type Form = {
  city?: Option,
  name?: string
}
export default function App() {
  const [cityList, setCityList] = useState<Option[]>([]);
  const [form, setForm] = useState<Form>({});

  useEffect(() => {
    fetchCity()
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
    console.log(rest)
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

  const changeForm = <K extends keyof Form>(name: K, value: Form[K]) => {
    const currentForm: Form = {...form}
    currentForm[name] = value
    setForm(currentForm)
  }
  return (
    <div className="p-6">
      <Select
        options={cityList}
        value={form.city}
        label="location"
        placeholder="Select location"
        onChange={(value: string | null, key: string | null) => changeForm('city', {value: value || "", key: key || ""})}
        search={true}
        onSearch={fetchCity}
      />
    </div>
  );
}
