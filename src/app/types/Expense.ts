export default interface Expense {
  id: string,
  title: string
  category: string
  subCategory: string
  date: Date,
  amount: number,
  userId: string
}