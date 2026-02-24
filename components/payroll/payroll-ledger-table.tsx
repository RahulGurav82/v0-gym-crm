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
      <div className="border rounded-lg bg-white overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-gray-50 border-b">
            <TableRow>
              <TableHead className="w-12 text-center text-xs font-semibold">No.</TableHead>
              <TableHead className="text-xs font-semibold min-w-40">Employee</TableHead>
              <TableHead colSpan={2} className="text-center text-xs font-semibold border-l">Hours</TableHead>
              <TableHead className="text-xs font-semibold border-l">Hourly Rate</TableHead>
              <TableHead className="text-xs font-semibold">OT Rate</TableHead>
              <TableHead className="text-xs font-semibold">Paid Leave</TableHead>
              <TableHead className="text-xs font-semibold">Bonus</TableHead>
              <TableHead colSpan={4} className="text-center text-xs font-semibold border-l">Deductions</TableHead>
              <TableHead className="text-xs font-semibold border-l">Other Ded</TableHead>
              <TableHead className="text-xs font-semibold">Net Pay</TableHead>
              <TableHead className="text-xs font-semibold text-center w-24">Actions</TableHead>
            </TableRow>
            <TableRow className="border-t bg-gray-50">
              <TableHead colSpan={2}></TableHead>
              <TableHead className="text-xs font-semibold border-l text-center">Reg</TableHead>
              <TableHead className="text-xs font-semibold text-center">OT</TableHead>
              <TableHead colSpan={4}></TableHead>
              <TableHead className="text-xs font-semibold border-l text-center">P Tax</TableHead>
              <TableHead className="text-xs font-semibold text-center">TDS</TableHead>
              <TableHead className="text-xs font-semibold text-center">EPF</TableHead>
              <TableHead className="text-xs font-semibold text-center">ESI</TableHead>
              <TableHead colSpan={3}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={row.id} className="border-b hover:bg-gray-50">
                <TableCell className="text-center text-sm font-medium">{index + 1}</TableCell>
                <TableCell className="text-sm font-medium">{row.employeeName}</TableCell>
                <TableCell className="text-center text-sm border-l">{row.regularHours}</TableCell>
                <TableCell className="text-center text-sm">{row.otHours}</TableCell>
                <TableCell className="text-right text-sm border-l">₹{row.hourlyRate}</TableCell>
                <TableCell className="text-right text-sm">₹{row.otRate}</TableCell>
                <TableCell className="text-right text-sm">₹{row.paidLeavePay}</TableCell>
                <TableCell className="text-right text-sm">₹{row.bonusPay}</TableCell>
                <TableCell className="text-right text-sm border-l">₹{row.professionalTax}</TableCell>
                <TableCell className="text-right text-sm">₹{row.incomeTax}</TableCell>
                <TableCell className="text-right text-sm">₹{row.epf}</TableCell>
                <TableCell className="text-right text-sm">₹{row.esi}</TableCell>
                <TableCell className="text-right text-sm border-l">₹{row.otherDeduct}</TableCell>
                <TableCell className="text-right text-sm font-semibold">₹{row.netPay}</TableCell>
                <TableCell className="text-center border-l">
                  <div className="flex gap-1 justify-center">
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => handleView(row)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Pay
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100 border-t-2 border-gray-300">
              <TableCell colSpan={2} className="text-sm font-bold">TOTAL</TableCell>
              <TableCell className="text-center text-sm font-bold border-l">{totals.regularHours}</TableCell>
              <TableCell className="text-center text-sm font-bold">{totals.otHours}</TableCell>
              <TableCell className="text-center text-sm border-l">-</TableCell>
              <TableCell className="text-center text-sm">-</TableCell>
              <TableCell className="text-right text-sm font-bold">₹{totals.paidLeavePay}</TableCell>
              <TableCell className="text-right text-sm font-bold">₹{totals.bonusPay}</TableCell>
              <TableCell className="text-right text-sm font-bold border-l">₹{totals.professionalTax}</TableCell>
              <TableCell className="text-right text-sm font-bold">₹{totals.incomeTax}</TableCell>
              <TableCell className="text-right text-sm font-bold">₹{totals.epf}</TableCell>
              <TableCell className="text-right text-sm font-bold">₹{totals.esi}</TableCell>
              <TableCell className="text-right text-sm font-bold border-l">₹{totals.otherDeduct}</TableCell>
              <TableCell className="text-right text-sm font-bold">₹{totals.netPay}</TableCell>
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
