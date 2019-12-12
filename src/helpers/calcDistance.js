export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const latDiff = radLat1 - radLat2;
  const lngDiff = (lng1 * Math.PI) / 180 - (lng2 * Math.PI) / 180;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(latDiff / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(lngDiff / 2), 2)
      )
    ) *
    6378.137;

  return s; // 單位千米
};
