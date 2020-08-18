function parseQueryString (url) {
  let queryString = decodeURI(url).split('?')[1]
  let queryStringArr = queryString.split('&')
  let res = {}
  if (queryString.trim().length === 0) {
    return res
  }
  for (let i = 0; i < queryStringArr.length; i++) {
    let arr = queryStringArr[i].split('=')
    let key = arr[0]
    let value = arr[1]
    res[key] = value
  }
  return res
}

export default parseQueryString
