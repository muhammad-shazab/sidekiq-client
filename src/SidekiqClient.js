// @flow

import generateJobId from './generateJobId'

/**
 *
 *    {
 *      "class": "SomeWorker",
 *      "jid": "b4a577edbccf1d805744efa9", // 12-byte random number as 24 char hex string
 *      "args": [1, "arg", true],
 *      "created_at": 1234567890,
 *      "enqueued_at": 1234567890
 *    }
 */
export type Args = Array<string | number | boolean>

export type JobRequest = {
  class: string,
  args: Args,
  queue?: string,
}

export type Job = {
  ...$Exact<JobRequest>,
  queue: string,
  at?: number,
  jid: string, // 12-byte random number as 24 char hex string
  created_at: number,
  enqueued_at: number,
}

type RedisClient = {
  zaddAsync: (key: string, run_at: number, job: $Supertype<Job>) => Promise<any>,
  lpushAsync: (key: string, job: $Supertype<Job>) => Promise<any>,
  saddAsync: (key: string, job: $Supertype<Job>) => Promise<any>,
}

class SidkiqClient {
  redisClient: Object

  constructor (redisClient: RedisClient) {
    this.redisClient = redisClient

    if (!this.redisClient) {
      throw new ReferenceError('Expected non-null "redisClient" connection object')
    }
  }

  async enqueue (jobRequest: JobRequest, at?: ?Date = null) {
    const jobId = await generateJobId() // FIXME get this from redis client? client.randomkeyAsync()
    const now = new Date().getTime() / 1000

    const job: Job = {
      jid: jobId,
      created_at: now,
      enqueued_at: now,
      ...jobRequest
    }

    if (!job.queue) {
      job.queue = 'default'
    }

    // see https://github.com/mperham/sidekiq/blob/master/lib/sidekiq/client.rb#L191
    if (at) {
      // Push job scheduled to run at specific time
      job.at = at.getTime() / 1000
      // conn.zadd('schedule', payloads)
      return this.redisClient.zaddAsync('schedule', job.at, JSON.stringify(job))
    } else {
      // conn.sadd('queues', q)
      const queueAdd = await this.redisClient.saddAsync('queues', job.queue) // eslint-disable-line no-unused-vars
      // conn.lpush("queue:#{q}", to_push)
      const enqueueResponse = await this.redisClient.lpushAsync(`queue:${job.queue}`, JSON.stringify(job))
      return enqueueResponse
    }
  }
}

export default SidkiqClient
