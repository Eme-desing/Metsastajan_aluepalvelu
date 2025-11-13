import axios from "axios";

// Open-Meteo: käytetään metno-mallia (luotettava yksikköjen suhteen)
export async function getForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/metno?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode&forecast_days=7&timezone=auto&temperature_unit=celsius&precipitation_unit=mm&windspeed_unit=ms`;

  const { data } = await axios.get(url);

  // --- Varmistetaan realistiset tuulet ---
  if (data?.daily?.wind_speed_10m_max) {
    data.daily.wind_speed_10m_max = data.daily.wind_speed_10m_max.map(v => {
      // jos arvo yli 40, se on todennäköisesti km/h → jaetaan 3.6:lla
      if (v > 40) return v / 3.6;
      // jos arvo 0-40, jätetään sellaisenaan (m/s)
      return v;
    });
  }

  return data;
}
