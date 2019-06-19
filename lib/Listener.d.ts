import { Class, PubSubProvider } from "./PubSub";
export declare const Listener: <EventMap extends object, ListenedClass extends import("src/PubSub").Merge<ListenedClass, import("src/PubSub").InternalClassEventMetadata<ListenedClass, EventMap>>>(eventBus: PubSubProvider<EventMap>) => (constructor: Class<ListenedClass>) => Class<ListenedClass>;
