
export enum EmployeeRole {
  CHEF = 'Chef',
  KITCHEN_ASSISTANT = 'Ayudante de Cocina',
  WAITER = 'Mesero/a',
  BARTENDER = 'Barman',
  MANAGER = 'Gerente',
  CLEANING = 'Limpieza'
}

export type PaymentType = 'HOURLY' | 'MONTHLY';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  email: string;
  phone: string;
  photoUrl?: string;
  maxHoursPerWeek: number;
  
  // Payment Config
  paymentType: PaymentType;
  monthlySalary?: number; // Only for MONTHLY
  hourlyRateBase: number; // Only for HOURLY
  hourlyRateOvertime: number; // Only for HOURLY
}

export interface Shift {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  notes?: string;
}

export interface TimeLog {
  id: string;
  employeeId: string;
  clockIn: Date;
  clockOut?: Date;
}

export interface Discount {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  amount: number;
  reason: string;
}

export interface WeekData {
  startOfWeek: Date;
  days: Date[];
}

export type ViewState = 'dashboard' | 'schedule' | 'employees' | 'timeclock';
