
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  BrainCircuit,
  ClipboardCheck,
  Users,
  Megaphone,
  Search,
  ArrowUpRight,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
  Filter,
  MoreHorizontal,
  Truck,
  Activity,
  Download,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import Layout from "../../../layouts/Layout";

const initialComplaints = [
  {
    id: "VS-1048",
    issue: "Transformer failure",
    location: "Bandra West, Mumbai",
    priority: "Critical",
    status: "Pending approval",
    reports: 84,
    team: "Unassigned",
    time: "10:42 AM",
  },
  {
    id: "VS-1045",
    issue: "Area power outage",
    location: "Andheri East, Mumbai",
    priority: "High",
    status: "In progress",
    reports: 23,
    team: "Team Alpha",
    time: "10:18 AM",
  },
  {
    id: "VS-1042",
    issue: "Voltage fluctuation",
    location: "Thane West, Maharashtra",
    priority: "Medium",
    status: "Assigned",
    reports: 8,
    team: "Team Beta",
    time: "09:56 AM",
  },
  {
    id: "VS-1039",
    issue: "Streetlight not working",
    location: "Navi Mumbai, Maharashtra",
    priority: "Low",
    status: "Resolved",
    reports: 2,
    team: "Team Gamma",
    time: "09:24 AM",
  },
  {
    id: "VS-1036",
    issue: "Power outage near hospital",
    location: "Kalyan, Maharashtra",
    priority: "Critical",
    status: "In progress",
    reports: 16,
    team: "Emergency Team",
    time: "09:10 AM",
  },
];

const weeklyData = [
  { day: "Mon", complaints: 38, resolved: 27 },
  { day: "Tue", complaints: 52, resolved: 35 },
  { day: "Wed", complaints: 44, resolved: 32 },
  { day: "Thu", complaints: 68, resolved: 49 },
  { day: "Fri", complaints: 58, resolved: 41 },
  { day: "Sat", complaints: 34, resolved: 29 },
  { day: "Sun", complaints: 42, resolved: 36 },
];

const priorityStyle = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

const statusStyle = {
  "Pending approval": "bg-purple-50 text-purple-700",
  "In progress": "bg-orange-50 text-orange-700",
  Assigned: "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

function MetricCard({ title, value, subtitle, icon: Icon, tone, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-0 rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-4 text-left transition hover:-translate-y-1 hover:shadow-md sm:p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-slate-500">{title}</span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon size={20} />
        </span>
      </div>

      <div className="mt-4 text-3xl font-bold tracking-tight text-[#30163C]">
        {value}
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <TrendingUp size={14} className="text-emerald-600" />
        {subtitle}
      </div>
    </button>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [period, setPeriod] = useState("7 days");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredComplaints = useMemo(() => {
    const query = search.toLowerCase();

    return complaints.filter((item) => {
      const matchesSearch = [
        item.id,
        item.issue,
        item.location,
        item.team,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesPriority =
        priorityFilter === "All" || item.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [complaints, search, priorityFilter, statusFilter]);

  const criticalCount = complaints.filter(
    (item) => item.priority === "Critical" && item.status !== "Resolved"
  ).length;

  const pendingCount = complaints.filter(
    (item) => item.status === "Pending approval"
  ).length;

  function updateComplaint(id, changes) {
    setComplaints((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );

    setSelectedComplaint((previous) =>
      previous?.id === id ? { ...previous, ...changes } : previous
    );
  }

  function exportComplaints() {
    const headers = [
      "Complaint ID",
      "Issue",
      "Location",
      "Priority",
      "Status",
      "Affected Reports",
      "Assigned Team",
    ];

    const rows = filteredComplaints.map((item) => [
      item.id,
      item.issue,
      item.location,
      item.priority,
      item.status,
      item.reports,
      item.team,
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
    link.download = "vidyutseva-complaints.csv";
    link.click();

    URL.revokeObjectURL(url);
    setNotice("Complaint report exported successfully.");
  }

  function clearFilters() {
    setSearch("");
    setPriorityFilter("All");
    setStatusFilter("All");
  }

  return (
    <Layout currTitle="Dashboard">
      <div className="min-h-screen bg-[#FBF7ED]  text-[#30163C]">
        <main className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-9">
          {/* Welcome section */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[#61197B]">
                Saturday · October 10, 2026
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Good evening, Administrator
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Here's what's happening across your electricity service area.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportComplaints}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E3D4E8] bg-[#FFFEF6] px-4 py-2.5 text-sm font-semibold transition hover:bg-purple-50"
              >
                <Download size={17} />
                Export report
              </button>

              <button
                onClick={() => navigate("/admin/complaints")}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#61197B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4E1263]"
              >
                <ClipboardList size={17} />
                All complaints
              </button>
            </div>
          </section>

          {/* Success notification */}
          {notice && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              <span>{notice}</span>
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
                className="rounded-lg p-1 hover:bg-emerald-100"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* KPI cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total complaints"
              value="248"
              subtitle="12% more than last week"
              icon={ClipboardList}
              tone="bg-purple-50 text-[#61197B]"
              onClick={clearFilters}
            />

            <MetricCard
              title="Critical issues"
              value="12"
              subtitle={`${criticalCount} in current sample unresolved`}
              icon={AlertTriangle}
              tone="bg-red-50 text-red-600"
              onClick={() => setPriorityFilter("Critical")}
            />

            <MetricCard
              title="Pending approvals"
              value={pendingCount + 5}
              subtitle="Require authority review"
              icon={Clock3}
              tone="bg-amber-50 text-amber-700"
              onClick={() => setStatusFilter("Pending approval")}
            />

            <MetricCard
              title="Resolved complaints"
              value="169"
              subtitle="68% of all complaints"
              icon={CheckCircle2}
              tone="bg-emerald-50 text-emerald-700"
              onClick={() => setStatusFilter("Resolved")}
            />
          </section>

          {/* Activity chart and AI insights */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
            <div className="rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Complaint activity</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Incoming versus resolved complaints
                  </p>
                </div>

                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="rounded-lg border border-[#D8C6E4] bg-[#FBF7ED] px-3 py-2 text-sm outline-none focus:border-[#61197B]"
                >
                  <option>7 days</option>
                  <option>30 days</option>
                </select>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#61197B]" />
                  Received
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#f3eee1]" />
                  Resolved
                </span>
              </div>

              <div className="mt-5 flex h-48 items-end justify-between gap-2 border-b border-l border-slate-100 px-2 sm:gap-4">
                {weeklyData.map((day) => (
                  <div
                    key={day.day}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <div className="flex h-[85%] w-full items-end justify-center gap-1">
                      <div
                        title={`${day.complaints} complaints received`}
                        className="w-2/5 max-w-7 rounded-t-md bg-[#61197B] transition hover:bg-[#7B3097]"
                        style={{
                          height: `${(day.complaints / 75) * 100}%`,
                        }}
                      />
                      <div
                        title={`${day.resolved} complaints resolved`}
                        className="w-2/5 max-w-7 rounded-t-md bg-[#f3eee1] transition hover:opacity-80"
                        style={{
                          height: `${(day.resolved / 75) * 100}%`,
                        }}
                      />
                    </div>

                    <span className="mt-3 pb-2 text-[11px] text-slate-500">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Illustrative weekly data. Connect your analytics API for live
                reporting and period-based results.
              </p>
            </div>

            {/* AI intelligence card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#61197B] p-5 text-white sm:p-6">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[25px] border-white/5" />

              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee1] text-[#30163C]">
                  <Sparkles size={23} />
                </span>

                <div>
                  <h2 className="font-bold">AI intelligence</h2>
                  <p className="text-xs text-purple-200">
                    Operational insights
                  </p>
                </div>
              </div>

              <div className="relative mt-7">
                <p className="text-sm text-purple-200">
                  Similar reports detected
                </p>
                <p className="mt-2 text-4xl font-bold">84</p>
                <p className="mt-2 text-sm leading-6 text-purple-100">
                  Reports associated with a possible transformer failure in
                  Bandra West.
                </p>
              </div>

              <div className="relative mt-6 rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-[#F6B317]">
                  <AlertTriangle size={18} />
                  <span className="text-sm font-semibold">
                    Recommended action
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-purple-100">
                  Review the grouped reports, verify the fault and approve
                  maintenance dispatch if appropriate.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/intelligence")}
                className="relative mt-5 flex w-full items-center justify-between rounded-xl bg-[#f3eee1] px-4 py-3 text-sm font-bold text-[#30163C] transition hover:bg-yellow-300"
              >
                Review AI insights
                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* Complaint priority queue */}
          <section className="overflow-hidden rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6]">
            <div className="flex flex-col justify-between gap-4 border-b border-[#EEE5F0] p-5 md:flex-row md:items-center sm:p-6">
              <div>
                <h2 className="text-lg font-bold">Complaint priority queue</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review reported issues and coordinate response.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/complaints")}
                className="flex items-center gap-2 self-start text-sm font-semibold text-[#61197B] hover:underline md:self-auto"
              >
                View all <ArrowRight size={16} />
              </button>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col gap-3 border-b border-[#EEE5F0] p-4 lg:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#D8C6E4] px-3 py-2.5">
                <Search size={17} className="shrink-0 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search ID, issue, location or team..."
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#D8C6E4] px-3">
                <Filter size={16} className="text-[#61197B]" />
                <select
                  value={priorityFilter}
                  onChange={(event) => setPriorityFilter(event.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                >
                  <option value="All">All priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-2.5 text-sm outline-none"
              >
                <option value="All">All statuses</option>
                <option value="Pending approval">Pending approval</option>
                <option value="In progress">In progress</option>
                <option value="Assigned">Assigned</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Complaints table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-[#FBF7ED] text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Complaint</th>
                    <th className="px-5 py-4 font-semibold">Location</th>
                    <th className="px-5 py-4 font-semibold">Reports</th>
                    <th className="px-5 py-4 font-semibold">Priority</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Team</th>
                    <th className="px-5 py-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#F0E8F2]">
                  {filteredComplaints.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-[#FCFAFE]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#30163C]">
                          {item.issue}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.id} · {item.time}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 whitespace-nowrap text-slate-600">
                          <MapPin
                            size={14}
                            className="shrink-0 text-[#8B6B97]"
                          />
                          {item.location}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-semibold">{item.reports}</span>
                        <span className="ml-1 text-xs text-slate-500">
                          reports
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyle[item.priority]}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {item.team}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedComplaint(item)}
                          className="rounded-lg p-2 text-[#61197B] hover:bg-purple-50"
                          title="Manage complaint"
                          aria-label={`Manage ${item.id}`}
                        >
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredComplaints.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-slate-500"
                      >
                        No complaints match your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-[#EEE5F0] px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
              <span>
                Showing {filteredComplaints.length} of {complaints.length} sample
                complaints
              </span>

              <button
                onClick={clearFilters}
                className="self-start font-semibold text-[#61197B] hover:underline sm:self-auto"
              >
                Clear filters
              </button>
            </div>
          </section>

          {/* Quick action cards */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              onClick={() => navigate("/admin/approvals")}
              className="flex items-center gap-4 rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 text-left transition hover:border-[#C6A8D2] hover:shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#61197B]">
                <ClipboardCheck size={23} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">Review approvals</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Review grouped repair requests
                </span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-[#61197B]" />
            </button>

            <button
              onClick={() => navigate("/admin/teams")}
              className="flex items-center gap-4 rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 text-left transition hover:border-[#C6A8D2] hover:shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Truck size={23} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">Manage repair teams</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Coordinate field assignments
                </span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-[#61197B]" />
            </button>

            <button
              onClick={() => navigate("/admin/notices")}
              className="flex items-center gap-4 rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 text-left transition hover:border-[#C6A8D2] hover:shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#61197B]">
                <Megaphone size={23} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">Publish public notice</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Share maintenance updates
                </span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-[#61197B]" />
            </button>
          </section>

          {/* Footer */}
          <footer className="flex flex-col justify-between gap-2 border-t border-[#E8DDEC] pt-5 text-xs text-slate-500 sm:flex-row">
            <span>
              VidyutSeva · AI-Powered Electricity Complaint Resolution
            </span>
            <span className="flex items-center gap-1.5">
              <Activity size={14} />
              Admin dashboard
            </span>
          </footer>
        </main>

        {/* Complaint management modal */}
        {selectedComplaint && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedComplaint(null);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="complaint-modal-title"
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 shadow-2xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#61197B]">
                    {selectedComplaint.id}
                  </p>
                  <h2
                    id="complaint-modal-title"
                    className="mt-2 text-xl font-bold"
                  >
                    {selectedComplaint.issue}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} />
                    {selectedComplaint.location}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="rounded-lg p-2 hover:bg-slate-100"
                  aria-label="Close details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#FBF7ED] p-3">
                  <p className="text-xs text-slate-500">Priority</p>
                  <p className="mt-1 font-semibold">
                    {selectedComplaint.priority}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FBF7ED] p-3">
                  <p className="text-xs text-slate-500">Similar reports</p>
                  <p className="mt-1 font-semibold">
                    {selectedComplaint.reports}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="assign-team"
                  className="text-sm font-semibold"
                >
                  Assign repair team
                </label>

                <select
                  id="assign-team"
                  value={selectedComplaint.team}
                  onChange={(event) => {
                    const team = event.target.value;
                    updateComplaint(selectedComplaint.id, {
                      team,
                      status:
                        team === "Unassigned"
                          ? selectedComplaint.status
                          : "Assigned",
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-[#D8C6E4]  bg-[#FFFEF6] px-3 py-3 text-sm outline-none focus:border-[#61197B]"
                >
                  <option>Unassigned</option>
                  <option>Team Alpha</option>
                  <option>Team Beta</option>
                  <option>Team Gamma</option>
                  <option>Emergency Team</option>
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="update-status"
                  className="text-sm font-semibold"
                >
                  Complaint status
                </label>

                <select
                  id="update-status"
                  value={selectedComplaint.status}
                  onChange={(event) =>
                    updateComplaint(selectedComplaint.id, {
                      status: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-3 text-sm outline-none focus:border-[#61197B]"
                >
                  <option>Pending approval</option>
                  <option>Assigned</option>
                  <option>In progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="rounded-xl border border-[#D8C6E4] px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setNotice(
                      `${selectedComplaint.id} updated in the local demo.`
                    );
                    setSelectedComplaint(null);
                  }}
                  className="rounded-xl bg-[#61197B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4E1263]"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </Layout>

  );
}
