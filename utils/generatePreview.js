function generatePreview(shape, dimensions, y, x) {
  const { height, width } = dimensions
  const dict = {}
  switch(shape) {
    case "horizontal_bar":
      for (var i=0; i<width; ++i){
        if (!dict[y]) {
          dict[y] = { [i]: true }
        } else{
          dict[y][i] = true
        }
      }
      break;
    case "vertical_bar":
      for (var i=0; i<height; ++i){
        if (!dict[i]) {
          dict[i] = { [x]: true }
        } else{
          dict[i][x] = true
        }
      }
      break;
    case "short_horizontal_bar":
      var upperLimit = Math.min(x + 4, width)
      for (var i = x; i < upperLimit; ++i){
        if (!dict[y]) {
          dict[y] = { [i]: true }
        } else{
          dict[y][i] = true
        }
      }
      break;
    case "short_vertical_bar":
      var upperLimit = Math.min(y + 4, height)
      for (var i = y; i < upperLimit; ++i){
        if (!dict[i]) {
          dict[i] = { [x]: true }
        } else{
          dict[i][x] = true
        }
      }
      break;
    case "large_square":
      // Work out valid horizontal position of square on anchor
      // check for A-C is valid

      // ABC  DXX
      // XXX  EXX
      // XXX  FXX

      var xRange = [0,0]
      var yRange = [0,0]
      
      if (x - 1 >= 0 && x + 1 < width) {
        // Valid Case B
        xRange = [x-1, x+1]
      } else if (x - 2 >= 0 && x < width) {
        // Valid Case C
        xRange = [x-2, x]
      } else if (x >= 0 && x < width - 2) {
        // Valid Case A
        xRange = [x, x+2]
      } else {
        console.error("Invalid x point given: should not happen")
      }

      if (y - 1 >= 0 && y + 1 < height) {
        // Valid Case E
        yRange = [y-1, y+1]
      } else if ( y - 2 >= 0 && y < height) {
        // Valid Case F
        yRange = [y-2, y]
      } else if ( y >=0 && y < height - 2 ) {
        // Valid Case D
        yRange = [y, y+2]
      } else {
        console.error("Invalid y point given: should not happen")
      }
      
      // now that we have a valid xRange and yRange to draw a square
      for (var i=yRange[0]; i <= yRange[1]; ++i){
        for(var j=xRange[0]; j <= xRange[1]; ++j) {
          if (!dict[i]) {
            dict[i] = { [j]: true }
          } else{
            dict[i][j] = true
          }
        }
      }

      break;
    case "left_boot":
      var xRange = [0,0]
      var yRange = [0,0]

      // A or B case horizontally
      // D, E, F case vertically

      if ( x >= 0 && x < width - 1 ) {
        // Valid Case A
        xRange = [x, x+1]
      } else if (x - 1 >= 0 && x < width - 1) {
        // Valid Case B
        xRange = [x-1, x]
      } else if (x - 1 >= 0 && x === width - 1) {
        xRange = [x-1, x]
      } else {
        console.error("Invalid x point given: should not happen")
      }

      if ( y >= 0 && y < height - 2) {
        // Valid upright left boot
        yRange = [y, y+2]
      } else if ( y - 2 >= 0 && y < height) {
        // Valid upside down left boot
        yRange = [y-2, y]
      } else {
        console.error("Invalid y point given: should not happen")
      }

      for (var i=xRange[0]; i <= xRange[1]; ++i) {
        // make a column in the A column of the boot
        if (x === width - 1) {
          for (var j=yRange[0]; j <= yRange[1]; ++j) {
            if (!dict[j]) {
              dict[j] = { [xRange[0]]: true }
            } else{
              dict[j][xRange[0]] = true
            }
          }
        } else if (i === xRange[0]) {
          for (var j=yRange[0]; j <= yRange[1]; ++j) {
            if (!dict[j]) {
              dict[j] = { [i]: true }
            } else{
              dict[j][i] = true
            }
          }
        } else {
          if (!dict[yRange[0]]) {
            dict[yRange[0]] = { [i]: true }
          } else{
            dict[yRange[0]][i] = true
          }
        }
      }

      break;
    // case "right_boot":
    //   var xRange = [0,0]
    //   var yRange = [0,0]

    //   // A or B case horizontally
    //   // D, E, F case vertically

    //   if (x - 1 >= 0 && x < width) {
    //     // Valid Case B
    //     console.log("Valid Case B")
    //     xRange = [x-1, x]
        
    //   } else if ( x >= 0 && x < width - 1 ) {
    //     // Valid Case A
    //     console.log("Valid Case A")
    //     xRange = [x, x+1]
    //   } else {
    //     console.error("Invalid x point given: should not happen")
    //   }

    //   if ( y >= 0 && y < height - 2) {
    //     // Valid upright left boot
    //     console.log("valid upright left boot")
    //     yRange = [y, y+2]
    //   } else if ( y - 2 >= 0 && y < height) {
    //     // Valid upside down left boot
    //     console.log("valid upside down left boot")
    //     yRange = [y-2, y]
    //   } else {
    //     console.error("Invalid y point given: should not happen")
    //   }

    //   console.log({ xRange, yRange })

    //   for (var i=xRange[0]; i <= xRange[1]; ++i) {
    //     if (i === xRange[1] && x === 0) {
    //       // horizontal edge case
    //       for (var j=yRange[0]; j <= yRange[1]; ++j) {
    //         if (!dict[j]) {
    //           dict[j] = { [xRange[0]]: true }
    //         } else{
    //           dict[j][xRange[0]] = true
    //         }
    //       }
    //     } else if (i === xRange[1]) {
    //       for (var j=yRange[0]; j <= yRange[1]; ++j) {
    //         if (!dict[j]) {
    //           dict[j] = { [i]: true }
    //         } else{
    //           dict[j][i] = true
    //         }
    //       }
    //     } else {
    //       if (!dict[yRange[0]]) {
    //         dict[yRange[0]] = { [i]: true }
    //       } else{
    //         dict[yRange[0]][i] = true
    //       }
    //     }
    //   }

    //   break;
    default:
      // shouldn't happen
      console.error("Received unknown shape")
  }
  return dict
}

export default generatePreview