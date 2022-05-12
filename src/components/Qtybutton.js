import React from "react";

export const Qtybutton = ({qty, onPlus, onMinus, onChangeQty}) => {
  const btnStyle = {
    width: '30px',
    height: '30px'
  }
  return(
    <div className="d-flex flex-row justify-content-between align-items-center py-3">
      <p className="fs-4 fw-bold col-6 m-0">Stock</p>
      <button onClick={onPlus} className="rounded-3 border-0 fs-5 fw-bold p-0 bg-color-2" style={btnStyle}>+</button>
      <input value={qty} onChange={onChangeQty} className="border-0 text-center fs-4 fw-bold" style={{width: "50px"}}/>
      <button onClick={onMinus} className="rounded-3 border-0 fs-5 fw-bold p-0" style={btnStyle}>-</button>
    </div>
  )
}