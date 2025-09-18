"use client"

import { useState } from "react"
import { User, UserPlus, UserCheck, UserX, Moon, Sun } from "lucide-react"
import styles from "../styles/user-management.module.css"

// Use named export instead of default export
export function UserManagement() {
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("english")
  const [regions, setRegions] = useState({
    ganga: true,
    yamuna: true,
    brahmaputra: false,
    indus: true,
    kaveri: false,
    narmada: false,
  })

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Pranusha Shinde",
      email: "pranusha.s@gmail.com",
      role: "Goverment official",
      status: "Active",
      lastActive: "5 mins ago",
    },
    {
      id: 2,
      name: "Aayushi Maindalkar",
      email: "aayushi.m@gmail.com",
      role: "Citizen",
      status: "Active",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Nupur Sapar",
      email: "nupur.sapar@gmail.com",
      role: "NGO",
      status: "Inactive",
      lastActive: "2 days ago",
    },
    {
      id: 4,
      name: "Tanvi Kirloskar",
      email: "tanvi.k@gmail.com",
      role: "Citizen",
      status: "Inactive",
      lastActive: "1 week ago",
    },
  ])

  const toggleRegion = (region) => {
    setRegions({
      ...regions,
      [region]: !regions[region],
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
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
                <option value="kannada">Kannada</option>
                <option value="telugu">Telugu</option>
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
            <h3>Monitored Rivers</h3>
            <p>Select rivers to receive priority alerts</p>

            <div className={styles.regionsGrid}>
              <div className={styles.regionItem}>
                <input type="checkbox" id="ganga" checked={regions.ganga} onChange={() => toggleRegion("ganga")} />
                <label htmlFor="ganga">Ganga</label>
              </div>
              <div className={styles.regionItem}>
                <input
                  type="checkbox"
                  id="yamuna"
                  checked={regions.yamuna}
                  onChange={() => toggleRegion("yamuna")}
                />
                <label htmlFor="brahmaputra">Yamuna</label>
              </div>
              <div className={styles.regionItem}>
                <input type="checkbox" id="brahmaputra" checked={regions.brahmaputra} onChange={() => toggleRegion("brahmaputra")} />
                <label htmlFor="brahmaputra">Brahmaputra</label>
              </div>
              <div className={styles.regionItem}>
                <input
                  type="checkbox"
                  id=""
                  checked={regions.indus}
                  onChange={() => toggleRegion("indus")}
                />
                <label htmlFor="indus">Indus</label>
              </div>
              <div className={styles.regionItem}>
                <input type="checkbox" id="kaveri" checked={regions.kaveri} onChange={() => toggleRegion("kaveri")} />
                <label htmlFor="kaveri">Kaveri</label>
              </div>
              <div className={styles.regionItem}>
                <input
                  type="checkbox"
                  id="narmada"
                  checked={regions.narmada}
                  onChange={() => toggleRegion("narmada")}
                />
                <label htmlFor="narmada">Narmada</label>
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
                  <h4>Goverment official</h4>
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
                  <h4>Citizen</h4>
                  <p>Field response team</p>
                </div>
                <div className={styles.permissionsList}>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> View Alerts
                  </div>
                  <div className={styles.permissionItem}>
                   <span className={styles.xmark}>✗</span> Send Updates
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.checkmark}>✓</span> View Analytics
                  </div>
                  <div className={styles.permissionItem}>
                    <span className={styles.xmark}>✗</span> Manage Users
                  </div>
                </div>
              </div>

              <div className={styles.roleRow}>
                <div className={styles.roleHeader}>
                  <h4>NGO</h4>
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

// Add default export that references the named export
export default UserManagement

