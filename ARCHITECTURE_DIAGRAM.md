# 🏗️ RVM Dashboard Architecture & Endpoint Map

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     RVM DASHBOARD (React)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   API Service Layer (api.js)            │
        │                                         │
        │  ✓ Authentication (Bearer Token)        │
        │  ✓ Auto Token Refresh (401 handler)     │
        │  ✓ Error Handling & Logging             │
        │  ✓ Request/Response Interceptors        │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   10 Exported Functions                 │
        │                                         │
        │  📊 Endpoint Functions (6)              │
        │  🔧 Utility Functions (4)               │
        └─────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Direct API  │      │  Utility     │      │  Default API │
│  Functions   │      │  Functions   │      │  Instance    │
│              │      │              │      │              │
│ • Overview   │      │ • fetch...   │      │ • Custom     │
│ • Analytics  │      │   Data()     │      │   requests   │
│ • Machines   │      │              │      │              │
│ • etc.       │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
        https://web-testing-3a06.up.railway.app/
                    dashboard/v2/
                              │
        ┌─────────────────────┼──────────────────────┐
        │                     │                      │
        ▼                     ▼                      ▼
    /metrics/              /analytics/          /auth/
    (overview,             (user-data,          (refresh,
     machines,             transactions,        login)
     environmental)        analytics-data)
```

---

## Component to Endpoint Mapping

```
┌─────────────────────────────────────────────────────────────┐
│                        PAGES                                │
└─────────────────────────────────────────────────────────────┘

1️⃣  OverViewPage.jsx
    │
    ├─ getOverviewMetrics(months)
    │  └─ GET /metrics/overview/?months={12}
    │     └─ Returns: Overview data (users, partners, revenue, etc.)
    │
    ├─ Displays:
    │  ├─ Status Cards (4)
    │  ├─ Metrics Cards (2)
    │  ├─ Network Performance Chart
    │  └─ Material Distribution Chart
    │
    └─ Updated: ✅

2️⃣  AnalyticsPage.jsx
    │
    ├─ getAnalyticsData(months)
    │  └─ GET /analytics/analytics-data/?months={12}
    │     └─ Returns: Recycling trends, user engagement, metrics
    │
    ├─ Displays:
    │  ├─ User Engagement Trends Chart
    │  ├─ Recycling Trends Chart
    │  └─ Comprehensive Metrics (4 cards)
    │
    └─ Updated: ✅

3️⃣  MachinePage.jsx
    │
    ├─ getMachineMetrics()
    │  └─ GET /metrics/machines/
    │     └─ Returns: Array of machine objects
    │
    ├─ Displays:
    │  ├─ Machine Cards (grid)
    │  │  ├─ Name & Location
    │  │  ├─ Status & Health
    │  │  ├─ Capacity (cans, bottles)
    │  │  └─ Collection Stats
    │  │
    │  └─ (2 machines in example: Cairo locations)
    │
    └─ Updated: ✅

4️⃣  EnvironmentPage.jsx
    │
    ├─ getEnvironmentalMetrics(months)
    │  └─ GET /metrics/environmental/?months={6}
    │     └─ Returns: CO2, water, energy, recycled items data
    │
    ├─ Displays:
    │  ├─ Status Cards (4)
    │  │  ├─ CO2 Emissions Saved
    │  │  ├─ Water Conserved
    │  │  ├─ Energy Saved
    │  │  └─ Items Recycled
    │  │
    │  ├─ Environmental Impact Trends Chart
    │  └─ Carbon Footprint Reduction
    │
    └─ Updated: ✅

5️⃣  UserPage.jsx
    │
    ├─ getUserAnalytics()
    │  └─ GET /analytics/user-data/
    │     └─ Returns: Retention data, gender distribution
    │
    ├─ Displays:
    │  ├─ User Retention Chart
    │  ├─ Gender Distribution
    │  └─ User Details
    │
    └─ Updated: ✅

6️⃣  TransactionPage.jsx
    │
    ├─ getTransactionAnalytics()
    │  └─ GET /analytics/transactions/
    │     └─ Returns: Transactions, vouchers, referrals, points
    │
    ├─ Displays:
    │  ├─ Voucher Performance Card
    │  ├─ Referral Performance Card
    │  ├─ Points vs Coupons Chart
    │  └─ Top Referrers List
    │
    └─ Updated: ✅
```

---

## Data Flow Diagram

```
User Opens Dashboard
        │
        ▼
   Component Mounts
        │
        ▼
   useEffect() triggered
        │
        ▼
   setLoading(true)
        │
        ▼
   Call API Function
   e.g., getOverviewMetrics(12)
        │
        ▼
   API Service Layer
   ├─ Add Auth Header (Bearer Token)
   ├─ Send Request to Backend
   └─ Handle Response/Errors
        │
        ▼
   Backend API
   GET /dashboard/v2/metrics/overview/?months=12
        │
        ▼
   Database Query
   (Aggregates data from multiple tables)
        │
        ▼
   Response JSON
        │
        ▼
   Response Interceptor
   ├─ Check for 401 (Unauthorized)
   ├─ If 401: Refresh Token
   └─ Otherwise: Continue
        │
        ▼
   Component receives response.data
        │
        ▼
   setData(response.data)
        │
        ▼
   setLoading(false)
        │
        ▼
   Component Re-renders
   with Data
        │
        ▼
   Charts/Cards Display Data
        │
        ▼
   Dashboard Ready ✅
```

---

## Function Export Hierarchy

```
api.js
│
├─ CORE
│  └─ api (axios instance with interceptors)
│
├─ ENDPOINT FUNCTIONS (6)
│  │
│  ├─ getOverviewMetrics(months=12)
│  │  └─ GET /metrics/overview/?months={X}
│  │
│  ├─ getUserAnalytics()
│  │  └─ GET /analytics/user-data/
│  │
│  ├─ getTransactionAnalytics()
│  │  └─ GET /analytics/transactions/
│  │
│  ├─ getAnalyticsData(months=12)
│  │  └─ GET /analytics/analytics-data/?months={X}
│  │
│  ├─ getMachineMetrics()
│  │  └─ GET /metrics/machines/
│  │
│  └─ getEnvironmentalMetrics(months=6)
│     └─ GET /metrics/environmental/?months={X}
│
└─ UTILITY FUNCTIONS (4)
   │
   ├─ fetchOverviewData(months=12)
   │  └─ Wrapper around getOverviewMetrics()
   │
   ├─ fetchAnalyticsData(months=12)
   │  └─ Combines: getUserAnalytics() +
   │              getTransactionAnalytics() +
   │              getAnalyticsData()
   │     (uses Promise.all for parallel requests)
   │
   ├─ fetchMachineData()
   │  └─ Wrapper around getMachineMetrics()
   │
   └─ fetchEnvironmentalData(months=6)
      └─ Wrapper around getEnvironmentalMetrics()
```

---

## Request/Response Cycle

```
┌────────────────────────────────────────────────────────────┐
│                   REQUEST PHASE                            │
└────────────────────────────────────────────────────────────┘

Component
  │ const response = await getOverviewMetrics(12)
  │
  ▼
API Function
  │ return api.get(`metrics/overview/?months=12`)
  │
  ▼
Request Interceptor
  ├─ Retrieve access_token from localStorage
  ├─ Add to Authorization header: "Bearer {token}"
  └─ Send request
  │
  ▼
Axios HTTP Layer
  │ GET https://web-testing-3a06.up.railway.app/dashboard/v2/
  │       metrics/overview/?months=12
  │ Headers: Authorization: Bearer eyJhbGc...
  │
  ▼
Backend API Server
  │ Validate Token
  │ Check user permissions
  │ Query database
  │ Aggregate data
  │ Return JSON response

┌────────────────────────────────────────────────────────────┐
│                   RESPONSE PHASE                           │
└────────────────────────────────────────────────────────────┘

Backend
  │ HTTP 200
  │ {
  │   "Total_Users_section": {...},
  │   "Active_Partners_section": {...},
  │   ...
  │ }
  │
  ▼
Response Interceptor
  │ Check status code
  │ ├─ 200-299: Pass through
  │ ├─ 401: Refresh token and retry
  │ └─ 4xx/5xx: Reject with error
  │
  ▼
API Function
  │ return AxiosResponse object
  │ {
  │   data: {...},
  │   status: 200,
  │   headers: {...},
  │   ...
  │ }
  │
  ▼
Component
  │ const response = await getOverviewMetrics(12)
  │ setData(response.data)
  │ setLoading(false)
  │
  ▼
Re-render with Data ✅
```

---

## Error Handling Flow

```
Request Fails
    │
    ▼
Response Interceptor
    │
    ├─ Status 401 (Unauthorized)?
    │  │
    │  └─ Yes
    │     ├─ Get refresh_token from localStorage
    │     ├─ POST /auth/refresh/
    │     ├─ Success?
    │     │  ├─ Yes: Update access_token
    │     │  │       Retry original request ✅
    │     │  │
    │     │  └─ No: Clear tokens
    │     │        Redirect to login ❌
    │     │
    │     └─ Return result
    │
    └─ Other Status (2xx-5xx)?
       │
       └─ Return error ❌
            │
            ▼
       Component Catch Block
            │
            ├─ err.response?.data?.detail
            ├─ err.message
            └─ "A network or server error occurred."
            │
            ▼
       setError(errorMessage)
       setLoading(false)
            │
            ▼
       Display Error UI ❌
```

---

## Token Lifecycle

```
User Logs In
    │
    ▼
Backend returns: {access, refresh}
    │
    ├─ access_token → localStorage['access_token']
    └─ refresh_token → localStorage['refresh_token']
    │
    ▼
API Request Interceptor
    │
    └─ Adds to every request:
       Authorization: Bearer {access_token}
    │
    ▼
Backend validates token expiration
    │
    ├─ Valid? ✅
    │  └─ Process request
    │
    └─ Expired? ❌
       │
       ▼
       Response: 401 Unauthorized
       │
       ▼
       Response Interceptor catches 401
       │
       ├─ POST /auth/refresh/
       │  with {refresh: refresh_token}
       │
       ├─ Success? ✅
       │  ├─ Get new access_token
       │  ├─ localStorage['access_token'] = new_token
       │  └─ Retry original request
       │
       └─ Fail? ❌
          ├─ Clear localStorage
          └─ Redirect to login page
```

---

## Page Load Sequence

```
1. OverViewPage mounts
   └─ useEffect() runs
      └─ getOverviewMetrics(months) called
         └─ API returns 6 sections of data
            ├─ Total Users: 823 (+14%)
            ├─ Active Partners: 2 (+0%)
            ├─ System Uptime: 93.8%
            ├─ Total Revenue: $1335.22 (-7%)
            ├─ User Engagement: metrics
            ├─ User Retention: 0%
            ├─ Network Performance: monthly chart
            └─ Material Distribution: 87.4% bottles

2. AnalyticsPage mounts
   └─ useEffect() runs
      └─ getAnalyticsData(months) called
         └─ API returns 3 sections:
            ├─ Recycling Trends: 12 months
            ├─ User Engagement: daily trends
            └─ Comprehensive Analytics: 4 metrics

3. MachinePage mounts
   └─ useEffect() runs
      └─ getMachineMetrics() called
         └─ API returns array of 2 machines:
            ├─ Cairo - 10th of Ramdan
            └─ Cairo - Maadi

4. EnvironmentPage mounts
   └─ useEffect() runs
      └─ getEnvironmentalMetrics(6) called
         └─ API returns env impact data:
            ├─ 848.84 kg CO2 saved
            ├─ 1271.55 L water conserved
            ├─ 797.07 kWh energy saved
            ├─ 12110 items recycled
            └─ Monthly trends (6 months)

5. UserPage mounts
   └─ useEffect() runs
      └─ getUserAnalytics() called
         └─ API returns user data:
            ├─ Retention: 8.3% (Week 1, then 0%)
            ├─ Gender: 1.7% male, 0.1% female
            └─ Cohort: 12 users (Nov 6-13)

6. TransactionPage mounts
   └─ useEffect() runs
      └─ getTransactionAnalytics() called
         └─ API returns transaction data:
            ├─ Vouchers: 0 issued, 0 redeemed
            ├─ Referrals: 1004 total
            ├─ Top Referrers: dropme admin (1000)
            └─ Points: Monthly distribution
```

---

## Authentication Flow

```
Initial State:
  localStorage['access_token'] = null
  localStorage['refresh_token'] = null

User Login:
  ├─ POST /auth/login/
  └─ Response: {access: "...", refresh: "..."}
      │
      └─ localStorage['access_token'] = "..."
         localStorage['refresh_token'] = "..."

Every API Call:
  ├─ Request Interceptor adds:
  │  Authorization: Bearer {access_token}
  │
  └─ Send request with auth header

On 401 Response:
  ├─ Refresh Interceptor:
  │  ├─ POST /auth/refresh/
  │  │  body: {refresh: refresh_token}
  │  │
  │  ├─ Response: {access: "...new..."}
  │  │
  │  └─ localStorage['access_token'] = "...new..."
  │
  ├─ Retry original request
  └─ Continue

On Refresh Fail:
  ├─ Clear tokens:
  │  localStorage.removeItem('access_token')
  │  localStorage.removeItem('refresh_token')
  │
  ├─ Redirect:
  │  window.location.href = "/"
  │
  └─ User sent to login
```

---

## Implementation Status

```
✅ API Service (api.js)
   ├─ ✅ Core setup (axios instance)
   ├─ ✅ Auth interceptor
   ├─ ✅ Response interceptor (token refresh)
   ├─ ✅ 6 endpoint functions
   ├─ ✅ 4 utility functions
   └─ ✅ Export structure

✅ Pages Integration
   ├─ ✅ OverViewPage.jsx
   ├─ ✅ AnalyticsPage.jsx
   ├─ ✅ MachinePage.jsx
   ├─ ✅ EnvironmentPage.jsx
   ├─ ✅ UserPage.jsx
   └─ ✅ TransactionPage.jsx

✅ Documentation
   ├─ ✅ ENDPOINT_INTEGRATION.md
   ├─ ✅ API_QUICK_REFERENCE.md
   └─ ✅ INTEGRATION_SUMMARY.md

📊 Data Coverage
   ├─ ✅ Overview metrics
   ├─ ✅ User analytics
   ├─ ✅ Transaction analytics
   ├─ ✅ Analytics data
   ├─ ✅ Machine metrics
   └─ ✅ Environmental metrics

🎯 Next Steps
   ├─ ⬜ Test all endpoints
   ├─ ⬜ Verify data accuracy
   ├─ ⬜ Monitor performance
   ├─ ⬜ Add refresh functionality
   └─ ⬜ Implement caching
```

