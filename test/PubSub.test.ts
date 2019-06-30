import { CreateDecorated, MalformedUpdateDecorated, DelayedCreateDecorated, delayedEventBus } from "./implementation/DecoratedClass";
import { FakeEventBusInstance } from "./implementation/EventBusInstance";
import "jest";

describe("The Declarated class", function() {
  it("instantiates", function() {
    const decorated = new CreateDecorated();
    expect(decorated).toBeDefined();
  });
  it("stores the data received on the create event", function() {
    const decorated = new CreateDecorated();
    FakeEventBusInstance
        .fromEvent("create")
        .publish({ firstArgument: "test" });
    expect(decorated.firstArgument).toBe("test");
  });
  it("does not stores the data on malformed class update event", function () {
    const decorated = new MalformedUpdateDecorated();
    FakeEventBusInstance
        .fromEvent("update")
        .publish({ update: true });
    expect(decorated.shouldUpdate).toBeUndefined();
  });
  it("only tries to load the eventbus on instantiation", function () {
    expect(() => new DelayedCreateDecorated()).toThrowError();
    delayedEventBus.eventBus = FakeEventBusInstance;
    const decorated = new DelayedCreateDecorated();
    FakeEventBusInstance
      .fromEvent("create")
      .publish({ firstArgument: "aa" });
    expect(decorated.firstArgument).toBe("aa");
  });
});
