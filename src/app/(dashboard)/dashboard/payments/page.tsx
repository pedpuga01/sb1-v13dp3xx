import { PaymentsHeader } from '@/components/payments/payments-header';
import { PaymentsTable } from '@/components/payments/payments-table';

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PaymentsHeader />
      <PaymentsTable />
    </div>
  );
}