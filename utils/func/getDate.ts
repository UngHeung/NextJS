/** return year-mon-day hour:min:sec */

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  hour = hour.length < 2 ? "0" + hour : hour;
  minute = minute.length < 2 ? "0" + minute : minute;

  let result = `${year}-${month}-${day} ${hour}:${minute}`;
  return result;
};

export default getDate;
