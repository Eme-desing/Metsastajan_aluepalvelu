import axios from 'axios'

export async function getAreas(){
  const res = await axios.get('/areas.geojson')
  // Normalize: ensure properties.id exists as string
  const gj = res.data
  gj.features.forEach((f, i) => {
    if (!f.properties) f.properties = {}
    f.properties.id = String(f.properties.id ?? i+1)
    f.properties.name = f.properties.name ?? `Alue ${i+1}`
  })
  return gj
}
