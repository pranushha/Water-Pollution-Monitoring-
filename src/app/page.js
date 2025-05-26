"use client"

import { useState } from "react"
import DisasterFeed from '../components/disaster-feed';
import MapView from '../components/map-view';
import Analytics from '../components/analytics';
import AlertSystem from '../components/alert-system';
import UserManagement from '../components/user-management';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import styles from '../styles/dashboard.module.css';


export default function Dashboard() {
  const [activePanel, setActivePanel] = useState("feed")

  const renderPanel = () => {
    switch (activePanel) {
      case "feed":
        return <DisasterFeed />
      case "map":
        return <MapView />
      case "analytics":
        return <Analytics />
      case "alerts":
        return <AlertSystem />
      case "user":
        return <UserManagement />
      default:
        return <DisasterFeed />
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        <div className={styles.contentPanel}>{renderPanel()}</div>
      </div>
    </div>
  )
}

