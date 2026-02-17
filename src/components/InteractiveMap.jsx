import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { divIcon } from 'leaflet'

// Custom map controller to handle animations
function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 2.5,
      easeLinearity: 0.25,
    })
  }, [center, zoom, map])
  return null
}

const customIcon = (color = '#d9b66e') =>
  divIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 15px ${color};
      animation: pulse 2s infinite;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })

const locations = {
  samarkand: [39.6542, 66.9597],
  sarai: [48.708, 44.5133], // Approximate Sarai Berke (Volgograd region)
  terek: [43.5, 47.0], // Terek River region
  delhi: [28.6139, 77.209],
  ankara: [39.9334, 32.8597],
  beijing: [39.9042, 116.4074],
  herat: [34.3529, 62.204],
  tabriz: [38.0962, 46.2919],
}

const paths = {
  north: [locations.samarkand, locations.sarai],
  terek: [locations.sarai, locations.terek],
  india: [locations.samarkand, locations.herat, locations.delhi],
  west: [locations.samarkand, locations.tabriz, locations.ankara],
  silk: [locations.samarkand, locations.beijing],
}

export default function InteractiveMap({ activeSlide }) {
  // Determine map view based on slide
  let center = locations.samarkand
  let zoom = 5
  let activePaths = []
  let activeMarkers = ['samarkand']

  switch (activeSlide.id) {
    case 1: // Overview
      center = [42.0, 75.0]
      zoom = 4
      activeMarkers = Object.keys(locations)
      break
    case 2: // Golden Horde
      center = locations.sarai
      zoom = 6
      activePaths = [paths.north]
      activeMarkers = ['samarkand', 'sarai']
      break
    case 3: // Terek
      center = locations.terek
      zoom = 6
      activePaths = [paths.terek]
      activeMarkers = ['sarai', 'terek']
      break
    case 4: // India
      center = locations.delhi
      zoom = 6
      activePaths = [paths.india]
      activeMarkers = ['samarkand', 'herat', 'delhi']
      break
    case 5: // Ankara
      center = locations.ankara
      zoom = 6
      activePaths = [paths.west]
      activeMarkers = ['samarkand', 'tabriz', 'ankara']
      break
    case 6: // China
      center = locations.beijing
      zoom = 5
      activePaths = [paths.silk]
      activeMarkers = ['samarkand', 'beijing']
      break
    default:
      center = locations.samarkand
      zoom = 5
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
      <MapContainer
        center={locations.samarkand}
        zoom={5}
        style={{ height: '100%', width: '100%', backgroundColor: '#F5E6D3' }}
        zoomControl={false}
        attributionControl={false}
      >
        <MapController center={center} zoom={zoom} />
        
        {/* Light, historical parchment style map tiles with labels */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
        />

        {/* Polylines for routes */}
        {activePaths.map((path, index) => (
          <Polyline
            key={index}
            positions={path}
            pathOptions={{
              color: '#8B4513', // SaddleBrown for routes (ink style)
              weight: 3,
              dashArray: '10, 10',
              opacity: 0.8,
            }}
          />
        ))}

        {/* Markers */}
        {Object.entries(locations).map(([key, position]) => (
          <Marker
            key={key}
            position={position}
            icon={customIcon(activeMarkers.includes(key) ? '#B8860B' : '#4682B4')} // DarkGoldenRod vs SteelBlue
            opacity={activeMarkers.includes(key) ? 1 : 0.7}
          >
            <Popup className="custom-popup">
              <span className="font-serif font-bold uppercase text-midnight">
                {key}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend / Overlay */}
      <div className="absolute bottom-6 right-6 z-[1000] rounded-xl bg-[#F5E6D3]/90 p-4 text-xs text-[#1a237e] backdrop-blur-md border border-[#8B4513]/20 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-3 w-3 rounded-full border-2 border-[#1a237e] bg-[#B8860B] shadow-sm"></span>
          <span className="font-serif font-semibold">Active Location</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1 w-8 border-b-2 border-dashed border-[#8B4513]"></span>
          <span className="font-serif font-semibold">Campaign Route</span>
        </div>
      </div>
    </div>
  )
}
