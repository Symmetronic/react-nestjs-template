export class HealthDto {
  readonly status: string;

  constructor({ status }: { status: string }) {
    this.status = status;
  }
}
