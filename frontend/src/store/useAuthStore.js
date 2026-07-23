import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    phoneNumber: '+91 98765 43210',
    name: 'Ramesh Kumar',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    village: 'Kothri',
    landSize: '3.5 Acres',
    primaryCrops: ['Wheat', 'Soybean'],
    vehicle: 'Tractor Trolley',
    isAuthenticated: true,
  },
  otpSent: false,
  otpCode: '',
  phoneInput: '',
  
  setPhoneInput: (phoneInput) => set({ phoneInput }),
  setOtpCode: (otpCode) => set({ otpCode }),
  
  sendOtp: (phone) => {
    set({ phoneInput: phone, otpSent: true });
    return true;
  },
  
  verifyOtp: (code) => {
    if (code === '123456' || code.length === 6) {
      set((state) => ({
        user: {
          ...state.user,
          phoneNumber: state.phoneInput || state.user.phoneNumber,
          isAuthenticated: true,
        },
        otpSent: false,
      }));
      return true;
    }
    return false;
  },
  
  updateFarmerProfile: (profileData) => {
    set((state) => ({
      user: {
        ...state.user,
        ...profileData,
      },
    }));
  },
  
  logout: () => set({
    user: {
      phoneNumber: '',
      name: '',
      state: '',
      district: '',
      village: '',
      landSize: '',
      primaryCrops: [],
      vehicle: '',
      isAuthenticated: false,
    },
    otpSent: false,
  }),
}));
