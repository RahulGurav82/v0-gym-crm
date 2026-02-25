'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, DollarSign } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface PayrollRow {
  id: string
  employeeName: string
  regularHours: number
  otHours: number
  hourlyRate: number
  otRate: number
  paidLeavePay: number
  bonusPay: number
  professionalTax: number
  incomeTax: number
  epf: number
  esi: number
  otherDeduct: number
  netPay: number
}

interface PayrollLedgerTableProps {
  data?: PayrollRow[]
}

export function PayrollLedgerTable({ data }: PayrollLedgerTableProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollRow | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const mockData: PayrollRow[] = [
    {
      id: '1',
      employeeName: 'John Doe',
      regularHours: 160,
      otHours: 12,
      hourlyRate: 500,
      otRate: 750,
      paidLeavePay: 2000,
      bonusPay: 5000,
      professionalTax: 200,
      incomeTax: 1500,
      epf: 3200,
      esi: 800,
      otherDeduct: 500,
      netPay: 79800,
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      regularHours: 160,
      otHours: 8,
      hourlyRate: 450,
      otRate: 675,
      paidLeavePay: 1800,
      bonusPay: 4500,
      professionalTax: 180,
      incomeTax: 1200,
      epf: 2880,
      esi: 720,
      otherDeduct: 400,
      netPay: 68820,
    },
    {
      id: '3',
      employeeName: 'Robert Johnson',
      regularHours: 160,
      otHours: 16,
      hourlyRate: 550,
      otRate: 825,
      paidLeavePay: 2200,
      bonusPay: 5500,
      professionalTax: 220,
      incomeTax: 1800,
      epf: 3520,
      esi: 880,
      otherDeduct: 600,
      netPay: 87400,
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      regularHours: 160,
      otHours: 10,
      hourlyRate: 480,
      otRate: 720,
      paidLeavePay: 1920,
      bonusPay: 4800,
      professionalTax: 190,
      incomeTax: 1350,
      epf: 3072,
      esi: 768,
      otherDeduct: 450,
      netPay: 73770,
    },
    {
      id: '5',
      employeeName: 'Michael Brown',
      regularHours: 160,
      otHours: 14,
      hourlyRate: 520,
      otRate: 780,
      paidLeavePay: 2080,
      bonusPay: 5200,
      professionalTax: 210,
      incomeTax: 1650,
      epf: 3328,
      esi: 832,
      otherDeduct: 550,
      netPay: 82540,
    },
    {
      id: '6',
      employeeName: 'Emily Davis',
      regularHours: 160,
      otHours: 6,
      hourlyRate: 420,
      otRate: 630,
      paidLeavePay: 1680,
      bonusPay: 4200,
      professionalTax: 170,
      incomeTax: 1050,
      epf: 2688,
      esi: 672,
      otherDeduct: 350,
      netPay: 63610,
    },
    {
      id: '7',
      employeeName: 'David Martinez',
      regularHours: 160,
      otHours: 18,
      hourlyRate: 580,
      otRate: 870,
      paidLeavePay: 2320,
      bonusPay: 5800,
      professionalTax: 230,
      incomeTax: 1950,
      epf: 3712,
      esi: 928,
      otherDeduct: 700,
      netPay: 92590,
    },
  ]

  const displayData = data && data.length > 0 ? data : mockData

  const totals = {
    regularHours: displayData.reduce((sum, row) => sum + row.regularHours, 0),
    otHours: displayData.reduce((sum, row) => sum + row.otHours, 0),
    paidLeavePay: displayData.reduce((sum, row) => sum + row.paidLeavePay, 0),
    bonusPay: displayData.reduce((sum, row) => sum + row.bonusPay, 0),
    professionalTax: displayData.reduce((sum, row) => sum + row.professionalTax, 0),
    incomeTax: displayData.reduce((sum, row) => sum + row.incomeTax, 0),
    epf: displayData.reduce((sum, row) => sum + row.epf, 0),
    esi: displayData.reduce((sum, row) => sum + row.esi, 0),
    otherDeduct: displayData.reduce((sum, row) => sum + row.otherDeduct, 0),
    netPay: displayData.reduce((sum, row) => sum + row.netPay, 0),
  }

  const handleView = (row: PayrollRow) => {
    setSelectedEmployee(row)
    setShowDetails(true)
  }

  return (
    <>
      <div className="bg-white overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-gray-100 sticky top-0 z-10">
            <TableRow className="border-b border-gray-300">
              <TableHead className="w-12 px-4 py-3 text-center text-xs font-semibold text-gray-900">No.</TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-900 min-w-40">Employee Name</TableHead>
              <TableHead colSpan={2} className="px-4 py-3 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Hours</TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900 border-l border-gray-300">Hourly Rate</TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900">OT Rate</TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900">Paid Leave Pay</TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900">Bonus Pay</TableHead>
              <TableHead colSpan={4} className="px-4 py-3 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Income Tax</TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900 border-l border-gray-300">Other Deduction</TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-900">Net Pay</TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-semibold text-gray-900 border-l border-gray-300 w-24">Actions</TableHead>
            </TableRow>
            <TableRow className="border-b border-gray-300 bg-gray-100">
              <TableHead colSpan={2}></TableHead>
              <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Reg</TableHead>
              <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">OT</TableHead>
              <TableHead colSpan={4}></TableHead>
              <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900 border-l border-gray-300">Prof Tax</TableHead>
              <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">TDS</TableHead>
              <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">EPF</TableHead>
              <TableHead className="px-4 py-2 text-center text-xs font-semibold text-gray-900">ESI</TableHead>
              <TableHead colSpan={3}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="px-4 py-3 text-center text-sm font-medium text-gray-900">{index + 1}</TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-gray-900">{row.employeeName}</TableCell>
                <TableCell className="px-4 py-3 text-center text-sm text-gray-700 border-l border-gray-200">{row.regularHours}</TableCell>
                <TableCell className="px-4 py-3 text-center text-sm text-gray-700">{row.otHours}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700 border-l border-gray-200">₹{row.hourlyRate.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.otRate.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.paidLeavePay.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.bonusPay.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700 border-l border-gray-200">₹{row.professionalTax.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.incomeTax.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.epf.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700">₹{row.esi.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm text-gray-700 border-l border-gray-200">₹{row.otherDeduct.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-right text-sm font-semibold text-gray-900">₹{row.netPay.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-center border-l border-gray-200">
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => handleView(row)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" className="h-7 px-2 bg-gray-900 hover:bg-gray-800 text-white text-xs">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Pay
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100 border-t-2 border-gray-400 font-bold">
              <TableCell colSpan={2} className="px-4 py-3 text-sm text-gray-900">TOTAL</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-900 border-l border-gray-400">{totals.regularHours}</TableCell>
              <TableCell className="px-4 py-3 text-center text-sm text-gray-900">{totals.otHours}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900 border-l border-gray-400">-</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">-</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.paidLeavePay.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.bonusPay.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900 border-l border-gray-400">₹{totals.professionalTax.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.incomeTax.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.epf.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.esi.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900 border-l border-gray-400">₹{totals.otherDeduct.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3 text-right text-sm text-gray-900">₹{totals.netPay.toLocaleString()}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {selectedEmployee && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEmployee.employeeName} - Payroll Details</DialogTitle>
              <DialogDescription>Detailed payroll information</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Regular Hours</p>
                  <p className="text-lg font-semibold">{selectedEmployee.regularHours} hrs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">OT Hours</p>
                  <p className="text-lg font-semibold">{selectedEmployee.otHours} hrs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Hourly Rate</p>
                  <p className="text-lg font-semibold">₹{selectedEmployee.hourlyRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">OT Rate</p>
                  <p className="text-lg font-semibold">₹{selectedEmployee.otRate}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Paid Leave Pay</p>
                  <p className="text-lg font-semibold">₹{selectedEmployee.paidLeavePay}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Bonus Pay</p>
                  <p className="text-lg font-semibold">₹{selectedEmployee.bonusPay}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 uppercase">Net Pay</p>
                  <p className="text-2xl font-bold text-green-600">₹{selectedEmployee.netPay}</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3">Deductions</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Professional Tax</span>
                  <span className="font-medium">₹{selectedEmployee.professionalTax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Income Tax (TDS)</span>
                  <span className="font-medium">₹{selectedEmployee.incomeTax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">EPF</span>
                  <span className="font-medium">₹{selectedEmployee.epf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ESI</span>
                  <span className="font-medium">₹{selectedEmployee.esi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other Deductions</span>
                  <span className="font-medium">₹{selectedEmployee.otherDeduct}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
