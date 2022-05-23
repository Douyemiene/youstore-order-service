import amqp, { Channel, Connection, Message } from "amqplib";
import { Status } from "../../domain/order";
import OrderUseCase from "../../usecases/OrderUseCase";

export interface IMessenger {
  createChannel(): Promise<void>;
  assertExchange(exchange: string, exchangeType: string)
  publishToExchange(exchange: string, key: string, msg: Object)
  sendToQueue(queue: string, content: Object): void;
  assertQueue(queue: string): Promise<void>;
  consume(): Promise<void>
  // consumePaymentSuccess(): Promise<void>;
  // consumePaymentFailure(): Promise<void>;
  
}

export class Messenger implements IMessenger {
  private channel!: Channel;
  private orderUseCase: OrderUseCase;

  constructor({ orderUseCase }: { orderUseCase: OrderUseCase }) {
    this.orderUseCase = orderUseCase;
  }

  async createChannel(): Promise<void> {
    const amqp_url = process.env.AMQP_URL || "";
    const connection: Connection = await amqp.connect(amqp_url);

    this.channel = await connection.createChannel();
    await this.assertExchange('orderEvents','topic')
    await this.assertExchange('paymentEvents','topic')
    await this.assertQueue("orders");
    await this.bindQueue('orders', 'paymentEvents', 'payments.status.*');
    await this.consume()
  }

  
  async assertQueue(queue: string): Promise<void> {
    await this.channel.assertQueue(queue, {
      durable: true,
    });
  }


  async assertExchange(exchange: string, exchangeType: string){
    await this.channel.assertExchange(exchange, exchangeType, {
      durable: true
    });
  }

  async bindQueue(queue: string, exchange: string, key: string): Promise<void> {
    await this.channel.bindQueue(queue, exchange, key);
  }

  async publishToExchange(exchange: string, key: string, msg: Object){
    await this.channel.publish(exchange, key, Buffer.from(JSON.stringify(msg)));
  }

  sendToQueue(queue: string, content: Object): void {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
  }

  async consume(): Promise<void> {
    this.channel.consume(
      "orders",
      async (msg: Message | null) => {
        if (msg) {
          const routingKey = msg.fields.routingKey
          const data = JSON.parse(msg.content.toString());
          //console.log(`msg - ${routingKey}`)

          if(routingKey == 'payments.status.success'){  
              //console.log('payments.status.success')
              //update order status and publish order completed event
              await this.orderUseCase.findByIdAndUpdateStatus(
                data.ref,
                Status.SUCCESS
              );

              const order = await this.orderUseCase.getOrderById(data.ref);
              this.publishToExchange('orderEvents', 'orders.status.completed', {order})
          }
          else if(routingKey == 'payments.status.failed'){
            //console.log('payments.status.failed')
                //update order status and publish order completed event
                await this.orderUseCase.findByIdAndUpdateStatus(
                  data.ref,
                  Status.FAILURE
                );
                const order = await this.orderUseCase.getOrderById(data.ref);
                this.publishToExchange('orderEvents', 'orders.status.failed', {order})
          }
         
        }
      },
      { noAck: true }
    );
  }

  // async consumePaymentFailure() {
  //   this.channel.consume(
  //     "payment_failure",
  //     async (msg: Message | null) => {
  //       if (msg) {

  //         const data = JSON.parse(msg.content.toString());
  //         await this.orderUseCase.findByIdAndUpdateStatus(
  //           data.ref,
  //           Status.FAILURE
  //         );
        
  //         const order = await this.orderUseCase.getOrderById(data.ref);
  //         this.publishToExchange('orderEvents', 'orders.status.failed', {order})
  //       }
  //     },
  //     { noAck: true }
  //   );
  // }
}

export default Messenger;
