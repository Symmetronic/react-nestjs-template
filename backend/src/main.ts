import { AppModule } from "@/app.module";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import fs from "fs";
import YAML from "yaml";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("App Backend")
    .setDescription("The App Backend API description")
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_controllerKey, methodKey) => methodKey,
    });
  SwaggerModule.setup("api", app, documentFactory);

  if (process.env["NODE_ENV"] === "development") {
    fs.writeFileSync("./openapi.yaml", YAML.stringify(documentFactory()));
  }

  if (process.env["ONLY_GENERATE_OPENAPI"] === "true") return;

  await app.listen(process.env["PORT"] ?? 3000);
}

void bootstrap();
