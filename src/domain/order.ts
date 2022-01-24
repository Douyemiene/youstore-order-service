import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

interface IOrderProps {
  orderStatus: boolean;
  total: number;
  products: string[];
  orderDate: string;
}

type OrderOrNull = Order | null;

class Order extends Entity<IOrderProps> {
  private constructor(props: IOrderProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: IOrderProps, id?: UniqueEntityID): OrderOrNull {
    const { orderStatus, total, products, orderDate } = props;
    return new Order(props, id);
  }
}
