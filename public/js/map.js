/**
 *
 */

window.TransferWise = window.TransferWise || {};

(function (handler) {
    /**
     * @type {string}
     */
    var EVENT_MAP_INITIALIZED = "transferwise-map-initialized";

    /**
     * @type {string}
     */
    var container = "map";

    /**
     *
     */
    function createMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoicGp0dXhlIiwiYSI6ImNqbmdqNjF5MTAwcmEzcXA3aWQxa21objcifQ.QuNhQ-rc9Q3KwB6GHQCTPg';
        return new mapboxgl.Map({
            container: container,
            // style: "mapbox://styles/pjtuxe/cjngjnuvi0mom2rsqrq3u4sl5",
            style: "mapbox://styles/kapitanytms/cjlgbkiev2eg52rnfiz9kmcka", //hosted style id
            center: [60, 26], // starting position
            zoom: 0, // starting zoom
            maxBounds: [
                [-180, -90],
                [180, 90]
            ]
        });
    }

    console.log("Creating map...");
    handler.map = createMap();

    // Dispatching event on document to initialize markers
    document.dispatchEvent(new Event(EVENT_MAP_INITIALIZED));
})(window.TransferWise);
