"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FeedbackTagsProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

const availableTags = [
  { id: "excellent", label: "Excellent", color: "bg-green-100 text-green-800 border-green-200" },
  { id: "good", label: "Good Work", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "improvement", label: "Needs Improvement", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: "creative", label: "Creative", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "thorough", label: "Thorough", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { id: "unclear", label: "Unclear", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { id: "incomplete", label: "Incomplete", color: "bg-red-100 text-red-800 border-red-200" },
  { id: "organized", label: "Well Organized", color: "bg-teal-100 text-teal-800 border-teal-200" },
]

export function FeedbackTags({ selectedTags, onTagsChange }: FeedbackTagsProps) {
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter((id) => id !== tagId))
    } else {
      onTagsChange([...selectedTags, tagId])
    }
  }

  const removeTag = (tagId: string) => {
    onTagsChange(selectedTags.filter((id) => id !== tagId))
  }

  return (
    <div className="space-y-3">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tagId) => {
            const tag = availableTags.find((t) => t.id === tagId)
            if (!tag) return null
            return (
              <Badge key={tagId} variant="outline" className={`${tag.color} pr-1`}>
                {tag.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                  onClick={() => removeTag(tagId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}

      {/* Available Tags */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Button
            key={tag.id}
            variant="outline"
            size="sm"
            onClick={() => toggleTag(tag.id)}
            className={`${selectedTags.includes(tag.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
            disabled={selectedTags.includes(tag.id)}
          >
            + {tag.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
