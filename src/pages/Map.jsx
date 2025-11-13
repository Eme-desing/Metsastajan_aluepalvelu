import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAreas } from '../api/areas'
import { getPermitStats } from '../api/permits'
import MapView from '../components/MapView'
import AreaCard from '../components/AreaCard'
import AreaFilters from '../components/AreaFilters'
import { Grid, Snackbar, Alert, IconButton } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { useFavorites } from '../store/favorites'

export default function Map(){
  const { data: areasGj, isLoading, error } = useQuery({ queryKey: ['areas'], queryFn: getAreas })
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({ q: '' })
  const { fav, toggle, isFav } = useFavorites()
  const [open, setOpen] = useState(false)

  const areas = useMemo(() => {
    if (!areasGj) return []
    return areasGj.features.map(f => ({ id: f.properties.id, name: f.properties.name, center: f.properties.center, properties: f.properties }))
  }, [areasGj])

  const filtered = useMemo(() => {
    return areas.filter(a => a.name.toLowerCase().includes(filters.q.toLowerCase()))
  }, [areas, filters])

  const [permit, setPermit] = useState(null)
  useEffect(() => {
    if (selected){
      getPermitStats(selected.id).then(setPermit)
    }
  }, [selected])

  return (
    <div>
      <AreaFilters onChange={setFilters} />
      {isLoading && <p>Ladataan alueita…</p>}
      {error && <p>Virhe alueita ladattaessa</p>}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          {areasGj && <MapView geojson={areasGj} onAreaClick={(props) => { setSelected(props); setOpen(true); }} />}
        </Grid>
        <Grid item xs={12} md={5}>
          {selected ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ margin: 0 }}>{selected.name}</h2>
                <IconButton onClick={() => toggle(selected.id)} aria-label="toggle favorite">
                  {isFav(selected.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </div>
              <AreaCard area={{ id: selected.id, name: selected.name }} permit={permit} />
            </div>
          ) : <p>Valitse kartalta alue nähdäksesi tiedot.</p>}
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={1500} onClose={() => setOpen(false)}>
        <Alert severity="info" sx={{ width: '100%' }}>Alue valittu</Alert>
      </Snackbar>
    </div>
  )
}
