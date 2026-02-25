'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'
import { EmployeeSalaryLedgerTable } from './employee-salary-ledger-table'

// Sample employee data (would come from props/URL params in real app)
const sampleEmployee = {
  name: 'John Doe',
  id: 'EMP001',
  branch: 'Main Branch',
  department: 'Operations',
  designation: 'Senior Associate',
  hourlyRate: 500,
  otRate: 750,
}

export function EmployeeSalaryLedgerPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSearch = () => {
    console.log('Filtering by dates:', { startDate, endDate })
  }

  const handleExport = () => {
    console.log('Export salary ledger')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8">
      <div className="max-w-full">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Employee Salary Ledger</h1>
        </div>

        {/* Employee Details Section */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Employee Name</label>
              <p className="text-sm font-medium text-gray-900 mt-1">{sampleEmployee.name}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Employee ID</label>
              <p className="text-sm font-medium text-gray-900 mt-1">{sampleEmployee.id}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Branch</label>
              <p className="text-sm font-medium text-gray-900 mt-1">{sampleEmployee.branch}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Department</label>
              <p className="text-sm font-medium text-gray-900 mt-1">{sampleEmployee.department}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Designation</label>
              <p className="text-sm font-medium text-gray-900 mt-1">{sampleEmployee.designation}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Hourly Rate</label>
              <p className="text-sm font-medium text-gray-900 mt-1">₹{sampleEmployee.hourlyRate}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">OT Rate</label>
              <p className="text-sm font-medium text-gray-900 mt-1">₹{sampleEmployee.otRate}</p>
            </div>
          </div>
        </div>

        {/* Date Filter Section */}
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay Starting Date</label>
              <Input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="h-10 bg-white"
              />
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay Ending Date</label>
              <Input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="h-10 bg-white"
              />
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

        {/* Salary Ledger Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <EmployeeSalaryLedgerTable />
        </div>
      </div>
    </div>
  )
}
