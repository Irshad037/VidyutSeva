
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    MapPinned,
    MapPin,
    Search,
    Zap,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    Navigation,
    Filter,
    ChevronDown,
    ArrowUpRight,
    LocateFixed,
    RadioTower,
    CalendarDays,
    X,
    Activity,
    ShieldCheck,
} from "lucide-react"; 
import Layout from "../../../layouts/Layout";
import StatCard from "./components/StatCard";
import FilterSelect from "./components/FilterSelect";
import MapMarker from "./components/MapMarker";
import Legend from "./components/Legend";
import DetailItem from "./components/DetailItem";

const complaintsData = [
    {
        id: "VS-2041",
        title: "Power outage",
        category: "Power Outage",
        description: "Electricity supply interrupted across several homes.",
        location: "Vashi Sector 17",
        area: "Vashi",
        distance: 0.8,
        reported: "12 minutes ago",
        status: "In Progress",
        priority: "High",
        color: "purple",
        icon: Zap,
        updates: "Repair team has been assigned.",
    },
    {
        id: "VS-2042",
        title: "Damaged electric pole",
        category: "Damaged Pole",
        description: "A damaged pole has been reported near the main road.",
        location: "Sanpada Sector 5",
        area: "Sanpada",
        distance: 1.6,
        reported: "28 minutes ago",
        status: "Reported",
        priority: "Critical",
        color: "red",
        icon: AlertTriangle,
        updates: "Awaiting department inspection.",
    },
    {
        id: "VS-2043",
        title: "Voltage fluctuation",
        category: "Voltage Issue",
        description: "Residents have reported unstable voltage.",
        location: "Nerul Sector 8",
        area: "Nerul",
        distance: 2.4,
        reported: "45 minutes ago",
        status: "In Progress",
        priority: "Medium",
        color: "amber",
        icon: Activity,
        updates: "The technical team is investigating.",
    },
    {
        id: "VS-2044",
        title: "Streetlight not working",
        category: "Streetlight",
        description: "Streetlights are not working along the internal road.",
        location: "Juinagar Station Road",
        area: "Juinagar",
        distance: 3.1,
        reported: "2 hours ago",
        status: "Resolved",
        priority: "Low",
        color: "green",
        icon: RadioTower,
        updates: "The reported issue has been resolved.",
    },
    {
        id: "VS-2045",
        title: "Exposed electrical wire",
        category: "Electrical Hazard",
        description: "An exposed wire has been reported near a footpath.",
        location: "Kopar Khairane Sector 2",
        area: "Kopar Khairane",
        distance: 4.2,
        reported: "3 hours ago",
        status: "Reported",
        priority: "Critical",
        color: "red",
        icon: AlertTriangle,
        updates: "Awaiting a safety inspection.",
    },
    {
        id: "VS-2046",
        title: "Transformer issue",
        category: "Transformer",
        description: "Unusual noise and intermittent supply near the transformer.",
        location: "Turbhe MIDC",
        area: "Turbhe",
        distance: 5.7,
        reported: "4 hours ago",
        status: "In Progress",
        priority: "High",
        color: "purple",
        icon: Zap,
        updates: "Maintenance work is in progress.",
    },
];

const statusStyles = {
    Reported: "bg-amber-50 text-amber-800 border-amber-200",
    "In Progress": "bg-purple-50 text-[#61197B] border-purple-200",
    Resolved: "bg-green-50 text-green-700 border-green-200",
};

const priorityStyles = {
    Critical: "bg-red-50 text-red-700",
    High: "bg-orange-50 text-orange-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-gray-100 text-gray-600",
};

const categories = [
    "All Categories",
    "Power Outage",
    "Damaged Pole",
    "Voltage Issue",
    "Streetlight",
    "Electrical Hazard",
    "Transformer",
];

const NearbyComplaints = () => { 

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [status, setStatus] = useState("All Statuses");
    const [distance, setDistance] = useState("5");
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [location, setLocation] = useState("Navi Mumbai");
    const [locationInput, setLocationInput] = useState("Navi Mumbai");
    const [locationMessage, setLocationMessage] = useState("");
    const [showFilters, setShowFilters] = useState(false);
 

    const complaints = useMemo(() => {
        return complaintsData.filter((complaint) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                complaint.title.toLowerCase().includes(searchText) ||
                complaint.id.toLowerCase().includes(searchText) ||
                complaint.location.toLowerCase().includes(searchText) ||
                complaint.description.toLowerCase().includes(searchText);

            const matchesCategory =
                category === "All Categories" ||
                complaint.category === category;

            const matchesStatus =
                status === "All Statuses" || complaint.status === status;

            const matchesDistance = complaint.distance <= Number(distance);

            const matchesLocation =
                location.toLowerCase() === "navi mumbai" ||
                complaint.area.toLowerCase().includes(location.toLowerCase()) ||
                complaint.location.toLowerCase().includes(location.toLowerCase());

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesDistance &&
                matchesLocation
            );
        });
    }, [search, category, status, distance, location]);

    const activeCount = complaintsData.filter(
        (item) => item.status !== "Resolved"
    ).length;

    const criticalCount = complaintsData.filter(
        (item) => item.priority === "Critical" && item.status !== "Resolved"
    ).length;

    const resolvedCount = complaintsData.filter(
        (item) => item.status === "Resolved"
    ).length;

    const handleLocationSearch = (event) => {
        event.preventDefault();

        const nextLocation = locationInput.trim();

        if (!nextLocation) {
            setLocationMessage("Please enter a city or area.");
            return;
        }

        setLocation(nextLocation);
        setLocationMessage(
            nextLocation.toLowerCase() === "navi mumbai"
                ? "Showing demo complaints around Navi Mumbai."
                : `Showing demo results matching "${nextLocation}".`
        );
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationMessage("Location access is not supported by this browser.");
            return;
        }

        setLocationMessage("Requesting your location...");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLocationMessage(
                    `Location received (${latitude.toFixed(3)}, ${longitude.toFixed(3)}). Connect a geocoding service to find nearby complaints.`
                );
            },
            () => {
                setLocationMessage(
                    "Unable to access your location. Enter your area manually."
                );
            },
            { enableHighAccuracy: false, timeout: 10000 }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setCategory("All Categories");
        setStatus("All Statuses");
        setDistance("5");
        setLocation("Navi Mumbai");
        setLocationInput("Navi Mumbai");
        setLocationMessage("");
    };

    return (
        <Layout parentTitle="Complaint" currTitle="Nearby-Complaint">
            <div className="min-h-screen bg-[#F7F2E8] px-4 py-4 pb-10 md:px-6 lg:px-10 fontcorm">
                <div className="mx-auto max-w-[1500px] space-y-6">
                    {/* Page introduction */}
                    <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D8C6E4] bg-[#FFFEF6] px-3 py-1.5 text-xs font-semibold text-[#61197B]">
                                <MapPinned size={15} />
                                COMMUNITY POWER WATCH
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-[#30163C] sm:text-3xl">
                                Nearby Complaints
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                                Stay informed about electricity issues in your surrounding
                                areas. Check reported faults, active outages, and resolution
                                updates.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleCurrentLocation}
                            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#61197B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4E1263] lg:self-auto"
                        >
                            <LocateFixed size={17} />
                            Use My Location
                        </button>
                    </section>

                    {/* Location search */}
                    <section className="rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-4 shadow-sm sm:p-5">
                        <form
                            onSubmit={handleLocationSearch}
                            className="flex flex-col gap-3 md:flex-row"
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#E1D3E8] bg-[#FFFEFA] px-3.5 focus-within:border-[#61197B]">
                                <MapPin size={19} className="shrink-0 text-[#61197B]" />

                                <input
                                    value={locationInput}
                                    onChange={(event) => setLocationInput(event.target.value)}
                                    placeholder="Enter your city or area..."
                                    aria-label="Search city or area"
                                    className="w-full bg-transparent py-3 text-sm text-[#30163C] outline-none placeholder:text-gray-400"
                                />

                                {locationInput && (
                                    <button
                                        type="button"
                                        onClick={() => setLocationInput("")}
                                        aria-label="Clear location"
                                        className="text-gray-400 hover:text-gray-700"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6B317] px-6 py-3 text-sm font-bold text-[#30163C] transition hover:bg-[#e8a40b]"
                            >
                                <Search size={17} />
                                Find Issues
                            </button>
                        </form>

                        {locationMessage && (
                            <p className="mt-3 text-xs leading-5 text-gray-600" role="status">
                                {locationMessage}
                            </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span>Popular areas:</span>
                            {["Vashi", "Nerul", "Sanpada", "Turbhe"].map((area) => (
                                <button
                                    key={area}
                                    type="button"
                                    onClick={() => {
                                        setLocationInput(area);
                                        setLocation(area);
                                        setLocationMessage(`Showing demo results for ${area}.`);
                                    }}
                                    className="rounded-full border border-[#E8DDEC] bg-[#FBF7ED] px-3 py-1.5 transition hover:border-[#61197B] hover:text-[#61197B]"
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Summary cards */}
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            icon={MapPinned}
                            label="Total Nearby Issues"
                            value={complaintsData.length}
                            description="Across listed areas"
                            iconClass="bg-purple-100 text-[#61197B]"
                        />
                        <StatCard
                            icon={Activity}
                            label="Active Issues"
                            value={activeCount}
                            description="Reported or in progress"
                            iconClass="bg-amber-100 text-amber-700"
                        />
                        <StatCard
                            icon={AlertTriangle}
                            label="Critical Issues"
                            value={criticalCount}
                            description="Require urgent attention"
                            iconClass="bg-red-100 text-red-600"
                        />
                        <StatCard
                            icon={CheckCircle2}
                            label="Resolved"
                            value={resolvedCount}
                            description="Marked as completed"
                            iconClass="bg-green-100 text-green-700"
                        />
                    </section>

                    {/* Map-style overview */}
                    <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
                        <div className="overflow-hidden rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0E7F3] px-5 py-4">
                                <div>
                                    <h2 className="font-bold text-[#30163C]">Area Overview</h2>
                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin size={13} className="text-[#61197B]" />
                                        {location}
                                    </p>
                                </div>

                                <span className="rounded-full bg-[#F3E8F8] px-3 py-1.5 text-xs font-semibold text-[#61197B]">
                                    {complaints.length} matching issues
                                </span>
                            </div>

                            <div className="relative min-h-[300px] overflow-hidden bg-[#F2F0E8] sm:min-h-[360px]">
                                {/* Decorative map preview; replace with a real map integration later. */}
                                <svg
                                    viewBox="0 0 700 400"
                                    preserveAspectRatio="xMidYMid slice"
                                    className="absolute inset-0 h-full w-full"
                                    aria-hidden="true"
                                >
                                    <rect width="700" height="400" fill="#F2F0E8" />

                                    <path
                                        d="M-20 95 L170 140 L280 65 L410 125 L730 55"
                                        stroke="#D5D8C8"
                                        strokeWidth="23"
                                        fill="none"
                                    />
                                    <path
                                        d="M-30 310 L180 255 L320 300 L470 225 L730 290"
                                        stroke="#D5D8C8"
                                        strokeWidth="27"
                                        fill="none"
                                    />
                                    <path
                                        d="M110 -30 L155 110 L120 230 L210 430"
                                        stroke="#D5D8C8"
                                        strokeWidth="21"
                                        fill="none"
                                    />
                                    <path
                                        d="M480 -30 L445 100 L520 190 L470 430"
                                        stroke="#D5D8C8"
                                        strokeWidth="23"
                                        fill="none"
                                    />

                                    <path
                                        d="M-20 95 L170 140 L280 65 L410 125 L730 55"
                                        stroke="#FFFFFF"
                                        strokeWidth="15"
                                        fill="none"
                                    />
                                    <path
                                        d="M-30 310 L180 255 L320 300 L470 225 L730 290"
                                        stroke="#FFFFFF"
                                        strokeWidth="18"
                                        fill="none"
                                    />
                                    <path
                                        d="M110 -30 L155 110 L120 230 L210 430"
                                        stroke="#FFFFFF"
                                        strokeWidth="13"
                                        fill="none"
                                    />
                                    <path
                                        d="M480 -30 L445 100 L520 190 L470 430"
                                        stroke="#FFFFFF"
                                        strokeWidth="15"
                                        fill="none"
                                    />

                                    <path
                                        d="M245 15 L250 110 L320 175 L310 245 L365 400"
                                        stroke="#D9B6E7"
                                        strokeWidth="9"
                                        fill="none"
                                    />
                                    <path
                                        d="M0 190 L170 190 L300 175 L420 190 L700 170"
                                        stroke="#D9B6E7"
                                        strokeWidth="8"
                                        fill="none"
                                    />

                                    <g fill="#DDE7D3">
                                        <rect x="25" y="20" width="65" height="43" rx="7" />
                                        <rect x="300" y="18" width="80" height="35" rx="7" />
                                        <rect x="570" y="110" width="90" height="43" rx="7" />
                                        <rect x="30" y="225" width="65" height="45" rx="7" />
                                        <rect x="560" y="325" width="80" height="40" rx="7" />
                                        <rect x="280" y="335" width="55" height="35" rx="7" />
                                    </g>

                                    <g
                                        fill="#8A8C7E"
                                        fontSize="13"
                                        fontFamily="Arial, sans-serif"
                                    >
                                        <text x="35" y="85">Vashi</text>
                                        <text x="295" y="90">Sanpada</text>
                                        <text x="525" y="210">Nerul</text>
                                        <text x="40" y="290">Turbhe</text>
                                        <text x="530" y="385">Juinagar</text>
                                    </g>
                                </svg>

                                {/* Demo complaint markers */}
                                <div className="absolute left-[25%] top-[25%]">
                                    <MapMarker color="bg-[#61197B]" label="Power outage" />
                                </div>
                                <div className="absolute left-[43%] top-[43%]">
                                    <MapMarker color="bg-red-500" label="Damaged pole" />
                                </div>
                                <div className="absolute left-[65%] top-[31%]">
                                    <MapMarker color="bg-amber-500" label="Voltage issue" />
                                </div>
                                <div className="absolute left-[72%] top-[67%]">
                                    <MapMarker color="bg-green-600" label="Resolved issue" />
                                </div>
                                <div className="absolute bottom-4 left-4 rounded-xl border border-white/70 bg-white/95 p-3 shadow-md backdrop-blur">
                                    <p className="mb-2 text-xs font-bold text-[#30163C]">
                                        Map legend
                                    </p>
                                    <Legend color="bg-red-500" label="Critical" />
                                    <Legend color="bg-[#61197B]" label="In progress" />
                                    <Legend color="bg-green-600" label="Resolved" />
                                </div>

                                <div className="absolute right-4 top-4 rounded-lg bg-white/95 px-3 py-2 text-[11px] font-medium text-gray-600 shadow">
                                    Illustrative preview
                                </div>
                            </div>

                            <div className="flex items-start gap-2 border-t border-[#F0E7F3] bg-[#FFFEFA] px-5 py-3">
                                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#61197B]" />
                                <p className="text-xs leading-5 text-gray-500">
                                    Map markers are illustrative demo data, not verified live
                                    locations. Connect a mapping service and complaint API to
                                    display actual locations.
                                </p>
                            </div>
                        </div>

                        {/* Filters and issue list */}
                        <div className="rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-4 shadow-sm sm:p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="font-bold text-[#30163C]">
                                        Reported Around You
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Browse issues by distance and status.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowFilters((prev) => !prev)}
                                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${showFilters
                                            ? "border-[#61197B] bg-[#F3E8F8] text-[#61197B]"
                                            : "border-[#E8DDEC] text-gray-600 hover:bg-[#FBF7ED]"
                                        }`}
                                >
                                    <Filter size={15} />
                                    Filters
                                </button>
                            </div>

                            <div className="relative mt-4">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search issue, ID, or location..."
                                    aria-label="Search complaints"
                                    className="w-full rounded-xl border border-[#E8DDEC] bg-[#FFFEFA] py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#61197B]"
                                />
                            </div>

                            {showFilters && (
                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                                    <FilterSelect
                                        label="Issue category"
                                        value={category}
                                        onChange={setCategory}
                                        options={categories.map((item) => ({
                                            value: item,
                                            label: item,
                                        }))}
                                    />

                                    <FilterSelect
                                        label="Complaint status"
                                        value={status}
                                        onChange={setStatus}
                                        options={[
                                            { value: "All Statuses", label: "All Statuses" },
                                            { value: "Reported", label: "Reported" },
                                            { value: "In Progress", label: "In Progress" },
                                            { value: "Resolved", label: "Resolved" },
                                        ]}
                                    />

                                    <FilterSelect
                                        label="Within distance"
                                        value={distance}
                                        onChange={setDistance}
                                        options={[
                                            { value: "1", label: "Within 1 km" },
                                            { value: "3", label: "Within 3 km" },
                                            { value: "5", label: "Within 5 km" },
                                            { value: "10", label: "Within 10 km" },
                                        ]}
                                    />

                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="self-end rounded-lg border border-[#E8DDEC] px-3 py-2 text-xs font-semibold text-[#61197B] transition hover:bg-[#F3E8F8]"
                                    >
                                        Reset filters
                                    </button>
                                </div>
                            )}

                            <div className="mt-5 flex items-center justify-between border-b border-[#F0E7F3] pb-3">
                                <span className="text-sm font-semibold text-[#30163C]">
                                    Issues
                                </span>
                                <span className="text-xs text-gray-500">
                                    {complaints.length} results
                                </span>
                            </div>

                            <div className="mt-2 divide-y divide-[#F0E7F3]">
                                {complaints.slice(0, 5).map((complaint) => {
                                    const Icon = complaint.icon;

                                    return (
                                        <button
                                            type="button"
                                            key={complaint.id}
                                            onClick={() => setSelectedComplaint(complaint)}
                                            className="group flex w-full items-start gap-3 py-4 text-left transition hover:bg-[#FFFEFA]"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8F8] text-[#61197B]">
                                                <Icon size={19} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="text-sm font-semibold text-[#30163C] group-hover:text-[#61197B]">
                                                        {complaint.title}
                                                    </h3>
                                                    <ArrowUpRight
                                                        size={15}
                                                        className="shrink-0 text-gray-400 group-hover:text-[#61197B]"
                                                    />
                                                </div>

                                                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                    <MapPin size={12} />
                                                    <span className="truncate">{complaint.location}</span>
                                                </p>

                                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                                    <span
                                                        className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${statusStyles[complaint.status]
                                                            }`}
                                                    >
                                                        {complaint.status}
                                                    </span>

                                                    <span className="text-[11px] text-gray-500">
                                                        {complaint.distance} km away
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}

                                {complaints.length === 0 && (
                                    <div className="py-12 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E8F8] text-[#61197B]">
                                            <Search size={21} />
                                        </div>
                                        <h3 className="mt-3 text-sm font-bold text-[#30163C]">
                                            No complaints found
                                        </h3>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Try another search or adjust your filters.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="mt-4 text-sm font-semibold text-[#61197B] hover:underline"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {complaints.length > 5 && (
                                <p className="mt-3 text-center text-xs text-gray-500">
                                    Showing 5 of {complaints.length} matching complaints.
                                    Adjust your filters to narrow the results.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Community reminder */}
                    <section className="flex flex-col gap-4 rounded-2xl bg-[#61197B] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-white/15 p-3">
                                <ShieldCheck size={23} />
                            </div>
                            <div>
                                <h2 className="font-bold">See an electricity hazard?</h2>
                                <p className="mt-1 max-w-xl text-sm leading-6 text-purple-100">
                                    Keep your distance from exposed wires and damaged electrical
                                    equipment. Report dangerous conditions through the official
                                    complaint channel.
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[#F6B317]">
                            <AlertTriangle size={17} />
                            Safety first
                        </div>
                    </section>
                </div>

                {/* Complaint details modal */}
                {selectedComplaint && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#201328]/55 p-4 backdrop-blur-sm"
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
                            className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#FFFEFA] shadow-2xl"
                        >
                            <div className="flex items-start justify-between gap-4 bg-[#61197B] p-5 text-white">
                                <div>
                                    <p className="text-xs font-medium text-purple-200">
                                        Complaint ID: {selectedComplaint.id}
                                    </p>
                                    <h2
                                        id="complaint-modal-title"
                                        className="mt-1 text-xl font-bold"
                                    >
                                        {selectedComplaint.title}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedComplaint(null)}
                                    aria-label="Close complaint details"
                                    className="rounded-lg p-2 transition hover:bg-white/15"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-5 p-5">
                                <p className="text-sm leading-6 text-gray-600">
                                    {selectedComplaint.description}
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <DetailItem
                                        label="Location"
                                        value={selectedComplaint.location}
                                        icon={MapPin}
                                    />
                                    <DetailItem
                                        label="Distance"
                                        value={`${selectedComplaint.distance} km`}
                                        icon={Navigation}
                                    />
                                    <DetailItem
                                        label="Reported"
                                        value={selectedComplaint.reported}
                                        icon={CalendarDays}
                                    />
                                    <DetailItem
                                        label="Priority"
                                        value={selectedComplaint.priority}
                                        icon={AlertTriangle}
                                    />
                                </div>

                                <div className="rounded-xl border border-[#E8DDEC] p-4">
                                    <p className="text-xs font-semibold text-gray-500">
                                        CURRENT STATUS
                                    </p>
                                    <span
                                        className={`mt-2 inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedComplaint.status]
                                            }`}
                                    >
                                        {selectedComplaint.status}
                                    </span>
                                    <p className="mt-3 text-sm leading-6 text-[#30163C]">
                                        {selectedComplaint.updates}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedComplaint(null)}
                                    className="w-full rounded-xl bg-[#61197B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4E1263]"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>

    );
};

  

 
 
export default NearbyComplaints;
