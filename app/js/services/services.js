hotelExplorerApp.service('apifactory',['$http', function ($http) {
    var baseURL = 'https://public-be.oski.io/hotel/v1.0/search';
    var serviceEndPoints = {
        INIT: '/init',
        STATUS: '/status',
        RESULTS: '/results'
    }
    var headers = {
        'oski-tenantId': 'Demo',
        'Content-Type': 'application/json'
    }
    var sessionId = {};
    var searchData = {};
    var hotels = [];

    this.setHotels = function(data){
        hotels = data;
    };

    this.getHotels = function(){
        return hotels;
    };
    
    this.apiRequest = function (data, url, success, failure) {
        var dataObj = {};
        if(url == 'INIT') {
           dataObj = {
                "currency": "USD",
                "posId": "hbg3h7rf28",
                "orderBy": "price asc, rating desc",
                "roomOccupancies": [
                   {
                      "occupants": [
                         {
                            "type": "Adult",
                            "age": 25
                         }
                      ]
                   }
                ],
                "stayPeriod": {
                   "start": data.from,
                   "end": data.to
                },
                "bounds": {
                   "circle": {
                      "center": {
                         "lat": data.location.lat,
                         "long": data.location.lng
                    },
                    "radiusKm": 50.5
                   }
                }
             };
        } else if (url == 'STATUS') {
            dataObj = data;
        } else if (url == 'RESULTS') {
            dataObj = {
                "sessionId": data.sessionId,
                "paging": {
                   "pageNo": 1,
                   "pageSize": 1,
                   "orderBy": "price asc, rating desc"
                },
                "optionalDataPrefs": [
                   "All"
                ],
                "currency": "USD",
                "contentPrefs": [
                   "Basic",
                   "Activities",
                   "Amenities",
                   "Policies",
                   "AreaAttractions",
                   "Descriptions",
                   "Images",
                   "CheckinCheckoutPolicy",
                   "All"
                ],
                "filters": {
                   "minHotelPrice": 1,
                   "maxHotelPrice": 10000,
                   "minHotelRating": 1,
                   "maxHotelRating": 5,
                   "hotelChains": [
                      "Novotel",
                      "Marriott",
                      "Hilton",
                      "Accor"
                   ],
                   "allowedCountry": "FR"
                }
             };
        }
        $http({
            method: 'POST',
            url: baseURL+serviceEndPoints[url],
            data: dataObj,
            headers: headers
        }).then(function (resp) {
            success(resp);
        }).catch(function (err) {
            failure(err);
        });
    };

    this.setSessionId = function (id) {
        sessionId = id;
    };

    this.getSessionId = function () {
        return sessionId;
    };

    this.setSearchData = function (data) {
        searchData = data;
    };
    this.getSearchData = function () {
        return searchData;
    }

    // returns first three letters of the month name by taking month count from controller
    this.getMonthName = function (monthCount) {
        if(monthCount < 10) {
            monthCount = 0+monthCount;
        }
        var monthName = '';
        switch(monthCount) {
            case 01:
                monthName = 'Jan';
                break;
            case 02:
                monthName = 'Feb';
                break;
            case 03:
                monthName = 'Mar';
                break;
            case 04:
                monthName = 'Apr';
                break;
            case 05:
                monthName = 'May';
                break;
            case 06:
                monthName = 'Jun';
                break;
            case 07:
                monthName = 'Jul';
                break;
            case 08:
                monthName = 'Aug';
                break;
            case 09:
                monthName = 'Sep';
                break;
            case 10:
                monthName = 'Oct';
                break;
            case 11:
                monthName = 'Nov';
                break;
            case 12:
                monthName = 'Dec';
        }
        return monthName;
    };


    // returns date appended with suffix like 'st', 'nd', 'rd', 'th'
    this.appendDateSuffix = function (date) {
        if(date != 11) {
            var modulo = date % 10;
        }
        var suffixed = '';
        switch (modulo) {
            case 1:
                suffixed = date+'st';
                break;
            case 2:
                suffixed = date+'nd';
                break;
            case 3:
                suffixed = date+'rd';
                break;
            default:
                suffixed = date+'th'
        }

        if(date == 11) {
            suffixed = date+'th';
        }
        return suffixed;
    };
}]);