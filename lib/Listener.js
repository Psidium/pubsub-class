"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Level;
(function (Level) {
    Level[Level["NONE"] = -1] = "NONE";
    Level[Level["FATAL"] = 0] = "FATAL";
    Level[Level["ERROR"] = 1] = "ERROR";
    Level[Level["WARNING"] = 2] = "WARNING";
    Level[Level["INFO"] = 3] = "INFO";
    Level[Level["DEBUG"] = 4] = "DEBUG";
    Level[Level["TRACE"] = 5] = "TRACE";
    Level[Level["ALL"] = 6] = "ALL";
})(Level = exports.Level || (exports.Level = {}));
exports.Listener = function (getEventBus) { return function (constructor) {
    var original = constructor;
    // override constructor to observe on every instantiation
    var ObserverClassConstructor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var instance = new (original.bind.apply(original, [void 0].concat(args)))();
        if (instance.__eventDefinitions) {
            var _loop_1 = function (specificEventIdentifier, methodName) {
                // subscribe all observers
                getEventBus()
                    .fromEvent(specificEventIdentifier)
                    .subscribe(function (data, logger) {
                    var method = instance[methodName];
                    if (typeof method === "function") {
                        if (logger && logger.getLevel() > Level.TRACE && instance.constructor.name) {
                            logger.trace("Calling " + instance.constructor.name + "." + methodName, undefined, "PubSub");
                        }
                        // bypassing type assertion to call the method
                        method.call(instance, data);
                    }
                });
            };
            // extract all listened observers
            for (var _a = 0, _b = instance.__eventDefinitions; _a < _b.length; _a++) {
                var _c = _b[_a], specificEventIdentifier = _c.specificEventIdentifier, methodName = _c.methodName;
                _loop_1(specificEventIdentifier, methodName);
            }
        }
        return instance;
    };
    ObserverClassConstructor.prototype = original.prototype;
    // bypassing type checking because I can't make it work
    return ObserverClassConstructor;
}; };
//# sourceMappingURL=Listener.js.map