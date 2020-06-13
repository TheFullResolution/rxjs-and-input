export const ItemStatus = {
  initial: "Initial",
  service1: "Processing with Service1",
  service2: "Processing with Service2",
  failedService1: "Service1 Failed",
  failedService2: "Service2 Failed",
  cancelled: "Cancelled",
  processed: "Processed",
} as const;

export interface ItemState {
  value: string;
  id: string;
  service1: number | null | string;
  service2: string | null ;
  status: typeof ItemStatus[keyof typeof ItemStatus];
  processing: boolean;
}

export const itemDefault: ItemState = {
  value: "",
  id: "",
  service1: null,
  service2: null,
  status: ItemStatus.initial,
  processing: false
};
