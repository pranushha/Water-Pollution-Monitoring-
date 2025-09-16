"use client"

import { useState } from "react"
import { Bell, Settings, Moon, Sun, User } from "lucide-react"
import styles from "../styles/header.module.css"

// Use named export instead of default export
export function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "🚨 [Critical Alert] 7.2 Earthquake detected in Tokyo, Japan", time: "2 mins ago" },
    { id: 2, message: "🔥 New wildfire reported in Northern California", time: "15 mins ago" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle("dark")
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>BluePulse</h1>
        <span className={styles.tagline}>Real-time water pollution monitoring</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.notificationWrapper}>
          <button className={styles.iconButton} onClick={() => setShowNotifications(!showNotifications)}>
            <Bell />
            {notifications.length > 0 && <span className={styles.notificationBadge}>{notifications.length}</span>}
          </button>

          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <h3>Notifications</h3>
              {notifications.map((notification) => (
                <div key={notification.id} className={styles.notificationItem}>
                  <p>{notification.message}</p>
                  <span className={styles.notificationTime}>{notification.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className={styles.iconButton} onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
        </button>

        <button className={styles.iconButton}>
          <Settings />
        </button>

        <div className={styles.userProfile}>
          <User />
          <span>Admin</span>
        </div>
      </div>
    </header>
  )
}

// Add default export that references the named export
export default Header

