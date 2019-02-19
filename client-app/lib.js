const getHexColor = (str) => {
  if (!str)
    return ''

  let hash = 5
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return 'background-color: ' + colour + ';'
}

module.exports = {
  getHexColor,
}
