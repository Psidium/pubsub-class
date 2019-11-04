import { ListenerClass, Class, PubSubProvider, InternalClassEventMetadata } from "./PubSub";

export enum Level {
  NONE = -1,
  FATAL = 0,
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
  DEBUG = 4,
  TRACE = 5,
  ALL = 6,
}

interface Name {
  name: string;
}

type FunctionWithName = Function & Name; //using property not supported in IE

export interface Logger {
  getLevel(): Level;
  debug(message: string, details?: string, component?: string): void;
}

export const Listener = <
  EventMap extends object,
  ListenedClass extends ListenerClass<ListenedClass, EventMap>
>(
  getEventBus: () => PubSubProvider<EventMap>
) => (constructor: Class<ListenedClass>) => {
  const original = constructor;
  // override constructor to observe on every instantiation
  const ObserverClassConstructor = function(...args: any[]) {
    const instance = new original(...args);
    if (instance.__eventDefinitions) {
      // extract all listened observers
      for (const {
        specificEventIdentifier,
        methodName
      } of instance.__eventDefinitions) {
        // subscribe all observers
        getEventBus()
          .fromEvent(specificEventIdentifier)
          .subscribe((data: EventMap[keyof EventMap], logger?: Logger) => {
            const method = instance[methodName];
            if (typeof method === "function") {
              if (logger && logger.getLevel() >= Level.DEBUG && (instance.constructor as FunctionWithName).name ) {
                logger.debug(`Calling ${(instance.constructor as FunctionWithName).name}.${methodName}`, undefined, "PubSub");
              }
              // bypassing type assertion to call the method
              ((method as any) as Function).call(instance, data);
            }
          });
      }
    }
    return instance;
  };
  ObserverClassConstructor.prototype = original.prototype;
  // bypassing type checking because I can't make it work
  return (ObserverClassConstructor as any) as Class<ListenedClass>;
};
