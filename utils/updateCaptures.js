function updateCaptures(dict, id, shape, dimensions, x, y) {
  const { height, width } = dimensions
  switch (shape) {
    case "horizontal_bar":
      for (var i = 0; i < height; ++i) {
        if (!dict[x]) {
          dict[x] = { [i]: id }
        } else {
          dict[x][i] = id
        }
      }
      break
    case "vertical_bar":
      for (var i = 0; i < width; ++i) {
        if (!dict[i]) {
          dict[i] = { [y]: id }
        } else {
          dict[i][y] = id
        }
      }
      break
      case "short_horizontal_bar":
        var upperLimit = Math.min(y + Math.floor(width / 2), width)
        for (var i=y; i<upperLimit; ++i){
          if (!dict[x]) {
            dict[x] = { [i]: id }
          } else{
            dict[x][i] = id
          }
        }
        break;
  
      case "short_vertical_bar":
        var upperLimit = Math.min(x + Math.floor(height / 2), height)
        for (var i=x; i<upperLimit; ++i){
          if (!dict[i]) {
            dict[i] = { [y]: id }
          } else{
            dict[i][y] = id
          }
        }
        break;
    default:
      // shouldn't happen
      console.error("Received unknown shape")
  }
  return dict
}

module.exports = { updateCaptures }
