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
  generateOrderPayload: () => any;
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
  generateOrderPayload: () => {
    const { width, height, material, eyelets, quantity, getPrice } = get();

    // User Agent Logic
    let user_agent = "unknown";
    if (typeof window !== 'undefined') {
      user_agent = window.innerWidth < 768 ? "mobile" : "desktop";
    }

    const payload = {
      order_id: crypto.randomUUID(),
      product_type: "banner_wide",
      specs: {
        width_cm: width,
        height_cm: height,
        material: material === 'glossy' ? 'glossy_frontlit' : 'matte_frontlit',
        post_processing: eyelets ? ["eyelets_30cm"] : []
      },
      quantity: quantity,
      estimated_price_uah: getPrice(),
      client_meta: {
        source: "web_configurator",
        user_agent: user_agent
      }
    };
    return payload;
  },
  generateDeepLink: () => {
    const state = get();
    // Note: generateOrderPayload logic is duplicated or this should call it?
    // The previous implementation was logging a different structure.
    // The requirement says "When the user clicks the main CTA button... log this specific JSON structure".
    // It doesn't explicitly say generateDeepLink must change its internal logic yet, but the plan says I need to update handleSend to use generateOrderPayload.
    // I will keep generateDeepLink as is for now, but update it to be minimal since the payload generation is separate.
    // Or I can use generateOrderPayload here too if needed.
    // For now, I leave generateDeepLink mostly as legacy or simplified.

    const mockId = Math.random().toString(36).substring(7);
    return `tg://resolve?domain=PolygraphyBot&start=order_${mockId}`;
  }
}));
