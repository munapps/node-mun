MUN
===

A Node.js module for pulling data from various MUN web places.

Getting started
---------------

```bash
$ git clone git://github.com/whymarrh/node-mun.git
$ cd node-mun
$ git clone git://github.com/n1k0/casperjs.git
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

License
-------

This software is released under the BSD 3-Clause License. See [LICENSE.md](LICENSE.md) for more information.
