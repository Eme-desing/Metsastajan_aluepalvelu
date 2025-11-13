import { Outlet, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'

export default function App() {
  const loc = useLocation()
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#1b5e20', // 🌲 tumma metsävihreä
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)', // kevyt varjo
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: '#f5f5f5', // vaalea teksti
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            Metsästäjän aluepalvelu
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: '#ffffff',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Kartta
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/favorites"
            sx={{
              color: '#ffffff',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Suosikit
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3, mb: 5 }}>
        <Outlet key={loc.key} />
      </Container>

      <footer style={{ textAlign: 'center', padding: 16, opacity: 0.7 }}>
        <small>© OpenStreetMap. Sää: Open-Meteo.</small>
      </footer>
    </>
  )
}
