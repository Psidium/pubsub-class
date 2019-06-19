import { Listener, Observe } from "../../src";
import { FakeEventBusInstance } from "./EventBusInstance";
import { EventStore, CreateEventArguments, UpdateEventArguments } from "./EventMap";



@Listener<EventStore, CreateDecorated>(FakeEventBusInstance)
export class CreateDecorated {
  public firstArgument: string;

  @Observe<EventStore>()("create")
  public onCreate(arg: CreateEventArguments) {
    this.firstArgument = arg.firstArgument;
  }
}

@Listener<EventStore, MalformedUpdateDecorated>(FakeEventBusInstance)
export class MalformedUpdateDecorated {
  public shouldUpdate?: UpdateEventArguments;
  public onUpdate(_: UpdateEventArguments) {}

  @Observe<EventStore>()("update")
  public onOtherUpdate(arg: UpdateEventArguments) {
    this.shouldUpdate = arg;
  }
}
