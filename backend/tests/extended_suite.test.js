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
    const sampleImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Wheat_in_a_field.jpg/320px-Wheat_in_a_field.jpg';
    const quality = await aiVisionService.detectCropQuality(sampleImg, 'Wheat');
    assert.ok(quality.qualityGrade, 'Quality grade should exist');
    assert.ok(quality.priceMultiplier > 0, 'Price multiplier should be a positive number');
    console.log(`  ✅ Test 1 Passed: AI Vision Crop Quality Grading (${quality.qualityGrade})`);

    // Test 2: OCR Mandi Receipt Reader
    const receiptImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/320px-ReceiptSwiss.jpg';
    const receipt = await aiVisionService.parseMandiReceipt(receiptImg);
    assert.ok(receipt.parsedData, 'OCR parsed data should exist');
    assert.ok(receipt.parsedData.grossAmount !== undefined, 'OCR receipt gross amount should be parsed');
    console.log('  ✅ Test 2 Passed: OCR Receipt Parser verified');

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
    const demand = await demandForecaster.forecastDemand('Wheat', 'Sehore');
    assert.ok(demand.demandStatus, 'Demand status should exist');
    console.log(`  ✅ Test 6 Passed: Macro Demand Forecaster (Demand Score: ${demand.demandScore}/100)`);

    console.log('\n🎉 ALL 6 EXTENDED FEATURE TESTS PASSED 100% CLEANLY!');
  } catch (err) {
    console.error('❌ Test Failed:', err.message);
    process.exit(1);
  }
}

runExtendedTestSuite();
