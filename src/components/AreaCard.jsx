import { Card, CardContent, CardActions, Typography, Button, LinearProgress } from '@mui/material'
import { Link } from 'react-router-dom'

export default function AreaCard({ area, permit }){
  const pct = permit ? Math.round((permit.sold/permit.total)*100) : null
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{area.name}</Typography>
        {permit ? (
          <>
            <Typography sx={{ mt: 1 }}>Lupamyynti: {permit.sold} / {permit.total}</Typography>
            <LinearProgress variant="determinate" value={pct} sx={{ my: 1 }} />
            <Typography variant="caption">Päivitetty: {new Date(permit.updatedAt).toLocaleString()}</Typography>
          </>
        ) : (
          <Typography variant="body2" sx={{ opacity: .7 }}></Typography>
        )}
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/species/${area.id}`} size="small">Metsästysajat</Button>
        <Button component={Link} to={`/permits/${area.id}`} size="small">sää</Button>
      </CardActions>
    </Card>
  )
}
