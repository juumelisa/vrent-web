import React, { useState } from "react";
import { Input } from "./Input";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"

export const InputPassword = ({variant, id, placeholder, value, onChange}) => {
  const [isPassword, setIsPassword] = useState(true)
  const style= {
    cursor: "pointer"
  }
  return (
    <div className="position-relative">
      <Input id={id} variant={variant} type={isPassword ? 'password' : 'text'} placeholder={placeholder} value={value} onChange={onChange}/>
      <div className="position-absolute top-50 start-100 translate-middle pe-5" onClick={() => setIsPassword(!isPassword)} style={style}>
        {isPassword && <AiFillEye size={24}/>}
        {!isPassword && <AiFillEyeInvisible size={24}/>}
      </div>
    </div>
  )
}