import amqp, { Channel, Connection } from "amqplib";
import { Status } from "../../domain/order";
import OrderUseCase from "../../usecases/OrderUseCase";

export interface IMessenger {
  channel: Channel
  createChannel(): Promise<void>;
  assertExchange(exchange: string, exchangeType: string)
  publishToExchange(exchange: string, key: string, msg: Object)
  sendToQueue(queue: string, content: Object): void;
  assertQueue(queue: string): Promise<void>;
  //consume(): Promise<void>
 
  
}

export class Messenger implements IMessenger {
  channel: Channel;

  constructor() {
  
  }

  async createChannel(): Promise<void> {
    const amqp_url = process.env.AMQP_URL || "";
    const connection: Connection = await amqp.connect(amqp_url);

    this.channel = await connection.createChannel();
    await this.assertExchange('orderEvents','topic')
    await this.assertExchange('paymentEvents','topic')
    await this.assertQueue("orders");
    await this.bindQueue('orders', 'paymentEvents', 'payments.status.*');
    //await this.consume()
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

}

export default Messenger;
