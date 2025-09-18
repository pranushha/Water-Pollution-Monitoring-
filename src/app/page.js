"use client"

import { useState } from "react"
import DisasterFeed from '../components/disaster-feed';
import Analytics from '../components/analytics';
import AlertSystem from '../components/alert-system';
import AlertSystemNC from '../components/alert-system-nc';
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
      case "analytics":
        return <Analytics />
      case "alerts":
        return <AlertSystemNC />
      case "user":
        return <UserManagement />
      default:
        return <DisasterFeed />
    }
  };

  
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

