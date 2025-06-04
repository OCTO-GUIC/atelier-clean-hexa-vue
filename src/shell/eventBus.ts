export abstract class EventBus<EventMap> {
  protected abstract eventSubscribers: Record<
    keyof EventMap,
    {
      subscriberName: string
      callback: () => void
    }[]
  >

  publish<K extends keyof EventMap>(eventName: K): void {
    const subscribers = this.eventSubscribers[eventName] || []
    subscribers.forEach((subscriber) => {
      subscriber.callback()
    })
  }

  subscribe<K extends keyof EventMap>(subscriberName: string, eventName: K, callback: () => void) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = []
    }
    this.eventSubscribers[eventName].push({
      subscriberName,
      callback: callback,
    })
  }
}
