"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import styles from "../styles/alert-system-nc.module.css"

export function AlertSystemNC() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "High Turbidity Event",
      message: "High Turbidity Event in Kaveri River at Mysuru Station – Immediate response needed!",
      time: "10 mins ago",
      read: false,
      type: "critical",
    },
    {
      id: 2,
      title: "Industrial Discharge",
      message: "Industrial Discharge in Ganga River at Kanpur Station. Prevent using water for agriculture purpose.",
      time: "45 mins ago",
      read: true,
      type: "high",
    },
    {
      id: 3,
      title: "Chemical Spill",
      message: "Chemical spill in Narmada River at Jabalpur Station. Water not suitable for drinking purpose.",
      time: "2 hours ago",
      read: true,
      type: "moderate",
    },
  ])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  return (
    <div className={styles.alertSystemContainer}>
      <div className={styles.alertHeader}>
        <h2>Alert System & Notification Center</h2>
      </div>

      <div className={styles.notificationsPanel}>
        <div className={styles.notificationsColumn}>
          <div className={styles.notificationsHeader}>
            <h3>Recent Alerts</h3>
            <div className={styles.notificationControls}>
              <button className={styles.controlButton}>Mark All Read</button>
              <select className={styles.filterSelect}>
                <option value="all">All Alerts</option>
                <option value="unread">Unread Only</option>
                <option value="critical">Critical Only</option>
              </select>
            </div>
          </div>

          <div className={styles.notificationsList}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${!notification.read ? styles.unread : ""} ${styles[notification.type]}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={styles.notificationIcon}>
                  <Bell className={styles.bellIcon} />
                </div>
                <div className={styles.notificationContent}>
                  <div className={styles.notificationHeader}>
                    <h4>{notification.title}</h4>
                    <span className={styles.notificationTime}>{notification.time}</span>
                  </div>
                  <p>{notification.message}</p>
                </div>
                {!notification.read && <div className={styles.unreadIndicator}></div>}
              </div>
            ))}
          </div>

          <div className={styles.sectionDivider}></div>

          <div className={styles.allAlertsSection}>
            <h3 className={styles.sectionTitle}>All Alerts</h3>

            <div className={styles.alertGroup}>
              <h4 className={styles.alertGroupTitle}>Critical</h4>
              {notifications
                .filter((n) => n.type === "critical")
                .map((notification) => (
                  <div key={`critical-${notification.id}`} className={`${styles.notificationItem} ${styles.critical}`}>
                    <div className={styles.notificationIcon}>
                      <Bell className={styles.bellIcon} />
                    </div>
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <h4>{notification.title}</h4>
                        <span className={styles.notificationTime}>{notification.time}</span>
                      </div>
                      <p>{notification.message}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className={styles.alertGroup}>
              <h4 className={styles.alertGroupTitle}>High</h4>
              {notifications
                .filter((n) => n.type === "high")
                .map((notification) => (
                  <div key={`high-${notification.id}`} className={`${styles.notificationItem} ${styles.high}`}>
                    <div className={styles.notificationIcon}>
                      <Bell className={styles.bellIcon} />
                    </div>
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <h4>{notification.title}</h4>
                        <span className={styles.notificationTime}>{notification.time}</span>
                      </div>
                      <p>{notification.message}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className={styles.alertGroup}>
              <h4 className={styles.alertGroupTitle}>Moderate</h4>
              {notifications
                .filter((n) => n.type === "moderate")
                .map((notification) => (
                  <div key={`moderate-${notification.id}`} className={`${styles.notificationItem} ${styles.moderate}`}>
                    <div className={styles.notificationIcon}>
                      <Bell className={styles.bellIcon} />
                    </div>
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <h4>{notification.title}</h4>
                        <span className={styles.notificationTime}>{notification.time}</span>
                      </div>
                      <p>{notification.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertSystemNC
