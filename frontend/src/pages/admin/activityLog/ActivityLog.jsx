
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Search,
  Download,
  CalendarDays,
  ClipboardList,
  UserRound,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  FileText,
  Users,
  Megaphone,
  Settings,
  Filter,
  RotateCcw,
  X,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react"; 

const initialActivities = [
  {
    id: "ACT-1008",
    action: "Complaint status updated",
    description: "Changed complaint VS-1045 status to In Progress.",
    category: "Complaint",
    actor: "Rahul Sharma",
    role: "Administrator",
    target: "VS-1045",
    time: "10:42 AM",
    date: "2026-10-27",
    result: "Success",
    icon: ClipboardList,
  },
  {
    id: "ACT-1007",
    action: "Repair team assigned",
    description: "Assigned Emergency Team to a critical power outage.",
    category: "Assignment",
    actor: "Priya Deshmukh",
    role: "Operations Manager",
    target: "VS-1036",
    time: "10:18 AM",
    date: "2026-10-27",
    result: "Success",
    icon: Users,
  },
  {
    id: "ACT-1006",
    action: "Repair request submitted",
    description: "Transformer repair request submitted for approval.",
    category: "Approval",
    actor: "Amit Patil",
    role: "Administrator",
    target: "VS-1048",
    time: "09:56 AM",
    date: "2026-10-27",
    result: "Pending",
    icon: Clock3,
  },
  {
    id: "ACT-1005",
    action: "Public notice published",
    description: "Published a maintenance notice for Bandra West residents.",
    category: "Notice",
    actor: "Rahul Sharma",
    role: "Administrator",
    target: "NOTICE-021",
    time: "09:30 AM",
    date: "2026-10-27",
    result: "Success",
    icon: Megaphone,
  },
  {
    id: "ACT-1004",
    action: "Complaint resolved",
    description: "Marked the reported streetlight issue as resolved.",
    category: "Complaint",
    actor: "Sneha More",
    role: "Field Supervisor",
    target: "VS-1039",
    time: "09:05 AM",
    date: "2026-10-27",
    result: "Success",
    icon: CheckCircle2,
  },
  {
    id: "ACT-1003",
    action: "Failed login attempt",
    description: "An unsuccessful sign-in attempt was recorded.",
    category: "Security",
    actor: "Unknown user",
    role: "Unverified",
    target: "Admin portal",
    time: "08:48 AM",
    date: "2026-10-27",
    result: "Failed",
    icon: ShieldCheck,
  },
  {
    id: "ACT-1002",
    action: "Department settings updated",
    description: "Updated the contact details for the maintenance department.",
    category: "Settings",
    actor: "Priya Deshmukh",
    role: "Operations Manager",
    target: "Department settings",
    time: "04:35 PM",
    date: "2026-10-26",
    result: "Success",
    icon: Settings,
  },
  {
    id: "ACT-1001",
    action: "Complaint reviewed",
    description: "Reviewed a new voltage fluctuation complaint.",
    category: "Complaint",
    actor: "Amit Patil",
    role: "Administrator",
    target: "VS-1042",
    time: "03:20 PM",
    date: "2026-10-26",
    result: "Success",
    icon: FileText,
  },
];

const resultStyles = {
  Success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-red-50 text-red-700 border-red-200",
};

const categoryStyles = {
  Complaint: "bg-purple-50 text-[#61197B]",
  Assignment: "bg-amber-50 text-amber-800",
  Approval: "bg-orange-50 text-orange-700",
  Notice: "bg-yellow-50 text-yellow-800",
  Security: "bg-red-50 text-red-700",
  Settings: "bg-slate-100 text-slate-700",
};

export default function ActivityLog() { 

  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [result, setResult] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [notice, setNotice] = useState("");
 

  const filteredActivities = useMemo(() => {
    const today = "2026-10-27";

    return activities.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        item.id,
        item.action,
        item.description,
        item.actor,
        item.target,
        item.role,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesResult =
        result === "All" || item.result === result;

      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && item.date === today) ||
        (dateFilter === "Yesterday" && item.date === "2026-10-26");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesResult &&
        matchesDate
      );
    });
  }, [activities, search, category, result, dateFilter]);

  const successCount = activities.filter(
    (item) => item.result === "Success"
  ).length;

  const pendingCount = activities.filter(
    (item) => item.result === "Pending"
  ).length;

  const failedCount = activities.filter(
    (item) => item.result === "Failed"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setResult("All");
    setDateFilter("All");
  };

  const exportCSV = () => {
    const headers = [
      "Activity ID",
      "Action",
      "Description",
      "Category",
      "Actor",
      "Role",
      "Target",
      "Date",
      "Time",
      "Result",
    ];

    const rows = filteredActivities.map((item) => [
      item.id,
      item.action,
      item.description,
      item.category,
      item.actor,
      item.role,
      item.target,
      item.date,
      item.time,
      item.result,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "vidyutseva-activity-log.csv";
    link.click();
    URL.revokeObjectURL(url);

    setNotice("Activity log exported successfully.");
  };

  return (
    <div className="min-h-screen bg-[#FBF7ED] px-4 py-6 text-[#30163C] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#61197B]">
              <Activity size={17} />
              Admin / Activity Log
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Activity Log
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor administrative actions, complaint updates, team
              assignments, approvals, and security events.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#61197B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4E1263] sm:self-auto"
          >
            <Download size={17} />
            Export log
          </button>
        </section>

        {/* Feedback */}
        {notice && (
          <div
            role="status"
            className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {notice}
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Metrics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total activities"
            value={activities.length}
            caption="Recorded in demo data"
            icon={Activity}
            tone="bg-purple-100 text-[#61197B]"
          />
          <MetricCard
            title="Successful actions"
            value={successCount}
            caption="Completed operations"
            icon={CheckCircle2}
            tone="bg-emerald-100 text-emerald-700"
          />
          <MetricCard
            title="Pending actions"
            value={pendingCount}
            caption="Awaiting next step"
            icon={Clock3}
            tone="bg-amber-100 text-amber-700"
          />
          <MetricCard
            title="Security events"
            value={failedCount}
            caption="Failed events in sample"
            icon={AlertTriangle}
            tone="bg-red-100 text-red-600"
          />
        </section>

        {/* Activity table */}
        <section className="overflow-hidden rounded-2xl border border-[#E8DDEC] bg-white shadow-sm">

          <div className="border-b border-[#EEE5F0] p-5 sm:p-6">
            <h2 className="text-lg font-bold">System activity</h2>
            <p className="mt-1 text-sm text-slate-500">
              Search and review the recorded actions.
            </p>

            {/* Search and filters */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(200px,1fr)_180px_160px_150px_auto]">
              <div className="flex items-center gap-2 rounded-xl border border-[#E8DDEC] px-3 py-2.5 focus-within:border-[#61197B]">
                <Search size={17} className="shrink-0 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search action, admin or ID..."
                  aria-label="Search activity log"
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>

              <FilterSelect
                icon={Filter}
                value={category}
                onChange={setCategory}
                options={[
                  ["All", "All categories"],
                  ["Complaint", "Complaint"],
                  ["Assignment", "Assignment"],
                  ["Approval", "Approval"],
                  ["Notice", "Public notice"],
                  ["Security", "Security"],
                  ["Settings", "Settings"],
                ]}
              />

              <FilterSelect
                icon={CheckCircle2}
                value={result}
                onChange={setResult}
                options={[
                  ["All", "All results"],
                  ["Success", "Success"],
                  ["Pending", "Pending"],
                  ["Failed", "Failed"],
                ]}
              />

              <FilterSelect
                icon={CalendarDays}
                value={dateFilter}
                onChange={setDateFilter}
                options={[
                  ["All", "All dates"],
                  ["Today", "Today"],
                  ["Yesterday", "Yesterday"],
                ]}
              />

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E8DDEC] px-3 py-2.5 text-sm font-semibold text-[#61197B] transition hover:bg-purple-50"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#FFFEFA] px-5 py-3 text-xs text-slate-500 sm:px-6">
            <span>
              Showing{" "}
              <strong className="text-[#30163C]">
                {filteredActivities.length}
              </strong>{" "}
              of {activities.length} activities
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Demo activity records
            </span>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-[#FBF7ED] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Activity</th>
                  <th className="px-5 py-4 font-semibold">Performed by</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Date & time</th>
                  <th className="px-5 py-4 font-semibold">Result</th>
                  <th className="px-5 py-4 text-right font-semibold">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0E8F2]">
                {filteredActivities.map((item) => {
                  const Icon = item.icon;

                  return (
                    <tr
                      key={item.id}
                      className="transition hover:bg-[#FCFAFE]"
                    >
                      <td className="max-w-sm px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#61197B]">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#30163C]">
                              {item.action}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400">
                              {item.id} · Target: {item.target}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EBDDFA] text-[#61197B]">
                            <UserRound size={17} />
                          </div>
                          <div>
                            <p className="whitespace-nowrap font-medium text-[#30163C]">
                              {item.actor}
                            </p>
                            <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium ${
                            categoryStyles[item.category] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.category}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="font-medium text-[#30163C]">
                          {item.time}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.date}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full border px-2.5 py-1.5 text-xs font-semibold ${
                            resultStyles[item.result]
                          }`}
                        >
                          {item.result}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedActivity(item)}
                          aria-label={`View ${item.id} details`}
                          className="rounded-lg p-2 text-[#61197B] transition hover:bg-purple-50"
                        >
                          <ArrowUpRight size={19} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredActivities.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center"
                    >
                      <Search
                        size={28}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 font-semibold text-[#30163C]">
                        No activities found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-3 text-sm font-semibold text-[#61197B] hover:underline"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#EEE5F0] px-5 py-4 text-xs text-slate-500 sm:px-6">
            Activity records shown here are sample data for the frontend demo.
          </div>
        </section>

        {/* Activity timeline */}
        <section className="rounded-2xl border border-[#E8DDEC] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#F6B317]/20 p-3 text-[#8A5A00]">
              <Clock3 size={21} />
            </div>
            <div>
              <h2 className="font-bold">Recent activity timeline</h2>
              <p className="mt-1 text-sm text-slate-500">
                A chronological overview of the latest recorded actions.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-0">
            {filteredActivities.slice(0, 5).map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8DDEC] bg-[#FBF7ED] text-[#61197B]">
                      <Icon size={17} />
                    </div>

                    {index < Math.min(filteredActivities.length, 5) - 1 && (
                      <div className="my-1 min-h-8 w-px flex-1 bg-[#E8DDEC]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#30163C]">
                        {item.action}
                      </p>
                      <span className="text-xs text-slate-400">
                        {item.date} · {item.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-[#61197B]">
                      By {item.actor}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredActivities.length === 0 && (
              <p className="py-6 text-sm text-slate-500">
                No timeline entries match the selected filters.
              </p>
            )}
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-2 border-t border-[#E8DDEC] pt-5 text-xs text-slate-500 sm:flex-row">
          <span>VidyutSeva · AI-Powered Electricity Complaint Resolution</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} />
            Administrative activity monitor
          </span>
        </footer>
      </div>

      {/* Activity detail modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedActivity(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-detail-title"
            className="w-full max-w-lg rounded-2xl border border-[#E8DDEC] bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#61197B]">
                  {selectedActivity.id}
                </p>
                <h2
                  id="activity-detail-title"
                  className="mt-2 text-xl font-bold"
                >
                  {selectedActivity.action}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                aria-label="Close activity details"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {selectedActivity.description}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Detail
                label="Performed by"
                value={selectedActivity.actor}
              />
              <Detail
                label="Role"
                value={selectedActivity.role}
              />
              <Detail
                label="Category"
                value={selectedActivity.category}
              />
              <Detail
                label="Target"
                value={selectedActivity.target}
              />
              <Detail
                label="Date"
                value={selectedActivity.date}
              />
              <Detail
                label="Time"
                value={selectedActivity.time}
              />
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#FBF7ED] p-4">
              <span className="text-sm font-semibold">Action result</span>
              <span
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  resultStyles[selectedActivity.result]
                }`}
              >
                {selectedActivity.result}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedActivity(null)}
              className="mt-6 w-full rounded-xl bg-[#61197B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#4E1263]"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, caption, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-[#E8DDEC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-[#30163C]">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{caption}</p>
        </div>
        <div className={`rounded-xl p-3 ${tone}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ icon: Icon, value, onChange, options }) {
  return (
    <div className="relative flex min-w-0 items-center gap-2 rounded-xl border border-[#E8DDEC] px-3">
      <Icon size={15} className="shrink-0 text-[#61197B]" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0 appearance-none bg-transparent py-2.5 pr-5 text-sm outline-none"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 text-slate-400"
      />
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-[#FBF7ED] p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#30163C]">
        {value}
      </p>
    </div>
  );
}
