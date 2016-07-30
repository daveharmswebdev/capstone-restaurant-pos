# Restaurant Delivery / Pickup Online Ordering System.

## MVP

This system enables a restaurant customer to order entrees for delivery and pickup.  It allows the kitchen staff to accept the order for preparation. It allows a delivery person to accept the order for delivery. The system is notified when an order is placed, prepared, accepted for delivery or pickup. It is also notified when the order is waiting, or enroute. And it is notified when order is picked up or delivered. Lastly, an end of the day report is created for restaurant order totaling orders and payments tendered for orders. Customers will login and enter delivery address and CC information. CC information will be encrypted. Restaurant owner will be able to enter an menu with his own admin screen. System will cross platform (webapp, iPad, iPhone)

## Tech

Angular, Karma, Firebase, SASS, Gulp, & Browserify.

For Karma, unit testing will be done on the Factories. As of now I can't really accomplish unit testing on the controllers. Having difficulty testing promises.

## Stretch Features

Login for employees. Admin rights for the restaurant owner. Ability to style menu, select a theme and add colors. Past menus will archived. Text messaging system for order status (being prepared, waiting/enroute, delivered/picked up). Customer will be able to delete account. History of cash outs. System logging.

# Installation

You will need to do a `npm install` to load all the dependencies. And you will also need to `gulp` to compile the SASS/CSS.
