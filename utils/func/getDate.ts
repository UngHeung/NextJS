/** return year-mon-day hour:min:sec */

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let result = `${year}-${month}-${day} ${hour}:${minute}`;
  return result;
};

export default getDate;
