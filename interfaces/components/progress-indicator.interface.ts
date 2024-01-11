import type { RouteLocation, RouteRecordRaw } from "vue-router";

export interface StepItemInterface {
  readonly id: number,
  step: number,
  name: string,
  route: RouteRecordRaw,
}