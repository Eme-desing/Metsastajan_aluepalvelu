import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAreas } from '../api/areas'
import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material'
import axios from 'axios'

// --- Open-Meteo API (ECMWF-malli) ---
async function getForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/ecmwf?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode&forecast_days=7&timezone=auto&windspeed_unit=ms&temperature_unit=celsius&precipitation_unit=mm`
  const { data } = await axios.get(url)
  return data
}

// --- Sääsymbolien muunnos Open-Meteo weathercode-arvosta ---
function getWeatherIcon(code) {
  if (code === null || code === undefined) return '❓'
  if ([0].includes(code)) return '☀️'
  if ([1, 2, 3].includes(code)) return '🌤️'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55, 56, 57, 61, 63, 65].includes(code)) return '🌧️'
  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return '🌨️'
  if ([80, 81, 82].includes(code)) return '🌦️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '❓'
}

export default function PermitsWeather() {
  const { areaId } = useParams()
  const { data } = useQuery({ queryKey: ['areas'], queryFn: getAreas })
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!data) return
    const f = data.features.find(ft => String(ft.properties.id) === String(areaId))
    if (!f) return

    const [lat, lon] =
      f.geometry.type === 'Point' && f.geometry.coordinates.length >= 2
        ? [f.geometry.coordinates[1], f.geometry.coordinates[0]]
        : [f.properties.center?.lat ?? 60.17, f.properties.center?.lon ?? 24.94]

    getForecast(lat, lon)
      .then(setWeather)
      .catch(err => {
        console.error(err)
        setError('Säätietojen haku epäonnistui')
      })
  }, [data, areaId])

  if (!data) return <p>Ladataan alueita…</p>
  const feature = data.features.find(f => String(f.properties.id) === String(areaId))
  if (!feature) return <p>Aluetta ei löytynyt.</p>

  const safeValue = (val, decimals = 1) =>
    val === null || val === undefined || isNaN(val) ? '-' : val.toFixed(decimals)

  const fixWind = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '-'
    const wind = value > 40 ? value / 3.6 : value
    return safeValue(wind)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Sääennuste – {feature.properties.name}</Typography>

            {error && <Typography color="error">{error}</Typography>}

            {!weather ? (
              <Typography>Ladataan säätietoja…</Typography>
            ) : (
              <div style={{ maxHeight: 350, overflow: 'auto' }}>
                {weather.daily.time.map((d, i) => (
                  <div key={d} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                    <strong>
                      {getWeatherIcon(weather.daily.weathercode[i])}{' '}
                      {new Date(d).toLocaleDateString('fi-FI', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </strong>
                    <div>
                      Lämpötila: {safeValue(weather.daily.temperature_2m_min[i])}…{safeValue(weather.daily.temperature_2m_max[i])} °C
                    </div>
                    <div>Sade: {safeValue(weather.daily.precipitation_sum[i])} mm</div>
                    <div>Tuuli max: {fixWind(weather.daily.wind_speed_10m_max[i])} m/s</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
