import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  Download, 
  Filter, 
  Search,
  Trash2
} from "lucide-react"

interface CrudActionBarProps {
  title: string
  onAdd?: () => void
  onExport?: () => void
  onBulkDelete?: () => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters?: {
    label: string
    value: string
    options: { label: string; value: string }[]
    onChange: (value: string) => void
  }[]
  selectedCount?: number
  className?: string
}

export function CrudActionBar({
  title,
  onAdd,
  onExport,
  onBulkDelete,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  selectedCount = 0,
  className = ""
}: CrudActionBarProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {selectedCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          {onBulkDelete && selectedCount > 0 && (
            <Button variant="destructive" onClick={onBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedCount})
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        )}

        {/* Filters */}
        {filters.map((filter, index) => (
          <Select key={index} value={filter.value} onValueChange={filter.onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
    </div>
  )
}
