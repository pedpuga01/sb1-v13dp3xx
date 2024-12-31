export const SUBSCRIPTION_LIMITS = {
  basic: {
    students: 25,
    teachers: 5,
    classes: 10,
    locations: 1
  },
  pro: {
    students: 100,
    teachers: 15,
    classes: 30,
    locations: 2
  },
  enterprise: {
    students: 500,
    teachers: 50,
    classes: 100,
    locations: 5
  }
} as const;