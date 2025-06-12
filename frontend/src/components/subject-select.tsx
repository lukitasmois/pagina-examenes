"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

interface SubjectSelectProps {
  value: string
  onChange: (value: string) => void
}

export function SubjectSelect({ value, onChange }: SubjectSelectProps) {
  const [open, setOpen] = useState(false)
  const [newSubjectDialogOpen, setNewSubjectDialogOpen] = useState(false)
  const [newSubject, setNewSubject] = useState("")

  // Sample subjects - in a real app, these would come from an API
  const [subjects, setSubjects] = useState([
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "computer_science", label: "Computer Science" },
  ])

  const handleAddNewSubject = () => {
    if (newSubject.trim()) {
      const newSubjectValue = newSubject.toLowerCase().replace(/\s+/g, "_")
      setSubjects([...subjects, { value: newSubjectValue, label: newSubject.trim() }])
      onChange(newSubjectValue)
      setNewSubject("")
      setNewSubjectDialogOpen(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-gray-200 bg-white hover:bg-gray-50"
          >
            {value ? subjects.find((subject) => subject.value === value)?.label : "Select subject..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search subjects..." />
            <CommandList>
              <CommandEmpty>No subject found.</CommandEmpty>
            </CommandList>
            <CommandList>
              <CommandGroup>
                {subjects.map((subject) => (
                  <CommandItem
                    key={subject.value}
                    value={subject.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === subject.value ? "opacity-100" : "opacity-0")} />
                    {subject.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setNewSubjectDialogOpen(true)
                    setOpen(false)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add new subject
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Dialog for adding a new subject */}
      <Dialog open={newSubjectDialogOpen} onOpenChange={setNewSubjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-subject">Subject Name</Label>
              <Input
                id="new-subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Enter subject name"
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewSubjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNewSubject} disabled={!newSubject.trim()}>
              Add Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
