// src/store/userDeviceStore.jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customStorage from '../utils/customZustandStorage';

const userDeviceStore = create(
  persist(
    (set, get) => ({
      // ============================
      // Default state
      // ============================
      deviceDetails: null,
      isRegistered: false,
      approvalPending: false,
      isExpired: false,

      // ============================
      // Setters
      // ============================
      setDeviceDetails: (data) => set({ deviceDetails: data }),
      setIsRegistered: (status) => set({ isRegistered: status }),
      setApprovalPending: (status) => set({ approvalPending: status }),
      setIsExpired: (status) => set({ isExpired: status }),

      // ============================
      // Helpers
      // ============================
      updateDeviceField: (key, value) =>
        set((state) => ({
          deviceDetails: {
            ...state.deviceDetails,
            [key]: value,
          },
        })),

      removeDeviceField: (key) =>
        set((state) => {
          const updatedDetails = { ...state.deviceDetails };
          delete updatedDetails[key];
          return { deviceDetails: updatedDetails };
        }),

      clearDeviceDetails: () =>
        set({
          deviceDetails: null,
          isRegistered: false,
          approvalPending: false,
          isExpired: false,
        }),

      getDeviceDetails: () => get().deviceDetails,
    }),
    {
      name: 'device-info-store',
      storage: customStorage,
    }
  )
);

export default userDeviceStore;
