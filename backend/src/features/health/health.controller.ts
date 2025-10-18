import { HealthDto } from "@/features/health/dtos/Health.dto";
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  /**
   * @remarks This operation checks the health status of the application.
   */
  @Get()
  async health(): Promise<HealthDto> {
    return new HealthDto({ status: "ok" });
  }
}
