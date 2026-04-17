export interface LeadQualification {
  score: number
  tier: 'cold' | 'warm' | 'hot' | 'qualified'
  reasons: string[]
}

export interface LeadInput {
  email: string
  name: string
  company: string
  companySize?: string
  industry?: string
}

const COMPANY_SIZE_SCORES: Record<string, number> = {
  '1-10': 10,
  '11-50': 20,
  '51-200': 35,
  '201-500': 50,
  '501-1000': 65,
  '1000+': 80,
}

const INDUSTRY_SCORES: Record<string, number> = {
  'technology': 30,
  'finance': 25,
  'healthcare': 20,
  'retail': 15,
  'manufacturing': 15,
  'other': 10,
}

const EMAIL_DOMAIN_SCORES: Record<string, number> = {
  'gmail.com': 0,
  'yahoo.com': 0,
  'hotmail.com': 0,
  'outlook.com': 0,
  'protonmail.com': 0,
}

export function qualifyLead(input: LeadInput): LeadQualification {
  let score = 0
  const reasons: string[] = []

  // Email domain scoring (indicates personal vs business)
  const emailDomain = input.email.split('@')[1]?.toLowerCase() || ''
  const domainScore = EMAIL_DOMAIN_SCORES[emailDomain] ?? 10
  score += domainScore
  if (domainScore > 0) {
    reasons.push('Business email domain')
  }

  // Company size scoring
  if (input.companySize) {
    const sizeScore = COMPANY_SIZE_SCORES[input.companySize] ?? 0
    score += sizeScore
    if (sizeScore >= 35) {
      reasons.push(`Medium-large company (${input.companySize} employees)`)
    }
  }

  // Industry scoring
  if (input.industry) {
    const industryScore = INDUSTRY_SCORES[input.industry.toLowerCase()] ?? 0
    score += industryScore
    if (industryScore >= 20) {
      reasons.push(`High-value industry: ${input.industry}`)
    }
  }

  // Company name presence
  if (input.company && input.company.length > 2) {
    score += 10
    reasons.push('Company name provided')
  }

  // Determine tier
  let tier: LeadQualification['tier']
  if (score >= 80) {
    tier = 'qualified'
  } else if (score >= 50) {
    tier = 'hot'
  } else if (score >= 25) {
    tier = 'warm'
  } else {
    tier = 'cold'
  }

  return { score, tier, reasons }
}
