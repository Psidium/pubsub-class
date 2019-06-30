import { PubSubProvider, PubSubEvent } from "../../src/PubSub";

export class FakeEventBus<EventMap extends object> implements PubSubProvider<EventMap> {
    private internalDict: { [key in keyof EventMap]?: PubSubEvent<EventMap[key]>; } = {};
    public fromEvent<Key extends keyof EventMap>(event: Key): PubSubEvent<EventMap[Key]> {
        if (!this.internalDict[event]) {
            this.internalDict[event] = new FakeEvent<EventMap[Key]>();
        }
        return this.internalDict[event]!;
    }
}

export class FakeEvent<EventData> implements PubSubEvent<EventData> {
    private subscribed: Array<(data: EventData) => void> = [];
    public subscribe(callback: (data: EventData) => void): void {
        this.subscribed.push(callback);
    }

    public publish(data: EventData): void {
        this.subscribed.forEach((callback) => callback(data));
    }

    public unsubscribe(): void {
        this.subscribed = [];
    }
}
