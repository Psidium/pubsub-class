import { Listener, Observe } from "../../src";
import { FakeEventBusInstance } from "./EventBusInstance";
import { EventStore, CreateEventArguments, UpdateEventArguments } from "./EventMap";
import { FakeEventBus } from "./FakeEventBus";



@Listener<EventStore, CreateDecorated>(() => FakeEventBusInstance)
export class CreateDecorated {
  public firstArgument: string = "";

  @Observe<EventStore>()("create")
  public onCreate(arg: CreateEventArguments) {
    this.firstArgument = arg.firstArgument;
  }
}

@Listener<EventStore, MalformedUpdateDecorated>(() => FakeEventBusInstance)
export class MalformedUpdateDecorated {
  public shouldUpdate?: CreateEventArguments;
  public onUpdate(_: UpdateEventArguments) {}

  @Observe<EventStore>()("create")
  public onOtherUpdate(arg: CreateEventArguments) {
    this.shouldUpdate = arg;
  }
}

export const delayedEventBus: { eventBus?: typeof FakeEventBusInstance, } = {};
@Listener<EventStore, DelayedCreateDecorated>(() => delayedEventBus.eventBus!)
export class DelayedCreateDecorated {
  public firstArgument: string = "";

  @Observe<EventStore>()("create")
  public onCreate(arg: CreateEventArguments) {
    this.firstArgument = arg.firstArgument;
  }
}
