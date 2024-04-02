export const CategoryData = [
  {
    id: "1",
    name: "Food",
    icon: "fast-food",
  },
  {
    id: "2",
    name: "Travel",
    icon: "bus",
  },
  {
    id: "3",
    name: "Bill",
    icon: "cart",
  },
  {
    id: "4",
    name: "Health",
    icon: "medkit",
  },
  {
    id: "5",
    name: "Clothes",
    icon: "shirt",
  },
  {
    id: "6",
    name: "Investment",
    icon: "cash",
  },
  {
    id: "7",
    name: "Edu",
    icon: "school",
  },
  {
    id: "8",
    name: "Others",
    icon: "ellipsis-horizontal",
  },
];

export const ExpenseData = [
  {
    id: "1",
    amount: 100,
    category: CategoryData[0],
    note: "Some bananas",
    date: new Date("2023-12-19"),
  },
  {
    id: "2",
    amount: 200,
    category: CategoryData[1],
    note: "Bus",
    date: new Date('2022-01-05'),
  },
  {
    id: "3",
    amount: 300,
    category: CategoryData[2],
    note: "Electricity bill",
    date: new Date('2021-12-01'),
  },
  {
    id: "4",
    amount: 400,
    category: CategoryData[3],
    note: "Medicine",
    date: new Date('2022-02-19'),
  },
  {
    id: "5",
    amount: 500,
    category: CategoryData[4],
    note: "Shirt from Zara",
    date: new Date('2022-02-18'),
  },
  {
    id: "6",
    amount: 600,
    category: CategoryData[5],
    note: "Investment for Bitcoin",
    date: new Date('2022-02-18'),
  },
  {
    id: "7",
    amount: 700,
    category: CategoryData[6],
    note: "Buying course on Udemy",
    date: new Date('2022-02-19'),
  },
  {
    id: "8",
    amount: 800,
    category: CategoryData[7],
    note: "Fixing the car",
    date: new Date('2022-02-18'),
  },
];
