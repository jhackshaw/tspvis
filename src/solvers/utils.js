

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min
}

export const getRandomPoints = (
  count=12,
  top=90,
  bottom=-90,
  left=-180,
  right=180
) => {
  return Array.from({ length: count }).map(_ => ({
    coordinates: [
      getRandomFloat(left, right),
      getRandomFloat(top, bottom)
    ]
  }))
}

