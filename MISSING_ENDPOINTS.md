# 📋 Missing Endpoints for New Dashboard Pages

**Date**: December 18, 2025  
**Status**: Pending Backend Implementation  

---

## Overview

The following pages are being added to the dashboard but require new API endpoints to be implemented on the backend. This document outlines the required endpoints, their structure, and expected data formats.

---

## 📌 New Pages & Required Endpoints

### 1. **Compliance & Certifications Page**
**URL**: `/app/compliance`  
**Description**: Manage compliance certifications and regulatory documentation

#### Required Endpoints:

**GET** `/dashboard/v2/compliance/certifications/`
```javascript
// Expected Response
{
  "data": {
    "certifications": [
      {
        "id": 1,
        "name": "ISO 14001:2015",
        "category": "Environmental Management",
        "issued_date": "2023-01-15",
        "expiry_date": "2026-01-15",
        "status": "active", // active, expired, pending
        "certificate_file_url": "https://...",
        "auditor": "Bureau Veritas",
        "audit_score": 98
      },
      // ... more certifications
    ],
    "summary": {
      "total_certifications": 12,
      "active_certifications": 10,
      "expiring_soon": 2, // within 90 days
      "expired": 0
    }
  }
}
```

**POST** `/dashboard/v2/compliance/certifications/`
```javascript
// Request Body
{
  "name": "ISO 9001:2015",
  "category": "Quality Management",
  "issued_date": "2024-01-01",
  "expiry_date": "2027-01-01",
  "auditor": "DNV GL",
  "audit_score": 95,
  "certificate_file": "file_object"
}

// Expected Response: 201 Created
{
  "id": 13,
  "name": "ISO 9001:2015",
  "status": "active",
  // ... all fields
}
```

---

### 2. **Predictive Maintenance (AI) Page**
**URL**: `/app/predictive-maintenance`  
**Description**: Machine health prediction and failure risk assessment using AI

#### Required Endpoints:

**GET** `/dashboard/v2/maintenance/risk-assessment/`
```javascript
// Expected Response
{
  "data": {
    "machines": [
      {
        "machine_id": "RVM-001",
        "machine_name": "Cairo - 10th of Ramdan",
        "risk_level": "low", // low, medium, high
        "risk_score": 15, // 0-100
        "failure_prediction": {
          "days_until_failure": 180,
          "confidence": 95.5, // %
          "predicted_failure_type": "Sensor malfunction"
        },
        "recommended_action": "Monitor",
        "last_maintenance": "2024-10-15",
        "health_status": "Optimal"
      },
      // ... more machines
    ],
    "summary": {
      "total_machines": 5,
      "low_risk": 3,
      "medium_risk": 1,
      "high_risk": 1,
      "avg_health_score": 82.5
    }
  }
}
```

**GET** `/dashboard/v2/maintenance/telemetry/?machine_id={id}&days=30`
```javascript
// Expected Response
{
  "data": {
    "machine_id": "RVM-001",
    "telemetry_data": [
      {
        "timestamp": "2024-12-18T10:30:00Z",
        "temperature": 45.2,
        "humidity": 65,
        "vibration_level": 2.5, // mm/s
        "motor_efficiency": 96.5, // %
        "pressure": 1.2 // bar
      },
      // ... more data points
    ],
    "alerts": [
      {
        "timestamp": "2024-12-18T08:15:00Z",
        "alert_type": "High temperature",
        "severity": "warning",
        "message": "Motor temperature exceeded normal range"
      }
    ]
  }
}
```

**GET** `/dashboard/v2/maintenance/failure-patterns/?machine_id={id}`
```javascript
// Expected Response
{
  "data": {
    "machine_id": "RVM-001",
    "historical_failures": [
      {
        "failure_id": "F001",
        "failure_date": "2023-08-20",
        "failure_type": "Motor bearing wear",
        "root_cause": "Inadequate lubrication",
        "resolution_time_hours": 4,
        "repair_cost": 250,
        "preventive_measures": "Increase lubrication schedule"
      },
      // ... more failures
    ],
    "common_failure_patterns": [
      {
        "pattern": "Motor bearing degradation",
        "frequency": 3,
        "average_warning_period_days": 14,
        "correlation_factors": ["Temperature spike", "Vibration increase"]
      }
    ]
  }
}
```

---

### 3. **Data Rights (GDPR) Page**
**URL**: `/app/data-rights`  
**Description**: Manage DSAR (Data Subject Access Requests), erasure, and data portability

#### Required Endpoints:

**GET** `/dashboard/v2/data-rights/dsar-requests/`
```javascript
// Expected Response
{
  "data": {
    "requests": [
      {
        "request_id": "DSAR-2024-001",
        "email": "user@example.com",
        "request_type": "data_access", // data_access, erasure, portability
        "status": "completed", // pending, in_progress, completed
        "requested_date": "2024-11-10",
        "completion_date": "2024-11-15",
        "data_size": "2.4 MB",
        "response_format": "JSON",
        "actions": ["download"]
      },
      // ... more requests
    ],
    "summary": {
      "total_requests": 15,
      "completed": 10,
      "in_progress": 3,
      "pending": 2,
      "avg_completion_time_days": 5
    }
  }
}
```

**POST** `/dashboard/v2/data-rights/dsar-requests/`
```javascript
// Request Body
{
  "email": "user@example.com",
  "request_type": "data_access", // or erasure, portability
  "data_categories": ["profile", "transactions", "preferences"], // optional
  "response_format": "JSON" // JSON, CSV, PDF
}

// Expected Response: 201 Created
{
  "request_id": "DSAR-2024-016",
  "status": "pending",
  "estimated_completion_date": "2024-12-25"
}
```

**GET** `/dashboard/v2/data-rights/dsar-requests/{request_id}/download/`
```
// Returns: Binary file download
Content-Type: application/json or application/pdf
```

**GET** `/dashboard/v2/data-rights/guidelines/`
```javascript
// Expected Response
{
  "data": {
    "gdpr_requirements": [
      {
        "requirement": "Right to Access",
        "description": "Data subjects have the right to obtain confirmation...",
        "compliance_status": "compliant",
        "implementation_notes": "..."
      },
      // ... more requirements
    ],
    "data_retention_policy": {
      "user_data": "3 years",
      "transaction_logs": "7 years",
      "system_logs": "1 year",
      "deleted_data_retention": "30 days"
    },
    "contact_info": {
      "dpo_email": "dpo@dropme.com",
      "privacy_officer": "Jane Doe",
      "phone": "+1-xxx-xxx-xxxx"
    }
  }
}
```

---

### 4. **Reports & Analytics Page**
**URL**: `/app/reports`  
**Description**: Generate comprehensive reports for different dashboard sections

#### Required Endpoints:

**GET** `/dashboard/v2/reports/templates/`
```javascript
// Expected Response
{
  "data": {
    "templates": [
      {
        "template_id": "rpt_001",
        "name": "Dashboard Overview",
        "description": "Generate a detailed report for the overview section",
        "sections": ["users", "machines", "revenue"],
        "format_options": ["PDF", "Excel", "CSV"],
        "estimated_generation_time": "30 seconds"
      },
      {
        "template_id": "rpt_002",
        "name": "Environment & Sustainability",
        "description": "Generate a detailed report for environmental metrics",
        "sections": ["co2_impact", "waste_reduction", "energy_saved"],
        "format_options": ["PDF", "Excel"]
      },
      {
        "template_id": "rpt_003",
        "name": "User Management",
        "description": "Generate a detailed report for user analytics",
        "sections": ["user_retention", "gender_distribution", "engagement"]
      },
      {
        "template_id": "rpt_004",
        "name": "Machine Fleet",
        "description": "Generate a detailed report for machine performance",
        "sections": ["machine_health", "efficiency", "maintenance_logs"]
      },
      {
        "template_id": "rpt_005",
        "name": "B2B Analytics",
        "description": "Generate a detailed report for partner analytics",
        "sections": ["partner_performance", "recovery_rates", "material_composition"]
      },
      {
        "template_id": "rpt_006",
        "name": "Compliance & Certifications",
        "description": "Generate a detailed compliance report",
        "sections": ["certifications", "audit_scores", "compliance_status"]
      }
    ]
  }
}
```

**POST** `/dashboard/v2/reports/generate/`
```javascript
// Request Body
{
  "template_id": "rpt_001",
  "title": "November 2024 Dashboard Report",
  "date_range": {
    "start_date": "2024-11-01",
    "end_date": "2024-11-30"
  },
  "sections": ["users", "machines", "revenue"], // optional override
  "format": "PDF", // PDF, Excel, CSV
  "include_charts": true,
  "include_recommendations": true
}

// Expected Response: 202 Accepted
{
  "report_id": "report_20241218_001",
  "status": "generating", // generating, ready, failed
  "progress": 0,
  "estimated_time_remaining": "45 seconds",
  "download_url": null // populated when ready
}
```

**GET** `/dashboard/v2/reports/generate/{report_id}/`
```javascript
// Expected Response (while generating)
{
  "report_id": "report_20241218_001",
  "status": "generating",
  "progress": 65,
  "estimated_time_remaining": "15 seconds"
}

// Expected Response (when complete)
{
  "report_id": "report_20241218_001",
  "status": "ready",
  "progress": 100,
  "download_url": "https://api.example.com/reports/report_20241218_001.pdf",
  "file_size": "2.5 MB",
  "generated_at": "2024-12-18T10:45:30Z"
}
```

**GET** `/dashboard/v2/reports/history/`
```javascript
// Expected Response
{
  "data": {
    "recent_reports": [
      {
        "report_id": "report_20241218_001",
        "title": "November 2024 Dashboard Report",
        "template_name": "Dashboard Overview",
        "format": "PDF",
        "generated_at": "2024-12-18T10:45:30Z",
        "file_size": "2.5 MB",
        "generated_by": "admin@dropme.com",
        "actions": ["download", "delete", "regenerate"]
      },
      // ... more reports
    ],
    "summary": {
      "total_reports_generated": 45,
      "this_month": 8,
      "storage_used": "156 MB"
    }
  }
}
```

**DELETE** `/dashboard/v2/reports/{report_id}/`
```
// Expected Response: 204 No Content
```

---

## 📊 Data Structure Standards

### Common Response Format:
```javascript
{
  "status": "success", // or "error"
  "data": {
    // endpoint-specific data
  },
  "meta": {
    "timestamp": "2024-12-18T10:30:00Z",
    "request_id": "req_xxx",
    "pagination": { // if applicable
      "page": 1,
      "page_size": 20,
      "total_count": 150
    }
  }
}
```

### Error Response Format:
```javascript
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

## 🔐 Authentication & Authorization

All endpoints require:
- **Header**: `Authorization: Bearer {access_token}`
- **Content-Type**: `application/json`

### Required Roles:
- **Admin**: Full access to all endpoints
- **Compliance Officer**: Access to compliance and data-rights endpoints
- **Maintenance Manager**: Access to predictive maintenance endpoints
- **Report Manager**: Access to reports generation

---

## 🚀 Implementation Priority

### Phase 1 (Critical):
1. ✅ `/dashboard/v2/compliance/certifications/` - GET
2. ✅ `/dashboard/v2/maintenance/risk-assessment/` - GET
3. ✅ `/dashboard/v2/data-rights/dsar-requests/` - GET
4. ✅ `/dashboard/v2/reports/templates/` - GET
5. ✅ `/dashboard/v2/reports/generate/` - POST

### Phase 2 (Important):
6. `/dashboard/v2/compliance/certifications/` - POST
7. `/dashboard/v2/maintenance/telemetry/` - GET
8. `/dashboard/v2/data-rights/dsar-requests/` - POST
9. `/dashboard/v2/reports/generate/{id}/` - GET
10. `/dashboard/v2/reports/history/` - GET

### Phase 3 (Enhancement):
11. `/dashboard/v2/maintenance/failure-patterns/` - GET
12. `/dashboard/v2/data-rights/guidelines/` - GET
13. `/dashboard/v2/reports/{id}/download/` - GET
14. `/dashboard/v2/reports/{id}/` - DELETE

---

## 📝 Implementation Notes

1. **Database Requirements**:
   - Compliance: Table for certifications with audit trails
   - Maintenance: Time-series data for telemetry, failure history table
   - Data Rights: DSAR requests table with compliance logging
   - Reports: Report generation queue, storage for generated files

2. **File Storage**:
   - Store generated reports in S3 or cloud storage
   - Implement signed URLs for download with expiration
   - Clean up old reports after 90 days

3. **Background Jobs**:
   - Report generation should be asynchronous (async task queue)
   - ML model integration for failure predictions
   - Scheduled data cleanup tasks

4. **Caching**:
   - Cache risk assessments for 1 hour
   - Cache report templates (rarely change)
   - Invalidate DSAR request cache after status change

5. **Validation**:
   - Validate email addresses for DSAR requests
   - Ensure date ranges are logical
   - Verify file uploads for certifications

---

## 📞 Questions & Support

For questions about endpoint specifications, contact the development team with:
- Endpoint path
- Expected request/response format
- Use case description
- Priority level

---

**Created**: December 18, 2025  
**Last Updated**: December 18, 2025  
**Status**: Awaiting Backend Implementation
