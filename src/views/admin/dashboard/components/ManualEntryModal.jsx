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

const ManualEntryModal = ({ gate, isOpen, onClose, onSave }) => {
    const [selectedGate, setSelectedGate] = useState(gate || "GATE IN 1");
    const [plateNo, setPlateNo] = useState("");
    const [rfidId, setRfidId] = useState("Not detected");
    const [destination, setDestination] = useState("");
    const [reason, setReason] = useState("");
    const [openPortal, setOpenPortal] = useState(false);
    const [cameraActive, setCameraActive] = useState(true);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>New Manual Entry</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Camera Feed */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Camera Feed</h3>
                            <Badge variant={cameraActive ? "default" : "destructive"}>
                                {cameraActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>

                        <div className="bg-gray-800 rounded-md h-64 flex flex-col items-center justify-center">
                            <Video className="w-10 h-10 text-white mb-4" />
                            <p className="text-white text-center">Camera feed for {selectedGate}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                <Camera className="w-4 h-4 mr-2" />
                                Capture
                            </Button>

                            <div className="flex items-center gap-2">
                                <Label>Camera ID:</Label>
                                <Select defaultValue="1">
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Camera IN 1</SelectItem>
                                        <SelectItem value="2">Camera IN 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Entry Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Entry Details</h3>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="gate">Gate</Label>
                                <Select value={selectedGate} onValueChange={setSelectedGate}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GATE IN 1">GATE IN 1</SelectItem>
                                        <SelectItem value="GATE IN 2">GATE IN 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="plateNo">Plate No</Label>
                                <Input
                                    id="plateNo"
                                    placeholder="e.g. B 1234 XYZ"
                                    value={plateNo}
                                    onChange={(e) => setPlateNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="rfidId">RFID ID</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="rfidId"
                                        value={rfidId}
                                        disabled
                                        className="bg-muted"
                                    />
                                    <Button size="sm" variant="outline">
                                        <RefreshCcw className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    RFID ID will be auto-populated when detected
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="destination">Destination</Label>
                                <Input
                                    id="destination"
                                    placeholder="Enter destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="reason">Reason</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="Enter reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="openPortal"
                                    checked={openPortal}
                                    onCheckedChange={setOpenPortal}
                                />
                                <Label htmlFor="openPortal">Open portal after saving</Label>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className='bg-biru' onClick={() => onSave({ plateNo, rfidId, destination, reason, openPortal, selectedGate })}>
                        Save Entry
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ManualEntryModal;
