export default interface Expense {
  id: string,
  title: string
  categoryId: string
  tag: string
  date: Date,
  amount: number,
  userId: string
}