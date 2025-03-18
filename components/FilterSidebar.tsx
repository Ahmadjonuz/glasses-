"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS, PRODUCT_GENDERS } from "@/lib/models/Product"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type FilterType = 'categories' | 'brands' | 'genders' | 'priceRanges'

interface FilterSidebarProps {
  selectedFilters: {
    categories: string[];
    brands: string[];
    genders: string[];
    priceRanges: string[];
  };
  onFilterChange: (type: FilterType, value: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const PRICE_RANGES = [
  { id: 'under-150000', label: '150,000 so\'mdan kam', range: [0, 150000] },
  { id: '150000-300000', label: '150,000 - 300,000 so\'m', range: [150000, 300000] },
  { id: '300000-500000', label: '300,000 - 500,000 so\'m', range: [300000, 500000] },
  { id: 'above-500000', label: '500,000 so\'mdan yuqori', range: [500000, Infinity] },
]

const FilterContent = ({ selectedFilters, onFilterChange }: FilterSidebarProps) => (
  <div className="space-y-8">
    {/* Categories */}
    <div>
      <h3 className="font-semibold mb-4">Categories</h3>
      <div className="space-y-3">
        {PRODUCT_CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedFilters.categories.includes(category)}
              onCheckedChange={() => onFilterChange('categories', category)}
            />
            <Label
              htmlFor={`category-${category}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>

    {/* Brands */}
    <div>
      <h3 className="font-semibold mb-4">Brands</h3>
      <div className="space-y-3">
        {PRODUCT_BRANDS.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${brand}`}
              checked={selectedFilters.brands.includes(brand)}
              onCheckedChange={() => onFilterChange('brands', brand)}
            />
            <Label
              htmlFor={`brand-${brand}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {brand}
            </Label>
          </div>
        ))}
      </div>
    </div>

    {/* Gender */}
    <div>
      <h3 className="font-semibold mb-4">Gender</h3>
      <div className="space-y-3">
        {PRODUCT_GENDERS.map((gender) => (
          <div key={gender} className="flex items-center space-x-2">
            <Checkbox
              id={`gender-${gender}`}
              checked={selectedFilters.genders.includes(gender)}
              onCheckedChange={() => onFilterChange('genders', gender)}
            />
            <Label
              htmlFor={`gender-${gender}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {gender}
            </Label>
          </div>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div>
      <h3 className="font-semibold mb-4">Price Range</h3>
      <div className="space-y-3">
        {PRICE_RANGES.map((range) => (
          <div key={range.id} className="flex items-center space-x-2">
            <Checkbox
              id={`price-${range.id}`}
              checked={selectedFilters.priceRanges.includes(range.id)}
              onCheckedChange={() => onFilterChange('priceRanges', range.id)}
            />
            <Label
              htmlFor={`price-${range.id}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {range.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export function FilterSidebar({ selectedFilters, onFilterChange, isOpen, onClose }: FilterSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <FilterContent selectedFilters={selectedFilters} onFilterChange={onFilterChange} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-full sm:w-[300px] px-4">
          <SheetHeader className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>Filterlar</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
            <FilterContent selectedFilters={selectedFilters} onFilterChange={onFilterChange} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}