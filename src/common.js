export default {
  randomFrom: (l, u) => {
    return Math.floor(Math.random() * (u - l + 1) + l)
  }
}