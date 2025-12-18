# Quick API Reference

## Export Functions from api.js

### Direct Endpoint Functions
```javascript
import { 
  getOverviewMetrics,
  getUserAnalytics,
  getTransactionAnalytics,
  getAnalyticsData,
  getMachineMetrics,
  getEnvironmentalMetrics
} from '../services/api';
```

### Utility/Helper Functions
```javascript
import { 
  fetchOverviewData,
  fetchAnalyticsData,
  fetchMachineData,
  fetchEnvironmentalData
} from '../services/api';
```

### Default API Instance
```javascript
import api from '../services/api';
// Used for custom requests with auth automatically handled
```

---

## Function Signatures

```javascript
// Overview
getOverviewMetrics(months = 12) → Promise<AxiosResponse>

// User & Transactions
getUserAnalytics() → Promise<AxiosResponse>
getTransactionAnalytics() → Promise<AxiosResponse>
getAnalyticsData(months = 12) → Promise<AxiosResponse>

// Machines
getMachineMetrics() → Promise<AxiosResponse>

// Environment
getEnvironmentalMetrics(months = 6) → Promise<AxiosResponse>

// Utility Functions
fetchOverviewData(months = 12) → Promise<object>
fetchAnalyticsData(months = 12) → Promise<{userData, transactions, analytics}>
fetchMachineData() → Promise<array>
fetchEnvironmentalData(months = 6) → Promise<object>
```

---

## Common Usage Pattern

```javascript
import { useEffect, useState } from 'react';
import { getOverviewMetrics } from '../services/api';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOverviewMetrics(12);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Use data */}</div>;
}
```

---

## All Endpoints Summary

| Endpoint | Function | Base URL |
|----------|----------|----------|
| `/analytics/user-data/` | `getUserAnalytics()` | `https://web-testing-3a06.up.railway.app/dashboard/v2/` |
| `/analytics/transactions/` | `getTransactionAnalytics()` | ↑ |
| `/analytics/analytics-data/?months=X` | `getAnalyticsData(X)` | ↑ |
| `/metrics/machines/` | `getMachineMetrics()` | ↑ |
| `/metrics/overview/?months=X` | `getOverviewMetrics(X)` | ↑ |
| `/metrics/environmental/?months=X` | `getEnvironmentalMetrics(X)` | ↑ |

---

## Response Keys by Endpoint

### Overview Metrics (`getOverviewMetrics`)
- `Total_Users_section`
- `Active_Partners_section`
- `System_Uptime_section`
- `Total_Revenue_section`
- `User_Engagement_section`
- `User_Retention_section`
- `Network_Performance_section`
- `Material_Distribution_section`

### User Analytics (`getUserAnalytics`)
- `user_retention_data`
- `gender_distribution`

### Transaction Analytics (`getTransactionAnalytics`)
- `Transaction_Details_section`
- `Voucher_System_Performance_section`
- `Referral_System_Performance_section`
- `Point_vs_Coupons_section`

### Analytics Data (`getAnalyticsData`)
- `Recycling_Trends_section`
- `UserEngagement_Trends_section`
- `Comprehensive_Analytics_section`

### Machine Metrics (`getMachineMetrics`)
Returns an array of machine objects with:
- `name`, `status`, `cans_capacity`, `bottles_capacity`
- `total_collected`, `daily_average`, `efficiency`, `location_url`

### Environmental Metrics (`getEnvironmentalMetrics`)
- `env_info` (with CO2, water, energy, recycled items, trees equivalent)
- `monthly_env_impact` (with monthly data for CO2, water, energy)

