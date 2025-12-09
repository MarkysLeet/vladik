import { create } from 'zustand';

interface OrderState {
  width: number;
  height: number;
  quantity: number;
  material: 'matte' | 'glossy';
  eyelets: boolean;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setQuantity: (quantity: number) => void;
  setMaterial: (material: 'matte' | 'glossy') => void;
  toggleEyelets: () => void;
  getPrice: () => number;
  generateDeepLink: () => string;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  width: 100,
  height: 50,
  quantity: 1,
  material: 'matte',
  eyelets: false,
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setQuantity: (quantity) => set({ quantity }),
  setMaterial: (material) => set({ material }),
  toggleEyelets: () => set((state) => ({ eyelets: !state.eyelets })),
  getPrice: () => {
    const { width, height, quantity, eyelets } = get();
    // Dummy calculation: Area (m2) * 500 + Eyelets * 10
    const area = (width / 100) * (height / 100);
    const basePrice = area * 500;
    const eyeletPrice = eyelets ? (width + height) * 0.2 * 10 : 0; // Rough perimeter logic
    return Math.round((basePrice + eyeletPrice) * quantity);
  },
  generateDeepLink: () => {
    const state = get();
    const orderData = {
      product: "Banner",
      width: state.width,
      height: state.height,
      material: state.material,
      eyelets: state.eyelets,
      quantity: state.quantity
    };
    console.log("Serialized Order Data:", JSON.stringify(orderData, null, 2));
    const mockId = Math.random().toString(36).substring(7);
    return `tg://resolve?domain=PolygraphyBot&start=order_${mockId}`;
  }
}));
