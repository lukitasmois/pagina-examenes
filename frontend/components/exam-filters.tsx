"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExamFiltersProps {
  onSubjectFilter: (subject: string) => void
  onStatusFilter: (status: string) => void
  onSearch: (query: string) => void
}

export function ExamFilters({ onSubjectFilter, onStatusFilter, onSearch }: ExamFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search exams..." className="pl-10" onChange={(e) => onSearch(e.target.value)} />
      </div>

      {/* Subject Filter */}
      <Select onValueChange={onSubjectFilter}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="All Subjects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          <SelectItem value="Mathematics">Mathematics</SelectItem>
          <SelectItem value="Science">Science</SelectItem>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="History">History</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select onValueChange={onStatusFilter}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="not_submitted">Not Submitted</SelectItem>
          <SelectItem value="submitted">Submitted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
