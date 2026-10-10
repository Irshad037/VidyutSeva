import { IoMdAdd } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { ReceiptIndianRupee } from "lucide-react";
import { FaBook } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";


export const navItems = [
  {
    icon: <IoMdAdd size={16 }/>,
    label: "Create Complaint",
    path: "/citizen/complaint",
  },
  {
    icon: <LuClipboardList   size={16}/>,
    label: "View Complain",
    path: "/citizen/view-complaint",
  },
  {
    icon:  <ReceiptIndianRupee   size={16}/>,
    label: "View/Pay Bill",
    path: "/citizen/View-Pay-Bill",
  }, 
  {
    icon: <div>+</div>,
    label: "Departments",
    path: "/admin/departments",
  }, 
  {
    icon: <FaInfo size={13}/>,
    label: "About",
    path: "/about",
  },
  {
    icon: <FaBook size={14}/>,
    label: "Activity Log",
    path: "/admin/activity-log",
  }, 
];