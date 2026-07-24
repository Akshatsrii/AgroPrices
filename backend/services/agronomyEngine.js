/**
 * AgroPrice AI — Phase 15: Agronomy Engine
 * Implements KCC Loan Eligibility, PMFBY Insurance Advisor, NPK Fertilizer Calculator, & Crop Planning.
 */

class AgronomyEngine {
  /**
   * 1. KISAN CREDIT CARD (KCC) LOAN ELIGIBILITY CALCULATOR
   */
  calculateKCCLoanEligibility(landSizeAcres = 3.5, primaryCrop = 'Wheat', scaleOfFinancePerAcre = 45000) {
    const acres = Number(landSizeAcres) || 3.5;
    const baseLimit = acres * scaleOfFinancePerAcre;
    const postHarvestStorageBuffer = baseLimit * 0.10;
    const consumptionBuffer = baseLimit * 0.10;
    const totalCreditLimit = Math.round(baseLimit + postHarvestStorageBuffer + consumptionBuffer);

    return {
      service: 'Kisan Credit Card (KCC) Loan Engine',
      landSizeAcres: acres,
      primaryCrop,
      scaleOfFinancePerAcre,
      baseCropLoanLimit: Math.round(baseLimit),
      postHarvestBuffer: Math.round(postHarvestStorageBuffer),
      totalKCCCreditLimit: totalCreditLimit,
      subsidizedInterestRate: '4.0% per annum (With 3% prompt repayment incentive)',
      requiredDocuments: [
        'Aadhaar Card & PAN Card',
        'Land Ownership Record (Khatauni / Khasra Copy)',
        'Bank Account Passbook Copy',
        'Passport Size Photograph',
      ],
    };
  }

  /**
   * 2. PM FASAL BIMA YOJANA (PMFBY) CROP INSURANCE ADVISOR
   */
  calculateCropInsurance(landSizeAcres = 3.5, cropName = 'Wheat', season = 'Rabi', sumInsuredPerAcre = 50000) {
    const acres = Number(landSizeAcres) || 3.5;
    const totalSumInsured = acres * sumInsuredPerAcre;
    
    // Farmer Premium: 1.5% for Rabi crops, 2.0% for Kharif crops
    const premiumRate = season === 'Kharif' ? 0.02 : 0.015;
    const farmerPremiumPayable = Math.round(totalSumInsured * premiumRate);
    const govtSubsidyShare = Math.round(totalSumInsured * 0.10); // Govt bears remaining premium

    return {
      service: 'PM Fasal Bima Yojana (PMFBY) Insurance Advisor',
      cropName,
      season,
      landSizeAcres: acres,
      totalSumInsured: Math.round(totalSumInsured),
      farmerPremiumRatePct: premiumRate * 100,
      farmerPremiumPayable,
      govtSubsidyShare,
      coverageProtection: [
        'Prevented Sowing / Planting Risk',
        'Mid-Season Adversity (Flood, Drought, Dry Spells)',
        'Post-Harvest Loss due to unseasonal rainfall (up to 14 days after harvest)',
        'Localized Calamities (Hailstorm, Landslide, Cloudburst)',
      ],
    };
  }

  /**
   * 3. SOIL NPK FERTILIZER RECOMMENDATION CALCULATOR
   */
  calculateFertilizerDose(landSizeAcres = 3.5, cropName = 'Wheat', targetYieldQuintalsPerAcre = 20) {
    const acres = Number(landSizeAcres) || 3.5;
    
    // Standard NPK requirement per acre for Wheat (in kg)
    const nitrogenKgPerAcre = 48; // N
    const phosphorusKgPerAcre = 24; // P2O5
    const potassiumKgPerAcre = 16; // K2O

    // Bag conversions (Urea 45kg bag = 20.7kg N, DAP 50kg bag = 23kg P2O5 + 9kg N, MOP 50kg bag = 30kg K2O)
    const dapBags = Math.round((phosphorusKgPerAcre * acres / 23) * 10) / 10;
    const remainingN = (nitrogenKgPerAcre * acres) - (dapBags * 9);
    const ureaBags = Math.round((remainingN / 20.7) * 10) / 10;
    const mopBags = Math.round((potassiumKgPerAcre * acres / 30) * 10) / 10;

    return {
      service: 'Soil NPK Fertilizer Calculator',
      cropName,
      landSizeAcres: acres,
      recommendedFertilizers: {
        dapBags50kg: dapBags,
        ureaBags45kg: ureaBags,
        mopBags50kg: mopBags,
        zincSulfateKg: Math.round(10 * acres),
      },
      applicationSchedule: [
        'At Basal (Sowing): Full DAP + Full MOP + 1/3rd Urea',
        'First Irrigation (21 Days - Crown Root Initiation): 1/3rd Urea',
        'Second Irrigation (45 Days - Jointing Stage): Final 1/3rd Urea',
      ],
    };
  }

  /**
   * 4. MULTI-SEASON CROP PLANNING ENGINE
   */
  generateCropPlan(landSizeAcres = 3.5, district = 'Sehore', soilType = 'Black Soil') {
    const acres = Number(landSizeAcres) || 3.5;

    return {
      service: 'Multi-Season Crop Rotation & Profit Optimizer',
      district,
      soilType,
      landSizeAcres: acres,
      annualPlan: [
        { season: 'Kharif (Jun - Oct)', recommendedCrop: 'Soybean', estimatedCostPerAcre: 14000, expectedYieldQuintalsPerAcre: 8, expectedRevenue: acres * 8 * 4600, estimatedNetProfit: (acres * 8 * 4600) - (acres * 14000) },
        { season: 'Rabi (Nov - Apr)', recommendedCrop: 'Wheat (Sharbati)', estimatedCostPerAcre: 16000, expectedYieldQuintalsPerAcre: 20, expectedRevenue: acres * 20 * 2480, estimatedNetProfit: (acres * 20 * 2480) - (acres * 16000) },
        { season: 'Zaid (May - Jun)', recommendedCrop: 'Moong (Green Gram)', estimatedCostPerAcre: 6000, expectedYieldQuintalsPerAcre: 4, expectedRevenue: acres * 4 * 7200, estimatedNetProfit: (acres * 4 * 7200) - (acres * 6000) },
      ],
      totalAnnualNetProfit: Math.round(acres * (8 * 4600 + 20 * 2480 + 4 * 7200 - 36000)),
      soilHealthAdvice: 'Rotating Soybean (Legume) with Wheat fixes atmospheric nitrogen into soil, saving Rs.3,500/acre in fertilizer costs for Rabi season.',
    };
  }
}

module.exports = new AgronomyEngine();
