import { create } from 'zustand';

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('agro_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {}
  return {
    phoneNumber: '+91 98765 43210',
    name: 'Ramesh Kumar',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    village: 'Kothri',
    landSize: '3.5 Acres',
    primaryCrops: ['Wheat', 'Soybean'],
    vehicle: 'Tractor Trolley',
    isAuthenticated: true,
  };
};

export const useAuthStore = create((set) => ({
  user: getInitialUser(),
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
      set((state) => {
        const updatedUser = {
          ...state.user,
          phoneNumber: state.phoneInput || state.user.phoneNumber,
          isAuthenticated: true,
        };
        try {
          localStorage.setItem('agro_user', JSON.stringify(updatedUser));
        } catch (e) {}
        return { user: updatedUser, otpSent: false };
      });
      return true;
    }
    return false;
  },
  
  syncClerkUser: (clerkUser) => {
    if (!clerkUser) return;
    set((state) => {
      const updatedUser = {
        ...state.user,
        name: clerkUser.fullName || clerkUser.firstName || state.user.name || 'Ramesh Kumar',
        phoneNumber: clerkUser.primaryPhoneNumber?.phoneNumber || state.user.phoneNumber || '+91 98765 43210',
        email: clerkUser.primaryEmailAddress?.emailAddress || state.user.email,
        isAuthenticated: true,
      };
      try {
        localStorage.setItem('agro_user', JSON.stringify(updatedUser));
      } catch (e) {}
      return { user: updatedUser };
    });
  },
  
  updateFarmerProfile: (profileData) => {
    set((state) => {
      const updatedUser = {
        ...state.user,
        ...profileData,
        isAuthenticated: true,
      };
      try {
        localStorage.setItem('agro_user', JSON.stringify(updatedUser));
      } catch (e) {}
      return { user: updatedUser };
    });
  },
  
  logout: () => {
    try {
      localStorage.removeItem('agro_user');
    } catch (e) {}
    set({
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
    });
  },
}));
