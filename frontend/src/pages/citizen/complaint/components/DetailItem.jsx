import React from 'react'

const DetailItem = ({ label, value, icon: Icon }) => {
    return (
        <div className="rounded-xl bg-[#FBF7ED] p-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Icon size={13} />
                {label}
            </div>
            <p className="mt-2 break-words text-sm font-semibold text-[#30163C]">
                {value}
            </p>
        </div>
    );
}

export default DetailItem
