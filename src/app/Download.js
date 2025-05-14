"use client"
import { Button } from "@/components/ui/button";

export const Download = () => {
  return (
    <Button
      onClick={async () => {
        const devices = await getLanDevicesWithArp();
        const csvContent = devices
          .map((device) => `${device.ip},${device.mac},${device.vendor}`)
          .join("\n");
        const blob = new Blob([`IP,MAC,Vendor\n${csvContent}`], {
          type: "text/csv",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "connected_devices.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      Download as CSV
    </Button>
  );
};