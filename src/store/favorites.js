import { useEffect, useState } from 'react'
const KEY = 'favAreas'

export function useFavorites(){
  const [fav, setFav] = useState(() => JSON.parse(localStorage.getItem(KEY) || '[]'))
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(fav)), [fav])
  const toggle = (areaId) => setFav(arr => arr.includes(areaId) ? arr.filter(id => id !== areaId) : [...arr, areaId])
  const isFav = (areaId) => fav.includes(areaId)
  return { fav, toggle, isFav }
}
