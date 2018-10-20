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
        // mapboxgl.accessToken = 'pk.eyJ1IjoicGp0dXhlIiwiYSI6ImNqbmdqNjF5MTAwcmEzcXA3aWQxa21objcifQ.QuNhQ-rc9Q3KwB6GHQCTPg';
        // return new mapboxgl.Map({
        //     container: container,
        //     // style: "mapbox://styles/pjtuxe/cjngjnuvi0mom2rsqrq3u4sl5",
        //     style: "mapbox://styles/kapitanytms/cjlgbkiev2eg52rnfiz9kmcka", //hosted style id
        //     center: [60, 26], // starting position
        //     zoom: 1, // starting zoom
        //     maxBounds: [
        //         [-180, -90],
        //         [180, 90]
        //     ]
        // });
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGl0ZXJ0YW1hcyIsImEiOiJjam5na3B2eGUwMHdxM3FzODE3N3Q4b202In0.YKQf0eYqkvC9anlkDO18CA';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/hitertamas/cjnhlyzz85g642rsc4f4p8hem',
            center: [30, 26],
            zoom: 1.4,
            position: 'fixed',
            minZoom: '0'
        });
        return map
    }

    handler.map = createMap();

    // Dispatching event on document to initialize markers
    document.dispatchEvent(new Event(EVENT_MAP_INITIALIZED));
})(window.TransferWise);
