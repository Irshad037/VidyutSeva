import { IoMdAdd } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import {
  ReceiptIndianRupee,
  LayoutDashboard,
  ClipboardList,
  BrainCircuit,
  TriangleAlert,
  CircleCheck,
  Clock3,
  Users,
  Megaphone,
  Zap,
  Bell,
  Search,
  Download,
  MapPin,
  Truck,
  Settings,
  ShieldCheck,
  MapPinned,

} from "lucide-react";
import { FaBook } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";


export const navItems = [
  {
    icon: <IoMdAdd size={16} />,
    label: "Create Complaint",
    path: "/citizen/complaint",
    role: "citizen"
  },
  {
    icon: <LuClipboardList size={16} />,
    label: "View Complain",
    path: "/citizen/view-complaint",
    role: "citizen"
  },
  {
    icon: <MapPinned size={16} />,
    label: "Nearby Complaints",
    path: "/citizen/nearby-complaints",
    role: "citizen"
  },
  {
    icon: <ReceiptIndianRupee size={16} />,
    label: "View/Pay Bill",
    path: "/citizen/View-Pay-Bill",
    role: "citizen"
  },


  {
    icon: <LayoutDashboard size={14} />,
    label: "Dashboard",
    path: "/admin/dashboard",
    role: "admin"
  },
  {
    icon: <ClipboardList size={14} />,
    label: "Complaints",
    path: "/admin/complaints",
    role: "admin"
  },
  {
    icon: <div>+</div>,
    label: "Departments",
    path: "/admin/departments",
    role: "admin"
  },
  {
    icon: <FaBook size={14} />,
    label: "Activity Log",
    path: "/admin/activity-log",
    role: "admin",
  },
  {
    icon: <FaInfo size={13} />,
    label: "About",
    path: "/about",
    role: "common"
  },
];