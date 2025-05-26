import React, { useState } from "react";
import { Truck, Settings } from "lucide-react";
import GateCard from "./GateCard";
import ConfigureGatesModal from "./ConfigureGatesModal";

const GateInOut = () => {
  const [cardSize, setCardSize] = useState(800);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [gates, setGates] = useState([
    { name: "GATE IN 1", status: true, autoRefresh: true, interval: 36 },
    { name: "GATE IN 2", status: true, autoRefresh: true, interval: 32 },
    { name: "GATE OUT 1", status: true, autoRefresh: true, interval: 26 },
    { name: "GATE OUT 2", status: true, autoRefresh: true, interval: 45 }
  ]);

  // Sample transaction data
  const sampleTransaction = {
    id: "T-IN-001",
    plate: "B 1234 XYZ",
    rfid: "UID8472",
    destination: "Warehouse A",
    reason: "Delivery"
  };

  const handleSaveGateConfig = (updatedGates) => {
    setGates(updatedGates);
    console.log("Updated gate configuration:", updatedGates);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <Truck size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-gray-700">Card Size:</span>
              <input
                type="range"
                min="400"
                max="800"
                value={cardSize}
                onChange={(e) => setCardSize(e.target.value)}
                className="w-32"
              />
              <span className="text-gray-700 min-w-[70px]">{cardSize}px</span>
            </div>

            <button
              className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded transition duration-200"
              onClick={() => setIsConfigModalOpen(true)}
            >
              <Settings size={18} />
              <span>Configure Gates</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ maxWidth: `${cardSize * 2 + 24}px`, margin: '0 auto' }}
        >
          {gates.map((gate, index) => (
            <GateCard
              key={gate.name}
              title={gate.name}
              isActive={gate.status}
              autoRefresh={gate.autoRefresh}
              transaction={index % 2 === 0 ? sampleTransaction : null}
              refreshTime={gate.interval}
            />
          ))}
        </div>
      </main>

      {/* Configure Gates Modal */}
      <ConfigureGatesModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        gates={gates}
        onSave={handleSaveGateConfig}
      />
    </div>
  );
};

export default GateInOut;