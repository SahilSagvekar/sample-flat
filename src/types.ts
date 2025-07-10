export type Property = {
  id: string;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
  location?: string; // ✅ THIS is required
};
