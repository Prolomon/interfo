import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { wifiData } from "./hostAction";
import { getLocalIpAddress, getLanDevicesWithArp } from "./hostAction";

export default async function Home() {
      // wifiData(); // This function executes OS commands and uses node-wifi,
                  // which can cause issues during build if not handled carefully.
                  // Consider if its execution is critical here or if it can be moved/refactored.

      let ip = "127.0.0.1"; // Default IP
      try {
        ip = await getLocalIpAddress(); // This should generally be safe
        console.log("My Local IP Address is", ip);
      } catch (error) {
        console.error("Failed to get local IP address:", error.message);
      }
      

      let connectedDevices = [];
      let deviceError = null; // To store a potential error message

      try {
        connectedDevices = await getLanDevicesWithArp();
        console.log("Connected LAN Devices (ARP):", connectedDevices);
      } catch (error) {
        console.error("Failed to get LAN devices during page load/prerender:", error.message);
        // Store the error message if you want to display it to the user
        deviceError = error.message; 
        // connectedDevices will remain an empty array, allowing DataTable to render without data
      }

  return (
    <div className="w-full h-full">
        <header className="w-full border-b border-muted">
            <div className="w-11/12 py-4 mx-auto flex gap-3 items-center justify-between">
                <h2 className="text-2xl font-bold">Interfo</h2>
            </div>
        </header>
        <div className="w-11/12 mx-auto mt-2">
            <h4 className="font-semibold text-lg">Welcome to Interfo,</h4>
            {/* Optionally, display an error message to the user if device fetching failed */}
            {deviceError && (
              <p className="text-red-500 mt-2">
                Could not load network devices: {deviceError}
              </p>
            )}
        </div>
        <div className="w-11/12 mx-auto">
            <DataTable dataList={connectedDevices} />
        </div>  
    </div>
  );
}
