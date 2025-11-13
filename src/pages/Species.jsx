import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAreas } from '../api/areas'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material'

export default function Species(){
  const { areaId } = useParams()
  const { data } = useQuery({ queryKey: ['areas'], queryFn: getAreas })
  if (!data) return <p>Ladataan…</p>
  const feature = data.features.find(f => String(f.properties.id) === String(areaId))
  if (!feature) return <p>Aluetta ei löytynyt.</p>
  const species = feature.properties.species || []
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Metsästysajat – {feature.properties.name}</Typography>
        {species.length === 0 ? <Typography>Ei lajilistaa.</Typography> : (
          <List>
            {species.map((s, i) => (
              <ListItem key={i}>
                <ListItemText primary={s.name} secondary={s.season ? `Kausi: ${s.season.start} – ${s.season.end}` : ''} />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="caption">Tarkista aina ajantasaiset säädökset viranomaislähteistä.</Typography>
      </CardContent>
    </Card>
  )
}
