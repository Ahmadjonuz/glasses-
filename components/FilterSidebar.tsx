import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS, PRODUCT_GENDERS } from "@/lib/models/Product"

type FilterType = 'categories' | 'brands' | 'genders' | 'priceRanges'

interface FilterSidebarProps {
  selectedFilters: {
    categories: string[];
    brands: string[];
    genders: string[];
    priceRanges: string[];
  };
  onFilterChange: (type: FilterType, value: string) => void;
}

const PRICE_RANGES = [
  { id: 'under-1500', label: 'Under ₹1500', range: [0, 1500] },
  { id: '1500-3000', label: '₹1500 - ₹3000', range: [1500, 3000] },
  { id: '3000-5000', label: '₹3000 - ₹5000', range: [3000, 5000] },
  { id: 'above-5000', label: 'Above ₹5000', range: [5000, Infinity] },
]

export function FilterSidebar({ selectedFilters, onFilterChange }: FilterSidebarProps) {
  return (
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
}