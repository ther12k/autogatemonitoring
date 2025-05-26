import React, { useState } from "react";
import {
  Printer,
  FileText,
  Search,
  RotateCcw,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CustomTable from "@/components/custom/CustomTable";
import TransactionDetailModal from "./TransactionDetailModal";

const TransactionHistoryTable = () => {
  // Sample data
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
  const [filteredData, setFilteredData] = useState(sampleData);

  // Detail modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Handle opening the detail modal
  const handleOpenDetailModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  // Define table columns
  const columns = [
    {
      id: "date",
      label: "Date/Time",
      minWidth: 150,
      align: "left"
    },
    {
      id: "ticket",
      label: "Ticket No",
      minWidth: 120,
      align: "left"
    },
    {
      id: "gate",
      label: "Gate",
      minWidth: 120,
      align: "left",
      format: (value) => (
        <Badge variant={value.includes("IN") ? "default" : "destructive"}>
          {value}
        </Badge>
      )
    },
    {
      id: "truckCode",
      label: "Truck Code",
      minWidth: 120,
      align: "left"
    },
    {
      id: "plateNo",
      label: "Plate No",
      minWidth: 120,
      align: "left"
    },
    {
      id: "destination",
      label: "Destination",
      minWidth: 150,
      align: "left"
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 80,
      align: "center",
      format: (_, row) => (
        <Button
          onClick={() => handleOpenDetailModal(row)}
          size="sm"
          className="flex items-center"
        >
          <Info size={16} className="mr-1" />
          Detail
        </Button>
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

    setTimeout(() => {
      let filtered = [...sampleData];

      // Apply date filters
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-md mt-[-40px]">
            <FileText size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-[-40px]">Transaction</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gate</Label>
              <Select value={selectedGate} onValueChange={setSelectedGate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Gates">All Gates</SelectItem>
                  <SelectItem value="GATE IN 1">GATE IN 1</SelectItem>
                  <SelectItem value="GATE OUT 1">GATE OUT 1</SelectItem>
                  <SelectItem value="GATE OUT 2">GATE OUT 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex mt-4 space-x-2">
            <Button onClick={handleApplyFilter}>
              <Search className="mr-2 h-4 w-4" />
              Apply Filter
            </Button>
            <Button variant="outline" onClick={handleResetFilter}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

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

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default TransactionHistoryTable;