import React from 'react'

const StatCard = ({ icon: Icon, label, value, description, iconClass }) => {
    return (
        <div className="rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="mt-3 text-3xl font-bold text-[#30163C]">{value}</p>
                    <p className="mt-1 text-xs text-gray-500">{description}</p>
                </div>

                <div className={`rounded-xl p-3 ${iconClass}`}>
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
}

export default StatCard
