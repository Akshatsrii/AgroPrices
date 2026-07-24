/**
 * AgroPrice AI — Phase 5: Daily AGMARKNET Mandi Price Sync Job
 * Runs every day at 06:00 AM to fetch live prices from data.gov.in
 */

const agmarknetService = require('../services/agmarknetService');
const queueService = require('../services/queueService');

class DailySyncJob {
  async executeSync() {
    console.log('🔄 [DailySyncJob] Initiating AGMARKNET live Mandi price fetch...');
    try {
      const livePrices = await agmarknetService.fetchLivePrices('Madhya Pradesh', 'Sehore', 50);
      console.log(`✅ [DailySyncJob] Fetched ${livePrices.length} records from AGMARKNET.`);

      const savedDocs = await agmarknetService.storeHistoricalData(livePrices);
      console.log(`💾 [DailySyncJob] Successfully stored ${savedDocs.length} historical price records in MongoDB.`);

      await queueService.addPriceSyncJob({
        syncTimestamp: new Date(),
        recordsCount: livePrices.length,
        status: 'SUCCESS',
      });

      return { success: true, recordsProcessed: livePrices.length, storedCount: savedDocs.length };
    } catch (err) {
      console.error('❌ [DailySyncJob] Error executing daily sync:', err.message);
      return { success: false, error: err.message };
    }
  }
}

module.exports = new DailySyncJob();
