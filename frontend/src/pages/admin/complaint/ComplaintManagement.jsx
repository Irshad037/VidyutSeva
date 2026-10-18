
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ArrowUpDown,
  Eye,
  X,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  RotateCcw,
  SlidersHorizontal,
  Check,
  FileWarning,
  Users,
  ArrowRight,
} from "lucide-react";
import Layout from "../../../layouts/Layout";

const initialComplaints = [
  {
    id: "VS-1048",
    citizen: "Rahul Sharma",
    issue: "Transformer failure",
    category: "Transformer",
    location: "Bandra West, Mumbai",
    date: "2026-10-10",
    priority: "Critical",
    status: "Pending approval",
    team: "Unassigned",
    reports: 84,
    description:
      "Multiple residents have reported a transformer failure causing a power outage across several streets.",
  },
  {
    id: "VS-1047",
    citizen: "Ayesha Khan",
    issue: "Power outage in residential area",
    category: "Power outage",
    location: "Andheri East, Mumbai",
    date: "2026-10-10",
    priority: "High",
    status: "In progress",
    team: "Team Alpha",
    reports: 32,
    description:
      "Residents have been without electricity for several hours. A repair team has been dispatched.",
  },
  {
    id: "VS-1046",
    citizen: "Amit Patil",
    issue: "Voltage fluctuation",
    category: "Voltage",
    location: "Thane West, Maharashtra",
    date: "2026-10-09",
    priority: "Medium",
    status: "Assigned",
    team: "Team Beta",
    reports: 12,
    description:
      "Frequent voltage fluctuations have been reported in nearby residential buildings.",
  },
  {
    id: "VS-1045",
    citizen: "Priya Deshmukh",
    issue: "Streetlight not working",
    category: "Streetlight",
    location: "Nerul, Navi Mumbai",
    date: "2026-10-09",
    priority: "Low",
    status: "Resolved",
    team: "Team Gamma",
    reports: 3,
    description:
      "A streetlight near the main road was not functioning. The repair team has completed the work.",
  },
  {
    id: "VS-1044",
    citizen: "Mohammed Shaikh",
    issue: "Power outage near hospital",
    category: "Power outage",
    location: "Kalyan, Maharashtra",
    date: "2026-10-09",
    priority: "Critical",
    status: "In progress",
    team: "Emergency Team",
    reports: 19,
    description:
      "An outage has been reported near a hospital. The case has been escalated for urgent inspection.",
  },
  {
    id: "VS-1043",
    citizen: "Sneha Joshi",
    issue: "Damaged electricity pole",
    category: "Infrastructure",
    location: "Dombivli East, Maharashtra",
    date: "2026-10-08",
    priority: "High",
    status: "Pending approval",
    team: "Unassigned",
    reports: 15,
    description:
      "A damaged electricity pole requires inspection and approval for maintenance.",
  },
  {
    id: "VS-1042",
    citizen: "Vikas More",
    issue: "Faulty electric meter",
    category: "Meter",
    location: "Panvel, Navi Mumbai",
    date: "2026-10-08",
    priority: "Medium",
    status: "Assigned",
    team: "Team Beta",
    reports: 6,
    description:
      "The citizen has reported inconsistent readings on their electricity meter.",
  },
  {
    id: "VS-1041",
    citizen: "Fatima Ansari",
    issue: "Exposed electrical wires",
    category: "Infrastructure",
    location: "Kurla West, Mumbai",
    date: "2026-10-08",
    priority: "Critical",
    status: "In progress",
    team: "Emergency Team",
    reports: 11,
    description:
      "Exposed wires have been reported in a public area. Immediate safety inspection is required.",
  },
  {
    id: "VS-1040",
    citizen: "Neha Kulkarni",
    issue: "Billing discrepancy",
    category: "Billing",
    location: "Vashi, Navi Mumbai",
    date: "2026-10-07",
    priority: "Low",
    status: "Resolved",
    team: "Team Gamma",
    reports: 1,
    description:
      "The citizen reported a discrepancy in the latest electricity bill. The issue has been reviewed.",
  },
  {
    id: "VS-1039",
    citizen: "Sahil Verma",
    issue: "Repeated power cuts",
    category: "Power outage",
    location: "Mulund West, Mumbai",
    date: "2026-10-07",
    priority: "High",
    status: "Assigned",
    team: "Team Alpha",
    reports: 27,
    description:
      "Residents have reported repeated short-duration power cuts over the past two days.",
  },
  {
    id: "VS-1038",
    citizen: "Pooja Shinde",
    issue: "Broken distribution box",
    category: "Infrastructure",
    location: "Mira Road, Maharashtra",
    date: "2026-10-06",
    priority: "Medium",
    status: "Pending approval",
    team: "Unassigned",
    reports: 7,
    description:
      "A damaged distribution box needs an inspection before a repair order can be approved.",
  },
  {
    id: "VS-1037",
    citizen: "Imran Qureshi",
    issue: "Streetlight outage",
    category: "Streetlight",
    location: "Chembur, Mumbai",
    date: "2026-10-06",
    priority: "Low",
    status: "Resolved",
    team: "Team Gamma",
    reports: 2,
    description:
      "The streetlight outage has been inspected and marked as resolved.",
  },
];

const priorities = ["Critical", "High", "Medium", "Low"];
const statuses = ["Pending approval", "Assigned", "In progress", "Resolved"];

const teams = [
  "Unassigned",
  "Team Alpha",
  "Team Beta",
  "Team Gamma",
  "Emergency Team",
];

const priorityStyles = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-amber-50 text-amber-800 border-amber-200",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

const statusStyles = {
  "Pending approval": "bg-purple-50 text-purple-700",
  Assigned: "bg-amber-50 text-amber-800",
  "In progress": "bg-blue-50 text-blue-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

function StatCard({ title, value, detail, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#30163C]">
            {value}
          </p>
        </div>
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon size={22} />
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function FilterSelect({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`min-w-0 rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-2.5 text-sm text-[#30163C] outline-none transition focus:border-[#61197B] focus:ring-2 focus:ring-[#61197B]/10 ${className}`}
    >
      {children}
    </select>
  );
}

export default function ComplaintManagement() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [notice, setNotice] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);

  const pageSize = 6;

  const categories = useMemo(
    () => [...new Set(complaints.map((item) => item.category))],
    [complaints]
  );

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = complaints.filter((item) => {
      const matchesSearch = [
        item.id,
        item.citizen,
        item.issue,
        item.category,
        item.location,
        item.team,
      ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (priorityFilter === "All" || item.priority === priorityFilter) &&
        (statusFilter === "All" || item.status === statusFilter) &&
        (categoryFilter === "All" || item.category === categoryFilter)
      );
    });

    return [...results].sort((a, b) => {
      if (sortOrder === "oldest") {
        return a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
      }
      if (sortOrder === "priority") {
        return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
      }
      if (sortOrder === "reports") return b.reports - a.reports;

      return b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
    });
  }, [
    complaints,
    search,
    priorityFilter,
    statusFilter,
    categoryFilter,
    sortOrder,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComplaints.length / pageSize)
  );
  const currentPage = Math.min(page, totalPages);

  const pageComplaints = filteredComplaints.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const criticalCount = complaints.filter(
    (item) => item.priority === "Critical" && item.status !== "Resolved"
  ).length;

  const pendingCount = complaints.filter(
    (item) => item.status === "Pending approval"
  ).length;

  const resolvedCount = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const allCurrentSelected =
    pageComplaints.length > 0 &&
    pageComplaints.every((item) => selectedIds.includes(item.id));

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setPriorityFilter("All");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortOrder("newest");
    setPage(1);
    setSelectedIds([]);
    setShowBulkActions(false);
  }

  function toggleRow(id) {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  }

  function toggleCurrentPage() {
    const currentIds = pageComplaints.map((item) => item.id);

    setSelectedIds((previous) =>
      allCurrentSelected
        ? previous.filter((id) => !currentIds.includes(id))
        : [...new Set([...previous, ...currentIds])]
    );
  }

  function applyBulkStatus(status) {
    if (!selectedIds.length) return;

    setComplaints((previous) =>
      previous.map((item) =>
        selectedIds.includes(item.id) ? { ...item, status } : item
      )
    );

    setNotice(`${selectedIds.length} complaint(s) updated to "${status}".`);
    setSelectedIds([]);
    setShowBulkActions(false);
  }

  function openComplaint(item) {
    setSelectedComplaint(item);
    setEditForm({
      priority: item.priority,
      status: item.status,
      team: item.team,
    });
  }

  function saveComplaint() {
    if (!selectedComplaint || !editForm) return;

    setComplaints((previous) =>
      previous.map((item) =>
        item.id === selectedComplaint.id
          ? { ...item, ...editForm }
          : item
      )
    );

    setNotice(`${selectedComplaint.id} has been updated.`);
    setSelectedComplaint(null);
    setEditForm(null);
  }

  function exportCSV() {
    const headers = [
      "Complaint ID",
      "Citizen",
      "Issue",
      "Category",
      "Location",
      "Date",
      "Priority",
      "Status",
      "Assigned Team",
      "Reports",
    ];

    const rows = filteredComplaints.map((item) => [
      item.id,
      item.citizen,
      item.issue,
      item.category,
      item.location,
      item.date,
      item.priority,
      item.status,
      item.team,
      item.reports,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
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

    setNotice(`${filteredComplaints.length} complaint(s) exported.`);
  }

  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (

    <Layout parentTitle="Complaints" currTitle="All-complaint">
      <div className="min-h-screen bg-[#FBF7ED] text-[#30163C]">
        <main className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-9">
          {/* Page introduction */}
          <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#61197B]">
                <ClipboardList size={17} />
                Complaint operations
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                All complaints
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Review citizen reports, prioritize electricity faults and
                coordinate field repairs from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E3D4E8] bg-[#FFFEF6] px-4 py-2.5 text-sm font-semibold transition hover:bg-purple-50"
              >
                <RotateCcw size={16} />
                Reset filters
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#61197B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4E1263]"
              >
                <Download size={17} />
                Export CSV
              </button>
            </div>
          </section>

          {/* Feedback message */}
          {notice && (
            <div className="flex items-start justify-between gap-3 rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-4 py-3 text-sm text-[#61197B] shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{notice}</span>
              </div>
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="rounded-lg p-1 hover:bg-purple-50"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total complaints"
              value={complaints.length}
              detail="All reports in this sample"
              icon={ClipboardList}
              tone="bg-purple-50 text-[#61197B]"
            />
            <StatCard
              title="Critical issues"
              value={criticalCount}
              detail="Unresolved critical cases"
              icon={AlertTriangle}
              tone="bg-red-50 text-red-600"
            />
            <StatCard
              title="Pending approvals"
              value={pendingCount}
              detail="Awaiting administrator review"
              icon={Clock3}
              tone="bg-amber-50 text-amber-700"
            />
            <StatCard
              title="Resolved"
              value={resolvedCount}
              detail="Successfully closed cases"
              icon={CheckCircle2}
              tone="bg-emerald-50 text-emerald-700"
            />
          </section>

          {/* Complaint table */}
          <section className="overflow-hidden rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-[#EEE5F0] p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">Complaint directory</h2>
                  <Badge className="bg-purple-50 text-[#61197B]">
                    {filteredComplaints.length} records
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Search, filter and update reported issues.
                </p>
              </div>
              <span className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Sample data
              </span>
            </div>

            {/* Search and filters */}
            <div className="space-y-3 border-b border-[#EEE5F0] p-4 sm:p-5">
              <div className="flex flex-col gap-3 xl:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#D8C6E4] px-3 py-2.5 focus-within:border-[#61197B] focus-within:ring-2 focus-within:ring-[#61197B]/10">
                  <Search size={18} className="shrink-0 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search ID, citizen, issue or location..."
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                  {search && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <SlidersHorizontal size={17} />
                  <span className="hidden sm:inline">Filters</span>
                </div>

                <FilterSelect
                  value={priorityFilter}
                  onChange={(value) => changeFilter(setPriorityFilter, value)}
                  className="xl:w-40"
                >
                  <option value="All">All priorities</option>
                  {priorities.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  value={statusFilter}
                  onChange={(value) => changeFilter(setStatusFilter, value)}
                  className="xl:w-48"
                >
                  <option value="All">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  value={categoryFilter}
                  onChange={(value) => changeFilter(setCategoryFilter, value)}
                  className="xl:w-44"
                >
                  <option value="All">All categories</option>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </FilterSelect>
              </div>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                  {filteredComplaints.length} matching complaint(s)
                </p>

                <label className="flex items-center gap-2 self-start text-xs text-slate-600 sm:self-auto">
                  <ArrowUpDown size={14} />
                  Sort by
                  <select
                    value={sortOrder}
                    onChange={(event) => {
                      setSortOrder(event.target.value);
                      setPage(1);
                    }}
                    className="rounded-lg border border-[#D8C6E4] bg-[#FFFEF6] px-2 py-1.5 text-xs outline-none focus:border-[#61197B]"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="priority">Highest priority</option>
                    <option value="reports">Most reports</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Bulk actions */}
            {selectedIds.length > 0 && (
              <div className="flex flex-col justify-between gap-3 border-b border-purple-100 bg-purple-50/70 px-4 py-3 sm:flex-row sm:items-center sm:px-5">
                <p className="text-sm font-semibold text-[#61197B]">
                  {selectedIds.length} complaint(s) selected
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowBulkActions((previous) => !previous)}
                    className="rounded-lg border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-2 text-xs font-semibold text-[#61197B] hover:bg-purple-50"
                  >
                    Update status
                  </button>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-[#FFFEF6]"
                  >
                    Clear selection
                  </button>
                </div>

                {showBulkActions && (
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => applyBulkStatus(status)}
                        className="rounded-lg bg-[#FFFEF6] px-3 py-2 text-xs font-semibold text-[#61197B] ring-1 ring-[#D8C6E4] transition hover:bg-[#61197B] hover:text-white"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Responsive table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-[#FBF7ED] text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="w-12 px-5 py-4">
                      <input
                        type="checkbox"
                        checked={allCurrentSelected}
                        onChange={toggleCurrentPage}
                        aria-label="Select all complaints on this page"
                        className="h-4 w-4 cursor-pointer accent-[#61197B]"
                      />
                    </th>
                    <th className="px-4 py-4 font-semibold">Complaint</th>
                    <th className="px-4 py-4 font-semibold">Citizen</th>
                    <th className="px-4 py-4 font-semibold">Location</th>
                    <th className="px-4 py-4 font-semibold">
                      <button
                        onClick={() =>
                          setSortOrder((previous) =>
                            previous === "priority" ? "newest" : "priority"
                          )
                        }
                        className="flex items-center gap-1.5 hover:text-[#61197B]"
                      >
                        Priority <ChevronsUpDown size={14} />
                      </button>
                    </th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Assigned team</th>
                    <th className="px-4 py-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#F0E8F2]">
                  {pageComplaints.map((item) => (
                    <tr
                      key={item.id}
                      className={`transition hover:bg-[#FCFAFE] ${selectedIds.includes(item.id) ? "bg-purple-50/60" : ""
                        }`}
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleRow(item.id)}
                          aria-label={`Select ${item.id}`}
                          className="h-4 w-4 cursor-pointer accent-[#61197B]"
                        />
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() => openComplaint(item)}
                          className="text-left"
                        >
                          <p className="max-w-56 font-semibold text-[#30163C] hover:text-[#61197B]">
                            {item.issue}
                          </p>
                          <p className="mt-1 text-xs text-[#61197B]">
                            {item.id}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(item.date)}
                          </p>
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0E5F7] text-xs font-bold text-[#61197B]">
                            {item.citizen
                              .split(" ")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <p className="whitespace-nowrap font-medium">
                              {item.citizen}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.reports} related reports
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="flex max-w-52 items-start gap-1.5 text-xs leading-5 text-slate-600">
                          <MapPin
                            size={14}
                            className="mt-0.5 shrink-0 text-[#8B6B97]"
                          />
                          {item.location}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <Badge className={priorityStyles[item.priority]}>
                          {item.priority === "Critical" && (
                            <AlertTriangle size={12} className="mr-1" />
                          )}
                          {item.priority}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        <Badge className={statusStyles[item.status]}>
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                          {item.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        <span className="whitespace-nowrap text-xs text-slate-600">
                          {item.team}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => openComplaint(item)}
                          aria-label={`View ${item.id}`}
                          title="View and edit complaint"
                          className="rounded-lg border border-[#D8C6E4] p-2 text-[#61197B] transition hover:bg-purple-50"
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {pageComplaints.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-[#61197B]">
                          <FileWarning size={24} />
                        </div>
                        <p className="mt-3 font-semibold">No complaints found</p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filter criteria.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="mt-4 text-sm font-semibold text-[#61197B] hover:underline"
                        >
                          Clear all filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col justify-between gap-4 border-t border-[#EEE5F0] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <p className="text-xs text-slate-500">
                {filteredComplaints.length === 0
                  ? "No records to display"
                  : `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(
                    currentPage * pageSize,
                    filteredComplaints.length
                  )} of ${filteredComplaints.length} complaints`}
              </p>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() =>
                    setPage((previous) => Math.max(1, previous - 1))
                  }
                  disabled={currentPage <= 1}
                  className="flex items-center gap-1 rounded-lg border border-[#D8C6E4] px-3 py-2 text-xs font-medium hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => setPage(number)}
                      className={`h-9 min-w-9 rounded-lg px-2 text-xs font-semibold transition ${currentPage === number
                          ? "bg-[#61197B] text-white"
                          : "border border-[#D8C6E4] text-slate-600 hover:bg-purple-50"
                        }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setPage((previous) => Math.min(totalPages, previous + 1))
                  }
                  disabled={currentPage >= totalPages}
                  className="flex items-center gap-1 rounded-lg border border-[#D8C6E4] px-3 py-2 text-xs font-medium hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </section>

          {/* Quick action cards */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={() => {
                setPriorityFilter("Critical");
                setPage(1);
              }}
              className="flex items-center gap-4 rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 text-left transition hover:border-red-200 hover:shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">Critical complaints</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Review {criticalCount} unresolved critical issue(s)
                </span>
              </span>
              <ArrowRight size={17} className="text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/admin/teams")}
              className="flex items-center gap-4 rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 text-left transition hover:border-[#D8C6E4] hover:shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#61197B]">
                <Users size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">Repair coordination</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Manage teams and field assignments
                </span>
              </span>
              <ArrowRight size={17} className="text-slate-400" />
            </button>
          </section>
        </main>

        {/* Complaint details modal */}
        {selectedComplaint && editForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#201027]/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedComplaint(null);
                setEditForm(null);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="complaint-modal-title"
              className="my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#EEE5F0] bg-[#FBF7ED] p-5 sm:p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-purple-100 text-[#61197B]">
                      {selectedComplaint.id}
                    </Badge>
                    <Badge className={priorityStyles[selectedComplaint.priority]}>
                      {selectedComplaint.priority}
                    </Badge>
                  </div>
                  <h2
                    id="complaint-modal-title"
                    className="mt-3 text-xl font-bold"
                  >
                    {selectedComplaint.issue}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Submitted by {selectedComplaint.citizen}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedComplaint(null);
                    setEditForm(null);
                  }}
                  aria-label="Close complaint details"
                  className="rounded-lg p-2 text-slate-500 hover:bg-[#FFFEF6] hover:text-[#61197B]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#D8C6E4] p-3.5">
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="mt-2 flex items-start gap-2 text-sm font-medium">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-[#61197B]"
                      />
                      {selectedComplaint.location}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#D8C6E4] p-3.5">
                    <p className="text-xs text-slate-500">Reported on</p>
                    <p className="mt-2 text-sm font-medium">
                      {formatDate(selectedComplaint.date)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#D8C6E4] p-3.5">
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="mt-2 text-sm font-semibold">
                      {selectedComplaint.category}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#D8C6E4] p-3.5">
                    <p className="text-xs text-slate-500">Related reports</p>
                    <p className="mt-2 text-sm font-semibold">
                      {selectedComplaint.reports}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Issue description</h3>
                  <p className="mt-2 rounded-xl bg-[#FBF7ED] p-4 text-sm leading-6 text-slate-600">
                    {selectedComplaint.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="complaint-priority"
                      className="text-sm font-semibold"
                    >
                      Priority
                    </label>
                    <select
                      id="complaint-priority"
                      value={editForm.priority}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          priority: event.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-3 text-sm outline-none focus:border-[#61197B]"
                    >
                      {priorities.map((priority) => (
                        <option key={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="complaint-status"
                      className="text-sm font-semibold"
                    >
                      Status
                    </label>
                    <select
                      id="complaint-status"
                      value={editForm.status}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          status: event.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-3 text-sm outline-none focus:border-[#61197B]"
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="complaint-team"
                      className="text-sm font-semibold"
                    >
                      Assigned repair team
                    </label>
                    <select
                      id="complaint-team"
                      value={editForm.team}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          team: event.target.value,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-3 text-sm outline-none focus:border-[#61197B]"
                    >
                      {teams.map((team) => (
                        <option key={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[#EEE5F0] pt-5 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => {
                      setSelectedComplaint(null);
                      setEditForm(null);
                    }}
                    className="rounded-xl border border-[#D8C6E4]  px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveComplaint}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#61197B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4E1263]"
                  >
                    <Check size={17} />
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>

  );
}
