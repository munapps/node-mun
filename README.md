MUN
===

A Node.js module for pulling data from various MUN web places.

Getting started
---------------

```bash
$ git clone git://github.com/whymarrh/node-mun.git
$ cd node-mun
$ git clone --depth=1 git://github.com/n1k0/casperjs.git
$ npm install
```

Getting data from places
------------------------

Let's pull the list of cancellations from the MUN website (available in [examples](examples/cancellations.js)):

```js
var MUN = require("..");

MUN.campus.cancellations()
.then(function (results) {
    console.log("The list of cancellations:");
    var cancellations = JSON.parse(results[0]);
    console.log(cancellations);
},
function (error) {
    console.error(error);
});
```

Look at scripts in the [examples folder](examples) for other services. The list of things you can currently access:

- Cancellations
- Your academic record
- Your final exams

### Note

This is very much a work in progress. If there are services or data that you'd like to be able to access this way, please please please please either comment on the [super services megalist issue](https://github.com/whymarrh/node-mun/issues/5) or open up a brand new issue. Together we can make programmatic access to all of MUN's services possible.

License
-------

This software is released under the BSD 3-Clause License. See [LICENSE.md](LICENSE.md) for more information.
