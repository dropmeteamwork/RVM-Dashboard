# RVM Dashboard - Endpoint Integration Guide

## Overview
All new endpoints have been successfully integrated into the RVM Dashboard. This document outlines the changes made and how to use the new API functions.

---

## New Endpoints Added

### 1. **Overview Metrics**
- **Endpoint**: `GET /dashboard/v2/metrics/overview/?months={months}`
- **Function**: `getOverviewMetrics(months = 12)`
- **Used in**: `OverViewPage.jsx`
- **Returns**: 
  - Total Users section
  - Active Partners section
  - System Uptime section
  - Total Revenue section
  - User Engagement section
  - User Retention section
  - Network Performance section
  - Material Distribution section

### 2. **User Analytics**
- **Endpoint**: `GET /dashboard/v2/analytics/user-data/`
- **Function**: `getUserAnalytics()`
- **Used in**: `UserPage.jsx`
- **Returns**:
  - User retention data with cohort analysis
  - Gender distribution statistics

### 3. **Transaction Analytics**
- **Endpoint**: `GET /dashboard/v2/analytics/transactions/`
- **Function**: `getTransactionAnalytics()`
- **Used in**: `TransactionPage.jsx`
- **Returns**:
  - Transaction details section
  - Voucher system performance
  - Referral system performance
  - Point vs Coupons data

### 4. **Analytics Data**
- **Endpoint**: `GET /dashboard/v2/analytics/analytics-data/?months={months}`
- **Function**: `getAnalyticsData(months = 12)`
- **Used in**: `AnalyticsPage.jsx`
- **Returns**:
  - Recycling trends
  - User engagement trends
  - Comprehensive analytics metrics

### 5. **Machine Metrics**
- **Endpoint**: `GET /dashboard/v2/metrics/machines/`
- **Function**: `getMachineMetrics()`
- **Used in**: `MachinePage.jsx`
- **Returns**: Array of machine objects with:
  - Machine name and location
  - Capacity metrics (cans, bottles)
  - Collection statistics
  - Health and efficiency metrics

### 6. **Environmental Metrics**
- **Endpoint**: `GET /dashboard/v2/metrics/environmental/?months={months}`
- **Function**: `getEnvironmentalMetrics(months = 6)`
- **Used in**: `EnvironmentPage.jsx`
- **Returns**:
  - Environmental impact summary (CO2, water, energy)
  - Monthly environmental impact trends
  - Carbon footprint reduction metrics

---

## Helper Functions (Utility Functions)

These functions combine multiple endpoints and return aggregated data:

### `fetchOverviewData(months = 12)`
Fetches overview metrics data. Useful for complete dashboard overview.

**Example Usage**:
```javascript
import { fetchOverviewData } from '../services/api';

const data = await fetchOverviewData(12);
console.log(data.Total_Users_section);
```

### `fetchAnalyticsData(months = 12)`
Fetches all analytics data in a single call using Promise.all().

**Example Usage**:
```javascript
import { fetchAnalyticsData } from '../services/api';

const data = await fetchAnalyticsData(12);
console.log(data.userData);
console.log(data.transactions);
console.log(data.analytics);
```

### `fetchMachineData()`
Fetches machine metrics data.

**Example Usage**:
```javascript
import { fetchMachineData } from '../services/api';

const machines = await fetchMachineData();
machines.forEach(machine => console.log(machine.name));
```

### `fetchEnvironmentalData(months = 6)`
Fetches environmental metrics data.

**Example Usage**:
```javascript
import { fetchEnvironmentalData } from '../services/api';

const envData = await fetchEnvironmentalData(6);
console.log(envData.env_info.co2_emissions_saved);
```

---

## Updated Pages

### 1. **OverViewPage.jsx**
- ✅ Updated to use `getOverviewMetrics()`
- ✅ Displays all overview metrics
- ✅ Month selector for 6 and 12 months

### 2. **AnalyticsPage.jsx**
- ✅ Updated to use `getAnalyticsData()`
- ✅ Displays user engagement trends
- ✅ Displays recycling trends
- ✅ Shows comprehensive analytics dashboard

### 3. **MachinePage.jsx**
- ✅ Updated to use `getMachineMetrics()`
- ✅ Displays machine cards with all metrics
- ✅ Real-time machine status

### 4. **EnvironmentPage.jsx**
- ✅ Updated to use `getEnvironmentalMetrics()`
- ✅ Displays environmental impact summary
- ✅ Shows monthly trends with month selector
- ✅ Carbon footprint reduction metrics

### 5. **UserPage.jsx**
- ✅ Updated to use `getUserAnalytics()`
- ✅ Displays user retention data
- ✅ Shows gender distribution

### 6. **TransactionPage.jsx**
- ✅ Updated to use `getTransactionAnalytics()`
- ✅ Displays transaction details
- ✅ Voucher system performance
- ✅ Referral system performance
- ✅ Points vs coupons chart

---

## Data Structure Examples

### Overview Metrics Response
```json
{
  "Total_Users_section": {
    "total_users": 823,
    "today_active_users": 0,
    "users_change_from_last_week": "+14.0%"
  },
  "Active_Partners_section": {
    "total_partners": 2,
    "partners_change_from_last_week": "+0.0%"
  },
  "System_Uptime_section": {
    "avg_system_uptime": "93.8%",
    "analysis_period": "last 30 days"
  },
  "Total_Revenue_section": {
    "revenue_this_month": 1335.22,
    "revenue_change_from_last_month": "-7.0%"
  }
}
```

### Machine Metrics Response
```json
[
  {
    "name": "cairo - 10th of ramdan,",
    "status": "available",
    "cans_capacity": "0.6%",
    "bottles_capacity": "5.8%",
    "total_collected": 80,
    "daily_average": 0.0,
    "efficiency": "0.0%",
    "location_url": "https://maps.google.com/?q=30.0146937114561,31.38483606268007"
  }
]
```

### Environmental Metrics Response
```json
{
  "env_info": {
    "co2_emissions_saved": 848.84,
    "energy_saved": 797.07,
    "water_conserved": 1271.55,
    "total_recycled_items": 12110,
    "carbon_footprint_reduction_percentage": 89.2,
    "trees_equivalent": 38.99
  },
  "monthly_env_impact": {
    "month_labels": ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "co2": [81.3, 32.96, 13.38, 63.48, 7.5, 95.06],
    "water": [121.27, 54.6, 19.64, 68.25, 11.87, 163.69],
    "energy": [76.72, 27.03, 12.87, 79.74, 6.57, 73.29]
  }
}
```

---

## Authentication

All requests automatically include the Bearer token from localStorage:
- Access token is added to the `Authorization` header
- Token refresh is handled automatically on 401 responses
- Failed refresh redirects to login page

---

## Error Handling

All pages include error handling:
```javascript
try {
  const response = await getOverviewMetrics(months);
  setData(response.data);
} catch (err) {
  setError(
    err.response?.data?.detail ||
      err.message ||
      "A network or server error occurred."
  );
}
```

---

## Usage Summary

| Page | Endpoint Function | Data Used |
|------|------------------|-----------|
| OverViewPage | `getOverviewMetrics()` | All metrics overview |
| AnalyticsPage | `getAnalyticsData()` | Trends and analytics |
| MachinePage | `getMachineMetrics()` | Machine status |
| EnvironmentPage | `getEnvironmentalMetrics()` | Environmental impact |
| UserPage | `getUserAnalytics()` | User retention data |
| TransactionPage | `getTransactionAnalytics()` | Transaction & referral data |

---

## Next Steps

1. **Test the endpoints** - Ensure all data loads correctly
2. **Monitor performance** - Check network requests in browser DevTools
3. **Handle edge cases** - Ensure proper error messages for failed requests
4. **Optimize loading** - Consider implementing skeleton screens for better UX

---

## Support

For any issues with the endpoints or integration, check:
1. Network tab in DevTools for API calls
2. Console for error messages
3. LocalStorage for token presence
4. API response format matches the expected structure

