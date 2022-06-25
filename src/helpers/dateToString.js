export const dateToString = date => {
  const option = {year: 'numeric', month: 'long', day: 'numeric'};
  const stringDate = new Date(date).toLocaleString('id-ID', option);
  const arrDate = stringDate.split(' ');
  return `${arrDate[1]} ${arrDate[0]}`;
};

export const twoDates = (dateA, dateB) => {
  const yearA = new Date(dateA).getFullYear()
  const yearB = new Date(dateB).getFullYear()
  if (yearA === yearB) {
    return `${dateToString(dateA)} to ${dateToString(dateB)} ${yearA}`
  } else {
    return `${dateToString(dateA)} ${yearA} to ${dateToString(dateB)} ${yearB}`
  }
}

export const dateDifference = (dateA, dateB) => {
  const firstDate = new Date(dateA);
  const secondDate = new Date(dateB);
  const diff =
    Math.abs(firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24);
  return diff;
};

export const checkHours = (dateA, dateB) => {
  const firstDate = new Date(dateA);
  const secondDate = new Date(dateB);
  const diff =
    Math.abs(firstDate.getTime() - secondDate.getTime()) / (1000 * 3600);
  return diff;
}

export const countDown = (dateA) => {
  const firstDate = new Date(dateA);
  const secondDate = new Date();
  const distance = Math.abs(firstDate.getTime() - secondDate.getTime())
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)
  return `${hours}:${minutes}:${seconds}`
}