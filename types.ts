
export interface Donation {
  id: number;
  donorName: string;
  donorAvatar: string;
  amount: number;
  date: string;
}

export interface ChartDataPoint {
  name: string;
  donations: number;
}
