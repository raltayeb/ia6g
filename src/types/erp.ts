
export interface Property {
  id: string;
  name: string;
  type: 'Residential' | 'Commercial' | 'Industrial' | 'Land';
  location: string;
  status: 'Occupied' | 'Vacant' | 'Maintenance';
  monthlyIncome: number;
  value: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  type: 'Truck' | 'Sedan' | 'Van' | 'Bus';
  driverName?: string;
  lastServiceDate: string;
  status: 'Active' | 'Maintenance' | 'Out of Service';
  purchaseValue: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  iqamaNumber: string;
  salary: number;
  housingId?: string;
  department: 'Admin' | 'Field' | 'Fleet' | 'Accounts';
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface Accommodation {
  id: string;
  name: string;
  capacity: number;
  currentOccupants: number;
  location: string;
  monthlyCost: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: 'Property' | 'Fleet' | 'HR' | 'Other';
}
