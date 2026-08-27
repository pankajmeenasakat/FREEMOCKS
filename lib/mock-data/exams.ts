export interface ExamCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  testCount: number;
}

export interface ExamItem {
  id: string;
  name: string;
  category: string;
  slug: string;
  testsCount: number;
  freeTestsCount: number;
  userCount: string;
  iconBg: string;
  iconText: string;
  isPopular?: boolean;
}

export interface TestSeriesItem {
  id: string;
  title: string;
  examName: string;
  category: string;
  totalTests: number;
  freeTests: number;
  userCount: string;
  languages: string[];
  features: string[];
  progressPercent?: number;
  completedTests?: number;
  badge?: string;
  logo: string;
}

export interface SectionalTestItem {
  id: string;
  title: string;
  section: string;
  questionsCount: number;
  durationMins: number;
  totalMarks: number;
  isAttempted?: boolean;
  score?: number;
  accuracy?: number;
  correctCount?: number;
  wrongCount?: number;
  skippedCount?: number;
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  { id: "ssc", name: "SSC Exams", slug: "ssc", testCount: 2400 },
  { id: "banking", name: "Banking Exams", slug: "banking", testCount: 1850 },
  { id: "railways", name: "Railways Exams", slug: "railways", testCount: 2100 },
  { id: "teaching", name: "Teaching Exams", slug: "teaching", testCount: 1375 },
  { id: "civil", name: "Civil Services Exam", slug: "civil-services", testCount: 950 },
  { id: "engineering", name: "Engineering Recruitment", slug: "engineering", testCount: 650 },
  { id: "defence", name: "Defence & Police", slug: "defence", testCount: 820 },
];

export const POPULAR_EXAMS: ExamItem[] = [
  { id: "ssc-cgl", name: "SSC CGL", category: "SSC Exams", slug: "ssc-cgl", testsCount: 2348, freeTestsCount: 68, userCount: "2049.0k", iconBg: "bg-amber-100 text-amber-800", iconText: "SSC", isPopular: true },
  { id: "ssc-chsl", name: "SSC CHSL", category: "SSC Exams", slug: "ssc-chsl", testsCount: 1650, freeTestsCount: 42, userCount: "1420.0k", iconBg: "bg-blue-100 text-blue-800", iconText: "SSC", isPopular: true },
  { id: "ssc-gd", name: "SSC GD Constable", category: "SSC Exams", slug: "ssc-gd", testsCount: 1890, freeTestsCount: 55, userCount: "1890.0k", iconBg: "bg-red-100 text-red-800", iconText: "SSC", isPopular: true },
  { id: "ssc-mts", name: "SSC MTS", category: "SSC Exams", slug: "ssc-mts", testsCount: 1200, freeTestsCount: 30, userCount: "950.0k", iconBg: "bg-emerald-100 text-emerald-800", iconText: "SSC" },
  { id: "ssc-selection-post", name: "SSC Selection Post", category: "SSC Exams", slug: "ssc-selection-post", testsCount: 820, freeTestsCount: 24, userCount: "680.0k", iconBg: "bg-purple-100 text-purple-800", iconText: "SSC" },
  { id: "ssc-cpo", name: "SSC CPO", category: "SSC Exams", slug: "ssc-cpo", testsCount: 940, freeTestsCount: 35, userCount: "820.0k", iconBg: "bg-indigo-100 text-indigo-800", iconText: "SSC" },
  { id: "ssc-stenographer", name: "SSC Stenographer", category: "SSC Exams", slug: "ssc-steno", testsCount: 650, freeTestsCount: 20, userCount: "430.0k", iconBg: "bg-orange-100 text-orange-800", iconText: "SSC" },
  { id: "delhi-police", name: "Delhi Police Constable", category: "SSC Exams", slug: "delhi-police", testsCount: 1120, freeTestsCount: 38, userCount: "1150.0k", iconBg: "bg-cyan-100 text-cyan-800", iconText: "DP" },
  { id: "ssc-je-ce", name: "SSC JE CE", category: "SSC Exams", slug: "ssc-je-ce", testsCount: 780, freeTestsCount: 25, userCount: "390.0k", iconBg: "bg-rose-100 text-rose-800", iconText: "JE" },
];

export const POPULAR_TEST_SERIES: TestSeriesItem[] = [
  {
    id: "ssc-cgl-2026",
    title: "SSC CGL Mock Test Series 2026 (Tier I & Tier II)",
    examName: "SSC CGL",
    category: "SSC",
    totalTests: 2348,
    freeTests: 68,
    userCount: "2049.0k Users",
    languages: ["English", "Hindi"],
    features: [
      "5 Live Tests (All India Ranking)",
      "22 फटाफट Tricky Quant Solutions",
      "139 Eduquity PYQ Live Tests",
      "+2182 Subject & Chapter Tests"
    ],
    progressPercent: 0,
    completedTests: 4,
    logo: "🏛️",
  },
  {
    id: "upsssc-pet-2026",
    title: "UPSSSC PET Mock Test Series 2026 (New Pattern)",
    examName: "UPSSSC PET",
    category: "State Exams",
    totalTests: 273,
    freeTests: 3,
    userCount: "110.2k Users",
    languages: ["English", "Hindi"],
    features: [
      "1 Live All-India Test",
      "79 Chapter-Wise Tests",
      "86 GA/GK Mahapack",
      "+107 Full Syllabus Mock Tests"
    ],
    logo: "🏛️",
  },
  {
    id: "current-affairs-2026",
    title: "Current Affairs (CA) 2026 Mega Pack for All Exams",
    examName: "Current Affairs",
    category: "General",
    totalTests: 493,
    freeTests: 66,
    userCount: "1253.4k Users",
    languages: ["English", "Hindi", "+ 8 More"],
    features: [
      "17 Half-Yearly Revision: Jan to June",
      "17 Quarterly Revision: Jan-Feb-Mar",
      "17 Special Topic Tests",
      "+442 Monthly & Daily Speed Quizzes"
    ],
    logo: "📰",
  },
  {
    id: "rrb-group-d-2026",
    title: "RRB Group D Mock Test Series 2025-26 (New)",
    examName: "RRB Group D",
    category: "Railways",
    totalTests: 2102,
    freeTests: 50,
    userCount: "1473.6k Users",
    languages: ["English", "Hindi", "+ 8 More"],
    features: [
      "11 Live Tests (Bilingual)",
      "30 Exam Day Special Mock Tests",
      "1 Official Mock Test",
      "+2060 Sectional & Chapter Tests"
    ],
    logo: "🚆",
  },
  {
    id: "ctet-paper-1-2",
    title: "CTET (Paper I & II) Mock Test Series September 2026",
    examName: "CTET",
    category: "Teaching",
    totalTests: 1375,
    freeTests: 10,
    userCount: "219.1k Users",
    languages: ["English", "Hindi"],
    features: [
      "5 Live Benchmark Tests",
      "325 🔥 25-Day Score Booster Plan",
      "35 Full Length Mocks"
    ],
    logo: "🎓",
  },
  {
    id: "rrb-technician-grade-3",
    title: "RRB Technician Grade III Mock Test Series 2026",
    examName: "RRB Technician",
    category: "Railways",
    totalTests: 616,
    freeTests: 3,
    userCount: "123.4k Users",
    languages: ["English", "Hindi", "+ 7 More"],
    features: [
      "1 Live Diagnostic Test",
      "170 Chapter Tests",
      "20 Subject Tests",
      "+425 Sectional Quizzes"
    ],
    logo: "🚆",
  },
];

export const SECTIONAL_TESTS: SectionalTestItem[] = [
  {
    id: "qa-01",
    title: "Quantitative Aptitude 01",
    section: "Quantitative Aptitude",
    questionsCount: 25,
    durationMins: 15,
    totalMarks: 25,
    isAttempted: false,
  },
  {
    id: "gi-01",
    title: "General Intelligence 01",
    section: "General Intelligence",
    questionsCount: 25,
    durationMins: 15,
    totalMarks: 25,
    isAttempted: true,
    score: 13.50,
    accuracy: 71,
    correctCount: 15,
    wrongCount: 6,
    skippedCount: 4,
  },
  {
    id: "ec-01",
    title: "English Comprehension 01",
    section: "English Comprehension",
    questionsCount: 25,
    durationMins: 15,
    totalMarks: 25,
    isAttempted: false,
  },
  {
    id: "ga-01",
    title: "General Awareness 01",
    section: "General Awareness",
    questionsCount: 25,
    durationMins: 10,
    totalMarks: 25,
    isAttempted: false,
  },
];
