export const ItemStatus = {
  initial: "Initial",
  service1: "Processing with Service1",
  service2: "Processing with Service2",
  cancelled: "Cancelled",
  processed: "Processed",
} as const;

export interface Item {
  value: string;
  id: string;
  service1: number | null;
  service2: string | null;
  errors: string[];
  status: typeof ItemStatus[keyof typeof ItemStatus];
}

export const itemDefault: Item = {
  value: "",
  id: "",
  service1: null,
  service2: null,
  errors: [],
  status: ItemStatus.initial,
};
