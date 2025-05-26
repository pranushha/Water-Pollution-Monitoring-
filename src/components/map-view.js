"use client"

import { useEffect, useState, useRef } from "react"
import { Layers, MapPin } from "lucide-react"
import styles from "../styles/map-view.module.css"

// Use named export instead of default export
export function MapView() {
  const mapRef = useRef(null)
  const [mapType, setMapType] = useState("street")
  const [selectedDisaster, setSelectedDisaster] = useState(null)

  // Mock disaster data
  const disasters = [
    {
      id: 1,
      type: "earthquake",
      title: "6.8 Magnitude Earthquake",
      location: "Kathmandu, Nepal",
      coordinates: { lat: 27.7172, lng: 85.324 },
      severity: "critical",
      time: "15 mins ago",
      affected: "2,500+",
      confidence: 85,
    },
    {
      id: 2,
      type: "wildfire",
      title: "Forest Fire",
      location: "California, USA",
      coordinates: { lat: 36.7783, lng: -119.4179 },
      severity: "high",
      time: "45 mins ago",
      affected: "1,200+",
      confidence: 92,
    },
    {
      id: 3,
      type: "flood",
      title: "Flash Flooding",
      location: "Mumbai, India",
      coordinates: { lat: 19.076, lng: 72.8777 },
      severity: "moderate",
      time: "2 hours ago",
      affected: "5,000+",
      confidence: 78,
    },
  ]

  // This would normally initialize a map library like Leaflet or Google Maps
  useEffect(() => {
    if (mapRef.current) {
      // In a real implementation, we would initialize the map here
      console.log("Map initialized with type:", mapType)
    }
  }, [mapType])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "#ff3b30"
      case "high":
        return "#ff9500"
      case "moderate":
        return "#ffcc00"
      default:
        return "#34c759"
    }
  }

  return (
    <div className={styles.mapViewContainer}>
      <div className={styles.mapHeader}>
        <h2>Interactive Map View</h2>
        <div className={styles.mapControls}>
          <div className={styles.mapTypeSelector}>
            <Layers className={styles.layersIcon} />
            <select value={mapType} onChange={(e) => setMapType(e.target.value)}>
              <option value="street">Street View</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
            </select>
          </div>

          <div className={styles.mapLegend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.critical}`}></span>
              <span>Critical</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.high}`}></span>
              <span>High</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.moderate}`}></span>
              <span>Moderate</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mapContainer} ref={mapRef}>
        {/* This would be replaced by an actual map in a real implementation */}
        <div className={styles.mockMap}>
          <div className={styles.mapPlaceholder}>
            <p>Interactive Map Would Render Here</p>
            <p className={styles.mapNote}>Using {mapType} view</p>

            {/* Mock disaster markers */}
            {disasters.map((disaster) => (
              <div
                key={disaster.id}
                className={styles.disasterMarker}
                style={{
                  left: `${((disaster.coordinates.lng + 180) / 360) * 100}%`,
                  top: `${((90 - disaster.coordinates.lat) / 180) * 100}%`,
                  backgroundColor: getSeverityColor(disaster.severity),
                }}
                onClick={() => setSelectedDisaster(disaster)}
              >
                <MapPin size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDisaster && (
        <div className={styles.disasterDetails}>
          <button className={styles.closeButton} onClick={() => setSelectedDisaster(null)}>
            ×
          </button>
          <div className={styles.detailsHeader}>
            <h3>{selectedDisaster.title}</h3>
            <span
              className={styles.severityBadge}
              style={{ backgroundColor: getSeverityColor(selectedDisaster.severity) }}
            >
              {selectedDisaster.severity.toUpperCase()}
            </span>
          </div>
          <div className={styles.detailsContent}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>📍 Location:</span>
              <span>{selectedDisaster.location}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>🕒 Reported:</span>
              <span>{selectedDisaster.time}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>👥 Impact:</span>
              <span>{selectedDisaster.affected} affected</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>✅ Verified:</span>
              <span>{selectedDisaster.confidence}% Confidence Score</span>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>View Details</button>
            <button className={styles.actionButton}>Send Alert</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Add default export that references the named export
export default MapView

