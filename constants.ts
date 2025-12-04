
import { Employee, EmployeeRole, Shift } from './types';

export const INITIAL_EMPLOYEES: Employee[] = [
  { 
    id: '1', 
    name: 'Carlos Ruiz', 
    role: EmployeeRole.MANAGER, 
    email: 'carlos@restaurante.com', 
    phone: '70012345',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    maxHoursPerWeek: 48, 
    paymentType: 'MONTHLY',
    monthlySalary: 4500,
    hourlyRateBase: 0, 
    hourlyRateOvertime: 0 
  },
  { 
    id: '2', 
    name: 'Maria Gomez', 
    role: EmployeeRole.CHEF, 
    email: 'maria@restaurante.com', 
    phone: '70054321',
    photoUrl: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=200',
    maxHoursPerWeek: 48, 
    paymentType: 'MONTHLY',
    monthlySalary: 3800,
    hourlyRateBase: 0, 
    hourlyRateOvertime: 0 
  },
  { 
    id: '3', 
    name: 'Juan Perez', 
    role: EmployeeRole.KITCHEN_ASSISTANT, 
    email: 'juan@restaurante.com', 
    phone: '70099887',
    photoUrl: '', // No photo, tests fallback
    maxHoursPerWeek: 30, 
    paymentType: 'HOURLY',
    hourlyRateBase: 20, 
    hourlyRateOvertime: 30 
  },
  { 
    id: '4', 
    name: 'Ana Lopez', 
    role: EmployeeRole.WAITER, 
    email: 'ana@restaurante.com', 
    phone: '60011223',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    maxHoursPerWeek: 35, 
    paymentType: 'HOURLY',
    hourlyRateBase: 18, 
    hourlyRateOvertime: 25 
  },
  { 
    id: '5', 
    name: 'Sofia Marti', 
    role: EmployeeRole.WAITER, 
    email: 'sofia@restaurante.com', 
    phone: '60044556',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    maxHoursPerWeek: 20, 
    paymentType: 'HOURLY',
    hourlyRateBase: 18, 
    hourlyRateOvertime: 25 
  },
  { 
    id: '6', 
    name: 'Pedro Diaz', 
    role: EmployeeRole.BARTENDER, 
    email: 'pedro@restaurante.com', 
    phone: '70077889',
    photoUrl: '',
    maxHoursPerWeek: 30, 
    paymentType: 'HOURLY',
    hourlyRateBase: 20, 
    hourlyRateOvertime: 30 
  },
  { 
    id: '7', 
    name: 'Luis Torres', 
    role: EmployeeRole.CLEANING, 
    email: 'luis@restaurante.com', 
    phone: '60099001',
    photoUrl: '',
    maxHoursPerWeek: 20, 
    paymentType: 'HOURLY',
    hourlyRateBase: 15, 
    hourlyRateOvertime: 20 
  },
];

// Helper to get color based on role
export const getRoleColor = (role: EmployeeRole): string => {
  switch (role) {
    case EmployeeRole.CHEF: return 'bg-red-100 text-red-800 border-red-200';
    case EmployeeRole.KITCHEN_ASSISTANT: return 'bg-orange-100 text-orange-800 border-orange-200';
    case EmployeeRole.WAITER: return 'bg-blue-100 text-blue-800 border-blue-200';
    case EmployeeRole.BARTENDER: return 'bg-violet-100 text-violet-800 border-violet-200';
    case EmployeeRole.MANAGER: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case EmployeeRole.CLEANING: return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getRoleColorHex = (role: EmployeeRole): string => {
   switch (role) {
    case EmployeeRole.CHEF: return '#ef4444';
    case EmployeeRole.KITCHEN_ASSISTANT: return '#f97316';
    case EmployeeRole.WAITER: return '#3b82f6';
    case EmployeeRole.BARTENDER: return '#8b5cf6';
    case EmployeeRole.MANAGER: return '#10b981';
    case EmployeeRole.CLEANING: return '#6b7280';
    default: return '#9ca3af';
  }
}
