import { MissingParamError } from "../../utils/errors/MissingParamError";
import { badRequest, ok, serverError } from "../../utils/helpers/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../utils/protocols";
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
        'id_category',
        'id_unit',
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
        id_category,
        id_unit,
        barcode,
        cost,
        expirationDate,
        id_supplier,
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
          id_category,
          id_unit,
          barcode,
          cost,
          expirationDate,
          id_supplier,
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