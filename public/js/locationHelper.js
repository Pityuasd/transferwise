/**
 *
 */

document.addEventListener("transferwise-map-initialized", function () {
    function getLocationCoordinates(city, callback) {
        if (typeof callback !== "function") {
            return false;
        }

        var url = "https://geocoder.api.here.com/6.2/geocode.json?searchtext=" + city + "&app_id=2fM2UAjSI6HRIvBRwGQs&app_code=uS-G6pFDQAnhD_ZeW27noA&gen=8";

        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            var parsed = JSON.parse(this.responseText);

            if (!parsed || !parsed.Response) {
                return false;
            }

            var response = parsed.Response;

            if (!response.View || !response.View.length) {
                return false;
            }

            var entry = response.View[0].Result;

            if (!entry || !entry.length) {
                return false;
            }

            var position = entry[0].Location.DisplayPosition;
            callback({
                latitude: position.Latitude,
                longitude: position.Longitude
            });
        });
        request.open("GET", url);
        request.send();
    }

    window.TransferWise.Location = {
        getLocationCoordinates: getLocationCoordinates
    };
});
