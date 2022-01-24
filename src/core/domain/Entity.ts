import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {
  protected readonly id: UniqueEntityID;
  protected props: T;

  // Take note of this particular nuance here:
  // Why is "id" optional?
  constructor(props: T, id?: UniqueEntityID) {
    this.id = id ? id : new UniqueEntityID();
    this.props = props;
  }
}
