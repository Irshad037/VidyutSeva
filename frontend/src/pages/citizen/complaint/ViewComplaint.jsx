 
import React from "react";
import {
  Globe,
  ChevronDown,
  Check,
  Zap,
  MapPin,
  Plus,
  Paperclip,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewComplaint = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Complaint registered",
      time: "Today, 10:42 AM",
      status: "completed",
    },
    {
      title: "AI analysis completed",
      time: "Today, 10:43 AM",
      status: "completed",
    },
    {
      title: "Technician assigned",
      time: "Today, 10:48 AM",
      status: "completed",
    },
    {
      title: "Repair work started",
      time: "In progress",
      status: "active",
    },
    {
      title: "Resolved",
      time: "Pending",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7ED] p-4 md:p-7 xl:pr-24 fontcorm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#29113A]">
            Complaint status
          </h1>

          <p className="mt-3 text-[#75647B]">
            Follow the progress of your complaint from registration to
            resolution.
          </p>
        </div>

        <button
          type="button"
          className="hidden sm:flex items-center gap-2 text-sm text-[#29113A]"
        >
          <Globe size={18} className="text-[#75647B]" />
          English
          <ChevronDown size={15} />
          <ChevronDown size={15} className="text-[#75647B]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint Timeline */}
        <div className="rounded-2xl border border-[#DECBE5] bg-[#FFFCF5] p-6 md:p-9 shadow-sm">
          {/* Complaint ID */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[#75647B]">Complaint ID</p>

              <h2 className="mt-2 font-bold text-[#29113A]">
                URJ-2024-08241
              </h2>
            </div>

            <span className="rounded-full bg-[#FFF0C2] px-4 py-1 text-sm font-semibold text-[#29113A]">
              In progress
            </span>
          </div>

          <div className="my-7 border-t border-[#DECBE5]" />

          {/* Timeline */}
          <div>
            {steps.map((step, index) => {
              const completed = step.status === "completed";
              const active = step.status === "active";
              const last = index === steps.length - 1;

              return (
                <div key={step.title} className="flex gap-4">
                  {/* Timeline Icon and Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${
                        completed
                          ? "border-[#61197B] bg-[#61197B] text-white"
                          : active
                          ? "border-[#DECBE5] bg-white text-[#61197B]"
                          : "border-[#F0DDF6] bg-[#F0DDF6] text-[#806B8A]"
                      }`}
                    >
                      {completed ? (
                        <Check size={19} />
                      ) : active ? (
                        <Zap size={19} />
                      ) : (
                        <Check size={19} />
                      )}
                    </div>

                    {!last && (
                      <div
                        className={`w-0.5 min-h-[54px] ${
                          completed ? "bg-[#61197B]" : "bg-[#DECBE5]"
                        }`}
                      />
                    )}
                  </div>

                  {/* Timeline Text */}
                  <div className="pt-2 pb-8">
                    <h3
                      className={`font-bold ${
                        active ? "text-[#61197B]" : "text-[#29113A]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#75647B]">
                      {step.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Complaint Summary */}
          <div className="rounded-2xl border border-[#DECBE5] bg-[#FFFCF5] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#29113A]">
              Complaint summary
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-[#75647B]">Issue</p>
                <p className="mt-2 text-[#29113A]">
                  No electricity in Bandra West since last night
                </p>
              </div>

              <div>
                <p className="text-sm text-[#75647B]">Location</p>

                <p className="mt-2 flex items-center gap-2 text-[#29113A]">
                  <MapPin size={17} className="text-[#61197B]" />
                  14th Road, Bandra West
                </p>
              </div>

              <div>
                <p className="text-sm text-[#75647B]">Assigned team</p>
                <p className="mt-2 text-[#29113A]">
                  MSEDCL · Bandra Division
                </p>
              </div>
            </div>
          </div>

          {/* Register Another Complaint */}
          <button
            type="button"
            onClick={() => navigate("/new-complaint")}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DECBE5] px-4 py-3 text-[#29113A] transition hover:bg-[#F4E8F6]"
          >
            <Plus size={18} />
            Register another complaint
          </button>

          {/* Help */}
          <div className="flex items-center gap-3 rounded-2xl bg-[#F4E5F3] p-5 text-sm text-[#61197B]">
            <Paperclip size={18} />

            <span>
              Need help? Call{" "}
              <a
                href="tel:1912"
                className="ml-1 font-bold text-[#29113A] hover:underline"
              >
                1912
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
 