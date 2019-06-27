import { ListenerClass, Class, PubSubProvider, InternalClassEventMetadata } from "./PubSub";


export const Listener = <
  EventMap extends object,
  ListenedClass extends ListenerClass<ListenedClass, EventMap>
>(
  eventBus: PubSubProvider<EventMap>
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
        eventBus
          .fromEvent(specificEventIdentifier)
          .subscribe((data: EventMap[keyof EventMap]) => {
            const method = instance[methodName];
            if (typeof method === "function") {
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
