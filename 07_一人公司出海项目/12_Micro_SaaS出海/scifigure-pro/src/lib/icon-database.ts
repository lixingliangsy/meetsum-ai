// Icon Database for Scientific Figures
// Organized by discipline and category

export interface IconDefinition {
  id: string
  name: string
  category: string
  discipline: string[]
  svg: string
  keywords: string[]
}

export const iconDatabase: IconDefinition[] = [
  // Biology Icons
  {
    id: 'cell',
    name: 'Cell',
    category: 'biology',
    discipline: ['biology', 'medicine'],
    svg: '<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="currentColor"/>',
    keywords: ['cell', 'biology', 'organism', 'membrane']
  },
  {
    id: 'dna',
    name: 'DNA',
    category: 'biology',
    discipline: ['biology', 'medicine', 'chemistry'],
    svg: '<path d="M30 20 Q50 40 30 60 Q50 80 30 100 M70 20 Q50 40 70 60 Q50 80 70 100" fill="none" stroke="currentColor" stroke-width="3"/><line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" stroke-width="2"/><line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2"/><line x1="30" y1="65" x2="70" y2="65" stroke="currentColor" stroke-width="2"/><line x1="30" y1="80" x2="70" y2="80" stroke="currentColor" stroke-width="2"/>',
    keywords: ['dna', 'genetics', 'gene', 'helix', 'nucleotide']
  },
  {
    id: 'protein',
    name: 'Protein',
    category: 'biology',
    discipline: ['biology', 'chemistry'],
    svg: '<path d="M20 50 Q35 20 50 50 Q65 80 80 50" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="30" cy="35" r="5" fill="currentColor"/><circle cx="70" cy="65" r="5" fill="currentColor"/>',
    keywords: ['protein', 'amino', 'acid', 'structure', 'fold']
  },
  {
    id: 'virus',
    name: 'Virus',
    category: 'biology',
    discipline: ['biology', 'medicine'],
    svg: '<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" stroke-width="2"/><line x1="50" y1="80" x2="50" y2="90" stroke="currentColor" stroke-width="2"/><line x1="20" y1="50" x2="10" y2="50" stroke="currentColor" stroke-width="2"/><line x1="80" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="2"/><line x1="29" y1="29" x2="22" y2="22" stroke="currentColor" stroke-width="2"/><line x1="71" y1="71" x2="78" y2="78" stroke="currentColor" stroke-width="2"/>',
    keywords: ['virus', 'pathogen', 'infection', 'capsid']
  },
  {
    id: 'bacteria',
    name: 'Bacteria',
    category: 'biology',
    discipline: ['biology', 'medicine'],
    svg: '<ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="10" y2="45" stroke="currentColor" stroke-width="2"/><line x1="20" y1="50" x2="10" y2="55" stroke="currentColor" stroke-width="2"/><line x1="80" y1="50" x2="90" y2="45" stroke="currentColor" stroke-width="2"/><line x1="80" y1="50" x2="90" y2="55" stroke="currentColor" stroke-width="2"/>',
    keywords: ['bacteria', 'microbe', 'prokaryote', 'germ']
  },

  // Chemistry Icons
  {
    id: 'atom',
    name: 'Atom',
    category: 'chemistry',
    discipline: ['chemistry', 'physics'],
    svg: '<ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(0 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="8" fill="currentColor"/>',
    keywords: ['atom', 'electron', 'nucleus', 'orbital']
  },
  {
    id: 'molecule',
    name: 'Molecule',
    category: 'chemistry',
    discipline: ['chemistry', 'physics'],
    svg: '<circle cx="30" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="70" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/><line x1="45" y1="33" x2="38" y2="43" stroke="currentColor" stroke-width="2"/>',
    keywords: ['molecule', 'bond', 'compound', 'chemical']
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'chemistry',
    discipline: ['chemistry'],
    svg: '<path d="M35 20 L35 45 L20 80 L80 80 L65 45 L65 20 Z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="30" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="3"/><path d="M25 65 Q50 55 75 65" fill="none" stroke="currentColor" stroke-width="2"/>',
    keywords: ['flask', 'chemistry', 'lab', 'reaction', 'solution']
  },
  {
    id: 'beaker',
    name: 'Beaker',
    category: 'chemistry',
    discipline: ['chemistry'],
    svg: '<path d="M25 25 L25 75 L75 75 L75 25" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="25" x2="80" y2="25" stroke="currentColor" stroke-width="3"/><path d="M30 60 Q50 50 70 60" fill="none" stroke="currentColor" stroke-width="2"/>',
    keywords: ['beaker', 'chemistry', 'liquid', 'mixture']
  },

  // Physics Icons
  {
    id: 'wave',
    name: 'Wave',
    category: 'physics',
    discipline: ['physics'],
    svg: '<path d="M10 50 Q25 30 40 50 Q55 70 70 50 Q85 30 100 50" fill="none" stroke="currentColor" stroke-width="3"/>',
    keywords: ['wave', 'light', 'sound', 'frequency']
  },
  {
    id: 'magnet',
    name: 'Magnet',
    category: 'physics',
    discipline: ['physics', 'engineering'],
    svg: '<path d="M20 30 L20 70 L40 70 L40 50 L60 50 L60 70 L80 70 L80 30 L60 30 L60 45 L40 45 L40 30 Z" fill="none" stroke="currentColor" stroke-width="3"/>',
    keywords: ['magnet', 'magnetic', 'field', 'attract']
  },
  {
    id: 'circuit',
    name: 'Circuit',
    category: 'physics',
    discipline: ['physics', 'engineering', 'cs'],
    svg: '<rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" stroke-width="2"/><line x1="70" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/>',
    keywords: ['circuit', 'electric', 'current', 'board']
  },

  // Engineering Icons
  {
    id: 'gear',
    name: 'Gear',
    category: 'engineering',
    discipline: ['engineering'],
    svg: '<circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="8" fill="currentColor"/><path d="M50 25 L53 15 L47 15 Z" fill="currentColor"/><path d="M50 75 L53 85 L47 85 Z" fill="currentColor"/><path d="M25 50 L15 53 L15 47 Z" fill="currentColor"/><path d="M75 50 L85 53 L85 47 Z" fill="currentColor"/>',
    keywords: ['gear', 'mechanical', 'machine', 'cog']
  },
  {
    id: 'robot',
    name: 'Robot',
    category: 'engineering',
    discipline: ['engineering', 'cs'],
    svg: '<rect x="30" y="35" width="40" height="40" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="45" cy="18" r="3" fill="currentColor"/><circle cx="55" cy="18" r="3" fill="currentColor"/><line x1="30" y1="55" x2="20" y2="70" stroke="currentColor" stroke-width="2"/><line x1="70" y1="55" x2="80" y2="70" stroke="currentColor" stroke-width="2"/>',
    keywords: ['robot', 'ai', 'automation', 'machine']
  },
  {
    id: 'sensor',
    name: 'Sensor',
    category: 'engineering',
    discipline: ['engineering', 'cs'],
    svg: '<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="currentColor"/><line x1="50" y1="25" x2="50" y2="10" stroke="currentColor" stroke-width="2"/><line x1="50" y1="75" x2="50" y2="90" stroke="currentColor" stroke-width="2"/><line x1="25" y1="50" x2="10" y2="50" stroke="currentColor" stroke-width="2"/><line x1="75" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="2"/>',
    keywords: ['sensor', 'detection', 'signal', 'input']
  },

  // General Icons
  {
    id: 'arrow',
    name: 'Arrow',
    category: 'general',
    discipline: ['general'],
    svg: '<line x1="10" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="3"/><polyline points="70,40 80,50 70,60" fill="none" stroke="currentColor" stroke-width="3"/>',
    keywords: ['arrow', 'direction', 'flow', 'process']
  },
  {
    id: 'chart',
    name: 'Chart',
    category: 'general',
    discipline: ['general'],
    svg: '<rect x="10" y="60" width="15" height="30" fill="currentColor"/><rect x="30" y="40" width="15" height="50" fill="currentColor"/><rect x="50" y="20" width="15" height="70" fill="currentColor"/><rect x="70" y="30" width="15" height="60" fill="currentColor"/>',
    keywords: ['chart', 'bar', 'data', 'statistics']
  },
  {
    id: 'graph',
    name: 'Graph',
    category: 'general',
    discipline: ['general'],
    svg: '<polyline points="10,80 30,50 50,60 70,20 90,35" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="10" cy="80" r="4" fill="currentColor"/><circle cx="30" cy="50" r="4" fill="currentColor"/><circle cx="50" cy="60" r="4" fill="currentColor"/><circle cx="70" cy="20" r="4" fill="currentColor"/><circle cx="90" cy="35" r="4" fill="currentColor"/>',
    keywords: ['graph', 'line', 'trend', 'data']
  },
  {
    id: 'network',
    name: 'Network',
    category: 'general',
    discipline: ['general', 'cs'],
    svg: '<circle cx="50" cy="30" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="70" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="75" cy="70" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="40" x2="30" y2="62" stroke="currentColor" stroke-width="2"/><line x1="50" y1="40" x2="70" y2="62" stroke="currentColor" stroke-width="2"/><line x1="35" y1="70" x2="65" y2="70" stroke="currentColor" stroke-width="2"/>',
    keywords: ['network', 'connection', 'nodes', 'graph']
  },
  {
    id: 'cloud',
    name: 'Cloud',
    category: 'general',
    discipline: ['general', 'cs'],
    svg: '<path d="M30 70 Q20 70 20 60 Q20 50 30 50 Q30 35 50 35 Q65 35 70 45 Q80 45 80 55 Q80 70 65 70 Z" fill="none" stroke="currentColor" stroke-width="3"/>',
    keywords: ['cloud', 'storage', 'computing', 'network']
  }
]

// Search icons by keyword
export function searchIcons(query: string, discipline?: string): IconDefinition[] {
  const lowerQuery = query.toLowerCase()

  return iconDatabase.filter(icon => {
    const matchesQuery = icon.keywords.some(k => k.includes(lowerQuery)) ||
                         icon.name.toLowerCase().includes(lowerQuery)
    const matchesDiscipline = !discipline || icon.discipline.includes(discipline)
    return matchesQuery && matchesDiscipline
  })
}

// Get icons by discipline
export function getIconsByDiscipline(discipline: string): IconDefinition[] {
  return iconDatabase.filter(icon => icon.discipline.includes(discipline))
}

// Get all disciplines
export function getDisciplines(): string[] {
  const disciplines = new Set<string>()
  iconDatabase.forEach(icon => {
    icon.discipline.forEach(d => disciplines.add(d))
  })
  return Array.from(disciplines)
}

export default iconDatabase