var messageWallApp = angular.module('messageWallApp', []);

messageWallApp.value('$', $);

messageWallApp.service('signalRSvc', function ($, $rootScope) {
    var proxy = null;

    var initialize = function () {
        var connection = $.hubConnection("http://localhost:63893/");

        this.proxy = connection.createHubProxy('messageWallHub');

        this.proxy.on('broadcastMessage', function (name, message) {
            $rootScope.$emit("receivedMessage", name, message);
        });

        connection.start().done(function () {
            console.log("Connection established. Connect id: " + connection.id);
        }).fail(function (e) {
            console.log("Connection Failed. Error: ");
            console.log(e);
        });
    };

    var sendRequest = function (name, message) {
        this.proxy.invoke('send', name, message);
    };

    return {
        initialize: initialize,
        sendRequest: sendRequest
    };
});


messageWallApp.controller('messageWallController', [ '$scope', '$rootScope', 'signalRSvc', function ($scope, $rootScope, signalRSvc) {
    $scope.messages = [];
    $scope.messages.push({
        name: 'Carlo Vanhoutte',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini.'
    });
    $scope.messages.push({
        name: 'Matthias Verhelst',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini.'
    });
    $scope.messages.push({
        name: 'Sam Ghysels',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini.'
    });
    $scope.messages.push({
        name: 'Bram Dufour',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini.'
    });

    $scope.displayMessage = function (name, message) {
        $scope.messages.push({
            name: name,
            message: message
        });
        if ($scope.messages.length > 5) {
            $scope.messages.shift();
        }
    };

    $rootScope.$on('receivedMessage', function (e, name, message) {
        $scope.$apply(function () {
            $scope.displayMessage(name, message);
        });
    });

    //signalRSvc.initialize();
}]);