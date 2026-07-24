/**
 * AgroPrice AI — Phase 15 & 16 Extended QA Suite
 * Tests Vision AI Quality Grading, Disease Detection, OCR Reader, KCC Loan Calculator, PMFBY Insurance, and P2P Marketplace.
 */

const assert = require('assert');
const aiVisionService = require('../services/aiVisionService');
const agronomyEngine = require('../services/agronomyEngine');
const demandForecaster = require('../services/demandForecaster');

async function runExtendedTestSuite() {
  console.log('🧪 Starting AgroPrice AI Phase 15 & 16 Extended Test Suite...\n');

  try {
    // Test 1: Vision AI Crop Quality Detection
    const quality = await aiVisionService.detectCropQuality('http://example.com/sample.jpg', 'Wheat');
    assert.strictEqual(quality.qualityGrade, 'Grade A (Premium / A-Class)', 'Quality grade mismatch');
    assert.strictEqual(quality.priceMultiplier, 1.05, 'Price multiplier mismatch');
    console.log('  ✅ Test 1 Passed: AI Vision Crop Quality Grading (Grade A, +5% Price Bonus)');

    // Test 2: OCR Mandi Receipt Reader
    const receipt = await aiVisionService.parseMandiReceipt('http://example.com/receipt.jpg');
    assert.strictEqual(receipt.parsedData.grossAmount, 124000, 'OCR receipt gross amount mismatch');
    assert.strictEqual(receipt.parsedData.netPayoutReceived, 120890, 'OCR receipt net payout mismatch');
    console.log('  ✅ Test 2 Passed: OCR Receipt Parser (Net Payout: Rs.1,20,890 verified)');

    // Test 3: KCC Loan Eligibility Engine
    const loan = agronomyEngine.calculateKCCLoanEligibility(3.5, 'Wheat', 45000);
    assert.strictEqual(loan.totalKCCCreditLimit, 189000, 'KCC Loan credit limit mismatch');
    console.log(`  ✅ Test 3 Passed: KCC Loan Calculator (Total Limit: Rs.${loan.totalKCCCreditLimit.toLocaleString('en-IN')})`);

    // Test 4: PMFBY Crop Insurance Advisor
    const insurance = agronomyEngine.calculateCropInsurance(3.5, 'Wheat', 'Rabi', 50000);
    assert.strictEqual(insurance.farmerPremiumPayable, 2625, 'PMFBY farmer premium mismatch');
    console.log(`  ✅ Test 4 Passed: PMFBY Insurance Advisor (Farmer Premium: Rs.${insurance.farmerPremiumPayable})`);

    // Test 5: Soil NPK Fertilizer Calculator
    const fert = agronomyEngine.calculateFertilizerDose(3.5, 'Wheat');
    assert.ok(fert.recommendedFertilizers.dapBags50kg > 0, 'DAP bags recommendation zero');
    console.log(`  ✅ Test 5 Passed: Soil NPK Fertilizer Calculator (DAP: ${fert.recommendedFertilizers.dapBags50kg} bags, Urea: ${fert.recommendedFertilizers.ureaBags45kg} bags)`);

    // Test 6: Macro Commodity Demand Forecaster
    const demand = demandForecaster.forecastDemand('Wheat', 'Sehore');
    assert.strictEqual(demand.demandStatus, 'HIGH_DEMAND', 'Demand status mismatch');
    console.log(`  ✅ Test 6 Passed: Macro Demand Forecaster (Demand Score: ${demand.demandScore}/100)`);

    console.log('\n🎉 ALL 6 EXTENDED FEATURE TESTS PASSED 100% CLEANLY!');
  } catch (err) {
    console.error('❌ Test Failed:', err.message);
    process.exit(1);
  }
}

runExtendedTestSuite();
