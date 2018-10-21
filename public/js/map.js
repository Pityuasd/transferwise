/**
 *
 */

var actualCountries = [ null, null ];
var countryCodes = [ null, null ];


window.TransferWise = window.TransferWise || {};

(function (handler) {

    var EVENT_MAP_INITIALIZED = "transferwise-map-initialized";


    function createMap() {
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


            if(actualCountries[0] != null){
                map.setFilter('states-selected', ['in', 'geounit', actualCountries[0]]);
            }

            if( actualCountries[1] != null){
                map.setFilter('states-selected', ['in', 'geounit', actualCountries[1]]);
            }

            if(actualCountries[0] != null && actualCountries[1] != null){
                map.setFilter('states-selected', ['in', 'geounit'].concat([actualCountries[0], actualCountries[1]]));
            }

            map.getCanvas().style.cursor = 'pointer';

            map.on('click', function(e){


                // function printMousePos(event) {
                //     modalPositioning(e.point.x, e.point.y);
                // }

                // modalPositioning(parseInt(e.clientX), parseInt(e.clientY));

                features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
                var feature = features[0];

                if (!feature || !feature.properties) {
                    return;
                }

                if(actualCountries[0] == null){
                    actualCountries[0] = feature.properties.geounit;
                    countryCodes[0] = feature.properties.iso_a2;

                    map.setFilter('states-highlited', ['in', 'geounit', feature.properties.geounit]);
                }
                else{
                    actualCountries[1] = actualCountries[0];
                    countryCodes[1] = countryCodes[0];

                    countryCodes[0] = feature.properties.iso_a2;
                    actualCountries[0] = feature.properties.geounit;

                    map.setFilter('states-highlited', ['in', 'geounit',].concat([actualCountries[0], actualCountries[1]]));
                }

                var name;

                if(actualCountries[0] != null && actualCountries[1] != null){
                    name = actualCountries[0] + " - " + actualCountries[1];

                    function getCountries() {
                        $.get("/price",{
                            code1: countryCodes[0],
                            code2: countryCodes[1]
                        }, function (data, status) {
                            JSON.stringify(data);
                            document.getElementById('fromCurrency').innerHTML = data.currency1;
                            document.getElementById('toCurrency').innerHTML = data.currency2;
                            document.getElementById('price').innerHTML = data.price;
                        });
                    }
                    getCountries();
                    document.getElementById('countries-info-title').innerHTML = name;
                    modalPositioning(false);
                }else{
                    name = actualCountries[0];

                    function getCountry(){
                        $.get("/country", {
                            code: feature.properties.iso_a2
                        }, function(data, status){
                            JSON.stringify(data);
                            document.getElementById('countOfCustomer').innerHTML = data.customers;
                            document.getElementById('countOfTransactions').innerHTML = data.transactions;
                            document.getElementById('moneyTransfered').innerHTML = data.moneyTransfered;
                        });
                    }
                    getCountry();
                    document.getElementById('country-info-title').innerHTML = name;
                    modalPositioning(true);
                }
            });

            map.on('mousemove', function(e){
                features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
                var feature = features[0];

                if (!feature || !feature.properties) {
                    return;
                }

                map.setFilter('states-selected', ['in', 'geounit', feature.properties.geounit]);
            });
        });

        return map
    }

    handler.map = createMap();

    // Dispatching event on document to initialize markers
    document.dispatchEvent(new Event(EVENT_MAP_INITIALIZED));
})(window.TransferWise);

    function resetActualCountries(){
        actualCountries[0] = null;
        actualCountries[1] = null;
    }

