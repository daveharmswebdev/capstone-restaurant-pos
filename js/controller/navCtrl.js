'use strict';

module.exports = function($scope) {
	$scope.navItems=[
		{
      name: "Login/Logout",
      url: "#/login"
    },
		{
      name: "Order",
      url: "#/order"
    },
		{
      name: "Account",
      url: "#/account"
    },
		{
			name: "Profile",
      url: "#/profile"
		},
		{
			name: "End of Day",
			url: "#/endOfDay"
		}
	];
};
