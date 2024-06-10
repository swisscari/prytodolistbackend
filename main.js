"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const AllExceptionsFilter_1 = require("./app/AllExceptionsFilter");
(0, dotenv_1.config)();
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Customer City Swagger')
    .setDescription('Customer City - Technical Assessment')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const appAdapter = app.get(core_1.HttpAdapterHost);
    const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    app
        .useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
    }))
        .useGlobalFilters(new AllExceptionsFilter_1.AllExceptionsFilter(appAdapter))
        .enableCors();
    swagger_1.SwaggerModule.setup('/', app, swaggerDoc);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map