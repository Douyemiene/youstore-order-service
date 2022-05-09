export enum Status {
  PENDING = "Pending",
  SUCCESS = "Success",
  FAILURE = "Failure",
}

export enum DeliveryStatus {
  NOT_INITIATED = "Not Initalized",
  INIT = "Initiated",
  DELIVERED = "Delivered",
  FAILURE = "Failure",
}

export interface IOrderProps {
  customerId: string;
  orderStatus?: Status;
  orderDate?: string;
  deliveryStatus?: DeliveryStatus;
  total: number;
  customerEmail: string;
  products: Array<{ name: string; id: string; quantity: number, price: number, size: string;
    color: string,
    image: string}>;
  
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
