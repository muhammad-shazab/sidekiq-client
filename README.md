# @alienfast/sidekiq-client
[![CircleCI](https://circleci.com/gh/alienfast/sidekiq-client/tree/develop.svg?style=svg&circle-token=d8b714e79a3ed2e51c4ee2b7dd31b7b801e9e708)](https://circleci.com/gh/alienfast/sidekiq-client/tree/develop)
[![npm version](https://badge.fury.io/js/%40alienfast%2Fsidekiq-client.svg)](https://badge.fury.io/js/%40alienfast%2Fsidekiq-client)

A [Sidekiq](http://sidekiq.org/) client for node, intended to mimic the default behaviors of the Sidekiq client itself.

## Use case

A [Google Cloud Functions](https://cloud.google.com/functions/) microservice that processes and queues data back for persistence via a ruby Sidekiq job.

## Features

- flow type checked standard [Sidekiq job format](https://github.com/mperham/sidekiq/wiki/Job-Format)
- `enqueue`
- `your feature here`

## Installation

```shell
yarn add @alienfast/sidekiq-client redis
```

## Usage

```javascript
import SidekiqClient from '@alienfast/sidekiq-client'

// provide your own promisified redis client, or use the helper
const redisClient = SidekiqClient.redisCreateClient({ url: 'redis://foo:6379' })
const sidekiq = new SidekiqClient(redisClient);

// Enqueue a job to the 'default' queue with retry
sidekiq.enqueue({ 
  class: 'MyJob',
  args: ['foo']
})

// Enqueue a job to the 'critical' queue without retry
sidekiq.enqueue({ 
  class: 'MyJob',
  args: ['foo'],
  retry: false,
  queue: 'critical'  
})

// Schedule a job
sidekiq.enqueue({ 
  class: 'MyJob',
  args: ['foo']
}, new Date(2017, 10, 1))
```

## Reporting Bugs or Feature Requests

- Issues: please log issues in the issue tracker and submit a PR with a fix.
- Feature Requests: please log an issue with the outline of your proposal for discussion, followed by the PR.

## How you can help

- Add mocha test with assertions! 
- Add any feature you like (with tests)

## License

This is free software released under the MIT License. See LICENSE for details.
