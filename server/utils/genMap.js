const sharp = require("sharp")
const fs = require("fs")
const dirTree = require("directory-tree")

const colours = {
  1: {
    color: [0, 0, 0],
    omit: true,
  },
  16: {
    color: [255, 255, 255],
    omit: false,
  },
}

Object.defineProperty(Array.prototype, "chunk_inefficient", {
  value: function (chunkSize) {
    var array = this
    return [].concat.apply(
      [],
      array.map(function (elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
      })
    )
  },
})

async function getMeAnImageArray(resolution = 25, imgLink) {
  console.log(imgLink)
  const imageData = fs.readFileSync(imgLink)
  const { width, height } = await sharp(imageData).metadata()
  let pixelWidth = Math.floor((width / height) * resolution)
  let pixelHeight = resolution
  if (width > height * 2) {
    pixelWidth = Math.floor(pixelWidth / 2)
    pixelHeight = Math.floor(pixelHeight / 2)
  }
  const { data, info } = await sharp(imageData)
    .resize({ width: pixelWidth, height: pixelHeight })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixelArray = new Uint8ClampedArray(data.buffer)
  const array = [...pixelArray]
  const rgb = array.chunk_inefficient(3)
  const newPixelArray = rgb.reduce((acc, [r2, g2, b2]) => {
    let distance = Number.MAX_SAFE_INTEGER
    let value = false
    Object.keys(colours).map(id => {
      const {
        color: [r1, g1, b1],
        omit,
      } = colours[id]
      let sumOfSquares = 0
      sumOfSquares += Math.pow((r1 - r2) * 0.3, 2)
      sumOfSquares += Math.pow((g1 - g2) * 0.59, 2)
      sumOfSquares += Math.pow((b1 - b2) * 0.1, 2)
      const difference = Math.sqrt(sumOfSquares)
      if (difference < distance) {
        value = omit
        distance = difference
      }
    })
    acc.push(value)
    return acc
  }, [])

  const omissions = newPixelArray
    .chunk_inefficient(pixelWidth)
    .reduce((acc, cur, x) => {
      cur.map((item, y) => {
        if (!item) {
          if (acc[x]) {
            acc[x][y] = true
          } else {
            acc[x] = {
              [y]: true,
            }
          }
        }
      })
      return acc
    }, {})
  const fullMapData = {
    dimensions: { height: pixelHeight, width: pixelWidth },
    omissions,
  }

  return fullMapData
}

async function main() {
  const tree = dirTree("./server/maps/")
  const maps = {}
  for (const folder of tree.children) {
    const { name, children } = folder

    if (children) {
      const category = name
      const mapsInside = {}
      for (const child of children) {
        try{
          const { path, name, extension } = child
          const mapName = name.replace(extension, "")
          const mapInfo = await getMeAnImageArray(25, path)
          mapsInside[mapName] = mapInfo
        }catch(e){
          console.log(e)
        }
        
      }
      maps[category] = { ...mapsInside }
    }
  }

  console.log("writing")
  fs.writeFileSync("./server/map-data.json", JSON.stringify(maps, null, 4))
}

main()
