export type WeeklyRevenueItem = {
  day: string
  totalPayment: number
}

export type RevenueData = {
  weeklyRevenue: WeeklyRevenueItem[]
  totalOrders: number
  totalBookings: number
  totalCustomerUsers: number
  totalRevenue: number
}
