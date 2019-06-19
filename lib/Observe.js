"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observe = function () {
    // had to add another higher level function because I couldn't make typescript infer that the value of the argument 'event' should drive the argument of the observer
    return function (event) { return function (targetObject, propertyKey, descriptor) {
        createEventDefinitionsIfNeeded(targetObject);
        targetObject.__eventDefinitions.push({
            specificEventIdentifier: event,
            methodName: propertyKey
        });
        return descriptor;
    }; };
};
function createEventDefinitionsIfNeeded(targetObject) {
    if (!targetObject.__eventDefinitions) {
        targetObject.__eventDefinitions = [];
    }
}
//# sourceMappingURL=Observe.js.map