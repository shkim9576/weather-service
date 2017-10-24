
function makeAjaxCall(queryStr, index) {
    $.ajax({
        type: "GET",
        url: "https://weather-service-183516.appspot.com/query",
        data: {
            query: queryStr
        },
        success: function (response) {
            var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
            date.setUTCSeconds(response.time);
            var formattedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()

            var ntr = '<tr><td>' + formattedDate + '</td>' +
                '<td>' + response.summary + '</td>' +
                '<td>' + response.temperature + '</td></tr>';
            $('#result-table').append(ntr);
            //$('#result-table').tablesorter({sortList: [[0,0]]});
        },
        error: function (result) {
            console.error("error: " + result);
        }
    });
}

function getInputTime() {
    var today = new Date($('#d-input').val()).getTime();
    return Math.round(today / 1000); // seconds
}

function getInputCoordinates() {
    var geocoder = new google.maps.Geocoder();
    var address = $('#address-input').val();

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var coordinates = latitude + ',' + longitude;
            var baseTime = getInputTime();

            for (var i = 0; i < 7; i++) {
                var queryTime = baseTime - (24 * 60 * 60 * i);
                var queryStr = coordinates + "," + queryTime;
                makeAjaxCall(queryStr, i);
            }
        }
    });
}

// Send query to weather server
function sendQuery() {
    $('#result-table').find("tr:gt(0)").remove();
    getInputCoordinates();
}


// Init - register event handlers
$(document).ready(function () {

    $("#send-query-btn").click(function (e) {
        e.preventDefault();
        sendQuery()
    });

});
