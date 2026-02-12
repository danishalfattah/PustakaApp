"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ToastHandler() {
  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  return null;
}
