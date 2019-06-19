export interface InternalClassEventMetadata<ThisClass, EventMap extends object> {
  __eventDefinitions?: {
    specificEventIdentifier: keyof EventMap;
    methodName: keyof ThisClass;
  }[];
}

export type ListenerClass<ThisClass, EventMap extends object> = Merge<ThisClass, InternalClassEventMetadata<ThisClass, EventMap>>;

export interface PubSubProvider<EventMap extends object> {
    fromEvent<Key extends keyof EventMap>(event: Key): PubSubEvent<EventMap[Key]>;
}

export interface PubSubEvent<EventData> {
    subscribe(callback: (data: EventData) => void): void;
    publish(data: EventData): void;
    unsubscribe(): void;
}

// the following types were extracted from 'type-fest';
export type Class<T> = new(...arguments_: any[]) => T;
export type Omit<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;
export type Merge<FirstType, SecondType> = Omit<FirstType, Extract<keyof FirstType, keyof SecondType>> & SecondType;
