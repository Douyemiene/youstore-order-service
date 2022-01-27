const { v4: uuidv4 } = require("uuid");

export class UniqueEntityID {
  readonly value;
  constructor(id?: string) {
    this.value = id ? id : uuidv4();
  }
}
