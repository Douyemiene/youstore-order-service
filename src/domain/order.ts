export interface IOrderProps {
  customerId: string;
  orderStatus?: boolean | null;
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
    const newDate = new Date();
    const today = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    props.orderDate = props.orderDate ? props.orderDate : today;
    return new Order(props);
  }
}
