# @alienfast/sidekiq-client

A [Sidekiq](http://sidekiq.org/) client for node. 

# Use case

A [Google Cloud Functions](https://cloud.google.com/functions/) microservice that processes and queues data back for persistence via a ruby Sidekiq job.

# Features

- flow type checked standard [Sidekiq job format](https://github.com/mperham/sidekiq/wiki/Job-Format)
- `enqueue`
- `your feature here`

## Installation

```shell
yarn add @alienfast/sidekiq-client redis
```

## Usage

```javascript
import Redis from 'redis'
import SidekiqClient from '@alienfast/sidekiq-client'


const sidekiq = new SidekiqClient(Redis.createClient({ url: 'redis://foo:6379' }));

// Enqueue a job
sidekiq.enqueue("WorkerClass", ["argument", "array"], {
  retry: false,
  queue: "critical"
})

// Schedule a job
sidekiq.enqueue("WorkerClass", ["some", "args"], {
  at: new Date(2017, 10, 1)
})
```

# Reporting Bugs or Feature Requests

- Issues: please log issues in the issue tracker and submit a PR with a fix.
- Feature Requests: if you are willing to PR, please log an issue with the outline of your proposal for discussion, followed by the PR.

# How you can help

- Add mocha test with assertions! 
- Add any feature you like

# License

This is free software released under the MIT License. See LICENSE for details.
