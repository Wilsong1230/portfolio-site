export interface SkillItem {
  name: string
  value: number
}

export interface SkillGroup {
  group: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    group: 'Languages',
    items: [
      { name: 'C/C++',      value: 90 },
      { name: 'Python',     value: 85 },
      { name: 'JavaScript', value: 75 },
    ],
  },
  {
    group: 'Embedded',
    items: [
      { name: 'Arduino/AVR',               value: 88 },
      { name: 'AVR Assembly',              value: 70 },
      { name: 'Digital/Analog Electronics', value: 80 },
    ],
  },
  {
    group: 'Concepts',
    items: [
      { name: 'DSA',                   value: 82 },
      { name: 'Software Engineering',  value: 85 },
      { name: 'Computer Organization', value: 78 },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'Git',         value: 88 },
      { name: 'Linux',       value: 80 },
      { name: 'Arduino IDE', value: 90 },
    ],
  },
]
