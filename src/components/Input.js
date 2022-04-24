import React from "react";
export const Input = ({id, type, variant, onChange, value, placeholder}) => {
    const styles = {
        height: `${variant === 'border' ? '30px' : ''}`,
        width: "100%",
        outline: "none",
        borderRadius: 10,
        backgroundColor: `${variant === 'pink' ? 'rgba(239, 218, 215, 0.8)' : 'white'}`
    }
    return(
        <input
        id={id}
        className={`border-0 ${variant === 'border' ? 'border-1 border-bottom border-dark mb-4 py-4' : 'mx-0 my-2 p-3'} fs-5`}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style={styles}
        required
        />
    )
}