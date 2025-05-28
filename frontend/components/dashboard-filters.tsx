"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardFiltersProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onSearch: (query: string) => void
}

export function DashboardFilters({ activeTab, onTabChange, onSearch }: DashboardFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search exams..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
