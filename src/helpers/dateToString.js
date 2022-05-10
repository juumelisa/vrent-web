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
