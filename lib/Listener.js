"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = function (eventBus) { return function (constructor) {
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
                eventBus
                    .fromEvent(specificEventIdentifier)
                    .subscribe(function (data) {
                    var method = instance[methodName];
                    if (typeof method === "function") {
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