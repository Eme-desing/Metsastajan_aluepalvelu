import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

export default function MapView({ geojson, onAreaClick, center=[64,26], zoom=5 }){
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: 520, borderRadius: 8, overflow: 'hidden' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {geojson && (
        <GeoJSON
          data={geojson}
          onEachFeature={(f, layer) => {
            layer.on('click', () => onAreaClick?.(f.properties))
            layer.bindTooltip(f.properties.name || 'Alue')
          }}
          style={() => ({ color: '#2e7d32', weight: 1, fillColor: '#81c784', fillOpacity: .3 })}
        />
      )}
    </MapContainer>
  )
}
