import { SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  