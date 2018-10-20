/**
 * @param {Object} object
 * @param {Object} data
 * @returns {*}
 */
module.exports = function (object, data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            object[key] = data[key];
        }
    }

    return object;
};
