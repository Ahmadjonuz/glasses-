"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type FilterOptions = {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: { min: number; max: number | null; label: string }[]
}

type FilterValues = {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: string[]
}

interface FilterSidebarProps {
  options: FilterOptions
  onFilterChange: (filters: FilterValues) => void
}

export default function FilterSidebar({ options, onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterValues>({
    categories: [],
    brands: [],
    genders: [],
    priceRanges: [],
  })

  const handleFilterChange = (type: keyof FilterValues, value: string) => {
    setFilters((prev) => {
      const updated = { ...prev }

      if (updated[type].includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value)
      } else {
        updated[type] = [...updated[type], value]
      }

      return updated
    })
  }

  const applyFilters = () => {
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      genders: [],
      priceRanges: [],
    })
    onFilterChange({
      categories: [],
      brands: [],
      genders: [],
      priceRanges: [],
    })
  }

  return (
    <div className="grid gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="grid gap-3">
          {options.categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleFilterChange("categories", category)}
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Brands</h3>
        <div className="grid gap-3">
          {options.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => handleFilterChange("brands", brand)}
              />
              <Label htmlFor={`brand-${brand}`}>{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Gender</h3>
        <div className="grid gap-3">
          {options.genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={filters.genders.includes(gender)}
                onCheckedChange={() => handleFilterChange("genders", gender)}
              />
              <Label htmlFor={`gender-${gender}`}>{gender}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="grid gap-3">
          {options.priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.label}`}
                checked={filters.priceRanges.includes(range.label)}
                onCheckedChange={() => handleFilterChange("priceRanges", range.label)}
              />
              <Label htmlFor={`price-${range.label}`}>{range.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex gap-2">
        <Button className="flex-1" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
      </div>
    </div>
  )
}

