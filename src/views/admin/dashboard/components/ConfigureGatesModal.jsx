import React, { useState, useEffect } from "react";
import { Clock, RefreshCw, Truck, Info, Plus, Camera, Settings, X, RefreshCcw, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

const ConfigureGatesModal = ({ isOpen, onClose, gates, onSave }) => {
    const [gateConfig, setGateConfig] = useState(gates || [
        { name: "GATE IN 1", status: true, autoRefresh: true, interval: 36 },
        { name: "GATE IN 2", status: true, autoRefresh: true, interval: 32 },
        { name: "GATE OUT 1", status: true, autoRefresh: true, interval: 26 },
        { name: "GATE OUT 2", status: true, autoRefresh: true, interval: 45 }
    ]);

    const handleToggleStatus = (index) => {
        const updatedGates = [...gateConfig];
        updatedGates[index].status = !updatedGates[index].status;
        setGateConfig(updatedGates);
    };

    const handleToggleAutoRefresh = (index) => {
        const updatedGates = [...gateConfig];
        updatedGates[index].autoRefresh = !updatedGates[index].autoRefresh;
        setGateConfig(updatedGates);
    };

    const handleIntervalChange = (index, value) => {
        const updatedGates = [...gateConfig];
        updatedGates[index].interval = value;
        setGateConfig(updatedGates);
    };

    const handleTest = (gateName) => {
        console.log(`Testing gate: ${gateName}`);
    };

    const handleSave = () => {
        onSave(gateConfig);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Configure Gates</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left pb-4 font-medium">Gate Name</th>
                                    <th className="text-left pb-4 font-medium">Status</th>
                                    <th className="text-left pb-4 font-medium">Auto-Refresh</th>
                                    <th className="text-left pb-4 font-medium">Interval (seconds)</th>
                                    <th className="text-left pb-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gateConfig.map((gate, index) => (
                                    <tr key={gate.name} className="border-b">
                                        <td className="py-4">{gate.name}</td>
                                        <td className="py-4">
                                            <Switch
                                                checked={gate.status}
                                                onCheckedChange={() => handleToggleStatus(index)}
                                            />
                                        </td>
                                        <td className="py-4">
                                            <Switch
                                                checked={gate.autoRefresh}
                                                onCheckedChange={() => handleToggleAutoRefresh(index)}
                                            />
                                        </td>
                                        <td className="py-4">
                                            <Input
                                                type="number"
                                                value={gate.interval}
                                                onChange={(e) => handleIntervalChange(index, parseInt(e.target.value) || 0)}
                                                min="1"
                                                className="w-20"
                                            />
                                        </td>
                                        <td className="py-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleTest(gate.name)}
                                            >
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                Test
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button className='bg-biru' onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default ConfigureGatesModal;