# Wallet app
Application is available online under [http://128.199.61.161:1337](http://128.199.61.161:1337).

### Required
Following modules have to be installed globally: [npm](https://www.npmjs.com/), [bower](http://bower.io/) and [http-server](https://www.npmjs.com/package/http-server).

### Setup
Run `npm install & bower install` to install all dependencies.

### Run
Run `npm start` to start the HTTP server. Then navigate to [http://127.0.0.1:8080](http://127.0.0.1:8080).

### Tests
To run tests you must start karma server by calling `karma start` and then run test by calling `karma run`.

----

#### Summary
Simple wallet application which allows you to add and remove amounts to and from your wallet. Once an amount is entered into the wallet, it should be listed along with the date it was added. Once an amount is removed from the wallet it should be listed along with the date it was removed. There should then be a grand total displaying how much money is currently in the wallet. There will be a responsive header with three menu items: Home, Reset, View Source.

#### Specifications
1. User can choose the currency of the wallet. This should be displayed next to each item and the grand total.
2. For the currency symbol next the grand total you should use a [Font Awesome](http://fortawesome.github.io/Font-Awesome/) icon and for the items in the wallet it should be text.
3. The input(s) to add/remove amounts should have error checking and reporting.
4. The wallet data should persist on a page refresh for the same user until they click "Reset" in the menu. It is up to the developer to choose persistence method.
6. The menu should have menu items horizontally and collapse on mobile devices into a responsive menu. As an example of the layout and resize behaviour, view the font awesome website in your browser to view the menu collapse effect.
7. The wallet can never contain a negative amount.
8. The method of adding/removing values to a wallet can be via separate inputs or a single combined input with a select box for add/remove. There is no limit to the amount of values added or removed in the wallet.
