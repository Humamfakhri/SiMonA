import { M2MCin, M2MList } from "@/types/antares-type";
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

interface KolamStoreState {
  deviceData: { name: string; data: M2MCin[] }[];
  setDeviceData: (name: string, data: M2MCin[]) => void;
  clearDeviceData: () => void;
}

export const useKolamStore = create<KolamStoreState>((set) => ({
  deviceData: [],
  setDeviceData: (name, data) =>
    set((state) => {
      const existingDeviceIndex = state.deviceData.findIndex(
        (device) => device.name === name
      );
      let updatedDeviceData = [...state.deviceData];
      if (existingDeviceIndex !== -1) {
        updatedDeviceData[existingDeviceIndex].data = data;
      } else {
        updatedDeviceData.push({ name, data });
      }
      return { deviceData: updatedDeviceData };
    }),
  clearDeviceData: () => set({ deviceData: [] }),
}));


// interface KolamStoreState {
//   kolams: M2MCin[];
//   setKolams: (data: M2MCin[]) => void;
//   clearKolams: () => void;
// }

// export const useKolamStore = create<KolamStoreState>((set) => ({
//   kolams: [],
//   setKolams: (data) => set((state) => ({ kolams: [...state.kolams, ...data] })),
//   clearKolams: () => set({ kolams: [] }),
// }));

// interface KolamState {
//   kolams: M2MList[] | null
//   setKolams: (data: M2MList[]) => void;
//   clearKolams: () => void;
// }

// export const useKolamStore = create<KolamState>((set) => ({
//   kolams: null,
//   setKolams: (data) => set({ kolams: data }),
//   clearKolams: () => set({ kolams: null }),
// }));