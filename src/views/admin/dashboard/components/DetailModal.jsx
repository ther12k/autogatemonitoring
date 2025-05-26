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

// Details Modal Component
const DetailsModal = ({ transaction, isOpen, onClose, onSave }) => {
    const [plateNo, setPlateNo] = useState(transaction?.plate || "");
    const [rfidId, setRfidId] = useState(transaction?.rfid || "");
    const [destination, setDestination] = useState(transaction?.destination || "");
    const [reason, setReason] = useState(transaction?.reason || "");
    const [confirmed, setConfirmed] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{transaction?.id} Details</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Image and Info */}
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src="/api/placeholder/500/300"
                                alt="Vehicle"
                                className="w-full h-48 object-cover rounded-md border"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                Gate 05 IN-FRONT 20/05/2025 10:32
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <h3 className="text-blue-600 font-semibold flex items-center">
                                    <Truck className="w-4 h-4 mr-2" />
                                    Truck Information
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Gate:</span>
                                    <div className="col-span-2">
                                        <Badge className="bg-green-600">GATE IN 1</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Plate No:</span>
                                    <span className="font-semibold col-span-2">B 1234 XYZ</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">RFID ID:</span>
                                    <span className="font-semibold col-span-2">UID8472</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Timestamp:</span>
                                    <span className="font-semibold col-span-2">20/05/2024 08:30</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Edit Information */}
                    <div className="space-y-4">
                        <h3 className="text-blue-600 font-semibold">Edit Information</h3>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="plateNo">Plate No</Label>
                                <Input
                                    id="plateNo"
                                    value={plateNo}
                                    onChange={(e) => setPlateNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="rfidId">RFID ID</Label>
                                <Input
                                    id="rfidId"
                                    value={rfidId}
                                    onChange={(e) => setRfidId(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="destination">Destination</Label>
                                <Input
                                    id="destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="reason">Reason</Label>
                                <Textarea
                                    id="reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="confirm"
                                    checked={confirmed}
                                    onCheckedChange={setConfirmed}
                                />
                                <Label htmlFor="confirm">Confirm approval for entry</Label>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button className='bg-biru' onClick={() => onSave({ plateNo, rfidId, destination, reason, confirmed })}>
                        Save & Open Entry Portal
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DetailsModal;