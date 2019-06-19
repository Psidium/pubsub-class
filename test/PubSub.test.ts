import { CreateDecorated, MalformedUpdateDecorated } from "./implementation/DecoratedClass";
import { FakeEventBusInstance } from "./implementation/EventBusInstance";

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
});
