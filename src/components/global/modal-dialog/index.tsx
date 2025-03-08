"use client";
import { useModal } from "@/hooks/use-modal";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Subscriptions from "@/components/global/subscriptions-plans/plans";

const ModalDialog = () => {
  const modal = useModal();
  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="overflow-y-auto max-h-screen mt-5">
        <DialogHeader>
          <DialogTitle className="text-center">Transparent Pricing</DialogTitle>
          <DialogDescription className="text-center">
            Unlock{" "}
            <span className="text-green-500 font-medium mx-1">Endless</span>
            Possibilities!!!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Subscriptions onClose={modal.onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
