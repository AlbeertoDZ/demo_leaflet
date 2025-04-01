const mapId = "map";
const initialCoordinates = [0, 0];
const map = L.map(mapId).setView(initialCoordinates, 1);
L.tileLayer(
  "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 10,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);

const posicionPueblo = L.marker([43.0307095, -5.2682991, 17])
  .bindPopup("<b>Hola!</b><br>Este es mi pueblo")
  .openPopup()
  .addTo(map);

// const posicionMia = L.marker([40.4215, -3.6712])
//   .bindPopup("<b>Hola!</b><br>Aqui estoy!")
//   .openPopup()
//   .addTo(map)

//1- Obtener posicionamiento en un mapa.

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(
      `Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`
    );
    const posicionMia = L.marker([40.4215, -3.6712])
      .bindPopup("<b>Hola!</b><br>Aqui estoy!")
      .openPopup()
      .addTo(map);
  });
}

/*
Tareas:
2. Dibujar en un mapa las coordenadas de posiciones donde hay terremotos

Petición HTTP para obtener los terremotos disponibles en la API
Dibujar los marcadores de cada terremoto en el mapa
Añadir popup en cada marcador con los siguientes datos:
Título
Fecha del evento
Ubicación
Código
Magnitud con el tipo de medida
Personalizar iconos por color para los marcadores según la magnitud del terremoto (colores entre 0-7)
*/

// async function getinfo() {
//   const terremotos = await fetch(`./json/data.json`);
//   const data = await terremotos.json();
//   let title = data.features.title;
//   console.log(title);
//   return title;
// }
// getinfo();

//2 Ejercicio 2
//Petición HTTP para obtener los terremotos disponibles en la API
async function getData() {
  try {
    // 1 - Obtención de datos
    const response = await fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
    );
    //Verificar si la respuesta es exitosa
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }
    const data = await response.json();
    const terremotos = data.features;
    console.log(terremotos);

    // Tratamiento + representar gráficamente los datos. Pasos 2-3
    
  } catch (error) {
    // Manejar el error de manera personalizada
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}
getData();

//Dibujar los marcadores de cada terremoto en el mapa
