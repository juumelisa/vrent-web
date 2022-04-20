import React from 'react'
import { Helmet } from "react-helmet";

export const Helmets = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} | SERAN - Vehicles Rent</title>
      <link rel="canonical" to="/" />
    </Helmet>
  )
}
export default Helmets