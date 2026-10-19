import { ChevronDown } from 'lucide-react';
import React from 'react'

const FilterSelect = ({ label, value, onChange, options }) => {
    return (
        <label className="block min-w-0">
            <span className="mb-1.5 block text-xs font-semibold text-gray-600">
                {label}
            </span>

            <span className="relative block">
                <select
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E8DDEC] bg-[#FFFEFA] px-3 py-2.5 pr-8 text-xs text-[#30163C] outline-none focus:border-[#61197B]"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
            </span>
        </label>
    );
}

export default FilterSelect
