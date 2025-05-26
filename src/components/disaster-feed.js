"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, AlertTriangle, Flame, Droplet } from "lucide-react"
import styles from "../styles/disaster-feed.module.css"

// Use named export instead of default export
export function DisasterFeed() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const disasterEvents = [
    {
      id: 1,
      type: "earthquake",
      title: "6.5 Magnitude Earthquake",
      location: "Los Angeles, CA",
      severity: "critical",
      time: "10 mins ago",
      credibility: 92,
      icon: <AlertTriangle />,
    },
    {
      id: 2,
      type: "wildfire",
      title: "Wildfire",
      location: "Australia",
      severity: "high",
      time: "25 mins ago",
      credibility: 88,
      icon: <Flame />,
    },
    {
      id: 3,
      type: "tsunami",
      title: "Tsunami Warning",
      location: "Japan",
      severity: "moderate",
      time: "1 hour ago",
      credibility: 75,
      icon: <Droplet />,
    },
    {
      id: 4,
      type: "earthquake",
      title: "5.2 Magnitude Earthquake",
      location: "Mexico City, Mexico",
      severity: "moderate",
      time: "2 hours ago",
      credibility: 85,
      icon: <AlertTriangle />,
    },
    {
      id: 5,
      type: "wildfire",
      title: "Forest Fire",
      location: "California, USA",
      severity: "high",
      time: "3 hours ago",
      credibility: 90,
      icon: <Flame />,
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
        <h2>Real-Time Disaster Feed</h2>
        <p>Live updates of disasters happening globally</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by disaster or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <Filter className={styles.filterIcon} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="earthquake">Earthquake</option>
              <option value="wildfire">Wildfire</option>
              <option value="tsunami">Tsunami</option>
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

