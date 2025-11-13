import { Box, TextField } from '@mui/material'
import { useState } from 'react'

export default function AreaFilters({ onChange }){
  const [q, setQ] = useState('')
  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <TextField
        label="Haku (nimi)"
        value={q}
        onChange={e => {
          const v = e.target.value
          setQ(v)
          onChange?.({ q: v })
        }}
      />
    </Box>
  )
}
