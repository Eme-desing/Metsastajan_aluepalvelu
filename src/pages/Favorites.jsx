import { useQuery } from '@tanstack/react-query'
import { getAreas } from '../api/areas'
import { useFavorites } from '../store/favorites'
import { Card, CardContent, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Favorites(){
  const { fav, toggle } = useFavorites()
  const { data } = useQuery({ queryKey: ['areas'], queryFn: getAreas })
  if (!data) return <p>Ladataan…</p>
  const items = data.features.filter(f => fav.includes(String(f.properties.id)))
  if (items.length === 0) return <p>Ei suosikkeja vielä.</p>
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map(f => (
        <Card key={f.properties.id} variant="outlined">
          <CardContent>
            <Typography variant="h6">{f.properties.name}</Typography>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button component={Link} to={`/species/${f.properties.id}`} variant="outlined">Metsästysajat</Button>
              <Button component={Link} to={`/permits/${f.properties.id}`} variant="outlined">sää</Button>
              <Button onClick={() => toggle(String(f.properties.id))} color="error">Poista suosikeista</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
