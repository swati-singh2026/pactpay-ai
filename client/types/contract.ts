export interface Contract {
  id: number;

  contractName: string;

  client: string;

  freelancer: string;

  escrowAmount: number;

  milestone: string;

  aiRisk: "Low" | "Medium" | "High";

  paymentStatus: "Locked" | "Released" | "Pending" | "Processing" | "Completed";

  contractStatus:
    | "Draft"
    | "Review"
    | "Active"
    | "Pending"
    | "Completed"
    | "Cancelled";

  dueDate: string;
}
