```typescript
export interface AnalyticsFilters {
  dateRange: 'week' | 'month' | 'quarter' | 'year' | 'custom';
  startDate?: string;
  endDate?: string;
  groupBy?: 'day' | 'week' | 'month';
  studentId?: string;
  classId?: string;
}

export interface AnalyticsData {
  students: {
    total: number;
    active: number;
    inactive: number;
    newStudents: number[];
    retentionRate: number;
    dropoutRate: number;
  };
  classes: {
    total: number;
    averageAttendance: number;
    capacityUtilization: number;
    classDistribution: {
      individual: number;
      group: number;
    };
  };
  financial: {
    totalRevenue: number;
    revenueByMonth: number[];
    pendingPayments: number;
    averageRevenue: number;
    collectionRate: number;
  };
  attendance: {
    averageRate: number;
    byClass: {
      classId: string;
      className: string;
      rate: number;
    }[];
    byDay: {
      date: string;
      rate: number;
    }[];
  };
}
```