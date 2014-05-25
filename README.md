MUN
===

A node.js module for pulling data from various MUN web places.

**Not affiliated with Memorial Univeristy of Newfoundland.**

Downloading
-----------

[CasperJS] is a submodule of this repository, so you will need to clone recursively to avoid the Git submodule dance:

```bash
$ git clone --recursive git://github.com/whymarrh/node-mun.git MUN
$ cd MUN/
$ npm install
```

Getting things done
-------------------

Let's pull the list of cancellations from the MUN website (available as [examples/cancellations.js](examples/cancellations.js)):

```js
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

This is very much a work in progress. Take a look at the [list of services] for a complete picture of what you can and can't access. There is a lot planned, so pull requests are always welcome.

License
-------

This software is released under the BSD 3-Clause License. See [LICENSE.md](LICENSE.md) for more information.

  [CasperJS]:http://casperjs.org/
  [super services megalist issue]:https://github.com/whymarrh/node-mun/issues/5
