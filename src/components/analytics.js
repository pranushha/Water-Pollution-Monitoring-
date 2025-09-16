"use client"

import styles from "../styles/analytics.module.css"

// Use named export instead of default export
export function Analytics() {
  const streamlitUrl = process.env.REACT_APP_STREAMLIT_URL || "http://localhost:8501";

  return (
    <div className={styles.analyticsContainer}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <h2 style={{ margin: 0, padding: "12px 0" }}>Analytics</h2>
        <div style={{ flex: 1, minHeight: "80vh", borderRadius: 8, overflow: "hidden", border: "1px solid #e5e7eb" }}>
          <iframe
            title="Streamlit Dashboard"
            src={streamlitUrl}
            style={{ width: "100%", height: "100%", border: 0 }}
            allow="clipboard-write; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  )
}

// Add default export that references the named export
export default Analytics