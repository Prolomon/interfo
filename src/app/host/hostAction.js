import axios from "axios";
import { exec } from "child_process";
import wifi from "node-wifi";
import os from "os";
import dns from "dns"; // Import the dns module

wifi.init({
  iface: null,
});

export const wifiData = () => {
  wifi.scan((error, networks) => {
    if (error) {
      console.log(error);
    } else {
      console.log(networks);
    }
  });
  exec("netsh wlan show hostednetwork", (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error.message);
      return;
    }
    console.log(stdout); // Parse this text output
  });

  exec("netsh wlan show hostednetwork", (error, stdout) => {
    if (error) {
      console.error("Scan Error:", error.message);
      return;
    }

    // Parse and return connected clients
    const lines = stdout.split('\n');
    const clients = [];
    
    let isClientSection = false;
    lines.forEach(line => {
      // Look for the section that lists connected clients
      if (line.includes("Number of clients")) {
        isClientSection = true;
        return;
      }
      
      if (isClientSection) {
        // Match both MAC address and authenticated state
        const clientMatch = line.match(/([0-9A-Fa-f]{2}-){5}[0-9A-Fa-f]{2}\s+(\w+)/);
        if (clientMatch) {
          clients.push({
            mac: clientMatch[0].split(/\s+/)[0],
            status: clientMatch[0].split(/\s+/)[1]
          });
        }
      }
    });

    console.log("Connected Clients:", clients);
    return clients;
  });
};

const { networkInterfaces } = require("os");

// Function to get the local IP address
export function getLocalIpAddress() {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}'
  for (const name in nets) {
    if (!Object.hasOwn(nets, name)) continue;
    for (const net of nets[name]) {
      // Skip over non-IPv4 addresses
      if (net.family !== "IPv4" && net.family !== "4") continue;
      if (net.internal !== false) continue;
      if (name.startsWith("vbox")) continue; // Skip VirtualBox
      results[name] = net.address;
      break;
    }
  }
  const ip = Object.values(results)[0];
  return ip || "127.0.0.1";
}

export async function getLanDevicesWithArp() {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let arpCommand = "";

    if (platform === "win32") {
      arpCommand = "arp -a";
    } else if (platform === "linux" || platform === "darwin") {
      arpCommand = "arp -n";
    } else {
      return reject(new Error("Unsupported platform for ARP scan"));
    }

    exec(arpCommand, async (error, stdout, stderr) => { // Make this callback async
      if (error) {
        if (stderr && platform === "win32" && stdout.includes("No ARP Entries Found")) {
          return resolve([]);
        }
        console.error(`Error executing ARP command: ${error.message}`);
        if (stderr) console.error(`ARP stderr: ${stderr}`);
        return reject(new Error(`Failed to execute ARP command: ${error.message}`));
      }

      const arpEntries = [];
      const lines = stdout.split("\n");

      if (platform === "win32") {
        const macRegex = /([0-9A-Fa-f]{2}-){5}[0-9A-Fa-f]{2}/;
        const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine.length === 0) return;
          const parts = trimmedLine.split(/\s+/);
          if (parts.length >= 2) {
            const ipMatch = parts[0].match(ipRegex);
            const macMatch = parts[1].match(macRegex);
            if (ipMatch && macMatch) {
              if (!ipMatch[0].startsWith("224.") && !ipMatch[0].endsWith(".255") && macMatch[0] !== "ff-ff-ff-ff-ff-ff") {
                // Convert MAC address from xx-xx-xx-xx-xx-xx to xx:xx:xx:xx:xx:xx format
                const macWithColons = macMatch[0].replace(/-/g, ':');
                arpEntries.push({ ip: ipMatch[0], mac: macWithColons.toLowerCase(), hostname: null });
              }
            }
          }
        });
      } else { // Linux / macOS
        const macRegex = /([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}/;
        const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
        lines.forEach(line => {
          const ipMatch = line.match(ipRegex);
          const macMatch = line.match(macRegex);
          if (ipMatch && macMatch && macMatch[0] !== "ff:ff:ff:ff:ff:ff") {
            if ((platform === 'darwin' && line.includes('(incomplete)')) || (platform === 'linux' && line.includes('<incomplete>'))) {
              return;
            }
            arpEntries.push({ ip: ipMatch[0], mac: macMatch[0].toUpperCase(), hostname: null });
          }
        });
      }

      // Attempt to get hostnames for each device
      const devicePromises = arpEntries.map(device => {
        return new Promise(resolveDevice => {
          dns.reverse(device.ip, (err, hostnames) => {
            if (!err && hostnames && hostnames.length > 0) {
              device.hostname = hostnames[0];
            } else {
              // Optionally, you could try nbtstat for Windows here as a fallback
              // For simplicity, we'll just leave hostname as null if reverse DNS fails
              device.hostname = 'Unknown'; // Or null
            }
            resolveDevice(device);
          });
        });
      });

      try {
        const devicesWithHostnames = await Promise.all(devicePromises);
        resolve(devicesWithHostnames);
      } catch (lookupError) {
        console.error("Error during hostname lookup:", lookupError);
        // Resolve with what we have, even if some lookups failed
        resolve(arpEntries.map(d => ({ ...d, hostname: d.hostname || 'N/A' })));
      }
    });
  });
}