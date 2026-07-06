import { create } from "zustand";
import type { PlanId } from "@/constants/config";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = "pending" | "processing" | "success" | "error";

export interface OrderResult {
  orderID: string;
  payerName?: string;
  payerEmail?: string;
}

interface CheckoutState {
  selectedPlan: PlanId;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  orderResult: OrderResult | null;
  errorMessage: string;
  setPlan: (plan: PlanId) => void;
  updateShippingAddress: (fields: Partial<ShippingAddress>) => void;
  setStatus: (status: OrderStatus) => void;
  setOrderResult: (result: OrderResult | null) => void;
  setError: (msg: string) => void;
  reset: () => void;
}

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  selectedPlan: "bundle",
  shippingAddress: EMPTY_ADDRESS,
  status: "pending",
  orderResult: null,
  errorMessage: "",
  setPlan: (plan) => set({ selectedPlan: plan }),
  updateShippingAddress: (fields) =>
    set((state) => ({
      shippingAddress: { ...state.shippingAddress, ...fields },
    })),
  setStatus: (status) => set({ status }),
  setOrderResult: (result) => set({ orderResult: result }),
  setError: (msg) => set({ errorMessage: msg, status: "error" }),
  reset: () =>
    set({
      shippingAddress: EMPTY_ADDRESS,
      status: "pending",
      orderResult: null,
      errorMessage: "",
    }),
}));

// 表单验证
export const validateShippingAddress = (
  addr: ShippingAddress
): Record<string, boolean> => {
  const errors: Record<string, boolean> = {};
  if (!addr.fullName.trim()) errors.fullName = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email)) errors.email = true;
  if (!addr.phone.trim()) errors.phone = true;
  if (!addr.addressLine1.trim()) errors.addressLine1 = true;
  if (!addr.city.trim()) errors.city = true;
  if (!addr.state.trim()) errors.state = true;
  if (!addr.postalCode.trim()) errors.postalCode = true;
  if (!addr.country.trim()) errors.country = true;
  return errors;
};

export const isAddressValid = (addr: ShippingAddress): boolean => {
  return Object.keys(validateShippingAddress(addr)).length === 0;
};
