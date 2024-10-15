type MessageHandler = (data: any) => void

export class MessageBus {
  private handlers: Map<string, MessageHandler[]> = new Map()

  subscribe(topic: string, handler: MessageHandler): void {
    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, [])
    }
    this.handlers.get(topic)!.push(handler)
  }

  publish(topic: string, data: any): void {
    const topicHandlers = this.handlers.get(topic)
    if (topicHandlers) {
      topicHandlers.forEach(handler => handler(data))
    }
  }
}

export const globalMessageBus = new MessageBus()
