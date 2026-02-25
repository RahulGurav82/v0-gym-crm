'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'
import { PayrollLedgerTable } from './payroll-ledger-table'

export function PayrollLedgerPage() {
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
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

  const handleSearch = () => {
    console.log('Search payroll data')
  }

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8">
      <div className="max-w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Payroll Ledger</h1>
        </div>

        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Branch</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="h-10 bg-white">
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-10 bg-white">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay Starting Date</label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-10 bg-white" />
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay Ending Date</label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10 bg-white" />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSearch} className="h-10 bg-gray-900 hover:bg-gray-800 text-white">
                Search
              </Button>
              <Button variant="outline" onClick={handlePrint} className="h-10">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleExport} className="h-10">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <PayrollLedgerTable />
        </div>
      </div>
    </div>
  )
}
