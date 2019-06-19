import { Observe } from "../../src";
import {
  EventStore,
  UpdateEventArguments,
  CreateEventArguments
} from "../implementation/EventMap";

// A word of caution: we are testing the types of our decorators, but dtslint does not allow for 
// testing that a decorator is compiling or not.
// That's why we have to use TS' internal way to call decorators as higher order functions

//#region Test Set Up
export class MalformedUpdateDecorated {
  public shouldUpdate?: CreateEventArguments;
  public onUpdate(_: UpdateEventArguments) {}
  public onOtherUpdate(arg: CreateEventArguments) {
    this.shouldUpdate = arg;
  }
}
const observe = Observe<EventStore>()("update");
const malformed = new MalformedUpdateDecorated();
//#endregion

// There should be a type error when trying to assign the observable to a method that does not receive the right arguments
// $ExpectError
observe(malformed, "onOtherUpdate", { value: malformed.onOtherUpdate });

// There should not be an error when the method implements the right arguments
observe(malformed, "onUpdate", { value: malformed.onUpdate });

// There should be an error when a class uses @Observe and don't register as a @Listener

// There should be an error when a class register as an @Listener and don't have any @Observer

