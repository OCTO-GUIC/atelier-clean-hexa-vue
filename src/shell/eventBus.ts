export abstract class EventBus<EventMap> {
  protected abstract eventSubscribers: Record<
    keyof EventMap,
    {
      subscriberName: string
      callback: (data: EventMap[keyof EventMap]) => void
    }[]
  >

  publish<K extends keyof EventMap>(eventName: K, data: EventMap[K]): void {
    const subscribers = this.eventSubscribers[eventName] || []
    subscribers.forEach((subscriber) => {
      subscriber.callback(data)
    })
  }

  subscribe<K extends keyof EventMap>(
    subscriberName: string,
    eventName: K,
    callback: (data: EventMap[K]) => void,
  ) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = []
    }
    this.eventSubscribers[eventName].push({
      subscriberName,
      callback: callback as (data: unknown) => void,
    })
  }
}
