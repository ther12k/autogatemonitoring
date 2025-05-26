import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Transaction Detail</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Transaction details */}
                    <div className="flex items-center border-l-4 border-primary pl-3">
                        <Label className="w-1/3 text-muted-foreground">Plate No:</Label>
                        <div className="w-2/3 text-right font-medium">{transaction?.plateNo || "-"}</div>
                    </div>

                    <div className="flex items-center border-l-4 border-primary pl-3">
                        <Label className="w-1/3 text-muted-foreground">RFID ID:</Label>
                        <div className="w-2/3 text-right font-medium">{transaction?.rfidId || "-"}</div>
                    </div>

                    <div className="flex items-center border-l-4 border-primary pl-3">
                        <Label className="w-1/3 text-muted-foreground">Gate:</Label>
                        <div className="w-2/3 text-right">
                            {transaction?.gate ? (
                                <Badge variant={transaction.gate.includes("IN") ? "default" : "destructive"}>
                                    {transaction.gate}
                                </Badge>
                            ) : "-"}
                        </div>
                    </div>

                    <div className="flex items-center border-l-4 border-primary pl-3">
                        <Label className="w-1/3 text-muted-foreground">Timestamp:</Label>
                        <div className="w-2/3 text-right font-medium">{transaction?.date || "-"}</div>
                    </div>

                    <div className="flex items-center border-l-4 border-primary pl-3">
                        <Label className="w-1/3 text-muted-foreground">Destination:</Label>
                        <div className="w-2/3 text-right font-medium">{transaction?.destination || "-"}</div>
                    </div>

                    <div className="flex items-center border-l-4 border-primary pl-3">
                        <Label className="w-1/3 text-muted-foreground">Reason:</Label>
                        <div className="w-2/3 text-right font-medium">{transaction?.reason || "-"}</div>
                    </div>

                    {/* Image section */}
                    <Card className="mt-6">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-center h-48 bg-muted rounded-lg">
                                {transaction?.image ? (
                                    <img
                                        src={transaction.image}
                                        alt="Transaction"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <>
                                        <div className="bg-muted-foreground/20 p-2 rounded-lg mb-2">
                                            <svg
                                                className="h-8 w-8 text-muted-foreground"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-muted-foreground text-sm">No image available</p>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionDetailModal;