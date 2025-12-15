"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import axios from "axios"
import { useAuthContext } from "./context/AuthContext"

interface SubjectSelectProps {
  value: string
  onChange: (value: string) => void
}

export function SubjectSelect({ value, onChange }: SubjectSelectProps) {
  const [open, setOpen] = useState(false)
  const [newSubjectDialogOpen, setNewSubjectDialogOpen] = useState(false)
  const [newSubject, setNewSubject] = useState("")
  const {userLogged, setUserLogged} = useAuthContext()

  // Sample subjects - in a real app, these would come from an API
  const [subjects, setSubjects] = useState([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() =>{
    const id = userLogged.user._id;
    axios
      .get(`${API_URL}/api/subjects/get-subjets/${id}`)
      .then((res) => {
        
        const subjects = res.data.subjects;
        const subjetsLoad = subjects.map((subject) =>({
          value: subject._id,
          label: `${subject.code_subject} - ${subject.name}`
        }))

        setSubjects(subjetsLoad)
      });
  }, [userLogged.user._id])

  const loadSubjets = async () =>{
 

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
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
