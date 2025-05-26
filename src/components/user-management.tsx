"use client"

import { useState } from "react"
import { User, UserPlus, UserCheck, UserX, Moon, Sun } from "lucide-react"
import styles from "src/styles/user-management.module.css"

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("english")
  const [regions, setRegions] = useState({
    asia: true,
    namerica: true,
    europe: false,
    samerica: false,
    africa: false,
    australia: false,
  })

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "5 mins ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Responder",
      status: "Active",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.c@example.com",
      role: "Analyst",
      status: "Inactive",
      lastActive: "2 days ago",
    },
  ])

  const toggleRegion = (region: string) => {
    setRegions({
      ...regions,
      [region]: !regions[region as keyof typeof regions],
    })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real app, this would apply dark mode to the entire application
  }

  return (
    <div className={styles.userManagementContainer}>
      <div className={styles.userHeader}>
        <h2>User Management & Customization</h2>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "profile" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className={styles.tabIcon} />
            Profile Settings
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "users" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <UserPlus className={styles.tabIcon} />
            User Management
          </button>
        </div>
      </div>

      {activeTab === "profile" && (
        <div className={styles.profilePanel}>
          <div className={styles.profileSection}>
            <h3>Appearance</h3>
            <div className={styles.settingGroup}>
              <div className={styles.settingLabel}>Theme</div>
              <div className={styles.themeToggle}>
                <button
                  className={`${styles.themeButton} ${!darkMode ? styles.active : ""}`}
                  onClick={() => setDarkMode(false)}
                >
                  <Sun className={styles.themeIcon} />
                  Light
                </button>
                <button
                  className={`${styles.themeButton} ${darkMode ? styles.active : ""}`}
                  onClick={() => setDarkMode(true)}
                >
                  <Moon className={styles.themeIcon} />
                  Dark
                </button>
              </div>
            </div>

            <div className={styles.settingGroup}>
              <div className={styles.settingLabel}>Language</div>
              <select className={styles.languageSelect} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
          </div>

          <div className={styles.profileSection}>
            <h3>Alert Preferences</h3>
            <div className={styles.settingGroup}>
              <div className={styles.settingLabel}>Notification Sound</div>
              <div className={styles.toggleSwitch}>
                <input type="checkbox" id="sound" className={styles.toggleInput} defaultChecked />
                <label htmlFor="sound" className={styles.toggleLabel}></label>
              </div>
            </div>

            <div className={styles.settingGroup}>
              <div className={styles.settingLabel}>Desktop Notifications</div>
              <div className={styles.toggleSwitch}>
                <input type="checkbox" id="desktop" className={styles.toggleInput} defaultChecked />
                <label htmlFor="desktop" className={styles.toggleLabel}></label>
              </div>
            </div>

            <div className={styles.settingGroup}>
              <div className={styles.settingLabel}>SMS Alerts</div>
              <div className={styles.toggleSwitch}>
                <input type="checkbox" id="sms" className={styles.toggleInput} />
                <label htmlFor="sms" className={styles.toggleLabel}></label>
              </div>
            </div>
          </div>

          <div className={styles.profileSection}>
            <h3>Monitored Regions</h3>
            <p>Select regions to receive priority alerts</p>

            <div className={styles.regionsGrid}>
              <div className={styles.regionItem}>
                <input type="checkbox" id="asia" checked={regions.asia} onChange={() => toggleRegion("asia")} />
                <label htmlFor="asia">Asia</label>
              </div>
              <div className={styles.regionItem}>
                <input
                  type="checkbox"
                  id="namerica"
                  checked={regions.namerica}
                  onChange={() => toggleRegion("namerica")}
                />
                <label htmlFor="namerica">North America</label>
              </div>
              <div className={styles.regionItem}>
                <input type="checkbox" id="europe" checked={regions.europe} onChange={() => toggleRegion("europe")} />
                <label htmlFor="europe">Europe</label>
              </div>
              <div className={styles.regionItem}>
                <input
                  type="checkbox"
                  id="samerica"
                  checked={regions.samerica}
                  onChange={() => toggleRegion("samerica")}
                />
                <label htmlFor="samerica">South America</label>
              </div>
              <div className={styles.regionItem}>
                <input type="checkbox" id="africa" checked={regions.africa} onChange={() => toggleRegion("africa")} />
                <label htmlFor="africa">Africa</label>
              </div>
              <div className={styles.regionItem}>
                <input
                  type="checkbox"
                  id="australia"
                  checked={regions.australia}
                  onChange={() => toggleRegion("australia")}
                />
                <label htmlFor="australia">Australia</label>
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            <button className={styles.saveButton}>Save Preferences</button>
            <button className={styles.resetButton}>Reset to Default</button>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className={styles.usersPanel}>
          <div className={styles.usersHeader}>
            <h3>System Users</h3>
            <button className={styles.addUserButton}>
              <UserPlus className={styles.addUserIcon} />
              Add User
            </button>
          </div>

          <div className={styles.usersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Name</div>
              <div className={styles.headerCell}>Email</div>
              <div className={styles.headerCell}>Role</div>
              <div className={styles.headerCell}>Status</div>
              <div className={styles.headerCell}>Last Active</div>
              <div className={styles.headerCell}>Actions</div>
            </div>

            <div className={styles.tableBody}>
              {users.map((user) => (
                <div key={user.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>{user.name}</div>
                  <div className={styles.tableCell}>{user.email}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase()]}`}>{user.role}</span>
                  </div>
                  <div className={styles.tableCell}>
                    <span
                      className={`${styles.statusIndicator} ${user.status === "Active" ? styles.active : styles.inactive}`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className={styles.tableCell}>{user.lastActive}</div>
                  <div className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button className={styles.actionButton} title="Edit User">
                        <User />
                      </button>
                      <button className={styles.actionButton} title="Activate/Deactivate">
                        {user.status === "Active" ? <UserX /> : <UserCheck />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.rolesSection}>
            <h3>Role Permissions</h3>
            <div className={styles.rolesTable}>
              <div className={styles.roleRow}>
                <div className={styles.roleHeader}>
                  <h4>Admin</h4>
                  <p>Full system access</p>
                </div>
                <div className={styles.permissionsList}>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> Manage Users
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> Send Alerts
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> View Analytics
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> System Configuration
                  </div>
                </div>
              </div>

              <div className={styles.roleRow}>
                <div className={styles.roleHeader}>
                  <h4>Responder</h4>
                  <p>Field response team</p>
                </div>
                <div className={styles.permissionsList}>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> View Alerts
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> Send Updates
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> View Map
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.xmark}>✗</span> Manage Users
                  </div>
                </div>
              </div>

              <div className={styles.roleRow}>
                <div className={styles.roleHeader}>
                  <h4>Analyst</h4>
                  <p>Data analysis only</p>
                </div>
                <div className={styles.permissionsList}>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> View Analytics
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> Export Reports
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.xmark}>✗</span> Send Alerts
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.xmark}>✗</span> Manage Users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

