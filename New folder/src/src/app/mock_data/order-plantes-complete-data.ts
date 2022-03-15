import { NewOrderPlantsCompleteInnerTableModel } from "../screens/order-plants-complete/new-order-plantes-complete-expanding-table/components/new-order-plants-complete-inner-table/new-order-plants-complete-inner-table.model";

export const NEW_ORDER_PLANTS_COMPLETE_INNER_TABLE :NewOrderPlantsCompleteInnerTableModel[]= [
  {
    id: 'string' ,
    mashtela: 'string',
    kamut: 12,
    lakoach: 'string',
    phone: 'string',
    address: 'string',
    email: 'asdasda',
  },
];

export const regularFormSecondTable = [
  {
    //   value: '',
    //   key: 'tzemach',
    //   required: true,
    //   controlType: 'text',
    //   type: 'text',
    //   options: [
    //     { key: 'string', value: 'string' },
    //     { key: 'string1', value: 'string1' },
    //   ],
    // },

    value: '',
    key: 'ashtaol',
    required: true,
    controlType: 'text',
    type: 'text',
    options: [
      { key: 'string', value: 'string' },
      { key: 'string1', value: 'string1' },
    ],
  },
  {
    value: '',
    key: 'golani',
    required: true,
    controlType: 'text',
    type: 'text',
    options: [
      { key: 'string', value: 'string' },
      { key: 'string1', value: 'string1' },
    ],
  },
  {
    value: '',
    key: 'gilat',
    required: true,
    controlType: 'text',
    type: 'text',
    options: [
      { key: 'string', value: 'string' },
      { key: 'string1', value: 'string1' },
    ],
  },
  // {
  //   value: '',
  //   key: 'totalToCreate',
  //   required: true,
  //   controlType: 'text',
  //   type: 'text',
  //   options: [
  //     { key: 'string', value: 'string' },
  //     { key: 'string1', value: 'string1' },
  //   ],
  // },
];
export const regularHeadersSecondTable = [
  'צמח',
  'אשתאול',
  'גולני',
  'גילת',
  'סה"כ כמות ליצור',
];

export const regularDataSecondTable = [
  {
    flower: 'בלום אורנה',
    ashtaol: '054-7894561',
    golani: 'יסוד המעלה 58 דונם',
    gilat: 'tsurithefer@gmail.com',
    totalToCreate: 'אקליפטוס המקור',
    controllers: true,
  },
  {
    flower: 'בלום אורנה',
    ashtaol: '054-7894561',
    adress: 'יסוד המעלה 58 דונם',
    gilat: 'tsurithefer@gmail.com',
    totalToCreate: 'אקליפטוס המקור',
    controllers: true,
  },
];

export const expandableSecondTableHeaders = [
  { english: 'tzemach', hebrew: 'צמח' },
  { english: 'kamut', hebrew: 'כמות' },
  { english: 'controllers', hebrew: '' },
];

export const expandableSecondTableDataArray = [
  {
    tzemach: 'אקליפטוס המקור',
    kamut: '10000',
    controllers: true,
  },
  {
    plant: 'אקליפטוס המקור',
    amount: '10000',
    controllers: true,
  },
];

export const expandableSecondTableTablesObj = {
  headers: ['כמות', 'לקוח', 'טלפון', 'כתובת', 'דוא"ל'],
  form: [
    {
      value: '',
      key: 'kamut',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'lakoach',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'phone',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'address',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'email',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
  ],
  data: [
    {
      amount: '500',
      customer: 'בלום אורנה',
      phone: '054-7894561',
      adress: 'יסוד המעלה 58 דונם',
      email: 'tsurithefer@gmail.com',
      controllers: false,
    },
    {
      amount: '500',
      customer: 'בלום אורנה',
      phone: '054-7894561',
      adress: 'יסוד המעלה 58 דונם',
      email: 'tsurithefer@gmail.com',
      controllers: false,
    },
  ],
};

export const expandableTableHeaders = [
  { english: 'tzemach', hebrew: 'צמח' },
  { english: 'eshtaol', hebrew: 'אשתאול' },
  { english: 'golani', hebrew: 'גולני' },
  { english: 'gilat', hebrew: 'גילת' },
  { english: 'total', hebrew: 'סה"כ' },
  { english: 'controllers', hebrew: '' },
];

export const expandableTableDataArray: any = [
  {
    tzemach: 'אקליפטוס המקור',
    eshtaol: '10000',
    golani: '5000',
    gilat: '120',
    total: '15000',
    controllers: true,
  },
  {
    tzemach: 'אקליפטוס המקור',
    eshtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
    controllers: true,
  },
];
export const expdandableTableTablesObj = {
  headers: ['משתלה', 'כמות', 'לקוח', 'טלפון', 'כתובת', 'דוא"ל'],
  form: [
    {
      value: '',
      key: 'mashtela',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },

    {
      value: '',
      key: 'kamut',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'lakoach',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'phone',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'address',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
    {
      value: '',
      key: 'email',
      required: true,
      controlType: 'text',
      type: 'text',
      options: [
        { key: 'string', value: 'string' },
        { key: 'string1', value: 'string1' },
      ],
    },
  ],
  data: [
    {
      gardening: 'אשתאול',
      amount: '500',
      customer: 'בלום אורנה',
      phone: '054-7894561',
      adress: 'יסוד המעלה 58 דונם',
      email: 'tsurithefer@gmail.com',
      controllers: false,
    },
    {
      gardening: 'אשתאול',
      amount: '500',
      customer: 'בלום אורנה',
      phone: '054-7894561',
      adress: 'יסוד המעלה 58 דונם',
      email: 'tsurithefer@gmail.com',
      controllers: false,
    },
  ],
};
export const treeTypes = [
  {
    name: 'מחטניים',
    filterValue: 'coniferous',
    count: 520,
    urlSrc: 'assets/images/spatial-christmas-tree.svg',
  },
  {
    name: 'חורש טבעי',
    filterValue: 'grove',
    count: 33,
    urlSrc: 'assets/images/spatial-tree.svg',
  },
  {
    name: 'אקליפטוס',
    filterValue: 'eucalyptus',
    count: 5350,
    urlSrc: 'assets/images/spatial-eucalyptus.svg',
  },
  {
    name: 'שיטים',
    filterValue: 'acacia',
    count: 220,
    urlSrc: 'assets/images/spatial-tree-black-silhouette-shape.svg',
  },
  {
    name: 'עצי ושיחי נוי',
    filterValue: 'ornamentalTree',
    count: 1230,
    urlSrc: 'assets/images/spatial-shape.svg',
  },
  {
    name: 'הכול',
    filterValue: 'all',
    count: 1230,
    urlSrc: 'assets/images/spatial-shape.svg',
  },
];
export const secondTreeTypes = [
  {
    name: 'אשתאול',
    filterValue: 'ashtaol',
    count: 520,
    urlSrc: 'assets/images/spatial-christmas-tree.svg',
  },
  {
    name: 'גולני',
    filterValue: 'golani',
    count: 33,
    urlSrc: 'assets/images/spatial-tree.svg',
  },
  {
    name: 'גילת',
    filterValue: 'gilat',
    count: 5350,
    urlSrc: 'assets/images/spatial-eucalyptus.svg',
  },

  {
    name: 'הכול',
    filterValue: 'all',
    count: 1230,
    urlSrc: 'assets/images/spatial-shape.svg',
  },
];
