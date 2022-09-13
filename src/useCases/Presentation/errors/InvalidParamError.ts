export class InvalidParamError implements Error {
  name: string;
  message: string;

  constructor(paramName: string) {
    this.name = 'InvalidParamError';
    this.message = `Invalid param: ${paramName}`;
  }
}