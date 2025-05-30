"use client"

import { Search } from 'lucide-react'
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"

interface SubmissionFiltersProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onSearch: (query: string) => void
}

export function SubmissionFilters({ activeTab, onTabChange, onSearch }: SubmissionFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search students..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="corrected">Corrected</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
