"use client"

import { AlertTriangle, Map, BarChart2, Bell, UserCog } from "lucide-react"
import styles from "../styles/sidebar.module.css"

// Use named export instead of default export
export function SideBar({ activePanel, setActivePanel }) {
  const menuItems = [
    { id: "feed", label: "Disaster Feed", icon: <AlertTriangle /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 /> },
    { id: "alerts", label: "Alert System", icon: <Bell /> },
    { id: "user", label: "User Management", icon: <UserCog /> },
  ]

  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`${styles.navButton} ${activePanel === item.id ? styles.active : ""}`}
                onClick={() => setActivePanel(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.statusSection}>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>System Status</span>
          <span className={styles.statusValue}>
            <span className={styles.statusIndicator}></span>
            Operational
          </span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Last Updated</span>
          <span className={styles.statusValue}>2 mins ago</span>
        </div>
      </div>
    </div>
  )
}

// Add default export that references the named export
export default SideBar

