// haversine great circle distance
export const distance = (pt1, pt2) => {
  const [lng1, lat1] = pt1;
  const [lng2, lat2] = pt2;
  if (lat1 === lat2 && lng1 === lng2) {
    return 0;
  }

  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;

  var theta = lng1 - lng2;
  var radtheta = (Math.PI * theta) / 180;

  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  return dist * 60 * 1.1515 * 1.609344;
};

export const pathCost = path => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};

export const counterClockWise = (p, q, r) => {
  return (q[0] - p[0]) * (r[1] - q[1]) < (q[1] - p[1]) * (r[0] - q[0]);
};

export const intersects = (a, b, c, d) => {
  return (
    counterClockWise(a, c, d) !== counterClockWise(b, c, d) &&
    counterClockWise(a, b, c) !== counterClockWise(a, b, d)
  );
};

export const setDifference = (setA, setB) => {
  const ret = new Set(setA);
  setB.forEach(p => {
    ret.delete(p);
  });
  return ret;
};

export const rotateToStartingPoint = (path, startingPoint) => {
  const startIdx = path.findIndex(p => p === startingPoint);
  path.unshift(...path.splice(startIdx, path.length));
};
