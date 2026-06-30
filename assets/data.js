/* ============================================================
   Keystone EA™ — Canonical content model
   Single source of truth for every page.
   ============================================================ */
window.KEA = (function () {

  /* ---- 7 architecture layers ---- */
  const LAYERS = [
    { id:'supporting', name:'Supporting', accent:'var(--l-supporting)', soft:'var(--l-supporting-soft)',
      blurb:'Cross-cutting structure and place',
      desc:'Cross-cutting elements that organise and locate everything else in the model. They give the architecture structure and context without belonging to any single domain.' },
    { id:'governance', name:'Governance', accent:'var(--l-governance)', soft:'var(--l-governance-soft)',
      blurb:'Accountability and control',
      desc:'The accountability and control layer — the parties who own decisions and the standards that constrain them. This is where architectural authority and compliance live.' },
    { id:'strategy', name:'Strategy', accent:'var(--l-strategy)', soft:'var(--l-strategy-soft)',
      blurb:'Motivation and planned change',
      desc:'Why the architecture exists and where it is heading. Drivers and goals set direction; requirements and work packages turn that direction into governed, planned change.' },
    { id:'business', name:'Business', accent:'var(--l-business)', soft:'var(--l-business-soft)',
      blurb:'What the organisation does',
      desc:'What the organisation does and who does it — the actors, organisational units, capabilities and processes through which the enterprise delivers value.' },
    { id:'data', name:'Data', accent:'var(--l-data)', soft:'var(--l-data-soft)',
      blurb:'The information backbone',
      desc:'The information the enterprise depends on — structured data objects that flow between processes and applications and anchor data governance.' },
    { id:'application', name:'Application', accent:'var(--l-application)', soft:'var(--l-application-soft)',
      blurb:'The software landscape',
      desc:'The software landscape — the systems, components, functions and interfaces that automate the business and exchange information across the estate.' },
    { id:'technology', name:'Technology', accent:'var(--l-technology)', soft:'var(--l-technology-soft)',
      blurb:'The infrastructure foundation',
      desc:'The infrastructure foundation — the platforms, services and components that applications are deployed on and depend on to run.' },
  ];

  /* ---- 19 object types ---- */
  const OBJECTS = [
    { name:'Group', layer:'supporting', head:'#5C6166', short:'Logical grouping of objects',
      long:'A container used to organise any set of objects into a meaningful collection — a domain, a portfolio, a release. Groups carry no semantics of their own; they bring order to large models.' },
    { name:'Location', layer:'supporting', head:'#546E7A', short:'Physical or logical place',
      long:'A physical or logical place — a site, region, data centre or cloud zone — that other objects can be assigned to or that supports them, enabling geographic and deployment analysis.' },

    { name:'Principal', layer:'governance', head:'#00838F', short:'Accountable party or role',
      long:'An accountable party or governance role — an owner, steward or board — responsible for decisions, standards and the integrity of part of the architecture.' },
    { name:'Standard', layer:'governance', head:'#006064', short:'Mandated rule or guideline',
      long:'A mandated rule, policy or guideline that constrains design and technology choices. Standards form the live, maintained body of governance that decisions are measured against.' },

    { name:'Driver', layer:'strategy', head:'#B00020', short:'Motivates the architecture',
      long:'An external or internal force that motivates change — a market shift, regulation, cost pressure or strategic ambition. Drivers explain why the architecture must evolve.' },
    { name:'Goal', layer:'strategy', head:'#bf7581', short:'Desired end state',
      long:'A desired end state the organisation is working toward. Goals translate drivers into direction and give requirements and work packages something concrete to satisfy.' },
    { name:'Requirement', layer:'strategy', head:'#880E4F', short:'Constraint or condition',
      long:'A specific condition or constraint that must be met for a goal to be realised. Requirements are the testable bridge between strategic intent and delivered change.' },
    { name:'Work Package', layer:'strategy', head:'#FF1744', short:'Unit of planned change',
      long:'A discrete, planned unit of change — a project or initiative — that realises requirements and delivers new or altered capabilities, applications and technology.' },

    { name:'Actor', layer:'business', head:'#FFAB00', short:'Person or system role',
      long:'A person, team or system role that performs behaviour. Actors carry out business processes and interact with applications, giving the model a human and operational dimension.' },
    { name:'Organization Unit', layer:'business', head:'#FF3D00', short:'Structural org entity',
      long:'A structural part of the organisation — a department, division or function — that owns processes and capabilities and to which accountability can be assigned.' },
    { name:'Capability', layer:'business', head:'#FF6D00', short:'Business ability',
      long:'A stable, business-owned statement of what the organisation is able to do — independent of how it is done. Capabilities are the anchor for investment, gap and rationalisation analysis.' },
    { name:'Business Process', layer:'business', head:'#E65100', short:'Sequence of tasks',
      long:'An end-to-end sequence of activities that delivers a business outcome. Processes connect capabilities to the actors, applications and data that make them operate.' },

    { name:'Data Object', layer:'data', head:'#5E00A3', short:'Structured information',
      long:'A logically structured unit of information — a customer, order or invoice — created, read, updated or deleted by applications and processes, and tracked for ownership and flow.' },

    { name:'Application Function', layer:'application', head:'#008676', short:'Automated behaviour',
      long:'A discrete piece of automated behaviour exposed by an application — a coherent function it performs. Functions are how applications realise capabilities and processes.' },
    { name:'Application', layer:'application', head:'#003C8F', short:'Software system',
      long:'A deployable software system that supports the business. Applications are the unit of the portfolio — the level at which lifecycle, rationalisation and ownership decisions are made.' },
    { name:'Application Component', layer:'application', head:'#0066FF', short:'Modular software part',
      long:'A modular, replaceable part of an application — a module, service or microservice. Components enable dependency analysis, impact assessment and component-level lifecycle tracking.' },
    { name:'Interface', layer:'application', head:'#20B0BF', short:'Point of interaction',
      long:'A defined point of interaction through which applications and components exchange information — an API, file feed or service endpoint. Interfaces make integration explicit and analysable.' },

    { name:'Technology Function', layer:'technology', head:'#00A862', short:'Infrastructure behaviour',
      long:'A behaviour provided by infrastructure — compute, storage, messaging or runtime services — that applications consume. Functions describe what technology does, abstracted from product.' },
    { name:'Technology Component', layer:'technology', head:'#006644', short:'Infrastructure element',
      long:'A concrete infrastructure element — a server, database engine, platform or product — with a lifecycle. Components are where end-of-life risk and technology standardisation are managed.' },
  ];

  /* ---- 6 relationship types (canonical) ---- */
  const RELATIONSHIPS = [
    { name:'Composition', code:'Co', color:'#5C6166', glyph:'composition',
      short:'Object containing itself or sub-objects',
      long:'Hierarchical containment. Every object type can compose with its own kind, letting you build hierarchies — a capability of sub-capabilities, an application of components.' },
    { name:'Connection', code:'Cn', color:'#0a4bd1', glyph:'connection',
      short:'Any object linked to any other object',
      long:'The universal, non-directional association. Connection is the only relationship permitted between every pair of object types — the catch-all when a link is meaningful but unqualified.' },
    { name:'CRUD', code:'Cr', color:'#5E00A3', glyph:'crud',
      short:'Create, read, update or delete access',
      long:'Behavioural access to information. CRUD records how active elements — processes, applications, components — create, read, update or delete a Data Object.' },
    { name:'Realization', code:'Re', color:'#00824c', glyph:'realization',
      short:'Lower layer fulfils an upper concept',
      long:'Traceability from the abstract to the concrete. A work package realises a requirement; an application realises a capability — connecting strategy all the way down to technology.' },
    { name:'Flow', code:'Fl', color:'#B45309', glyph:'flow',
      short:'Movement of data or information',
      long:'A directional transfer of information or control between active elements — application to application, process to process — used for integration and data-flow analysis.' },
    { name:'Supporting', code:'Sp', color:'#00838F', glyph:'supporting',
      short:'One element enables another to function',
      long:'An enabling, serving dependency: one element makes another able to operate. Often runs from a location or infrastructure element up to the things it sustains.' },
  ];

  /* ---- 6 viewpoints (+ Master) ---- */
  const VIEWPOINTS = [
    { id:'master', name:'Master', accent:'var(--ink)', soft:'var(--bg-2)',
      desc:'A comprehensive, all-inclusive view showing every element and relationship in the model. The Master viewpoint is the unfiltered repository — every other viewpoint is a focused lens on a subset of it.',
      objects:['Group','Location','Principal','Standard','Driver','Goal','Requirement','Work Package','Actor','Organization Unit','Capability','Business Process','Data Object','Application Function','Application','Application Component','Interface','Technology Function','Technology Component'] },
    { id:'governance', name:'Architecture Governance', accent:'var(--l-governance)', soft:'var(--l-governance-soft)',
      desc:'Defines the governance structures, standards and principals that oversee the architecture. Shows how requirements and work packages are governed through capabilities and applications, and supported by technology. Used to establish accountability, compliance and architectural control.',
      objects:['Group','Principal','Standard','Requirement','Work Package','Capability','Application Function','Application','Technology Function','Technology Component'] },
    { id:'strategy', name:'Strategy Alignment', accent:'var(--l-strategy)', soft:'var(--l-strategy-soft)',
      desc:'Shows how strategic drivers and goals translate into actionable requirements and work packages, and how these are realized through capabilities, business processes, applications, data and technology. Used to ensure alignment between strategy and execution.',
      objects:['Group','Principal','Standard','Driver','Goal','Requirement','Work Package','Capability','Business Process','Data Object','Application Function','Application','Technology Function'] },
    { id:'capability', name:'Capability Map', accent:'var(--l-business)', soft:'var(--l-business-soft)',
      desc:'Provides a structured overview of business capabilities and how they are supported by applications and application functions. Used to assess capability maturity, identify gaps and support investment decisions.',
      objects:['Capability','Application Function','Application'] },
    { id:'process', name:'Business Process Operation', accent:'var(--l-business)', soft:'var(--l-business-soft)',
      desc:'Illustrates how business processes are performed by actors and organisational units, and how they leverage capabilities. Used to understand operational workflows, responsibilities and business execution.',
      objects:['Group','Location','Actor','Organization Unit','Capability','Business Process'] },
    { id:'appint', name:'Application Interaction & Operation', accent:'var(--l-application)', soft:'var(--l-application-soft)',
      desc:'Depicts how applications, components and interfaces interact to support application functions, including their dependency on underlying technology components. Used for application architecture design and integration analysis.',
      objects:['Group','Location','Application Function','Application','Application Component','Interface','Technology Component'] },
    { id:'techuse', name:'Technology Usage', accent:'var(--l-technology)', soft:'var(--l-technology-soft)',
      desc:'Shows how applications and application components utilise technology components and functions. Used to understand infrastructure dependencies, support planning and technology standardisation.',
      objects:['Group','Location','Application Function','Application','Application Component','Interface','Technology Function','Technology Component'] },
  ];

  /* ---- Methodology: 5 phases × 2 tracks ---- */
  const PHASES = [
    { n:'01', id:'establish', name:'Establish', pc:'#2563EB', soft:'var(--l-application-soft)',
      tag:'Get the foundational data model and content catalogs in place before any EA work begins.',
      content:[
        { task:'Content Catalogs', items:[
          { name:'Business Application Catalog', desc:'Comprehensive catalog of all applications in the organization, providing the foundational inventory from which portfolio analysis, rationalization, and lifecycle decisions are made.' },
          { name:'Application Component Catalog', desc:'Catalog of the discrete components that make up each business application — such as modules, services, and interfaces — enabling dependency analysis, impact assessment, and component-level lifecycle tracking.' },
          { name:'Capability Catalog', desc:'Catalog of business capabilities used to plan investments, prioritize architecture decisions, and align the application and technology landscape to what the organization needs to do.' },
          { name:'Business Process Catalog', desc:'Catalog of end-to-end business processes linked to capabilities and applications, enabling process-level impact analysis and supporting optimization and transformation initiatives.' },
          { name:'Technology Function & Component Catalog', desc:'Catalog of technology functions and components across the application and infrastructure landscape, providing the foundational inventory for TRM development and lifecycle risk management.' },
          { name:'Data Object Catalog', desc:'Catalog of key data objects and their relationships across the enterprise, supporting data flow visibility, ownership accountability, and downstream data architecture work.' },
        ]},
      ],
      arch:[
        { task:'Model Readiness', items:[
          { name:'Metadata & Relationship Identification', desc:'Identify the metadata attributes and object relationships required across all catalog types to support the organization’s EA goals and intended use cases.' },
          { name:'Readiness Assessment', desc:'Assess the organization’s current ability to populate the identified metadata and relationships; surface gaps in data availability, ownership, and tooling integration.' },
        ]},
        { task:'Model Extension', items:[
          { name:'Metadata & Relationship Data', desc:'Import or add data to address gaps identified in the readiness assessment, using platform integrations and connectors where available to reduce manual effort.' },
        ]},
        { task:'AI Service Portal', items:[
          { name:'AI Service Structure Definition', ai:true, desc:'Define how the platform’s AI assistant will be structured and accessed within the organization — including which use cases are in scope, how the service connects to existing workflows, and what guardrails are required.' },
        ]},
      ]},
    { n:'02', id:'structure', name:'Structure', pc:'#0F766E', soft:'var(--l-governance-soft)',
      tag:'Establish governance, validate the model, and configure AI workflows for consistent practice operation.',
      content:[
        { task:'Architecture Governance', items:[
          { name:'Architecture Principals & Standards Definition', desc:'Define and document the architecture principals and supporting standards that will govern design decisions, technology choices, and content quality across the EA practice — forming the governance baseline all downstream work is measured against.' },
          { name:'Standards Library Build-out', desc:'Populate the standards library with approved technology, integration, and data standards, ensuring governance decisions reference a live, maintained body of standards rather than ad hoc guidance.' },
        ]},
      ],
      arch:[
        { task:'Model Readiness', items:[
          { name:'Viewpoint Fit & Content Organization', desc:'Review available viewpoints for organizational fit and customize as needed to match the team’s deliverable language and stakeholder requirements. Organize the repository structure to support consistent deliverable production.' },
          { name:'Relationship Validation', desc:'Validate that relationships between catalog objects are accurate, complete, and aligned to the metamodel, ensuring the repository is fit for analysis and deliverable production.' },
        ]},
        { task:'AI Service Portal', items:[
          { name:'AI Workflow Definition & Socialization', ai:true, desc:'Design and document AI-assisted workflows for priority EA use cases, then introduce them to relevant stakeholders with supporting reference material to drive consistent and confident adoption.' },
        ]},
        { task:'Operational Improvement', items:[
          { name:'Usage Monitoring & Improvement', desc:'Monitor platform usage patterns and gather structured stakeholder feedback to identify friction points, underused capabilities, and configuration improvements — producing a prioritized list of optimizations each cycle.' },
        ]},
      ]},
    { n:'03', id:'activate', name:'Activate', pc:'#B45309', soft:'var(--l-business-soft)',
      tag:'Bring the EA practice live — applications, capabilities, and the technology reference model become operational.',
      content:[
        { task:'Business Application Management', items:[
          { name:'Business Application Lifecycle Management', desc:'Manage the full lifecycle of business applications — from onboarding through to retirement — producing portfolio reports, dashboards, and publications that give stakeholders continuous visibility into the health and status of the application estate.' },
          { name:'Business Application Rationalization', desc:'Assess applications against invest, sustain, migrate, and retire criteria to surface rationalization candidates and provide the evidence base for portfolio investment and roadmap decisions.' },
          { name:'Business Application Qualitative Assessment', desc:'Evaluate applications across qualitative dimensions including business fit, user satisfaction, and strategic alignment, complementing quantitative data to support well-rounded portfolio decisions.' },
        ]},
        { task:'Capability Model Development', items:[
          { name:'Capability Model Development', desc:'Build a hierarchical business capability model aligned to strategic objectives, providing a stable, business-owned lens through which application investments, gaps, and redundancies can be identified and prioritized.' },
          { name:'Capability Model Alignment', desc:'Build relationships between the business capability model and applications, business processes, work packages, and other relevant architecture content, enabling capability-based impact analysis and investment planning.' },
        ]},
        { task:'Technology Reference Model', items:[
          { name:'TRM Development', desc:'Build the technology reference model and associated metadata, defining the approved products and standards across each technology category to guide procurement decisions and manage technical debt.' },
          { name:'TRM Governance Integration', desc:'Connect the TRM to governance workflows so that unapproved technology introductions are automatically flagged, reviewed, and either approved or rejected through a consistent process.' },
        ]},
      ],
      arch:[
        { task:'State Modeling', items:[
          { name:'State Modeling Approach Definition', desc:'Define the approach to current state, transition state, and future state modeling — including which viewpoints will be used, naming conventions, and who owns and maintains each domain.' },
          { name:'Current State Baseline', desc:'Capture and validate the current state architecture across the application, technology, data, and business process domains using the defined viewpoints, establishing the baseline from which gap analysis and future state planning can begin.' },
        ]},
        { task:'Deliverable Production', items:[
          { name:'Report & Dashboard Definition', desc:'Define and build the recurring EA reports and dashboards required by each stakeholder group — covering portfolio health, technology risk, capability coverage, and rationalization status — so that EA insight is consistently available without manual effort.' },
        ]},
      ]},
    { n:'04', id:'optimize', name:'Optimize', pc:'#6D28D9', soft:'var(--l-data-soft)',
      tag:'Deepen portfolio coverage, introduce integration and data architecture, and build future state capability.',
      content:[
        { task:'Application Integration Management', items:[
          { name:'Application Integration Build-out', desc:'Map application-to-application integration flows and produce associated deliverables, providing clear visibility into integration dependencies, data exchanges, and the risk exposure created by point-to-point connections across the estate.' },
          { name:'Integration Health Assessment', desc:'Assess the integration landscape for risk, redundancy, and alignment to architectural standards, identifying candidates for consolidation or re-platforming.' },
        ]},
        { task:'Technology Portfolio Management', items:[
          { name:'TPM Development', desc:'Build out the technology portfolio by linking technology components to applications, capabilities, and lifecycle data, enabling data-driven invest and retire decisions across the technology estate.' },
          { name:'Technology Lifecycle Management', desc:'Track end-of-life and end-of-support dates across the technology estate, surfacing risk concentrations and remediation priorities before they become operational or security incidents.' },
        ]},
        { task:'Data Architecture', items:[
          { name:'Data Object Relationship Mapping', desc:'Map data objects to the applications and business processes that create, consume, or transform them, enabling data flow visibility, ownership accountability, and informed data governance decisions.' },
        ]},
      ],
      arch:[
        { task:'State Modeling', items:[
          { name:'Future State Architecture Development', desc:'Develop the target architecture and transition roadmaps across relevant domains, aligned to strategic priorities, giving the organization a clear and governed path from current state to desired future state.' },
        ]},
        { task:'AI Service Portal', items:[
          { name:'Advanced AI Use Cases', ai:true, desc:'Build advanced AI-assisted workflows covering Architecture Review Board summarization, complex multi-domain analysis requests, and automated gap analysis — extending the value of the AI service portal beyond foundational use cases.' },
        ]},
        { task:'Operational Improvement', items:[
          { name:'Stakeholder Engagement Model', desc:'Define and implement structured engagement routines with business and IT stakeholders — including review cycles, feedback loops, and escalation paths — so that architecture decisions are consistently informed by and visible to the people they affect.' },
        ]},
      ]},
    { n:'05', id:'transform', name:'Transform', pc:'#BE185D', soft:'var(--l-strategy-soft)',
      tag:'EA becomes a strategic driver — embedded in business planning, powered by AI, and continuously improving.',
      content:[
        { task:'Strategic Architecture', items:[
          { name:'Business Strategy Alignment', desc:'Embed the EA practice into the organization’s strategic planning cycle, ensuring architecture investments, roadmaps, and decisions are directly traceable to strategic outcomes and reviewed at each planning horizon.' },
          { name:'Investment Prioritization Support', desc:'Provide architecture-informed input to investment prioritization by surfacing capability gaps, areas of technical debt, and opportunity areas — ensuring funding decisions are grounded in a clear picture of the current and target landscape.' },
        ]},
      ],
      arch:[
        { task:'AI Service Portal', items:[
          { name:'Autonomous EA Workflows', ai:true, desc:'Enable AI-driven autonomous workflows for routine EA tasks including impact analysis, standards compliance checking, and documentation generation, freeing architects to focus on higher-value analysis and decision support.' },
          { name:'Predictive Insights', ai:true, desc:'Surface predictive insights from EA data — including technology risk forecasting, capability investment modeling, and portfolio scenario analysis — enabling proactive decision-making rather than retrospective reporting.' },
        ]},
        { task:'Operational Improvement', items:[
          { name:'Continuous Improvement Program', desc:'Run a structured improvement cycle for the EA practice using platform usage analytics, stakeholder feedback, and industry benchmarking to identify and deliver measurable improvements to EA services, tooling, and outputs each quarter.' },
        ]},
        { task:'Governance Maturity', items:[
          { name:'Architecture Review Board (ARB) Integration', desc:'Ensure Architecture Review Board decisions are consistently informed by live architecture data and AI-assisted analysis, replacing point-in-time manual inputs with governed, repository-backed evidence that improves decision quality and auditability.' },
        ]},
      ]},
  ];

  /* ---- helpers ---- */
  const objByName = Object.fromEntries(OBJECTS.map(o => [o.name, o]));
  const layerById = Object.fromEntries(LAYERS.map(l => [l.id, l]));
  const layerOf = name => layerById[(objByName[name]||{}).layer];

  function methodologyCounts() {
    let cap = 0, ai = 0;
    PHASES.forEach(p => [...p.content, ...p.arch].forEach(g => g.items.forEach(it => { cap++; if (it.ai) ai++; })));
    return { phases: PHASES.length, capabilities: cap, tracks: 2, ai };
  }

  return { LAYERS, OBJECTS, RELATIONSHIPS, VIEWPOINTS, PHASES, objByName, layerById, layerOf, methodologyCounts };
})();
