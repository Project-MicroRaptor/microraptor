function rad2deg(radians: number) {
  return radians * (180 / Math.PI);
}

function deg2rad(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function minMaxLatitudeFromRadius(latitude: number, radius: number) {
  const max = latitude + rad2deg(radius / 6371);

  const min = latitude - rad2deg(radius / 6371);

  return { min, max };
}

export function minMaxLongitudeFromRadius(
  latitude: number,
  longitude: number,
  radius: number
) {
  const max =
    longitude + rad2deg(Math.asin(radius / 6371)) / Math.cos(deg2rad(latitude));

  const min =
    longitude - rad2deg(Math.asin(radius / 6371)) / Math.cos(deg2rad(latitude));

  return { min, max };
}
