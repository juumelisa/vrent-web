import React from 'react';

export const Button = ({children, onAction, variant}) => {
  const btn = {
    width: '100%',
    // height: '60px',
    borderRadius: '10px',
  }
  return(
    <button onClick={onAction} style={btn} className={`my-2 fs-5 py-3 border-0 rounded-3 ${variant === 'dark' ? 'bg-color-1 text-white' : variant === 'light' ? 'bg-color-2' : variant === 'white' ? 'bg-white shadow' : ''}`}>{children}</button>
  )
}