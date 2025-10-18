export interface SuccessResult<Data> {
  data: Data;
  error?: undefined;
}

export interface ErrorResult {
  data?: undefined;
  error: Error;
}

export type Result<Data> = SuccessResult<Data> | ErrorResult;
