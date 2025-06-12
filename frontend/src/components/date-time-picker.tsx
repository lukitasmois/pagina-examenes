"use client"

import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { useState } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

interface DateTimePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false)

  // Extract hours and minutes from the value
  const hours = value ? value.getHours().toString().padStart(2, "0") : ""
  const minutes = value ? value.getMinutes().toString().padStart(2, "0") : ""

  const handleTimeChange = (hours: string, minutes: string) => {
    if (!value) return

    const newDate = new Date(value)
    newDate.setHours(Number.parseInt(hours) || 0)
    newDate.setMinutes(Number.parseInt(minutes) || 0)
    onChange(newDate)
  }

  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined)
      return
    }

    // Preserve the time from the existing value or set to end of day
    const newDate = new Date(date)
    if (value) {
      newDate.setHours(value.getHours())
      newDate.setMinutes(value.getMinutes())
    } else {
      newDate.setHours(23)
      newDate.setMinutes(59)
    }

    onChange(newDate)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-gray-200 bg-white hover:bg-gray-50",
            !value && "text-muted-foreground",
          )}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP 'at' p") : <span>Select due date and time...</span>}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={handleDateChange} initialFocus />
        <div className="border-t border-gray-200 p-3 space-y-2">
          <Label className="text-sm font-medium">Time</Label>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <Input
                type="number"
                min={0}
                max={23}
                value={hours}
                onChange={(e) => handleTimeChange(e.target.value, minutes)}
                className="w-16 border-gray-200"
                placeholder="HH"
              />
              <span>:</span>
              <Input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => handleTimeChange(hours, e.target.value)}
                className="w-16 border-gray-200"
                placeholder="MM"
              />
            </div>
            <Button
              size="sm"
              onClick={() => {
                const now = new Date()
                const newDate = value ? new Date(value) : now
                newDate.setHours(23)
                newDate.setMinutes(59)
                onChange(newDate)
              }}
            >
              End of Day
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
