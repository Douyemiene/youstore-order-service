import { UniqueEntityID } from "../helpers/UniqueEntityID";

export interface IOrderProps {
  id?: string;
  orderStatus: boolean;
  total: number;
  products: string[];
  orderDate: string;
}

export class Order {
  readonly props: IOrderProps;

  private constructor(props: IOrderProps) {
    props.id = props.id ? props.id : new UniqueEntityID().value;
    this.props = props;
  }

  public static create(props: IOrderProps): Order {
    let { orderStatus, total, products, orderDate } = props;
    props.orderStatus = props.orderStatus ? props.orderStatus : false;
    return new Order(props);
  }
}
