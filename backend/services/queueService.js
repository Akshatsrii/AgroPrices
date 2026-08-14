/**
 * AgroPrice AI — Background Queue Service (BullMQ)
 * Processes daily Mandi price sync jobs & automated price surge SMS notifications.
 */

class MockQueueService {
  constructor() {
    this.queueName = 'mandi-price-sync-queue';

  }

  async addPriceSyncJob(data) {
    console.log(`[BullMQ Queue] Job added to ${this.queueName}:`, data);
    return { jobId: `job_${Date.now()}`, status: 'QUEUED', data };
  }

  async addNotificationJob(userId, message) {
    console.log(`[BullMQ Queue] Notification Job added for user ${userId}:`, message);
    return { jobId: `notif_${Date.now()}`, status: 'QUEUED', userId, message };
  }
}

module.exports = new MockQueueService();
