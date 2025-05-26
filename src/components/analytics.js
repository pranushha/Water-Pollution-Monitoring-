"use client"

import { useState } from "react"
import { Calendar, Filter, Download, MapPin, Flame, Droplet, AlertTriangle } from "lucide-react"
import styles from "../styles/analytics.module.css"

// Use named export instead of default export
export function Analytics() {
  const [timeRange, setTimeRange] = useState("12months")
  const [disasterType, setDisasterType] = useState("all")
  const [region, setRegion] = useState("global")

  // Mock data for charts
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      earthquake: [12, 8, 15, 10, 7, 9, 14, 11, 13, 9, 7, 10],
      wildfire: [5, 3, 8, 12, 15, 20, 25, 18, 10, 7, 4, 3],
      flood: [8, 10, 15, 18, 12, 9, 7, 5, 8, 12, 15, 10],
      tsunami: [1, 0, 2, 1, 0, 0, 1, 0, 0, 1, 0, 2],
    },
  }
 
  const severityData = {
    critical: 25,
    high: 38,
    moderate: 27,
    low: 10,
  }

  const regionData = {
    "North America": 35,
    Asia: 28,
    Europe: 15,
    "South America": 12,
    Africa: 7,
    Australia: 3,
  }

  // Helper function to render bar chart
  const renderBarChart = (data, maxValue) => {
    return (
      <div className={styles.barChart}>
        {data.map((value, index) => (
          <div key={index} className={styles.barContainer}>
            <div className={styles.bar} style={{ height: `${(value / maxValue) * 100}%` }}>
              <span className={styles.barValue}>{value}</span>
            </div>
            <div className={styles.barLabel}>{monthlyData.labels[index]}</div>
          </div>
        ))}
      </div>
    )
  }

  // Helper function to render pie chart
  const renderPieChart = (data) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0)
    let cumulativePercentage = 0

    return (
      <div className={styles.pieChartContainer}>
        <div className={styles.pieChart}>
          {Object.entries(data).map(([key, value]) => {
            const percentage = (value / total) * 100
            const startPercentage = cumulativePercentage
            cumulativePercentage += percentage

            return (
              <div
                key={key}
                className={styles.pieSlice}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((2 * Math.PI * startPercentage) / 100)}% ${50 - 50 * Math.sin((2 * Math.PI * startPercentage) / 100)}%, ${50 + 50 * Math.cos((2 * Math.PI * cumulativePercentage) / 100)}% ${50 - 50 * Math.sin((2 * Math.PI * cumulativePercentage) / 100)}%, 50% 50%)`,
                }}
              ></div>
            )
          })}
        </div>

        <div className={styles.pieLegend}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: getColorForKey(key) }}></span>
              <span className={styles.legendLabel}>{key}</span>
              <span className={styles.legendValue}>{value}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Helper function to get color for pie chart slices
  const getColorForKey = (key) => {
    const colorMap = {
      critical: "#ff3b30",
      high: "#ff9500",
      moderate: "#ffcc00",
      low: "#34c759",
      "North America": "#5ac8fa",
      Asia: "#007aff",
      Europe: "#5856d6",
      "South America": "#af52de",
      Africa: "#ff2d55",
      Australia: "#ff9500",
    }

    return colorMap[key] || "#8e8e93"
  }

  // Get the appropriate dataset based on filters
  const getChartData = () => {
    if (disasterType === "all") {
      // Sum all disaster types
      return monthlyData.labels.map((_, index) =>
        Object.values(monthlyData.datasets).reduce((sum, dataset) => sum + dataset[index], 0),
      )
    }

    return monthlyData.datasets[disasterType] || []
  }

  const chartData = getChartData()
  const maxValue = Math.max(...chartData)

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <h2>Disaster Analytics & Insights</h2>
        <div className={styles.analyticsControls}>
          <div className={styles.controlGroup}>
            <Calendar className={styles.controlIcon} />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="5years">Last 5 Years</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <Filter className={styles.controlIcon} />
            <select value={disasterType} onChange={(e) => setDisasterType(e.target.value)}>
              <option value="all">All Disasters</option>
              <option value="earthquake">Earthquakes</option>
              <option value="wildfire">Wildfires</option>
              <option value="flood">Floods</option>
              <option value="tsunami">Tsunamis</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <MapPin className={styles.controlIcon} />
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="global">Global</option>
              <option value="namerica">North America</option>
              <option value="samerica">South America</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="australia">Australia</option>
            </select>
          </div>

          <button className={styles.exportButton}>
            <Download className={styles.exportIcon} />
            Export
          </button>
          
        </div>
      </div>
     
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Disaster Frequency Over Time</h3>
            <p>Number of incidents per month</p>
          </div>
          <div className={styles.chartContent}>{renderBarChart(chartData, maxValue)}</div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Disaster Severity Breakdown</h3>
            <p>Distribution by impact level</p>
          </div>
          <div className={styles.chartContent}>{renderPieChart(severityData)}</div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Regional Distribution</h3>
            <p>Incidents by geographic region</p>
          </div>
          <div className={styles.chartContent}>{renderPieChart(regionData)}</div>
        </div>

        <div className={styles.insightsCard}>
          <div className={styles.insightsHeader}>
            <h3>AI-Powered Predictions</h3>
            <p>Based on historical patterns</p>
          </div>
          <div className={styles.insightsList}>
            <div className={styles.insightItem}>
              <div className={styles.insightIcon} style={{ backgroundColor: "#ff9500" }}>
                <Flame size={20} />
              </div>
              <div className={styles.insightContent}>
                <h4>Wildfire Risk Increasing</h4>
                <p>
                  85% probability of increased wildfire activity in California next month based on temperature trends
                  and precipitation data.
                </p>
              </div>
            </div>

            <div className={styles.insightItem}>
              <div className={styles.insightIcon} style={{ backgroundColor: "#007aff" }}>
                <Droplet size={20} />
              </div>
              <div className={styles.insightContent}>
                <h4>Flood Risk Alert</h4>
                <p>Monsoon patterns indicate 70% higher flood risk in Southeast Asia over the next 2 months.</p>
              </div>
            </div>

            <div className={styles.insightItem}>
              <div className={styles.insightIcon} style={{ backgroundColor: "#ff3b30" }}>
                <AlertTriangle size={20} />
              </div>
              <div className={styles.insightContent}>
                <h4>Seismic Activity Warning</h4>
                <p>Recent patterns suggest elevated earthquake risk (65% confidence) along the Pacific Ring of Fire.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add default export that references the named export
export default Analytics

