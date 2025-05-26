"use client"

import { useState } from "react"
import { Bell, BellOff, Settings, Send, Plus, Trash2 } from "lucide-react"
import styles from "../styles/alert-system.module.css"

// Use named export instead of default export
export function AlertSystem() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Critical Alert: 7.2 Earthquake",
      message: "7.2 Earthquake detected in Tokyo, Japan – Immediate response needed!",
      time: "10 mins ago",
      read: false,
      type: "critical",
    },
    {
      id: 2,
      title: "High Alert: Wildfire Spreading",
      message: "Wildfire in Northern California expanding rapidly. Evacuation orders issued.",
      time: "45 mins ago",
      read: true,
      type: "high",
    },
    {
      id: 3,
      title: "Moderate Alert: Flood Warning",
      message: "Flood warning issued for coastal areas of Florida due to approaching storm.",
      time: "2 hours ago",
      read: true,
      type: "moderate",
    },
  ])

  const [alertRules, setAlertRules] = useState([
    {
      id: 1,
      name: "Earthquake Alerts",
      condition: "Earthquake > 5.0 magnitude within 100km",
      channels: ["Push", "SMS", "Email"],
      active: true,
    },
    {
      id: 2,
      name: "Wildfire Monitoring",
      condition: "Any wildfire within monitored regions",
      channels: ["Push", "Email"],
      active: true,
    },
    {
      id: 3,
      name: "Tsunami Warnings",
      condition: "Any tsunami warning in Pacific region",
      channels: ["Push", "SMS", "Email"],
      active: true,
    },
  ])

  const [newRule, setNewRule] = useState({
    name: "",
    condition: "",
    channels: [],
  })

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const toggleRuleStatus = (id) => {
    setAlertRules(alertRules.map((rule) => (rule.id === id ? { ...rule, active: !rule.active } : rule)))
  }

  const deleteRule = (id) => {
    setAlertRules(alertRules.filter((rule) => rule.id !== id))
  }

  const toggleChannel = (channel) => {
    if (newRule.channels.includes(channel)) {
      setNewRule({
        ...newRule,
        channels: newRule.channels.filter((c) => c !== channel),
      })
    } else {
      setNewRule({
        ...newRule,
        channels: [...newRule.channels, channel],
      })
    }
  }

  const addNewRule = () => {
    if (newRule.name && newRule.condition && newRule.channels.length > 0) {
      setAlertRules([
        ...alertRules,
        {
          id: Date.now(),
          name: newRule.name,
          condition: newRule.condition,
          channels: newRule.channels,
          active: true,
        },
      ])

      // Reset form
      setNewRule({
        name: "",
        condition: "",
        channels: [],
      })
    }
  }

  return (
    <div className={styles.alertSystemContainer}>
      <div className={styles.alertHeader}>
        <h2>Alert System & Notification Center</h2>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "notifications" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className={styles.tabIcon} />
            Notifications
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "settings" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className={styles.tabIcon} />
            Alert Settings
          </button>
        </div>
      </div>

      {activeTab === "notifications" && (
        <div className={styles.notificationsPanel}>
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
                  {notification.type === "critical" && <Bell className={styles.bellIcon} />}
                  {notification.type === "high" && <Bell className={styles.bellIcon} />}
                  {notification.type === "moderate" && <Bell className={styles.bellIcon} />}
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

          <div className={styles.broadcastPanel}>
            <h3>Send Broadcast Alert</h3>
            <div className={styles.broadcastForm}>
              <div className={styles.formGroup}>
                <label>Alert Title</label>
                <input type="text" placeholder="Enter alert title..." />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea placeholder="Enter alert message..."></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Severity</label>
                <select>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Target Region</label>
                <select>
                  <option value="all">All Regions</option>
                  <option value="namerica">North America</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                </select>
              </div>
              <button className={styles.broadcastButton}>
                <Send className={styles.sendIcon} />
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className={styles.settingsPanel}>
          <div className={styles.existingRules}>
            <div className={styles.rulesHeader}>
              <h3>Alert Rules</h3>
              <p>Configure when and how you receive alerts</p>
            </div>

            <div className={styles.rulesList}>
              {alertRules.map((rule) => (
                <div key={rule.id} className={styles.ruleItem}>
                  <div className={styles.ruleContent}>
                    <div className={styles.ruleHeader}>
                      <h4>{rule.name}</h4>
                      <div className={styles.ruleActions}>
                        <button
                          className={`${styles.toggleButton} ${rule.active ? styles.active : ""}`}
                          onClick={() => toggleRuleStatus(rule.id)}
                        >
                          {rule.active ? <Bell /> : <BellOff />}
                        </button>
                        <button className={styles.deleteButton} onClick={() => deleteRule(rule.id)}>
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                    <p className={styles.ruleCondition}>{rule.condition}</p>
                    <div className={styles.ruleChannels}>
                      {rule.channels.map((channel) => (
                        <span key={channel} className={styles.channelBadge}>
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.addRulePanel}>
            <h3>
              <Plus className={styles.addIcon} />
              Add New Alert Rule
            </h3>
            <div className={styles.addRuleForm}>
              <div className={styles.formGroup}>
                <label>Rule Name</label>
                <input
                  type="text"
                  placeholder="E.g., Major Earthquake Alert"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Condition</label>
                <input
                  type="text"
                  placeholder="E.g., Earthquake > 6.0 magnitude within 200km"
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Notification Channels</label>
                <div className={styles.channelOptions}>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={newRule.channels.includes("Push")}
                      onChange={() => toggleChannel("Push")}
                    />
                    Push Notification
                  </label>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={newRule.channels.includes("SMS")}
                      onChange={() => toggleChannel("SMS")}
                    />
                    SMS
                  </label>
                  <label className={styles.channelOption}>
                    <input
                      type="checkbox"
                      checked={newRule.channels.includes("Email")}
                      onChange={() => toggleChannel("Email")}
                    />
                    Email
                  </label>
                </div>
              </div>
              <button className={styles.addRuleButton} onClick={addNewRule}>
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Add default export that references the named export
export default AlertSystem

