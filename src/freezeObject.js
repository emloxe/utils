import defined from './defined';

/**
 * Freezes an object, using Object.freeze if available, otherwise returns
 * the object unchanged.  This function should be used in setup code to prevent
 * errors from completely halting JavaScript execution in legacy browsers.
 *
 * @private
 *
 * @exports freezeObject
 */
let freezeObject = Object.freeze;
if (!defined(freezeObject)) {
  freezeObject = function (o) {
    return o;
  };
}

export default freezeObject;
