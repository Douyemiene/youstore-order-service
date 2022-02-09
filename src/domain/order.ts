export interface IOrderProps {
  customerId: string;
  orderStatus?: boolean;
  total: number;
  products: Array<{ name: string; quantity: number }>;
  orderDate?: string;
}

export class Order {
  readonly props: IOrderProps;

  private constructor(props: IOrderProps) {
    this.props = props;
  }

  public static create(props: IOrderProps): Order {
    const today = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
    props.orderDate = props.orderDate ? props.orderDate : today;
    props.orderStatus =
      props.orderStatus == undefined ? false : props.orderStatus;
    return new Order(props);
  }
}
