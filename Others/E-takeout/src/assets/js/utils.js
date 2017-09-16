
export function parseUrlQuery () {
  let query = {}
  const str = window.location.search
  if (str === '') {
    query.id = 'undefined_id'
    return query
  }
  str.match(/^[?|&](\w+)=(\w+)/g).forEach(str => {
    let arr = str.substring(1, str.length).split('=')
    let key = decodeURIComponent(arr[0])
    let val = decodeURIComponent(arr[1])
    query[key] = val
  })
  return query
}
