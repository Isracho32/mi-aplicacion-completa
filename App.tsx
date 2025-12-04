
import React, { useState } from 'react';
import { LayoutDashboard, Users, CalendarDays, UtensilsCrossed, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Employee, Shift, ViewState, TimeLog, Discount } from './types';
import { INITIAL_EMPLOYEES } from './constants';
import { Dashboard } from './components/Dashboard';
import { EmployeeList } from './components/EmployeeList';
import { Schedule } from './components/Schedule';
import { TimeClock } from './components/TimeClock';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  // Employee Handlers
  const addEmployee = (emp: Employee) => setEmployees([...employees, emp]);
  
  const editEmployee = (updatedEmp: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp));
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
    setShifts(shifts.filter(s => s.employeeId !== id)); 
    setTimeLogs(timeLogs.filter(t => t.employeeId !== id));
    setDiscounts(discounts.filter(d => d.employeeId !== id));
  };

  // Shift Handlers
  const addShift = (shift: Shift) => setShifts([...shifts, shift]);
  const removeShift = (id: string) => setShifts(shifts.filter(s => s.id !== id));
  const bulkAddShifts = (newShifts: Shift[]) => {
      setShifts(prev => [...prev, ...newShifts]);
  };

  // Time Clock Handlers
  const handleClockIn = (employeeId: string) => {
    const newLog: TimeLog = {
      id: crypto.randomUUID(),
      employeeId,
      clockIn: new Date(),
    };
    setTimeLogs([...timeLogs, newLog]);
  };

  const handleClockOut = (employeeId: string) => {
    const now = new Date();
    
    // 1. Update the Time Log
    let startLog: Date | null = null;
    
    setTimeLogs(timeLogs.map(log => {
      if (log.employeeId === employeeId && !log.clockOut) {
        startLog = log.clockIn;
        return { ...log, clockOut: now };
      }
      return log;
    }));

    // 2. Automatically create a 'Shift' for payroll calculation if we found the start time
    if (startLog) {
      const newShift: Shift = {
        id: crypto.randomUUID(),
        employeeId: employeeId,
        date: format(now, 'yyyy-MM-dd'),
        startTime: format(startLog, 'HH:mm'),
        endTime: format(now, 'HH:mm'),
        notes: 'Generado automáticamente por Reloj Checador'
      };
      setShifts(prev => [...prev, newShift]);
    }
  };

  // Cancel/Undo Clock In (Delete the log entirely)
  const handleCancelClockIn = (employeeId: string) => {
    setTimeLogs(prev => prev.filter(log => !(log.employeeId === employeeId && !log.clockOut)));
  };

  // Discount Handlers
  const addDiscount = (discount: Discount) => setDiscounts([...discounts, discount]);
  const removeDiscount = (id: string) => setDiscounts(discounts.filter(d => d.id !== id));

  const NavItem = ({ id, icon: Icon, label }: { id: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => setView(id)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
        view === id 
          ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
          : 'text-slate-500 hover:bg-red-50 hover:text-red-700'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-orange-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-orange-100 flex-shrink-0 flex flex-col shadow-sm z-10">
        <div className="p-6 flex items-center gap-3 border-b border-orange-100 bg-white">
          <div className="bg-yellow-500 p-2 rounded-lg text-white shadow-md transform rotate-3">
            <UtensilsCrossed size={28} />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight text-red-600">Doña Candy</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Lo hacemos como en casa</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Panel General" />
          <NavItem id="schedule" icon={CalendarDays} label="Horarios" />
          <NavItem id="employees" icon={Users} label="Empleados" />
          <NavItem id="timeclock" icon={Clock} label="Asistencia" />
        </nav>

        <div className="p-4 border-t border-orange-100">
           <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
              <p className="text-xs text-red-800 mb-2 font-semibold">Restaurante</p>
              <div className="flex justify-between items-center mb-1">
                 <span className="text-sm font-bold text-slate-800">Doña Candy</span>
                 <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Abierto</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-orange-50/50">
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-orange-100 px-8 py-4 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {view === 'dashboard' && 'Resumen del Restaurante'}
            {view === 'schedule' && 'Gestión de Turnos'}
            {view === 'employees' && 'Equipo de Trabajo'}
            {view === 'timeclock' && 'Control de Asistencia'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Administrador</p>
              <p className="text-xs text-slate-400">Doña Candy</p>
            </div>
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold border-2 border-white shadow-sm">
              DC
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {view === 'dashboard' && (
            <Dashboard 
              employees={employees} 
              shifts={shifts} 
              discounts={discounts}
              onAddDiscount={addDiscount}
              onRemoveDiscount={removeDiscount}
            />
          )}
          {view === 'employees' && (
            <EmployeeList 
              employees={employees} 
              onAddEmployee={addEmployee} 
              onEditEmployee={editEmployee}
              onDeleteEmployee={removeEmployee} 
            />
          )}
          {view === 'schedule' && (
            <Schedule 
              employees={employees} 
              shifts={shifts} 
              onAddShift={addShift} 
              onRemoveShift={removeShift}
              onBulkAddShifts={bulkAddShifts}
            />
          )}
          {view === 'timeclock' && (
            <TimeClock 
              employees={employees} 
              timeLogs={timeLogs}
              onClockIn={handleClockIn}
              onClockOut={handleClockOut}
              onCancelClockIn={handleCancelClockIn}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
