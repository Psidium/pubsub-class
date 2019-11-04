import { Class, PubSubProvider, InternalClassEventMetadata } from "./PubSub";
export declare enum Level {
    NONE = -1,
    FATAL = 0,
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4,
    TRACE = 5,
    ALL = 6,
}
export interface Logger {
    getLevel(): Level;
    trace(message: string, details?: string, component?: string): void;
}
export declare const Listener: <EventMap extends object, ListenedClass extends Pick<ListenedClass, Exclude<keyof ListenedClass, Extract<keyof ListenedClass, "__eventDefinitions">>> & InternalClassEventMetadata<ListenedClass, EventMap>>(getEventBus: () => PubSubProvider<EventMap>) => (constructor: Class<ListenedClass>) => Class<ListenedClass>;
