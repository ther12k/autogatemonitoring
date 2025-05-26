import React, { useState } from "react";
import { User, ArrowLeft, Printer, FileText, Search, RotateCcw, ChevronDown, Info } from "lucide-react";
import CustomTable from "@/components/custom/CustomTable";

const UserHeaderTable = () => {
  // Sample data based on the image
  const sampleData = [
    {
      date: "22/05/2025 00:45",
      ticket: "T-OUT-117",
      gate: "GATE OUT 1",
      truckCode: "TRK-C4",
      plateNo: "B 172 HQQ",
      destination: "N/A",
      rfidId: "UID4469",
      reason: "-"
    },
    {
      date: "22/05/2025 00:44",
      ticket: "T-OUT-892",
      gate: "GATE OUT 1",
      truckCode: "TRK-N9",
      plateNo: "B 8539 XNA",
      destination: "N/A",
      rfidId: "UID3572",
      reason: "-"
    },
  ];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedGate, setSelectedGate] = useState("All Gates");
  const [gateDropdownOpen, setGateDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(sampleData);
  // Detail modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  // Handle opening the detail modal
  const handleOpenDetailModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };
  // Define table columns with custom formatting for gate
  const columns = [
    {
      id: "date",
      label: "Gate Name",
      minWidth: 150,
      align: "left"
    },
    {
      id: "ticket",
      label: "Status",
      minWidth: 120,
      align: "left",
    },
    {
      id: "gate",
      label: "IP Address",
      minWidth: 120,
      align: "left",
      format: (value) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${value.includes("IN") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {value}
        </span>
      )
    },
    {
      id: "truckCode",
      label: "Last Ping",
      minWidth: 120,
      align: "left"
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      align: "center",
      format: (_, row) => (
        <div className="flex  w-1 gap-2">
          <button
            onClick={() => handleOpenDetailModal(row)}
            className="bg-blue-600 m-auto hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center justify-center"
          >
            <Info size={16} className="mr-1" /> Edit
          </button>
          <button
            onClick={() => handleOpenDetailModal(row)}
            className="bg-red-600 m-auto hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center justify-center"
          >
            <Info size={16} className="mr-1" /> Delete
          </button>
        </div>
      )
    }
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleApplyFilter = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      let filtered = [...sampleData];

      // Apply date filters if both dates are set
      if (fromDate && toDate) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date.split(" ")[0].split("/").reverse().join("-"));
          const from = new Date(fromDate);
          const to = new Date(toDate);
          return itemDate >= from && itemDate <= to;
        });
      }

      // Apply gate filter
      if (selectedGate !== "All Gates") {
        filtered = filtered.filter(item => item.gate === selectedGate);
      }

      setFilteredData(filtered);
      setLoading(false);
    }, 500);
  };
  const handleResetFilter = () => {
    setFromDate("");
    setToDate("");
    setSelectedGate("All Gates");
    setFilteredData(sampleData);
  };
  // Gates options
  const gateOptions = ["All Gates", "GATE IN 1", "GATE OUT 1", "GATE OUT 2"];
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-md mt-[-40px]">
            <User size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-[-40px]">User Settings</h1>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
            <FileText className="mr-2 h-5 w-5" />
            Add New User
          </button>

        </div>
      </div>


      {/* Table Section */}
      <CustomTable
        columns={columns}
        rows={filteredData}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserHeaderTable;