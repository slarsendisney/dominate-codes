function generatePreview(shape, dimensions, x, y) {
  const { height, width } = dimensions
  const dict = {}
  switch(shape) {
    case "horizontal_bar":
      for(var i=0; i<height; ++i){
        if (!dict[x]) {
          dict[x] = { [i]: true }
        } else{
          dict[x][i] = true
        }
      }
      break;
    case "vertical_bar":
      for (var i=0; i<width; ++i){
        if (!dict[i]) {
          dict[i] = { [y]: true }
        } else{
          dict[i][y] = true
        }
      }
      break;
    default:
      // shouldn't happen
      console.error("Received unknown shape")
  }
  return dict
}

export default generatePreview