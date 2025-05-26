import React, { useState, useEffect } from "react";
import DetailsModal from "./DetailModal"; 
import ManualEntryModal from "./ManualEntryModal"; 
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

const GateCard = ({
    title,
    isActive = true,
    autoRefresh = true,
    transaction = null,
    refreshTime = 30
}) => {
    const [timer, setTimer] = useState(refreshTime);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isManualEntryModalOpen, setManualEntryModalOpen] = useState(false);

    useEffect(() => {
        let interval;
        if (autoRefresh && isActive) {
            interval = setInterval(() => {
                setTimer(prev => prev > 0 ? prev - 1 : refreshTime);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [autoRefresh, isActive, refreshTime]);

    return (
        <Card className="w-full h-full">
            {/* Header */}
            <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <Truck className="w-5 h-5" />
                        <h2 className="text-lg">{title}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Auto-refresh</span>
                            <Switch checked={autoRefresh} />
                        </div>
                        <Badge className="bg-biru" variant={isActive ? "default" : "secondary"}>
                            {isActive ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-4">
                {transaction ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Transaction Image */}
                        <div className="w-full md:w-1/3 relative">
                            <img
                                src="/api/placeholder/320/240"
                                alt="Vehicle"
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                Gate 07 IN-BACK 20/05/2024 08:29
                            </div>
                        </div>

                        {/* Transaction Details */}
                        <div className="w-full md:w-2/3">
                            <h3 className="text-blue-600 font-bold text-lg mb-4">{transaction.id}</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-muted-foreground text-sm">Plate:</p>
                                    <p className="font-bold">{transaction.plate}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">RFID ID:</p>
                                    <p className="font-bold">{transaction.rfid}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Destination:</p>
                                    <p className="font-bold">{transaction.destination}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Reason:</p>
                                    <p className="font-bold">{transaction.reason}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-muted p-6 rounded-full mb-4">
                            <Truck className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No transaction data</h3>
                        <p className="text-muted-foreground">Waiting for truck arrival at {title}</p>
                    </div>
                )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="border-t flex-col space-y-4">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{transaction ? '20/05/2024 08:30' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            {transaction ? '00:24' : '00:20'}
                        </Badge>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    {transaction ? (
                        <>
                            <Button className="bg-biru" onClick={() => setDetailsModalOpen(true)}>
                                <Info className="w-4 h-4 mr-2" />
                                DETAILS
                            </Button>
                            <Button variant="outline" onClick={() => setManualEntryModalOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Manual Entry
                            </Button>
                        </>
                    ) : (
                            <Button onClick={() => setManualEntryModalOpen(true)} className="col-span-2 bg-biru">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Manual Entry
                        </Button>
                    )}
                </div>

                {/* Status Bar */}
                <div className="bg-muted/50 -mx-6 -mb-6 px-4 py-2 flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        <span>{isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Auto-refresh: {timer}s</span>
                    </div>
                </div>
            </CardFooter>

            {/* Modals */}
            <DetailsModal
                transaction={transaction}
                isOpen={isDetailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                onSave={() => { }}
            />
            <ManualEntryModal
                gate={title}
                isOpen={isManualEntryModalOpen}
                onClose={() => setManualEntryModalOpen(false)}
                onSave={() => { }}
            />
        </Card>
    );
};


export default GateCard;
