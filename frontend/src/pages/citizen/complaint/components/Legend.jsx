import React from 'react'

const Legend = ({ color, label }) => {
 return (
        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-600">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {label}
        </div>
    );
}

export default Legend
