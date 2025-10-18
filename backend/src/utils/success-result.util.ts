import { SuccessResult } from "@/types/result.type";

export function successResult<T>(data: T): SuccessResult<T> {
  return { data };
}
