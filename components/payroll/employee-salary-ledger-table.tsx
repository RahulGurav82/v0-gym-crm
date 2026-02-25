'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface SalaryRow {
  date: string
  regHours: number
  regRate: number
  regTotal: number
  otHours: number
  otRate: number
  otTotal: number
  paidAmount: number
  shiftTime: string
  punchingIn: string
  punchingOut: string
  totalWorked: string
  validHours: string
  otHours2: string
  requiredHours: string
  salary: number
}

export function EmployeeSalaryLedgerTable() {
  const mockData: SalaryRow[] = [
    {
      date: '01 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 2,
      otRate: 180,
      otTotal: 360,
      paidAmount: 1320,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '09:05 AM',
      punchingOut: '06:10 PM',
      totalWorked: '9h 05m',
      validHours: '8h',
      otHours2: '1h 05m',
      requiredHours: '8h',
      salary: 1320,
    },
    {
      date: '02 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 1,
      otRate: 180,
      otTotal: 180,
      paidAmount: 1140,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '09:00 AM',
      punchingOut: '05:45 PM',
      totalWorked: '8h 45m',
      validHours: '8h',
      otHours2: '45m',
      requiredHours: '8h',
      salary: 1140,
    },
    {
      date: '03 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 3,
      otRate: 180,
      otTotal: 540,
      paidAmount: 1500,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '08:50 AM',
      punchingOut: '08:00 PM',
      totalWorked: '11h 10m',
      validHours: '8h',
      otHours2: '3h 10m',
      requiredHours: '8h',
      salary: 1500,
    },
    {
      date: '04 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 0,
      otRate: 180,
      otTotal: 0,
      paidAmount: 960,
      shiftTime: '09:00 AM - 05:00 PM',
      punchingIn: '09:02 AM',
      punchingOut: '05:02 PM',
      totalWorked: '8h',
      validHours: '8h',
      otHours2: '0h',
      requiredHours: '8h',
      salary: 960,
    },
    {
      date: '05 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 2,
      otRate: 180,
      otTotal: 360,
      paidAmount: 1320,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '09:00 AM',
      punchingOut: '06:20 PM',
      totalWorked: '9h 20m',
      validHours: '8h',
      otHours2: '1h 20m',
      requiredHours: '8h',
      salary: 1320,
    },
    {
      date: '06 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 1,
      otRate: 180,
      otTotal: 180,
      paidAmount: 1140,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '09:10 AM',
      punchingOut: '06:00 PM',
      totalWorked: '8h 50m',
      validHours: '8h',
      otHours2: '50m',
      requiredHours: '8h',
      salary: 1140,
    },
    {
      date: '07 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 2,
      otRate: 180,
      otTotal: 360,
      paidAmount: 1320,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '08:55 AM',
      punchingOut: '06:30 PM',
      totalWorked: '9h 35m',
      validHours: '8h',
      otHours2: '1h 35m',
      requiredHours: '8h',
      salary: 1320,
    },
    {
      date: '08 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 0,
      otRate: 180,
      otTotal: 0,
      paidAmount: 960,
      shiftTime: '09:00 AM - 05:00 PM',
      punchingIn: '09:00 AM',
      punchingOut: '05:00 PM',
      totalWorked: '8h',
      validHours: '8h',
      otHours2: '0h',
      requiredHours: '8h',
      salary: 960,
    },
    {
      date: '09 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 2,
      otRate: 180,
      otTotal: 360,
      paidAmount: 1320,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '09:05 AM',
      punchingOut: '06:15 PM',
      totalWorked: '9h 10m',
      validHours: '8h',
      otHours2: '1h 10m',
      requiredHours: '8h',
      salary: 1320,
    },
    {
      date: '10 Feb 2026',
      regHours: 8,
      regRate: 120,
      regTotal: 960,
      otHours: 3,
      otRate: 180,
      otTotal: 540,
      paidAmount: 1500,
      shiftTime: '09:00 AM - 06:00 PM',
      punchingIn: '08:50 AM',
      punchingOut: '07:45 PM',
      totalWorked: '10h 55m',
      validHours: '8h',
      otHours2: '2h 55m',
      requiredHours: '8h',
      salary: 1500,
    },
  ]

  // Calculate totals
  const totals = mockData.reduce(
    (acc, row) => ({
      regHours: acc.regHours + row.regHours,
      regTotal: acc.regTotal + row.regTotal,
      otHours: acc.otHours + row.otHours,
      otTotal: acc.otTotal + row.otTotal,
      paidAmount: acc.paidAmount + row.paidAmount,
      salary: acc.salary + row.salary,
    }),
    { regHours: 0, regTotal: 0, otHours: 0, otTotal: 0, paidAmount: 0, salary: 0 }
  )

  return (
    <div className="bg-white overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-100 sticky top-0 z-10">
          <TableRow className="border-b border-gray-300">
            <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-28">Date</TableHead>
            
            {/* Paid Hours - REG Group */}
            <TableHead colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">
              Paid Hours (REG)
            </TableHead>
            
            {/* Paid Hours - OT Group */}
            <TableHead colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">
              Paid Hours (OT)
            </TableHead>
            
            <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900 border-l border-gray-300">
              Paid Amount
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900 border-l border-gray-300 min-w-40">
              Shift Time
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900 border-l border-gray-300 min-w-44">
              Punching
            </TableHead>
            
            {/* Working Details Group */}
            <TableHead colSpan={4} className="px-4 py-3 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">
              Working Details
            </TableHead>
            
            <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900 border-l border-gray-300">
              Salary
            </TableHead>
          </TableRow>
          
          {/* Sub-header row */}
          <TableRow className="border-b border-gray-300 bg-gray-100">
            <TableHead></TableHead>
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Hours</TableHead>
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">Rate</TableHead>
            <TableHead className="px-4 py-2 text-right text-xs font-semibold text-gray-900">Total</TableHead>
            
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Hours</TableHead>
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">Rate</TableHead>
            <TableHead className="px-4 py-2 text-right text-xs font-semibold text-gray-900">Total</TableHead>
            
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Total Worked</TableHead>
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">Valid</TableHead>
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">OT</TableHead>
            <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">Required</TableHead>
            
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.date} className="border-b border-gray-200 hover:bg-gray-50">
              <TableCell className="px-4 py-3 text-left text-sm text-gray-900 font-medium">{row.date}</TableCell>
              
              {/* REG Hours */}
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700 border-l border-gray-200">{row.regHours}</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700">₹{row.regRate}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.regTotal.toLocaleString()}</TableCell>
              
              {/* OT Hours */}
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700 border-l border-gray-200">{row.otHours}</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700">₹{row.otRate}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.otTotal.toLocaleString()}</TableCell>
              
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900 font-medium border-l border-gray-200">₹{row.paidAmount.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-left text-sm text-gray-700 border-l border-gray-200">{row.shiftTime}</TableCell>
              <TableCell className="px-4 py-3 text-left text-sm text-gray-700 border-l border-gray-200">
                <div>IN: {row.punchingIn}</div>
                <div>OUT: {row.punchingOut}</div>
              </TableCell>
              
              {/* Working Details */}
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700 border-l border-gray-200">{row.totalWorked}</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700">{row.validHours}</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700">{row.otHours2}</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-700">{row.requiredHours}</TableCell>
              
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900 font-semibold border-l border-gray-200">₹{row.salary.toLocaleString()}</TableCell>
            </TableRow>
          ))}
          
          {/* TOTAL Row */}
          <TableRow className="bg-gray-100 border-t-2 border-gray-400 font-bold">
            <TableCell className="px-4 py-3 text-left text-sm text-gray-900">TOTAL</TableCell>
            
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900 border-l border-gray-400">{totals.regHours}</TableCell>
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900">-</TableCell>
            <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.regTotal.toLocaleString()}</TableCell>
            
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900 border-l border-gray-400">{totals.otHours}</TableCell>
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900">-</TableCell>
            <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.otTotal.toLocaleString()}</TableCell>
            
            <TableCell className="px-4 py-3 text-right text-sm text-gray-900 font-bold border-l border-gray-400">₹{totals.paidAmount.toLocaleString()}</TableCell>
            <TableCell className="px-4 py-3 text-left text-sm text-gray-900 border-l border-gray-400">-</TableCell>
            <TableCell className="px-4 py-3 text-left text-sm text-gray-900 border-l border-gray-400">-</TableCell>
            
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900 border-l border-gray-400">-</TableCell>
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900">-</TableCell>
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900">-</TableCell>
            <TableCell className="px-4 py-3 text-center text-sm text-gray-900">-</TableCell>
            
            <TableCell className="px-4 py-3 text-right text-sm text-gray-900 font-bold border-l border-gray-400">₹{totals.salary.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
