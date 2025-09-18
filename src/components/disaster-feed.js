"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, AlertTriangle, Factory, Wind, Leaf, FlaskConical, Droplet } from "lucide-react"
import styles from "../styles/disaster-feed.module.css"

// Use named export instead of default export
export function DisasterFeed() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const disasterEvents = [
    {
      id: 1,
      type: "high turbidity event",
      title: "High Turbidity Event",
      location: "Kaveri River, Mysuru Station",
      severity: "critical",
      time: "10 mins ago",
      credibility: 92,
      icon: <AlertTriangle />,
    },
    {
      id: 2,
      type: "low dissolved oxygen",
      title: "Low Dissolved Oxygen",
      location: "Indus River, Sindh Station",
      severity: "high",
      time: "25 mins ago",
      credibility: 88,
      icon: <Wind />,
    },
    {
      id: 3,
      type: "agricultural runoff",
      title: "Agricultural Runoff",
      location: "Brahmaputra River, Guwahati Station",
      severity: "moderate",
      time: "3 hour ago",
      credibility: 80,
      icon: <Leaf />,
    },
    {
      id: 4,
      type: "sewage overflow",
      title: "Sewage Overflow",
      location: "Yamuna River, Delhi Station",
      severity: "moderate",
      time: "2 hours ago",
      credibility: 85,
      icon: <Droplet />,
    },
    {
      id: 5,
      type: "industrial discharge",
      title: "Industrial Discharge",
      location: "Ganga River, Kanpur Station",
      severity: "high",
      time: "3 hours ago",
      credibility: 92,
      icon: <Factory />,
    },
    {
    id: 6,
      type: "chemical spill",
      title: "Chemical Spill",
      location: "Narmada River, Jabalpur Station",
      severity: "moderate",
      time: "10 mins ago",
      credibility: 83,
      icon: <FlaskConical />,
    },
  ]

  const filteredEvents = disasterEvents
    .filter((event) => {
      // Filter by type
      if (filterType !== "all" && event.type !== filterType) return false

      // Search term
      if (
        searchTerm &&
        !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "critical") {
        const severityOrder = { critical: 3, high: 2, moderate: 1 }
        return severityOrder[b.severity] - severityOrder[a.severity]
      }
      // For simplicity, we'll just use the id for newest (assuming higher id = newer)
      return b.id - a.id
    })

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "critical":
        return styles.critical
      case "high":
        return styles.high
      case "moderate":
        return styles.moderate
      default:
        return ""
    }
  }

  return (
    <div className={styles.disasterFeedContainer}>
      <div className={styles.feedHeader}>
        <h2>Real-Time Water Quality Feed</h2>
        <p>Live Monitoring of Water Pollution Worldwide</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by event or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <Filter className={styles.filterIcon} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="sewage overflow">Sewage Overflow</option>
              <option value="industrial discharge">Industrial Discharge</option>
              <option value="agricultural runoff">Agricultural Runoff</option>
              <option value="low dissolved oxygen">Low Dissolved Oxygen</option>
              <option value="high turbidity event">High Turbidity Event</option>
              <option value="chemical spill">Chemical Spill</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <ArrowUpDown className={styles.filterIcon} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="critical">Most Critical</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.eventsList}>
        {filteredEvents.map((event) => (
          <div key={event.id} className={`${styles.eventCard} ${getSeverityClass(event.severity)}`}>
            <div className={styles.eventIcon}>{event.icon}</div>
            <div className={styles.eventContent}>
              <div className={styles.eventHeader}>
                <h3>{event.title}</h3>
                <span className={styles.eventTime}>{event.time}</span>
              </div>
              <div className={styles.eventLocation}>{event.location}</div>
              <div className={styles.eventFooter}>
                <div className={styles.severityIndicator}>
                  {event.severity === "critical" && "🔴 Critical"}
                  {event.severity === "high" && "🟠 High Risk"}
                  {event.severity === "moderate" && "🟡 Moderate"}
                </div>
                <div className={styles.credibilityScore}>Credibility: {event.credibility}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Add default export that references the named export
export default DisasterFeed

