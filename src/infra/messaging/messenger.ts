import amqp, { Channel, Connection } from "amqplib";

export interface IMessagener {
  createChannel(): Promise<void>;
  sendToQueue(queue: string, content: Object): Promise<void>;
  assertQueue(queue: string): Promise<void>;
}

class Messenger implements IMessagener {
  private channel!: Channel;

  constructor() {}

  async createChannel(): Promise<void> {
    const connection: Connection = await amqp.connect(
      "amqps://syifycxl:5jfn7FsdjC1JUUuZdwCP6hFNZrocgNSn@jackal.rmq.cloudamqp.com/syifycxl"
    );

    this.channel = await connection.createChannel();
  }
  async assertQueue(queue: string): Promise<void> {
    await this.channel.assertQueue(queue, {
      durable: false,
    });
  }
  async sendToQueue(queue: string, content: Object): Promise<void> {
    await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
  }
}

export default new Messenger();
