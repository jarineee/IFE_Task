
export function saveToLocal (id, key, val) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
    seller[id][key] = val
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
    seller[id][key] = val
  }
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  } else {
    seller = JSON.parse(seller)
  }
  if (!seller[id] || !seller[id][key]) {
    return def
  } else {
    return seller[id][key]
  }
}
