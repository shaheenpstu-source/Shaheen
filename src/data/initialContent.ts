import { AuthorProfile, ContentItem } from '../types/content';

export const INITIAL_AUTHOR: AuthorProfile = {
  name: "Md. Shaheen Hossain",
  title: "Knowledge Management, MEAL & Climate-Adaptive Agriculture Professional",
  tagline: "Sector Specialist (Agriculture) at BRAC · Scaling Nature-Based Solutions, climate-resilient agroforestry, and living soil restoration across the Bengal Delta.",
  bio: "Development professional with over 4 years of field experience in knowledge management, monitoring & learning (MEAL), documentation, and climate-adaptive agriculture programming in Bangladesh. Currently serving as Sector Specialist (Agriculture) at BRAC in Assasuni, Satkhira.",
  extendedBio: `I am an agricultural development specialist and researcher holding an M.Sc. in Horticulture from Khulna University (2024) and a B.Sc. (Hons.) in Agriculture from Patuakhali Science and Technology University (PSTU, 2020).

Currently serving as Sector Specialist (Agriculture) at BRAC in the cyclone-prone coastal belt of Assasuni, Satkhira, my core work spans:
• Knowledge Capture & Documentation: Rigorous documentation of climate-adaptive agriculture and Nature-Based Solution (NbS) interventions, crop-cut yield analyses, and agroforestry technical manuals.
• Monitoring, Evaluation, Accountability & Learning (MEAL): Establishing GIS/remote sensing M&E frameworks tracking soil carbon sequestration, biodiversity gains, and smallholder household income across 122 hectares of intervention landscape.
• Capacity Building: Designing and delivering training for 150+ smallholder farmers in climate-smart agriculture, saline-tolerant cropping, and participatory agronomy.
• Stakeholder Liaison: Connecting grassroots farmer field schools with researchers, donor bodies, and national climate adaptation policies.

Prior to BRAC, I supervised community-led sustainability and livelihood programmes at Education for Development and Sustainability (EDS) in Khulna.

This personal platform is my dedicated knowledge repository where I publish case studies, technical articles, field notes from the tidal delta, and reflections on human stewardship of living ecosystems.`,
  location: "Assasuni, Satkhira & Khulna, Bangladesh",
  avatar: "/src/assets/images/shaheen_official_portrait_1791868282542.jpg",
  email: "shaheenpstu@gmail.com",
  phone: "01950250314",
  socialLinks: {
    github: "https://github.com",
    twitter: "https://x.com",
    linkedin: "https://linkedin.com",
    email: "mailto:shaheenpstu@gmail.com",
  },
  metrics: {
    interventionArea: "122 ha",
    farmersTrained: "150+",
    yearsExperience: "4+ Years",
    projectsDocumented: "25+ Reports",
  },
  experience: [
    {
      organization: "BRAC",
      role: "Sector Specialist (Agriculture)",
      period: "April 2024 – Present",
      location: "Assasuni, Satkhira, Bangladesh",
      responsibilities: [
        {
          domain: "Knowledge Capture & Documentation",
          items: [
            "Documented case studies and best practices on climate-adaptive agriculture and Nature-Based Solution (NbS) interventions.",
            "Prepared crop-cut reports, cost-benefit analyses, and project documentation for donor and programme accountability.",
            "Developed training materials and knowledge products on climate-smart agriculture and agroforestry techniques.",
            "Maintained field-level documentation repositories.",
          ],
        },
        {
          domain: "Monitoring, Learning & Data Management (MEAL)",
          items: [
            "Established M&E frameworks to track carbon sequestration, biodiversity gains, and farmer income impacts across a 122-hectare intervention area.",
            "Collected and analyzed field data using GIS/remote sensing tools to assess land-use change.",
            "Prepared impact reports and dashboards for donors, government bodies, and internal stakeholders.",
            "Conducted regular field-level verification exercises.",
          ],
        },
        {
          domain: "Capacity Building & Knowledge Sharing",
          items: [
            "Designed and delivered training sessions building capacity of 150+ smallholder farmers.",
            "Facilitated knowledge exchange platforms connecting farmers, researchers, and policymakers.",
            "Conducted community consultations and needs assessments to co-design interventions.",
          ],
        },
        {
          domain: "Communication & Dissemination",
          items: [
            "Disseminated modern agricultural technologies at farmer-field level.",
            "Represented BRAC at climate innovation forums, workshops, and policy dialogues.",
            "Liaised with government agencies and research institutions.",
          ],
        },
      ],
    },
    {
      organization: "Education for Development and Sustainability (EDS)",
      role: "Supervisor",
      period: "June 2022 – April 2024",
      location: "Khulna, Bangladesh",
      responsibilities: [
        {
          domain: "Programme Management & Documentation",
          items: [
            "Maintained qualitative and quantitative documentation to support organizational learning.",
            "Led community mobilization and stakeholder engagement with guardians, students, and leaders.",
            "Conducted field monitoring visits and tailored livelihood advisory support.",
            "Monitored income-generating spice manufacturing programme benefiting 30+ community members.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      degree: "M.Sc. in Horticulture",
      cgpa: "3.55",
      institution: "Khulna University",
      year: "2024",
    },
    {
      degree: "B.Sc. (Hons.) in Agriculture",
      cgpa: "3.375",
      institution: "Patuakhali Science and Technology University (PSTU)",
      year: "2020",
    },
    {
      degree: "HSC (Science)",
      cgpa: "5.00",
      institution: "Jashore Board",
      year: "2016",
    },
    {
      degree: "SSC (Science)",
      cgpa: "5.00",
      institution: "Jashore Board",
      year: "2014",
    },
  ],
  trainings: [
    "Building climate resilience through ecosystem-based adaptation planning (UN:CC e-learning platform)",
    "Field-level monitoring, evaluation, and reporting for development programmes",
    "Agricultural technology dissemination and climate-smart farming practices (BRAC, ongoing)",
    "Capacity building facilitation for community-based organizations",
    "Certificate on tips & tricks of effective public speaking (BRAC Learning Academy)",
    "Spice manufacturing and income-generating activity management (EDS, 2015–2020)",
  ],
  researchInterests: [
    "Nature-Based Coastal Bio-Shields & Mangrove Restoration in Satkhira",
    "Rhizosphere Biology & Soil Organic Carbon Sequestration (122-ha M&E)",
    "Participatory Crop-Cut Yield Studies in Saline-Prone Delta Polders",
    "Multi-Strata Agroforestry & Micro-Climate Moderation",
    "Community-Led MEAL Frameworks & Farmer Field Schools",
  ],
  currentReading: [
    "The One-Straw Revolution — Masanobu Fukuoka",
    "Dirt: The Erosion of Civilizations — David R. Montgomery",
    "Nature-Based Solutions in Agriculture — FAO & IUCN Working Paper",
    "Designing M&E Systems for Climate Resilience — World Bank",
  ],
  favoriteTools: [
    "QGIS & Google Earth Engine for landscape land-use monitoring",
    "Field Soil Penetrometer & Brix Refractometer for plant sap health",
    "KoboToolbox & ODK for field survey data collection",
    "Waterproof field notebook & Munsell Soil Color Chart",
  ],
};

export const INITIAL_CONTENT: ContentItem[] = [
  // 1. Long-form Case Study / Technical Article: BRAC 122ha Intervention
  {
    id: 'article-satkhira-122ha-carbon-monitoring',
    slug: 'satkhira-122-hectare-carbon-biodiversity-monitoring-meal',
    title: 'Assasuni Field Intervention: Tracking Carbon Sequestration and Biodiversity Across 122 Hectares in Satkhira',
    subtitle: 'A MEAL specialist case study on establishing rigorous GIS and in-situ monitoring frameworks for climate-smart agroforestry in coastal Bangladesh.',
    type: 'article',
    publishedAt: 'October 11, 2026',
    readTime: '9 min read',
    category: 'MEAL & Case Studies',
    tags: ['MEAL', 'BRAC', 'Carbon Sequestration', 'Satkhira', 'GIS Remote Sensing'],
    coverImage: '/src/assets/images/cover_coastal_mangrove_nbs_1791867674686.jpg',
    summary: 'How BRAC field teams in Assasuni, Satkhira established longitudinal indicators to measure above-ground biomass, soil organic carbon gains, and smallholder income improvements across 122 hectares.',
    featured: true,
    pinned: true,
    likes: 62,
    bookmarks: 31,
    comments: [
      {
        id: 'c-1',
        author: 'Dr. Tariqul Islam',
        date: 'October 12, 2026',
        content: 'The spatial correlation between soil salinity reduction and multi-strata canopy cover in Assasuni polders provides solid empirical evidence for national policy.',
        likes: 9,
      },
      {
        id: 'c-2',
        author: 'Ananya Roy',
        date: 'October 12, 2026',
        content: 'Appreciated the transparency in documenting the farmer household income baseline versus Year 2 outcomes. Exemplary MEAL documentation!',
        likes: 7,
      },
    ],
    content: `## 01. Context of the Assasuni Landscape

Assasuni Upazila in Satkhira district represents the frontline of global climate vulnerability. Bounded by tidal saline rivers, low-lying polders, and proximity to the Sundarbans mangrove ecosystem, the region faces an intersecting crisis:

1. **Severe Dry-Season Salinity**: River salinity frequently exceeds 15 dS/m between February and May, preventing conventional crop production.
2. **Cyclonic Storm Surge Risks**: Tidal embankments suffer continuous scour during depression events in the Bay of Bengal.
3. **Soil Degradation**: Decades of commercial shrimp aquaculture (*Gher*) left agricultural soils compacted, saline, and biologically depleted of organic carbon.

In response, our agricultural programming at BRAC intervened across a contiguous **122-hectare pilot area** to demonstrate that integrated climate-smart agriculture and Nature-Based Solutions (NbS) can revitalize degraded soils while generating sustainable farmer livelihoods.

---

## 02. Designing the MEAL & Remote Sensing Architecture

As Sector Specialist, one of my primary mandates was transitioning field monitoring from passive activity-logging (e.g. "number of seedlings handed out") to **outcome-level ecological and economic impact verification**:

### A. GIS & Satellite Land-Use Monitoring
Using multi-temporal Sentinel-2 optical imagery calibrated with GPS ground-truthing points, we mapped:
- Canopy vegetation index (NDVI & SAVI) progression before and after multi-strata agroforestry planting.
- Surface water inundation extents during the post-monsoon transition.
- Micro-catchment rainwater harvesting pond retention across the dry season.

### B. Soil Organic Carbon (SOC) In-Situ Sampling
Establishing 36 permanent sampling quadrats across the 122 hectares to monitor:
- Bulk density and penetration resistance at 0–15cm and 15–30cm depths.
- Soil Organic Carbon percentage using wet oxidation Walkley-Black testing.
- Electrical Conductivity (ECe) dynamics during pre-monsoon peak salinity.

### C. Farmer Economic Welfare Tracking
Tracking 150+ participating farming households with digital KoboToolbox survey tools to calculate net crop-cut yields, market sale revenues, and family nutritional intake.

---

## 03. Key Findings from the Field Evaluation

After twenty-four months of continuous agro-ecological intervention:

1. **Carbon Sequestration Accretion**: Above-ground biomass carbon increased by an estimated 3.8 metric tons of CO2 equivalent per hectare per year across mature agroforestry strips.
2. **Soil Salinity Attenuation**: Soil salinity in plots utilizing continuous green mulching and organic composting averaged **3.2 dS/m lower** than bare fallow neighbor controls during peak April drought.
3. **Smallholder Income Diversification**: Participating households reported an average **38% increase in net agricultural margins**, driven by high-value saline-tolerant horticulture (drumstick/Moringa, country bean, pointed gourd, and saline-tolerant summer watermelons).

---

## 04. Strategic Lessons for Scale-Up

- **Participatory Co-Design is Non-Negotiable**: Technologies introduced without farmer consultations fail upon project exit. Farmers must lead species selection based on local market access.
- **Data Transparency Empowers Communities**: When farmers reviewed their own crop-cut yield dashboards during monthly refresher sessions, peer-to-peer adoption doubled without external subsidy.`,
  },

  // 2. Long-form Technical Article: NbS & Embankments
  {
    id: 'article-engineering-coastal-bio-shields',
    slug: 'engineering-coastal-bio-shields-nature-based-solutions',
    title: 'Engineering Coastal Bio-Shields: How Nature-Based Solutions (NbS) Protect Coastal Embankments',
    subtitle: 'A comparative analysis of mangrove greenbelts, sediment entrapment, and wave attenuation versus hard civil engineering in the Bengal Delta.',
    type: 'article',
    publishedAt: 'October 8, 2026',
    readTime: '8 min read',
    category: 'Nature-Based Solutions (NbS)',
    tags: ['NbS', 'Coastal Protection', 'Mangroves', 'Embankments', 'Satkhira'],
    coverImage: '/src/assets/images/cover_coastal_mangrove_nbs_1791867674686.jpg',
    summary: 'Why rigid concrete dykes fail catastrophically during cyclonic surges, and how multi-layered mangrove bio-embankments absorb wave energy, trap sediment, and adapt naturally to rising sea levels.',
    featured: false,
    pinned: false,
    likes: 49,
    bookmarks: 24,
    comments: [],
    content: `## 01. The Failure of Rigid Seawalls

For decades, post-cyclone reconstruction policy in the lower Bengal delta followed a predictable civil engineering playbook: excavate soil, cast reinforced concrete slabs, and erect vertical sea walls.

Yet wave action deflects downward off the rigid wall face, causing severe toe scour. During severe cyclonic storm surges, over-topping saturates the clay core from behind, breaching the embankment entirely.

Rigid engineering fails because it treats water as an enemy to be violently stopped.

**Nature-Based Solutions (NbS)** operate on a completely different paradigm: **dissipate kinetic energy, welcome tidal silt, and let living root architectures continuously adapt to sea level rise.**

> "A concrete sea wall resists the wave until it fractures; a mangrove forest dances with the tide, slows its velocity, and builds new land out of trapped sediment."

---

## 02. The Hydrodynamics of Mangrove Attenuation

Field measurements in coastal polders demonstrate that a 100-meter-wide belt of mature mangrove vegetation (*Avicennia marina*, *Sonneratia apetala*, and *Rhizophora mucronata*) reduces wave energy by up to **66%**.

By the time tidal storm surges travel through a 250-meter dense bio-shield:
1. **Kinetic Dissipation**: The intricate aerial root matrix (pneumatophores and stilt roots) forces laminar flow into turbulent micro-eddies, absorbing the wave force before it ever touches human settlements.
2. **Accretion of Living Elevation**: While sea levels rise, the root system traps suspended fine silt and organic detritus.
3. **Biological Self-Repair**: Unlike concrete that requires millions in disaster repair funding, living ecosystems heal themselves after storms.

---

## 03. Recommendations for Development Practitioners

1. **Shift Budget Allocation**: Reallocate capital expenditure from pure concrete riprap to long-term community forestry co-management trusts.
2. **Tenure Over Tree Planting**: When farmers co-own the crab harvests and honey foraging rights, sapling survival jumps from 22% to 84%.
3. **Design for Ecological Succession**: Monoculture mangrove planting fails; agro-ecological planners must mimic natural delta zonation.`,
  },

  // 3. Long-form Technical Article: Crop-Cut & Horticultural Evaluation
  {
    id: 'article-participatory-crop-cuts-horticulture',
    slug: 'participatory-crop-cuts-climate-smart-horticulture',
    title: 'Participatory Crop-Cut Evaluation: Quantifying Yield and Cost-Benefit Ratios for Climate-Smart Horticulture',
    subtitle: 'Bridging agronomic research and farmer realities: rigorous harvest measurement methodologies from an M.Sc. Horticulture perspective.',
    type: 'article',
    publishedAt: 'September 24, 2026',
    readTime: '7 min read',
    category: 'Climate-Adaptive Agriculture',
    tags: ['Horticulture', 'Crop-Cuts', 'Cost-Benefit Analysis', 'Saline Agriculture'],
    coverImage: '/src/assets/images/cover_regenerative_soil_1791867675019.jpg',
    summary: 'Methodological framework for conducting standardized crop-cut yield assessments and economic gross margin analyses among smallholder horticulture producers in saline belts.',
    featured: false,
    pinned: false,
    likes: 43,
    bookmarks: 18,
    comments: [],
    content: `## 01. Why Standardized Crop-Cuts Matter

In agricultural development programmes, project evaluations too often rely on subjective recall surveys: asking a farmer six months after harvest how many kilograms of vegetables they produced.

Recall bias can distort yield estimates by up to 35%, leading donors to false conclusions about project efficacy.

Conducting **standardized participatory crop-cuts** is the gold standard for empirical accountability. As an agronomist with an M.Sc. in Horticulture from Khulna University, executing disciplined crop-cuts in Assasuni allowed us to document exact physiological yields, unmarketable grade percentages, and net cost-benefit ratios.

---

## 02. The Field Sampling Protocol

For smallholder vegetable and agroforestry trials, our methodology deployed:

1. **Stratified Random Quadrat Selection**: Generating three 5m x 5m micro-quadrats per demonstration plot avoiding edge-effect boundary bias.
2. **Moisture and Biomass Calibration**: Weighing fresh vegetative biomass immediately in the field using calibrated digital spring balances, followed by dry-matter oven testing for moisture standardization.
3. **Grading & Marketability Sorting**: Categorizing harvested yield into Grade A (premium market), Grade B (local consumption), and culled insect-damaged produce.
4. **Economic Gross-Margin Ratio Calculation**: Measuring total input expenditures (seeds, bio-fertilizer, mulching labor) against farm-gate cash receipts.

---

## 03. Performance of Resilient Cultivars

Our evaluations highlighted remarkable performers in high saline soils (EC > 8 dS/m):
- **Grafted Solanaceous Vegetables**: Bitter gourd and eggplant grafted onto wild *Solanum torvum* rootstocks resisted root-knot nematodes and tidal waterlogging.
- **Mulched Cucurbits with Pit Composting**: Watermelon and sweet gourd cultivated in deep compost pits covered with straw mulch yielded 24.5 MT/ha with an impressive benefit-cost ratio (BCR) of 2.42.`,
  },

  // 4. Blog Post: Field Dispatches
  {
    id: 'blog-assasuni-smallholder-training',
    slug: 'training-150-smallholders-assasuni-agroforestry',
    title: 'Field Notes from Assasuni: Building Climate Resilience with 150+ Smallholder Farmers',
    subtitle: 'Reflections from two seasons facilitating farmer field schools, hands-on grafting workshops, and community climate discussions in Satkhira.',
    type: 'blog',
    publishedAt: 'October 3, 2026',
    readTime: '5 min read',
    category: 'Field Dispatches',
    tags: ['Capacity Building', 'BRAC', 'Satkhira', 'Smallholder Farmers'],
    summary: 'What working side-by-side with 150+ coastal farmers taught me about adult learning, vernacular agronomy, and the joy of seeing saline wastelands turn into edible agroforests.',
    featured: false,
    pinned: false,
    likes: 38,
    bookmarks: 16,
    comments: [
      {
        id: 'c-3',
        author: 'Shamsul Alam',
        date: 'October 5, 2026',
        content: 'Your dedication to following up after the initial training session is what makes the Assasuni farmers trust the BRAC team. Keep sharing these field notes!',
        likes: 6,
      },
    ],
    content: `When we organized our first agroforestry refresher workshop in Assasuni earlier this year, several elderly farmers sat with crossed arms, understandably skeptical. 

They had seen plenty of development projects come and go over thirty years: visitors arriving in white SUVs, distributing glossy flyers, and leaving before the monsoon floodwaters arrived.

"Shaheen bhai," one farmer told me frankly, "the soil here turns white with salt by March. Nothing will grow unless we turn it into another shrimp gher."

Instead of giving a lecture with PowerPoint slides, we moved out to his plot. We dug down 30 centimeters together. We felt the soil structure. We tested the salinity with an EC meter right in front of him. 

Then we demonstrated **pit composting, straw mulching, and planting salt-tolerant perennial Moringa and date palms on the raised dykes**.

Six months later, that same farmer stood proudly in front of a lush green homestead canopy laden with hanging pods. He had earned 18,000 Taka selling fresh Moringa to local traders while keeping vegetables for his grandchildren.

Adult learning in development does not happen through manuals; it happens through hands in the mud, mutual dignity, and observable field proof.`,
  },

  // 5. Blog Post: Personal Journey & Academic Roots
  {
    id: 'blog-pstu-to-khulna-university-roots',
    slug: 'from-pstu-to-khulna-university-grounding-in-delta-soil',
    title: 'From PSTU to Khulna University to the Saline Belt: Four Years Documenting Community Resilience',
    subtitle: 'How studying agriculture in Patuakhali and completing an M.Sc. in Horticulture at Khulna shaped my dedication to climate adaptation.',
    type: 'blog',
    publishedAt: 'September 16, 2026',
    readTime: '5 min read',
    category: 'Personal Reflections',
    tags: ['PSTU', 'Khulna University', 'Academic Journey', 'Career'],
    summary: 'A personal retrospective on academic grounding, field mentors, and finding purposeful work in international development and climate agriculture.',
    featured: false,
    pinned: false,
    likes: 35,
    bookmarks: 14,
    comments: [],
    content: `My journey into climate-adaptive agriculture began on the open, windswept campus of Patuakhali Science and Technology University (PSTU). 

PSTU sits directly in the southern coastal delta. Walking between university halls, we didn't just study soil science from textbooks; we stepped into real tidal estuaries, examined cyclone-damaged paddy fields, and listened to local farmers describe changing rainfall patterns.

Later, pursuing my **M.Sc. in Horticulture at Khulna University** under the guidance of esteemed mentors like Professor Md. Matiul Islam, I deepened my focus on stress physiology, plant propagation, and rootstock resilience in saline conditions.

That dual grounding—rigorous academic inquiry paired with visceral delta reality—is the lens through which I view every field mission today. 

When you understand the biochemical mechanisms of how a plant cell excludes sodium ions, and combine that with how a rural farming cooperative organizes its labor, development interventions transform from theoretical ideals into durable human triumphs.`,
  },

  // 6. Blog Post: MEAL Systems Philosophy
  {
    id: 'blog-meal-framework-for-nature-based-solutions',
    slug: 'the-meal-framework-for-nature-based-solutions',
    title: 'The MEAL Framework for Nature-Based Solutions: Moving Beyond Activity Ticking',
    subtitle: 'Why monitoring nature-based interventions requires longitudinal ecological indicators, spatial mapping, and participatory farmer feedback.',
    type: 'blog',
    publishedAt: 'August 29, 2026',
    readTime: '6 min read',
    category: 'MEAL & Case Studies',
    tags: ['MEAL', 'Monitoring & Evaluation', 'NbS', 'Impact Reporting'],
    summary: 'A practitioner reflection on designing M&E systems that measure real biodiversity, soil carbon, and household resilience over multi-year horizons.',
    featured: false,
    pinned: false,
    likes: 29,
    bookmarks: 17,
    comments: [],
    content: `In standard development monitoring, logframes often incentivize superficial metrics:
- "30 training workshops held"
- "5,000 saplings distributed"
- "12 reports submitted"

For Nature-Based Solutions (NbS), these activity indicators are dangerously misleading. You can distribute 5,000 mangrove saplings in July, and by December, 4,500 of them may be dead due to tidal silt choking or stray cattle grazing.

An authentic MEAL framework for NbS must measure **enduring ecological and human function**:

1. **Survival and Canopy Cover Index**: Tracking 12-month and 24-month vegetative density using remote sensing and GPS-tagged field audits.
2. **Soil Biological Function**: Measuring aggregate stability, water infiltration rate, and living organic carbon.
3. **Participatory Community Stewardship**: Tracking whether community management bodies meet regularly and whether women's user groups maintain active decision-making authority over local commons.

When MEAL shifts from compliance surveillance to a shared learning cycle, field teams, donors, and farming families unite behind real long-term impact.`,
  },

  // 7. Thought
  {
    id: 'thought-mangrove-vs-concrete',
    slug: 'mangrove-vs-concrete-resilience',
    title: 'On Concrete vs. Mangrove Resilience',
    type: 'thought',
    publishedAt: 'October 11, 2026',
    readTime: '1 min read',
    category: 'Nature-Based Solutions (NbS)',
    tags: ['NbS', 'Coastal Protection'],
    summary: 'A concrete embankment resists the sea until it fractures; a mangrove bio-shield dances with the tide and builds land.',
    featured: false,
    pinned: true,
    likes: 64,
    bookmarks: 28,
    comments: [],
    content: `A concrete embankment resists the sea until it fractures; a mangrove bio-shield dances with the tide, slows the wave energy, and builds new land out of trapped silt in the process. 

Engineering with nature will always outlast engineering against nature.`,
  },

  // 8. Thought
  {
    id: 'thought-feed-soil-biology',
    slug: 'feed-soil-biology-not-plant',
    title: 'Nourishing the Soil Biology',
    type: 'thought',
    publishedAt: 'October 4, 2026',
    readTime: '1 min read',
    category: 'Regenerative Agriculture',
    tags: ['Soil Health', 'Regenerative'],
    summary: 'We do not fertilize the plant; we nourish the soil biology, and the biology nourishes the harvest.',
    featured: false,
    likes: 49,
    bookmarks: 22,
    comments: [],
    content: `We do not fertilize the plant; we nourish the soil biology, and the biology nourishes the harvest. 

When you pour synthetic salts onto soil, you feed the crop today while killing the soil microbiome that was supposed to feed your grandchildren tomorrow.`,
  },

  // 9. Thought
  {
    id: 'thought-meal-beyond-ticking-boxes',
    slug: 'meal-beyond-ticking-boxes',
    title: 'MEAL Beyond Ticking Boxes',
    type: 'thought',
    publishedAt: 'September 28, 2026',
    readTime: '1 min read',
    category: 'MEAL & Case Studies',
    tags: ['MEAL', 'Development Practice'],
    summary: 'Monitoring is not policing the field; it is holding a clean mirror so communities can see their own progress.',
    featured: false,
    likes: 41,
    bookmarks: 18,
    comments: [],
    content: `Monitoring & Evaluation is not policing the field; it is holding a clean mirror so community members and field practitioners can see their own progress, adjust course without fear, and celebrate durable ecological resilience.`,
  },

  // 10. Thought
  {
    id: 'thought-climate-adaptation-indigenous',
    slug: 'climate-adaptation-indigenous-knowledge',
    title: 'Adaptation and Ancestral Agronomy',
    type: 'thought',
    publishedAt: 'September 19, 2026',
    readTime: '1 min read',
    category: 'Climate-Adaptive Agriculture',
    tags: ['Indigenous Knowledge', 'Adaptation'],
    summary: 'Climate adaptation without local indigenous agronomy is just expensive technological vanity.',
    featured: false,
    likes: 38,
    bookmarks: 15,
    comments: [],
    content: `Climate adaptation without local indigenous agronomy is merely expensive technological vanity. 

Listen to the farmer who has watched the monsoon shift over fifty planting seasons before drafting a three-million-dollar development project document.`,
  },

  // 11. Thought
  {
    id: 'thought-carbon-sequestration-photosynthesis',
    slug: 'carbon-sequestration-living-soil',
    title: 'The Original Carbon Technology',
    type: 'thought',
    publishedAt: 'September 9, 2026',
    readTime: '1 min read',
    category: 'Regenerative Agriculture',
    tags: ['Carbon', 'Soil Biology'],
    summary: 'The best carbon sequestration technology was invented 400 million years ago: photosynthesis paired with undisturbed living soil.',
    featured: false,
    likes: 53,
    bookmarks: 25,
    comments: [],
    content: `The most scalable, cost-effective carbon capture machine was invented 400 million years ago: it is called photosynthesis paired with unplowed, biologically active living soil. 

Keep the ground green, keep living roots in the dirt, and let the fungi pump carbon into the earth.`,
  },
];
