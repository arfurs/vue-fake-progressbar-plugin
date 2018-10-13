export const randomFrom = (l, u) => {
  return Math.floor(Math.random() * (u - l + 1) + l)
}

export const deepMerge = (a, b) => {
  for(let k in b)
    a[k] = a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : a[k] = b[k]
  return a;
}