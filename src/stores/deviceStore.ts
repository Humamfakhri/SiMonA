import { create } from "zustand";

interface DeviceState {
  devices: string[];
  isLoadingDevices: boolean;
  setDevices: (data: string[]) => void;
  setLoadingDevices: (loading: boolean) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  isLoadingDevices: true,
  setDevices: (data) => set({ devices: data, isLoadingDevices: true }),
  setLoadingDevices: (loading) => set({ isLoadingDevices: loading }),
}));
