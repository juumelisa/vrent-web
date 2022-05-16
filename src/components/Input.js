import React from "react";
export const Input = ({id, type, variant, onChange, value, placeholder, min, max}) => {
    const styles = {
        height: `${variant === 'pink' ? '60px' : '30px'}`,
        width: "100%",
        outline: "none",
        borderRadius: `${variant !== 'line' ? 10 : 0}`,
        backgroundColor: `${variant === 'pink' ? 'rgba(239, 218, 215, 0.8)' : 'white'}`,
    }
    return(
        <input
        id={id}
        className={`${variant === 'border' ? 'border border-color-2 mb-4 py-4 fs-6 px-3' : variant === 'pink' ? 'border-0 mx-0 my-2 p-3 fs-5' : 'border-0 border-bottom border-2 border-dark fs-5 pb-3'}`}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style={styles}
        min={min}
        max={max}
        />
    )
}