import { ErrorResult } from "@/types/result.type";

export function errorResult(message: string): ErrorResult {
  return { error: new Error(message) };
}
