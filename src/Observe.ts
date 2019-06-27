import { ListenerClass, InternalClassEventMetadata } from "./PubSub";

export const Observe = <EventMap extends object>() =>
  // had to add another higher level function because I couldn't make typescript infer that the value of the argument 'event' should drive the argument of the observer
  <K extends keyof EventMap>(event: K) => <
    ThisClass extends ListenerClass<ThisClass, EventMap>,
    MethodType extends (data: EventMap[K]) => void
  >(
    targetObject: ThisClass,
    propertyKey: keyof ThisClass,
    descriptor: TypedPropertyDescriptor<MethodType>
  ): TypedPropertyDescriptor<MethodType> => {
    createEventDefinitionsIfNeeded(targetObject);
    targetObject.__eventDefinitions!.push({
      specificEventIdentifier: event,
      methodName: propertyKey
    });
    return descriptor;
  };

function createEventDefinitionsIfNeeded<
  EventMap extends object,
  ThisClass extends ListenerClass<ThisClass, EventMap>
>(targetObject: ThisClass) {
  if (!targetObject.__eventDefinitions) {
    targetObject.__eventDefinitions = [];
  }
}
