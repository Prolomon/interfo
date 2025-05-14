import { DataTable } from "./DataTable";
import { getLocalIpAddress, getLanDevicesWithArp, wifiData } from "./hostAction";
import { Download } from "./Download";

export default async function Home() {
      wifiData();

      const ip = await getLocalIpAddress();
      console.log("My Local IP Address is", ip);

      const connectedDevices = await getLanDevicesWithArp();
      console.log("Connected LAN Devices (ARP):", connectedDevices);

  return (
    <div className="w-full h-full">
        <header className="w-full border-b border-muted">
            <div className="w-11/12 py-4 mx-auto flex gap-3 items-center justify-between">
                <h2 className="text-2xl font-bold">Interfo</h2>
                <Download />
            </div>
        </header>
        <div className="w-11/12 mx-auto mt-2">
            <h4 className="font-semibold text-lg">Welcome Solomon,</h4>
        </div>
        <div className="w-11/12 mx-auto">
            <DataTable dataList={connectedDevices} />
        </div>  
    </div>
  );
}
