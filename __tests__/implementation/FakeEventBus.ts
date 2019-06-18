import { PubSubProvider, PubSubEvent } from "../../src/PubSub";

export class FakeEventBus<EventMap extends object> implements PubSubProvider<EventMap> {
    private internalDict: { [key in keyof EventMap]?: PubSubEvent<EventMap[key]>; } = {};
    public fromEvent(event: keyof EventMap): PubSubEvent<EventMap[keyof EventMap]> {
        if (!this.internalDict[event]) {
            this.internalDict[event] = new FakeEvent();
        }
        return this.internalDict[event];
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
