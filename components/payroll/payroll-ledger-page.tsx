'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PayrollLedgerTable } from './payroll-ledger-table'

export function PayrollLedgerPage() {
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const branches = ['Main Branch', 'Branch A', 'Branch B', 'Branch C']
  const departments = ['HR', 'Operations', 'Finance', 'Marketing', 'IT']

  const handleExport = () => {
    console.log('Export payroll ledger')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payroll Ledger</h1>
          <p className="text-gray-600 mt-1">Manage and review employee payroll information</p>
        </div>

        <Card className="mb-6 p-6 bg-white border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Branch</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay Start Date</label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-10" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay End Date</label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10" />
            </div>

            <div className="flex flex-col gap-2 justify-end">
              <Button variant="outline" onClick={handlePrint} className="h-10">
                Print
              </Button>
              <Button onClick={handleExport} className="h-10 bg-blue-600 hover:bg-blue-700">
                Export
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border">
          <PayrollLedgerTable />
        </Card>
      </div>
    </div>
  )
}
