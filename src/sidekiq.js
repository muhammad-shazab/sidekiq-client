import Promise from 'bluebird';
import crypto from 'crypto';

const ONE_THOUSAND = 1000;
const BYTE_COUNT = 12;

export default class Sidekiq {
  constructor(redis = null, namespace = null) {
    this.redis = redis;
    this.namespace = namespace;

    if (!this.redis) {
      throw new ReferenceError('Expected non-null "redis" connection object');
    }
  }

  generateJobId() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(BYTE_COUNT, (err, buf) => {
        if (err) {
          reject(err);
        }
        resolve(buf.toString('hex'));
      });
    });
  }

  getQueueName(queueName) {
    return queueName || 'default';
  }

  namespaceKey(key) {
    return this.namespace ? `${this.namespace}:${key}` : key;
  }

  getQueueKey(queueName) {
    return this.namespaceKey(`queue:${this.getQueueName(queueName)}`);
  }

  enqueue(workerClass, args, payload = {}) {
    return this.generateJobId().then((jobId) => {
      payload.class = workerClass;
      payload.args = args;
      payload.jid = jobId;

      if (payload.at instanceof Date) {

        // Push job payload to schedule
        payload.at = payload.at.getTime() / ONE_THOUSAND;
        return this.redis.zaddAsync(this.namespaceKey('schedule'), payload.at, JSON.stringify(payload));
      }

      // Need to add enqueued_at dat to payload
      payload.enqueued_at = new Date().getTime() / ONE_THOUSAND;
      return this.redis.lpushAsync(this.getQueueKey(payload.queue), JSON.stringify(payload))
        .catch((err) => {
          if (err) {
            throw err;
          }

          // Otherwise create queue if it doesn't already exist
          return this.redis.saddAsync(this.namespaceKey('queues'), this.getQueueName(payload.queue));
        });

    });
  }

}
