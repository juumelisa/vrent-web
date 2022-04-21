import React from "react";
export const Input = ({id, type, variant, onChange, value, placeholder}) => {
    const styles = {
        height: `${variant === 'border' ? '30px' : '60px'}`,
        width: "100%",
        outline: "none"
    }
    return(
        <input
        id={id}
        className={`${variant === 'border' ? 'border-0 border-1 border-bottom border-dark mb-4 py-4' : ''} fs-5`}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style={styles}
        />
    )
}