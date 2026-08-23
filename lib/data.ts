export interface Expert {
  id: string;
  catalogId: string;
  name: string;
  role: string;
  yearsExperience: number;
  avatar: string;
  skills: string[];
  memoriesCount: number;
  bio: string;
  timeline: TimelineEvent[];
  location: string;
  coordinates: string;
  recordedDate: string;
  photoUrl?: string;
}

export interface TimelineEvent {
  year: number;
  event: string;
  detail?: string;
  archiveRef?: string;
}

export interface ProcedureStep {
  step: number;
  instruction: string;
  note?: string;
}

export interface Memory {
  id: string;
  catalogId: string;
  title: string;
  expertId: string;
  expertName: string;
  expertRole: string;
  expertExperience: number;
  category: string;
  duration: string;
  tags: string[];
  summary: string;
  procedure?: ProcedureStep[];
  expertTips?: string[];
  commonMistakes?: string[];
  tools?: string[];
  story?: string;
  transcript?: string;
  recordingTimestamp?: string;
  createdAt: string;
  featured?: boolean;
}

export interface KnowledgeAtRisk {
  id: string;
  catalogId: string;
  title: string;
  practitionersLeft: number;
  category: string;
  region: string;
  urgency: 'critical' | 'high' | 'medium';
  description: string;
}

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  sourceExpert: string;
  sourceRole: string;
  sourceExperience: number;
  recordingTimestamp: string;
  memoryId: string;
  memoryTitle: string;
  catalogId: string;
}

export const EXPERTS: Expert[] = [
  {
    id: 'ramesh-kumar',
    catalogId: 'EXPRT-1989-0047',
    name: 'Ramesh Kumar',
    role: 'Master Mechanic',
    yearsExperience: 35,
    avatar: '👨‍🔧',
    skills: ['Engine Diagnostics', 'Diesel Systems', 'Cooling Systems', 'Preventive Maintenance', 'Brake Systems'],
    memoriesCount: 47,
    bio: 'Over 35 years diagnosing heavy industrial machinery and diesel engines. Known across Mumbai workshops for detecting internal engine wear purely by listening to acoustic signatures.',
    location: 'Mumbai, Maharashtra',
    coordinates: '18.9220° N, 72.8347° E',
    recordedDate: '18 August 2026',
    timeline: [
      { year: 1989, event: 'Apprenticeship at Central Auto Workshop', detail: 'Learned manual lathe operations and engine overhauls under Master Joshi.', archiveRef: 'FIELD-NOTE #01' },
      { year: 1995, event: 'Senior Mechanic at Regional Transport Fleet', detail: 'Handled complex diesel generator maintenance across regional industrial plants.', archiveRef: 'FLEET-LOG #14' },
      { year: 2000, event: 'Opened Kumar Precision Motors', detail: 'Established independent repair facility specializing in commercial heavy transport.', archiveRef: 'REGISTRY #88' },
      { year: 2008, event: 'Specialization in Electronic-Diesel Hybrid Systems', detail: 'Authored internal diagnostic checklists adopted by 12 regional workshops.', archiveRef: 'MANUAL #04' },
      { year: 2018, event: 'Master Training Program', detail: 'Mentored 14 young technicians in mechanical acoustics and troubleshooting.', archiveRef: 'MENTOR-LOG #09' },
      { year: 2026, event: 'Knowledge Preserved with MemoryMap Archive', detail: 'Archived 47 core diagnostic procedures and acoustic troubleshooting accounts.', archiveRef: 'CATALOG #0047' }
    ]
  },
  {
    id: 'meera-pillai',
    catalogId: 'EXPRT-1984-0023',
    name: 'Meera Pillai',
    role: 'Master Artisan Weaver',
    yearsExperience: 40,
    avatar: '👩‍🌾',
    skills: ['Handloom Weaving', 'Natural Dyeing', 'Pattern Design', 'Thread Tension Tuning', 'Jacquard Looming'],
    memoriesCount: 23,
    bio: 'Preserving four decades of traditional silk and cotton handloom weaving techniques passed down through oral tradition in Kerala.',
    location: 'Balaramapuram, Kerala',
    coordinates: '8.4312° N, 77.0398° E',
    recordedDate: '12 August 2026',
    timeline: [
      { year: 1984, event: 'Learned handloom weaving from family elders', detail: 'Began with basic cotton warp preparation and wooden ratchet setting.' },
      { year: 1996, event: 'Revived natural indigo and madder root dyeing', detail: 'Created eco-friendly color formulation processes.' },
      { year: 2012, event: 'National Artisan Heritage Recognition', detail: 'Honored for preserving intricate Kasavu gold-border weaves.' },
      { year: 2026, event: 'Preserved loom calibration on MemoryMap', detail: 'Recorded tactile thread tension and warp alignment procedures.' }
    ]
  },
  {
    id: 'david-chen',
    catalogId: 'EXPRT-1992-0031',
    name: 'David Chen',
    role: 'Veteran Physics Teacher',
    yearsExperience: 32,
    avatar: '👨‍🏫',
    skills: ['Learning Assessment', 'Classroom Management', 'Intuitive Physics Experiments', 'Student Engagement'],
    memoriesCount: 31,
    bio: 'Spent 32 years helping high school students fall in love with physics through hands-on intuition rather than abstract formula memorization.',
    location: 'Toronto, Ontario',
    coordinates: '43.6532° N, 79.3832° W',
    recordedDate: '04 August 2026',
    timeline: [
      { year: 1992, event: 'Began teaching high school physical science', detail: 'Introduced practical mechanics labs using everyday objects.' },
      { year: 2005, event: 'Department Chair of Physical Sciences', detail: 'Redesigned district curriculum around practical intuition.' },
      { year: 2020, event: 'Excellence in Pedagogy Award', detail: 'Recognized for adaptive non-verbal student engagement strategies.' },
      { year: 2026, event: 'Captured classroom instincts on MemoryMap', detail: 'Recorded subtle body-language cues indicating student confusion.' }
    ]
  },
  {
    id: 'sunita-devi',
    catalogId: 'EXPRT-1994-0018',
    name: 'Sunita Devi',
    role: 'Traditional Organic Farmer',
    yearsExperience: 30,
    avatar: '🌾',
    skills: ['Soil Humidity Reading', 'Natural Pest Control', 'Micro-climate Irrigation', 'Seed Selection'],
    memoriesCount: 18,
    bio: '30 years managing organic terraced farmland. Reads soil health through texture, aroma, and local bio-indicators without digital sensors.',
    location: 'Himachal Pradesh, India',
    coordinates: '31.1048° N, 77.1734° E',
    recordedDate: '29 July 2026',
    timeline: [
      { year: 1994, event: 'Inherited family terraced farmland', detail: 'Switched exclusively to organic compost soil enrichment.' },
      { year: 2007, event: 'Developed micro-basin rainwater catchment', detail: 'Protected local crops during severe drought seasons.' },
      { year: 2026, event: 'Preserved crop timing knowledge on MemoryMap', detail: 'Recorded weather pattern indicators based on local mountain flora.' }
    ]
  }
];

export const MEMORIES: Memory[] = [
  {
    id: 'demo-memory-1',
    catalogId: 'ARCH-2026-0047',
    title: 'Diagnosing an Overheating Engine',
    expertId: 'ramesh-kumar',
    expertName: 'Ramesh Kumar',
    expertRole: 'Master Mechanic',
    expertExperience: 35,
    category: 'Automotive Repair',
    duration: '04:32',
    tags: ['diagnostics', 'engine', 'cooling', 'water-pump', 'thermostat'],
    summary: "After 35 years of fixing engines, I've learned that overheating is almost never about what beginners suspect first. The manual points to the thermostat, but 80% of the time, the real culprit is water pump impeller cavitation or subtle head gasket leaks.",
    procedure: [
      { step: 1, instruction: 'Let the engine cool completely before touching any cooling component.', note: 'Safety verification' },
      { step: 2, instruction: 'Check coolant level and smell. A sweet, burnt scent indicates head gasket seepage into combustion.', note: 'Acoustic & aroma check' },
      { step: 3, instruction: 'Start the engine from cold with cap off; watch for continuous air bubbles indicating cylinder pressure loss.', note: 'Visual inspection' },
      { step: 4, instruction: 'Feel upper and lower radiator hoses after 5 minutes of idling — both should feel warm and firm.', note: 'Tactile temperature reading' },
      { step: 5, instruction: 'If lower hose remains cold while upper is scalding, test water pump impeller wear before replacing thermostat.', note: 'Key expert insight' }
    ],
    expertTips: [
      'Always smell the coolant reservoir cap — burnt sweet smell is an early indicator of head gasket seepage.',
      'A functioning thermostat opens with a soft tactile click — you can feel it on the housing pipe.',
      'Check the rubber seal on the radiator cap pressure spring; a worn seal drops boiling point by 15°C.',
      'Listen for a metallic rhythmic whining near the belt drive — that is pump bearing play, not belt slip.'
    ],
    commonMistakes: [
      'Replacing the thermostat immediately without verifying actual coolant circulation.',
      'Opening the pressurized radiator cap while engine is hot.',
      'Mixing green ethylene glycol with orange OAT coolant, causing gel buildup in small passages.'
    ],
    tools: ['Pressure Test Kit', 'Infrared Thermometer Gun', 'Hydrometer', 'Mechanic Stethoscope'],
    story: "My first year as an apprentice, a customer brought in a sedan that had overheated 3 times. Two previous shops replaced the thermostat twice. My master walked over, placed his palm on the lower hose, smelled the radiator cap, and said 'Water pump impeller blades are eroded.' We pulled it off, and sure enough, the plastic vanes had melted away. That single day taught me to diagnose through physical signals, not just quick component swaps.",
    transcript: "When this engine starts making that high-pitched metallic ticking, most guys grab the scanner. But if you put your hand right on the thermostat housing... you feel the pulse. The manual won't tell you what that sound means.",
    recordingTimestamp: '02:17',
    createdAt: '18 August 2026',
    featured: true
  },
  {
    id: 'teaching-intuition',
    catalogId: 'ARCH-2026-0031',
    title: 'Recognizing Unspoken Student Confusion',
    expertId: 'david-chen',
    expertName: 'David Chen',
    expertRole: 'Veteran Teacher',
    expertExperience: 32,
    category: 'Pedagogy & Teaching',
    duration: '07:14',
    tags: ['teaching', 'classroom', 'pedagogy', 'assessment'],
    summary: 'Students almost always say "Yes, I understand" when put on the spot. Real comprehension is revealed in micro-gestures: pencil positioning, eye movement when looking at a diagram, and hesitation before writing step one.',
    procedure: [
      { step: 1, instruction: 'Never ask "Does everyone understand?". Instead, ask "What step would you take first?"' },
      { step: 2, instruction: 'Scan the room for the "pencil pause" — students hovering 2 inches above paper are lost.' },
      { step: 3, instruction: 'Have students turn to a neighbor and explain the concept in 15 seconds; walk the aisles during this noise window.' }
    ],
    expertTips: [
      'Silent students who nod rhythmically are often masking confusion.',
      'Give 7 seconds of absolute silence after posing a question before calling on anyone.'
    ],
    commonMistakes: [
      'Moving forward because the top two eager students answered correctly.',
      'Interpreting quiet compliance as mastery of the material.'
    ],
    tools: ['Whiteboard prompts', 'Peer explanation cards', 'Concept diagnostic sheets'],
    story: 'In 1998 I had a student named Sarah who scored 100% on homework but choked on exams. I noticed she held her pencil differently when she was guessing versus when she felt certain. By spotting that body language, I realized she was relying on pattern recognition rather than understanding the underlying physics.',
    recordingTimestamp: '04:10',
    createdAt: '04 August 2026',
    featured: true
  },
  {
    id: 'handloom-tension',
    catalogId: 'ARCH-2026-0023',
    title: 'Calibrating Handloom Warp Tension by Touch',
    expertId: 'meera-pillai',
    expertName: 'Meera Pillai',
    expertRole: 'Master Artisan Weaver',
    expertExperience: 40,
    category: 'Handloom Craft',
    duration: '03:52',
    tags: ['textile', 'handloom', 'weaving', 'craftsmanship'],
    summary: 'Proper thread tension on a traditional wooden loom cannot be measured with digital tension meters. It is felt by plucking the warp threads like guitar strings and listening to the acoustic resonance across the beam.',
    procedure: [
      { step: 1, instruction: 'Sweep your open palm lightly across the center 50 warp threads.' },
      { step: 2, instruction: 'Pluck individual outer selvage threads; they should pitch slightly higher than inner threads.' },
      { step: 3, instruction: 'Adjust wooden ratchets by half-notch increments until pitch uniformity is achieved.' }
    ],
    expertTips: [
      'Humidity changes wood tension; adjust ratchets at dawn and mid-afternoon.',
      'If the shuttle drags on the lower shed, your warp is 5% too loose.'
    ],
    commonMistakes: [
      'Overtightening silk threads during high ambient humidity, causing snapping when air dries.'
    ],
    tools: ['Wooden ratchet beam key', 'Beater reed hook', 'Tension gauge cord'],
    story: 'My teacher taught me this when I was 17. I had snapped 30 silk warp threads in one morning because the monsoon rain had swollen the wooden frame. She made me close my eyes and just pluck the threads until I could hear the pitch of perfect tension.',
    recordingTimestamp: '01:45',
    createdAt: '12 August 2026',
    featured: true
  },
  {
    id: 'soil-reading',
    catalogId: 'ARCH-2026-0018',
    title: 'Reading Soil Readiness Before Planting',
    expertId: 'sunita-devi',
    expertName: 'Sunita Devi',
    expertRole: 'Traditional Farmer',
    expertExperience: 30,
    category: 'Agriculture',
    duration: '05:48',
    tags: ['agriculture', 'soil', 'farming', 'weather'],
    summary: "You don't plant just because the calendar says May 1st. You squeeze a handful of soil 4 inches deep. If it forms a ball that crumbles with light thumb pressure, the earth is awake and ready.",
    procedure: [
      { step: 1, instruction: 'Dig 4 inches below surface layer in early morning.' },
      { step: 2, instruction: 'Squeeze a fistful of damp earth firmly in your palm.' },
      { step: 3, instruction: 'Release palm. If water drips, soil is too wet. If it falls apart instantly, it needs organic mulch.' },
      { step: 4, instruction: 'If it holds shape but breaks apart smoothly under gentle thumb pressure, plant immediately.' }
    ],
    expertTips: [
      'Watch local earthworms — if they are active within top 2 inches, ground temperature is above 14°C.',
      'Smell the soil: rich sweet forest aroma means active beneficial mycorrhizal fungi.'
    ],
    commonMistakes: [
      'Tilling wet soil, which creates hard compacted clods that destroy root aeration for the whole season.'
    ],
    tools: ['Traditional hand spade', 'Soil moisture squeeze test', 'Compost aerator'],
    story: 'In 2007, all the big farms followed the government weather bulletin and sowed early. I checked the soil texture and waited 11 days. A late freeze wiped out their seedlings, but our crops thrived because we waited for the earth to warm up.',
    recordingTimestamp: '03:12',
    createdAt: '29 July 2026',
    featured: true
  }
];

export const KNOWLEDGE_AT_RISK: KnowledgeAtRisk[] = [
  {
    id: 'risk-1',
    catalogId: 'RISK-REG-01',
    title: 'Traditional Kasavu Handloom Weaving',
    practitionersLeft: 2,
    category: 'Textile Craft',
    region: 'Kerala, South India',
    urgency: 'critical',
    description: 'Specialized gold-thread selvedge alignment technique known only by two elder weavers in Balaramapuram.'
  },
  {
    id: 'risk-2',
    catalogId: 'RISK-REG-02',
    title: 'High-Altitude Terraced Canal Alignment',
    practitionersLeft: 3,
    category: 'Traditional Irrigation',
    region: 'Himachal Pradesh, Himalayas',
    urgency: 'high',
    description: 'Gravity-fed water channel gradient alignment technique conducted entirely without surveying tools.'
  },
  {
    id: 'risk-3',
    catalogId: 'RISK-REG-03',
    title: 'Vintage Diesel Mechanical Acoustic Tuning',
    practitionersLeft: 1,
    category: 'Automotive Heritage',
    region: 'Mumbai Industrial Belt',
    urgency: 'critical',
    description: 'Acoustic diagnostic procedures for obsolete 2-stroke industrial generator engines.'
  }
];

export const QA_ENTRIES: QAEntry[] = [
  {
    id: 'qa-1',
    catalogId: 'QA-SRC-0047',
    question: 'My engine overheats after 30 minutes of highway driving. What should I check first?',
    answer: 'According to Ramesh Kumar (35 years experience as a Master Mechanic), do not replace the thermostat first. Check the lower radiator hose while idling: if the upper hose is hot but lower remains cold, or if you smell a sweet burnt scent at the reservoir cap, your issue is coolant flow cavitation or early head gasket pressure leakage.',
    sourceExpert: 'Ramesh Kumar',
    sourceRole: 'Master Mechanic',
    sourceExperience: 35,
    recordingTimestamp: '02:17–03:04',
    memoryId: 'demo-memory-1',
    memoryTitle: 'Diagnosing an Overheating Engine'
  },
  {
    id: 'qa-2',
    catalogId: 'QA-SRC-0018',
    question: 'How do I know if soil is ready for planting without digital sensors?',
    answer: 'According to Sunita Devi (30 years farming experience), dig 4 inches deep and squeeze a fistful of soil. If water drips out, it is too wet. If it holds shape but crumbles smoothly under light thumb pressure, the micro-soil temperature and moisture are optimal for seed germination.',
    sourceExpert: 'Sunita Devi',
    sourceRole: 'Traditional Farmer',
    sourceExperience: 30,
    recordingTimestamp: '03:12–04:05',
    memoryId: 'soil-reading',
    memoryTitle: 'Reading Soil Readiness Before Planting'
  }
];

export function getDemoStats() {
  return {
    memoriesPreserved: 12,
    proceduresExtracted: 7,
    storiesRecorded: 4,
    minutesRecorded: 18
  };
}

export function getExpertById(id: string): Expert | undefined {
  return EXPERTS.find((e) => e.id === id);
}

export function getMemoriesByExpert(expertId: string): Memory[] {
  return MEMORIES.filter((m) => m.expertId === expertId);
}

export function getMemoryById(id: string): Memory | undefined {
  return MEMORIES.find((m) => m.id === id) || MEMORIES[0];
}

export function searchMemories(query: string, category?: string): Memory[] {
  const q = query.toLowerCase().trim();
  return MEMORIES.filter((m) => {
    const matchesQuery =
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.expertName.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory = !category || category === 'All' || m.category.includes(category);

    return matchesQuery && matchesCategory;
  });
}

export function getQAResponse(question: string): QAEntry {
  const q = question.toLowerCase();
  if (q.includes('soil') || q.includes('plant') || q.includes('farm') || q.includes('crop')) {
    return QA_ENTRIES[1];
  }
  return QA_ENTRIES[0];
}
