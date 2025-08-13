"use client"

import { useState, useMemo } from "react"
import { CalendarIcon, Clock, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

interface DateTimePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  closeOnSelectDate?: boolean
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Selecciona fecha y hora…",
  closeOnSelectDate = false,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)

  const hours = value ? value.getHours().toString().padStart(2, "0") : ""
  const minutes = value ? value.getMinutes().toString().padStart(2, "0") : ""

  const pretty = useMemo(() => {
    if (!value) return null
    try {
      return format(value, "PPP 'a las' p", { locale: es })
    } catch {
      return value.toLocaleString()
    }
  }, [value])

  const setTime = (h: number, m: number) => {
    const clampedH = Math.min(23, Math.max(0, h || 0))
    const clampedM = Math.min(59, Math.max(0, m || 0))
    const base = value ? new Date(value) : new Date()
    base.setHours(clampedH, clampedM, 0, 0)
    onChange(base)
  }

  const handleHoursChange = (raw: string) => {
    if (!raw && value) return
    const h = Number.parseInt(raw, 10)
    if (!Number.isNaN(h)) setTime(h, value ? value.getMinutes() : 0)
  }

  const handleMinutesChange = (raw: string) => {
    if (!raw && value) return
    const m = Number.parseInt(raw, 10)
    if (!Number.isNaN(m)) setTime(value ? value.getHours() : 0, m)
  }

  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined)
      return
    }
    const next = new Date(date)
    if (value) {
      next.setHours(value.getHours(), value.getMinutes(), 0, 0)
    } else {
      next.setHours(23, 59, 0, 0)
    }
    onChange(next)
    if (closeOnSelectDate) setOpen(false)
  }

  const setNow = () => {
    const now = new Date()
    onChange(now)
  }

  const setEOD = () => {
    const base = value ? new Date(value) : new Date()
    base.setHours(23, 59, 0, 0)
    onChange(base)
  }

  const clearAll = () => onChange(undefined)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-gray-200 bg-white hover:bg-gray-50",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {pretty ?? <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="left"
        align="start"
        sideOffset={8}
        avoidCollisions={false}
        className="w-auto p-0"
      >
        <div className="flex">
          {/* Calendario */}
          <div className="p-2 border-r border-gray-200">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateChange}
              initialFocus
              fixedWeeks
              className="[--cell-size:--spacing(7)]"
            />
          </div>

          {/* Bloque de hora y acciones */}
          <div className="p-3 w-[180px] space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              Hora
            </Label>

            <div className="flex items-center gap-1">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                value={hours}
                onChange={(e) => handleHoursChange(e.target.value)}
                placeholder="HH"
                className="w-14 text-center"
                aria-label="Horas (0–23)"
              />
              <span className="select-none">:</span>
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                value={minutes}
                onChange={(e) => handleMinutesChange(e.target.value)}
                placeholder="MM"
                className="w-14 text-center"
                aria-label="Minutos (0–59)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={setNow}>Ahora</Button>
              <Button size="sm" onClick={setEOD}>Fin de día</Button>
              <Button variant="ghost" size="sm" onClick={clearAll}>Limpiar</Button>
            </div>

            {/* Botón para cerrar */}
            <div className="pt-2 border-t border-gray-200 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1"
              >
                ✅
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
