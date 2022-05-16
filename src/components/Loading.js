import React from "react";
import loadingIcon from "../assets/images/50820-blue-loading.gif"

export const Loading = ({text}) => {
  const background = {
    backgroundColor: "rgba(0,0,0,0)"
  }
  return (
    <div className="position-absolute vw-100 vh-100 d-flex justify-content-center align-items-center" style={background}>
        <div className="bg-white shadow-lg opacity-100 d-flex flex-row justify-content-center align-items-center py-2 px-5 rounded-3">
          <img src={loadingIcon} width={50} alt="loading"/>
          <p className="m-0">{text ? text : 'Loading'}</p>
        </div>
    </div>
  )
}