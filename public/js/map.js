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
            zoom: 1.5,
            position: 'fixed',
            minZoom: '0',
            interactive: false,
            maxBounds: [
                [-180, -90],
                [180, 90]
            ]
        });

        map.on('load', function () {
            map.addSource('states', {
                'type': 'geojson',
                'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
            });

            map.addLayer({
                'id': 'states-layer',
                'type': 'fill',
                'source': 'states',
                'paint': {
                    "fill-outline-color": "rgba(0,0,0,0.1)",
                    "fill-color": "rgba(0,0,0,0.1)"
                }
            })

            map.addLayer({
                'id': 'states-highlited',
                'type': 'fill',
                'source': 'states',
                'paint': {
                    "fill-outline-color": "#00b9ff",
                    "fill-color": "#00b9ff",
                    "fill-opacity": 1
                },
                'filter': ["in", "geounit", ""]
            })

            map.addLayer({
                'id': 'states-selected',
                'type': 'fill',
                'source': 'states',
                'paint': {
                    "fill-color": "#787878",
                    "fill-opacity": 0.5
                },
                'filter': ["in", "geounit", ""]
            })

            map.on('click', function(e){

                // $("#exampleModal").modal()

                map.getCanvas().style.cursor = 'pointer';

                features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
                var feature = features[0];

                map.setFilter('states-highlited', ['in', 'geounit', feature.properties.geounit]);
            });

            map.on('mousemove', function(e){
                features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
                var feature = features[0];

                map.setFilter('states-selected', ['in', 'geounit', feature.properties.geounit]);
            });

        });

        return map
    }


    handler.map = createMap();

    // Dispatching event on document to initialize markers
    document.dispatchEvent(new Event(EVENT_MAP_INITIALIZED));
})(window.TransferWise);
