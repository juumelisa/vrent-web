import React, { useState } from "react";

export const Countdown = ({date}) => {
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  
const countDownTime = (date) => {
  const firstDate = new Date(date);
  const secondDate = new Date();
  const distance = Math.abs(firstDate.getTime() - secondDate.getTime())
  setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
  setSeconds(Math.floor((distance % (1000 * 60)) / 1000))
}
}