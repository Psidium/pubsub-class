import { FakeEventBus } from "./FakeEventBus";
import { EventStore } from "./EventMap";
import { PubSubProvider } from "../../src";

export const FakeEventBusInstance: PubSubProvider<EventStore> = new FakeEventBus<EventStore>();