export async function geocodeAddress(address: string) {
  const apiKey = process.env.OPENCAGE_API_KEY; // Add this in your .env
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return { latitude: lat, longitude: lng };
  }

  return { latitude: null, longitude: null };
}
