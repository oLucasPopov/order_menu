import { MissingParamError } from "../../Presentation/errors/MissingParamError";
import { badRequest, ok, serverError } from "../../Presentation/helpers/http/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../Presentation/Protocols";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController implements IController {
  constructor(
    private createProductUseCase: CreateProductUseCase
  ) { }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = [
        'name',
        'price',
        'quantity',
        'description',
        'category',
        'unit',
      ];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const {
        name,
        price,
        quantity,
        description,
        category,
        unit,
        barcode,
        cost,
        expirationDate,
        providerCode,
        ean,
        ncm,
        cest,
        origin,
        liquidWeight,
        bruteWeight,
        width,
        height,
        length,
      } = request.body;
      const product = await this.createProductUseCase.execute(
        {
          name,
          price,
          quantity,
          description,
          category,
          unit,
          barcode,
          cost,
          expirationDate,
          providerCode,
          ean,
          ncm,
          cest,
          origin,
          liquidWeight,
          bruteWeight,
          width,
          height,
          length,
        }
      );

      return Promise.resolve(ok(product));
    } catch (err: any) {
      return Promise.resolve(serverError(err.message));
    }
  }
}