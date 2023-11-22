export function formatDate(date) {
  if (!(date instanceof Date)) {
    return '';
  }

  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}

export function parseDate(str) {
  if (!/^\d{8}$/.test(str)) return new Date(NaN); // 유효성 검사

  var year = str.substring(0, 4);
  var month = str.substring(4, 6);
  var day = str.substring(6, 8);

  return new Date(year, month - 1, day);
}
