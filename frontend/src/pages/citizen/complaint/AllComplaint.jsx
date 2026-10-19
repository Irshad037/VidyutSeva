
import React, { useState } from "react";
import {
  Plus,
  ClipboardList,
  Search,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layouts/Layout";

const AllComplaint = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Sample data — replace with API data later
  const complaints = [
    {
      id: "VS-1024",
      category: "Power outage",
      location: "Bandra West, Mumbai",
      status: "In progress",
      priority: "High",
      aiSummary:
        "Possible area-level power failure. Similar reports detected nearby.",
    },
  ];

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.id.toLowerCase().includes(search.toLowerCase()) ||
      complaint.category.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout parentTitle="Complaint" currTitle="View-complaint">

      <div className="min-h-screen bg-[#F7F2E8] px-4 py-4 pb-10 md:px-6 lg:px-10 fontcorm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>  
            <h1 className="mt-2 text-3xl font-bold text-[#2D1738]">
              My Complaints
            </h1>

            <p className="mt-2 text-[#786A7D]">
              Track your electricity service requests.
            </p>
          </div>

          <button
            onClick={() => navigate("/citizen/complaint")}
            aria-label="Create complaint"
            className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#61197B] text-white transition hover:bg-[#7B3097]"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#D8C6E4] bg-[#FFFEF6]  p-4 sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-[#786A7D]">Total complaints</p>
              <ClipboardList size={20} className="text-[#61197B]" />
            </div>
            <h2 className="mt-2 text-3xl font-bold text-[#2D1738]">12</h2>
            <p className="mt-1 text-sm text-[#786A7D]">
              All submitted requests
            </p>
          </div>

          <div className="rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] p-4">
            <p className="text-[#786A7D]">In progress</p>
            <h2 className="mt-2 text-2xl font-bold text-[#A66A00]">3</h2>
          </div>

          <div className="rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] p-4">
            <p className="text-[#786A7D]">Resolved</p>
            <h2 className="mt-2 text-2xl font-bold text-[#287547]">9</h2>
          </div>
        </div>

        {/* Complaint List */}
        <div className="mt-4 rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] p-4">
          {/* Search */}
          <div className="flex items-center gap-3 border-b border-[#EDE3F0] pb-4">
            <Search size={20} className="shrink-0 text-[#786A7D]" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaint ID or issue"
              className="w-full bg-transparent text-[#2D1738] outline-none placeholder:text-[#786A7D]"
            />

            <button
              type="button"
              aria-label="Filter complaints"
              className="text-[#61197B] transition hover:text-[#7B3097]"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Complaints */}
          <div className="mt-5 space-y-5">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <div key={complaint.id}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm text-[#61197B]">
                        {complaint.id}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-[#2D1738]">
                        {complaint.category}
                      </h3>

                      <p className="mt-1 text-sm text-[#786A7D]">
                        {complaint.location}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                      <span className="rounded-full bg-[#FFE8DC] px-3 py-1 text-sm font-medium text-[#B54708]">
                        {complaint.status}
                      </span>

                      <span className="text-sm text-[#786A7D]">
                        {complaint.priority} priority
                      </span>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="mt-4 rounded-lg bg-[#F5EDF7] p-4">
                    <div className="flex items-center gap-2 text-[#61197B]">
                      <Sparkles size={20} />
                      <h4 className="font-semibold">AI issue detected</h4>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#5F5066]">
                      {complaint.aiSummary}
                    </p>
                  </div>

                  {/* Details */}
                  <button
                    onClick={() =>
                      navigate(`/citizen/view-complaint/${complaint.id}`)
                    }
                    className="mt-4 cursor-pointer flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-semibold text-white transition hover:bg-[#333333]"
                  >
                    View complaint details
                    <ArrowRight size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <ClipboardList
                  size={36}
                  className="mx-auto text-[#B8A5C2]"
                />
                <p className="mt-3 font-medium text-[#2D1738]">
                  No complaints found
                </p>
                <p className="mt-1 text-sm text-[#786A7D]">
                  Try another complaint ID or search term.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-[#786A7D]">
          Showing sample complaint data for demonstration.
        </p>
      </div>
    </Layout>

  );
};

export default AllComplaint; 