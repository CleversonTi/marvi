export function serialize(obj) {
  let queryString = ''
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`
  }
  console.log('queryString:helpers')
  console.log(queryString)
  return queryString
}
