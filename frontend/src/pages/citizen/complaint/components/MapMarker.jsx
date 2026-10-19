import { MapPin } from 'lucide-react';
import React from 'react'

const MapMarker = ({ color, label }) => {
      return (
          <div className="group relative flex flex-col items-center">
              <span className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded-md bg-[#30163C] px-2 py-1 text-[10px] font-medium text-white shadow group-hover:block">
                  {label}
              </span>
  
              <span className={`absolute h-8 w-8 animate-ping rounded-full ${color} opacity-20`} />
  
              <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white ${color} text-white shadow-md`}
              >
                  <MapPin size={14} />
              </span>
          </div>
      );
}

export default MapMarker
