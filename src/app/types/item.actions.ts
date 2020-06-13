import { ItemState } from "./item.state";

export const ActionType = {
  initialize: "initialize",
  setState: "setState",
  startService1: "startService1",
  errorService1: "errorService1",
  finishedService1: "finishedService1",
  startService2: "startService2",
  errorService2: "errorService2",
  finishedService2: "finishedService2",
  cancel: "cancel",
} as const;

export interface InitializeAction {
  type: typeof ActionType.initialize;
  payload: ItemState;
}

export interface SetStateAction {
  type: typeof ActionType.setState;
  payload: ItemState;
}

export interface StartService1Action {
  type: typeof ActionType.startService1;
  payload: { value: string };
}

export interface ErrorService1Action {
  type: typeof ActionType.errorService1;
  payload: { error: string };
}

export interface FinishedService1Action {
  type: typeof ActionType.finishedService1;
  payload: { service1: number };
}

export interface StartService2Action {
  type: typeof ActionType.startService2;
  payload: { value: string; service1: number | null };
}

export interface ErrorService2Action {
  type: typeof ActionType.errorService2;
  payload: { error: string };
}

export interface FinishedService2Action {
  type: typeof ActionType.finishedService2;
  payload: { service2: string };
}

export interface CancelAction {
  type: typeof ActionType.cancel;
  payload?: {};
}

export type Action =
  | CancelAction
  | SetStateAction
  | InitializeAction
  | StartService1Action
  | ErrorService1Action
  | FinishedService1Action
  | StartService2Action
  | ErrorService2Action
  | FinishedService2Action;
