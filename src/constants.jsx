// TODO: Move to env file
export const firebaseConfig = {
  apiKey: 'AIzaSyB-kcvUy8iMNJ63J0SntzbPcwl6h_PhP9A',
  authDomain: 'catasdetaninos.firebaseapp.com',
  databaseURL: 'https://catasdetaninos.firebaseio.com',
  projectId: 'catasdetaninos',
  storageBucket: 'catasdetaninos.appspot.com',
  messagingSenderId: '96134703967',
  appId: '1:96134703967:web:f65d628d9f972b2a17e4ea',
};

export const matches = [
  /* {
    id: '00',
    date: new Date('20 November 2022 13:00:00 UTC-03:00'),
    teams: ['QA', 'EC'],
  },
  {
    id: '01',
    date: new Date('21 November 2022 13:00:00 UTC-03:00'),
    teams: ['SN', 'NL'],
  },
  {
    id: '02',
    date: new Date('25 November 2022 10:00:00 UTC-03:00'),
    teams: ['QA', 'SN'],
  },
  {
    id: '03',
    date: new Date('25 November 2022 13:00:00 UTC-03:00'),
    teams: ['EC', 'NL'],
  },
  {
    id: '04',
    date: new Date('29 November 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'NL'],
  },
  {
    id: '05',
    date: new Date('29 November 2022 12:00:00 UTC-03:00'),
    teams: ['EC', 'SN'],
  },
  {
    id: '06',
    date: new Date('21 November 2022 10:00:00 UTC-03:00'),
    teams: ['GB-ENG', 'IR'],
  },
  {
    id: '07',
    date: new Date('21 November 2022 16:00:00 UTC-03:00'),
    teams: ['US', 'GB-WLS'],
  },
  {
    id: '08',
    date: new Date('25 November 2022 07:00:00 UTC-03:00'),
    teams: ['IR', 'GB-WLS'],
  },
  {
    id: '09',
    date: new Date('25 November 2022 16:00:00 UTC-03:00'),
    teams: ['GB-ENG', 'US'],
  },
  {
    id: '10',
    date: new Date('29 November 2022 16:00:00 UTC-03:00'),
    teams: ['GB-ENG', 'GB-WLS'],
  },
  {
    id: '11',
    date: new Date('29 November 2022 16:00:00 UTC-03:00'),
    teams: ['IR', 'US'],
  },
  {
    id: '12',
    date: new Date('22 November 2022 07:00:00 UTC-03:00'),
    teams: ['AR', 'SA'],
  },
  {
    id: '13',
    date: new Date('22 November 2022 13:00:00 UTC-03:00'),
    teams: ['MX', 'PL'],
  },
  {
    id: '14',
    date: new Date('26 November 2022 10:00:00 UTC-03:00'),
    teams: ['SA', 'PL'],
  },
  {
    id: '15',
    date: new Date('26 November 2022 16:00:00 UTC-03:00'),
    teams: ['AR', 'MX'],
  },
  {
    id: '16',
    date: new Date('30 November 2022 16:00:00 UTC-03:00'),
    teams: ['AR', 'PL'],
  },
  {
    id: '17',
    date: new Date('30 November 2022 16:00:00 UTC-03:00'),
    teams: ['SA', 'MX'],
  },
  {
    id: '18',
    date: new Date('22 November 2022 18:00:00 UTC-03:00'),
    teams: ['FR', 'AU'],
  },
  {
    id: '19',
    date: new Date('22 November 2022 16:00:00 UTC-03:00'),
    teams: ['DK', 'TN'],
  },
  {
    id: '20',
    date: new Date('26 November 2022 13:00:00 UTC-03:00'),
    teams: ['FR', 'DK'],
  },
  {
    id: '21',
    date: new Date('26 November 2022 7:00:00 UTC-03:00'),
    teams: ['AU', 'TN'],
  },
  {
    id: '22',
    date: new Date('30 November 2022 18:00:00 UTC-03:00'),
    teams: ['FR', 'TN'],
  },
  {
    id: '23',
    date: new Date('30 November 2022 12:00:00 UTC-03:00'),
    teams: ['AU', 'DK'],
  },
  {
    id: '24',
    date: new Date('23 November 2022 12:00:00 UTC-03:00'),
    teams: ['ES', 'CR'],
  },
  {
    id: '25',
    date: new Date('23 November 2022 10:00:00 UTC-03:00'),
    teams: ['DE', 'JP'],
  },
  {
    id: '26',
    date: new Date('27 November 2022 16:00:00 UTC-03:00'),
    teams: ['ES', 'DE'],
  },
  {
    id: '27',
    date: new Date('27 November 2022 7:00:00 UTC-03:00'),
    teams: ['CR', 'JP'],
  },
  {
    id: '28',
    date: new Date('1 December 2022 16:00:00 UTC-03:00'),
    teams: ['ES', 'JP'],
  },
  {
    id: '29',
    date: new Date('1 December 2022 16:00:00 UTC-03:00'),
    teams: ['CR', 'DE'],
  },
  {
    id: '30',
    date: new Date('23 November 2022 16:00:00 UTC-03:00'),
    teams: ['BE', 'CA'],
  },
  {
    id: '31',
    date: new Date('23 November 2022 7:00:00 UTC-03:00'),
    teams: ['MA', 'HR'],
  },
  {
    id: '32',
    date: new Date('27 November 2022 10:00:00 UTC-03:00'),
    teams: ['BE', 'MA'],
  },
  {
    id: '33',
    date: new Date('27 November 2022 13:00:00 UTC-03:00'),
    teams: ['CA', 'HR'],
  },
  {
    id: '34',
    date: new Date('1 December 2022 12:00:00 UTC-03:00'),
    teams: ['BE', 'HR'],
  },
  {
    id: '35',
    date: new Date('1 December 2022 12:00:00 UTC-03:00'),
    teams: ['CA', 'MA'],
  },
  {
    id: '36',
    date: new Date('24 November 2022 16:00:00 UTC-03:00'),
    teams: ['BR', 'RS'],
  },
  {
    id: '37',
    date: new Date('24 November 2022 7:00:00 UTC-03:00'),
    teams: ['CH', 'CM'],
  },
  {
    id: '38',
    date: new Date('28 November 2022 13:00:00 UTC-03:00'),
    teams: ['BR', 'CH'],
  },
  {
    id: '39',
    date: new Date('28 November 2022 7:00:00 UTC-03:00'),
    teams: ['RS', 'CM'],
  },
  {
    id: '40',
    date: new Date('2 December 2022 16:00:00 UTC-03:00'),
    teams: ['BR', 'CM'],
  },
  {
    id: '41',
    date: new Date('2 December 2022 18:00:00 UTC-03:00'),
    teams: ['RS', 'CH'],
  },
  {
    id: '42',
    date: new Date('24 November 2022 13:00:00 UTC-03:00'),
    teams: ['PT', 'GH'],
  },
  {
    id: '43',
    date: new Date('24 November 2022 10:00:00 UTC-03:00'),
    teams: ['UY', 'KR'],
  },
  {
    id: '44',
    date: new Date('28 November 2022 16:00:00 UTC-03:00'),
    teams: ['PT', 'UY'],
  },
  {
    id: '45',
    date: new Date('28 November 2022 10:00:00 UTC-03:00'),
    teams: ['GH', 'KR'],
  },
  {
    id: '46',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['PT', 'KR'],
  },
  {
    id: '47',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['GH', 'UY'],
  }, */
  {
    id: '48',
    date: new Date('3 December 2022 12:00:00 UTC-03:00'),
    teams: ['NL', 'US'],
  },
  {
    id: '49',
    date: new Date('3 December 2022 16:00:00 UTC-03:00'),
    teams: ['AR', 'AU'],
  },
  {
    id: '50',
    date: new Date('4 December 2022 12:00:00 UTC-03:00'),
    teams: ['FR', 'PL'],
  },
  {
    id: '51',
    date: new Date('4 December 2022 16:00:00 UTC-03:00'),
    teams: ['GB-ENG', 'SN'],
  },
  {
    id: '52',
    date: new Date('5 December 2022 12:00:00 UTC-03:00'),
    teams: ['JP', 'CR'],
  },
  {
    id: '53',
    date: new Date('5 December 2022 16:00:00 UTC-03:00'),
    teams: ['BR', 'KR'],
  },
  {
    id: '54',
    date: new Date('6 December 2022 12:00:00 UTC-03:00'),
    teams: ['MA', 'ES'],
  },
  {
    id: '55',
    date: new Date('6 December 2022 16:00:00 UTC-03:00'),
    teams: ['PT', 'CH'],
  },
  /*  {
    id: '56',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '57',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '58',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '59',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '60',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '61',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '62',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  },
  {
    id: '63',
    date: new Date('2 December 2022 12:00:00 UTC-03:00'),
    teams: ['QA', 'QA'],
  }, */
];

export const groups = [
  /* {
    id: 'groupTest',
    label: 'Grupo de Prueba',
    teams: ['QA', 'EC', 'SN', 'NL'],
    matches: ['100', '101', '102', '103', '104', '105'],
  },
  {
    id: 'groupA',
    label: 'Grupo A',
    teams: ['QA', 'EC', 'SN', 'NL'],
    matches: ['00', '01', '02', '03', '04', '05'],
  },
  {
    id: 'groupB',
    label: 'Grupo B',
    teams: ['GB-ENG', 'IR', 'US', 'GB-WLS'],
    matches: ['06', '07', '08', '09', '10', '11'],
  },
  {
    id: 'groupC',
    label: 'Grupo C',
    teams: ['AR', 'SA', 'MX', 'PL'],
    matches: ['12', '13', '14', '15', '16', '17'],
  },
  {
    id: 'groupD',
    label: 'Grupo D',
    teams: ['FR', 'AU', 'DK', 'TN'],
    matches: ['18', '19', '20', '21', '22', '23'],
  },
  {
    id: 'groupE',
    label: 'Grupo E',
    teams: ['ES', 'CR', 'DE', 'JP'],
    matches: ['24', '25', '26', '27', '28', '29'],
  },
  {
    id: 'groupF',
    label: 'Grupo F',
    teams: ['BE', 'CA', 'MA', 'HR'],
    matches: ['30', '31', '32', '33', '34', '35'],
  },
  {
    id: 'groupG',
    label: 'Grupo G',
    teams: ['BR', 'RS', 'CH', 'CM'],
    matches: ['36', '37', '38', '39', '40', '41'],
  },
  {
    id: 'groupH',
    label: 'Grupo H',
    teams: ['PT', 'GH', 'UY', 'KR'],
    matches: ['42', '43', '44', '45', '46', '47'],
  }, */
  {
    id: 'octavos',
    label: 'Octavos',
    teams: ['NL', 'US', 'AR', 'AU', 'FR', 'PL', 'GB-ENG', 'SN', 'JP', 'CR', 'BR', 'KR', 'MA', 'ES', 'PT', 'CH'],
    matches: ['48', '49', '50', '51', '52', '53', '54', '55'],
  },
];
