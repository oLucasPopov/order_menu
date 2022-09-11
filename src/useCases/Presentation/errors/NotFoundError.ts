export class NotFoundError implements Error {
  name: string;
  message: string;

  constructor(entityName: string) {
    this.name = 'NotFoundError';
    this.message = `${entityName} not found`;
  }
}