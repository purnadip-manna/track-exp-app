export default interface Expense {
  id: string,
  title: string
  category: string
  tag: string
  date: Date,
  amount: number,
  userId: string
}