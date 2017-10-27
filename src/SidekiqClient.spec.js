// @flow

import SidekiqClient from './SidekiqClient'
// import {assert} from 'chai'
// FIXME: how about some assertions eh?

describe('SidekiqClient', () => {
// provide your own promisified redis client, or use the helper
  const redisClient = SidekiqClient.redisCreateClient({ url: 'redis://localhost:6379/5' })
  const sidekiq = new SidekiqClient(redisClient)

  describe('enqueue', () => {
    it('simple job', () => {
      sidekiq.enqueue({
        class: 'MyJob',
        args: ['foo']
      })
    })

    it('different queue', () => {
      sidekiq.enqueue({
        class: 'MyJob',
        args: ['foo'],
        retry: false,
        queue: 'critical'
      })
    })

    it('scheduled job', () => {
      sidekiq.enqueue({
        class: 'MyJob',
        args: ['foo']
      }, new Date(new Date().getTime() + 5 * 60000)) // 5 minutes from now
    })
  })
})
