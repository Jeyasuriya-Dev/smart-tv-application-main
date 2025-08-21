// src/store/userdeviceUIDStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customStorage from '../utils/customZustandStorage';

const userdeviceUIDStore = create(persist(
  (set) => ({
    deviceUID: '',
    setDeviceUID: (id) => set({ deviceUID: id }), // match usage
  }),
  {
    name: 'android-id-store',
    storage: customStorage,
  }
));


export default userdeviceUIDStore;
