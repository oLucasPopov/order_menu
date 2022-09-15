export class MissingParamError implements Error {
  name: string;
  message: string;

  constructor(paramName: string) {
    this.name = 'MissingParamError';
    this.message = `Missing param: ${paramName}`;
  }
}