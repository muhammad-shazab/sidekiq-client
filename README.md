Add Jobs to Sidekiq from Node.js
================================

Enqueue jobs to sidekiq from your node apps. Closely mirrors the official
ruby sidekiq interface and supports job scheduling.


Installation
------------

```shell
npm install @actionsprout/node-sidekiq --save
```


Usage
-----

```javascript
// Require the module
import Sidekiq from 'sidekiq';

// Construct a sidekiq object with your redis connection and optional namespace
sidekiq = new Sidekiq(redisCon, process.env.NODE_ENV);

// Add a job to sidekiq
sidekiq.enqueue("WorkerClass", ["argument", "array"], {
    retry: false,
    queue: "critical"
});

// Schedule a job in sidekiq
sidekiq.enqueue("WorkerClass", ["some", "args"], {
    at: new Date(2013, 11, 1)
});
```


How to Build
------------

```shell
# Install development dependencies
npm install

# Use grunt to generate the js version (lib/index.js)
grunt
```


Reporting Bugs or Feature Requests
----------------------------------

Please report any bugs or feature requests on the github issues page for this
project here:

<https://github.com/loopj/node-sidekiq/issues>


Contributing
------------

-   [Fork](https://help.github.com/articles/fork-a-repo) the [notifier on github](https://github.com/loopj/node-sidekiq)
-   Edit only the files in `src`, lib files are autogenerated
-   Commit and push until you are happy with your contribution
-   [Make a pull request](https://help.github.com/articles/using-pull-requests)
-   Thanks!


License
-------

This is free software released under the MIT License.
See [LICENSE.txt](https://github.com/loopj/node-sidekiq/blob/master/LICENSE.txt) for details.
