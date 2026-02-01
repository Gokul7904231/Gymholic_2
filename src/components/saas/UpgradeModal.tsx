import { Button } from '@/components/ui/button';

const UpgradeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-2">Upgrade Your Plan</h2>
        <p className="text-muted-foreground mb-6">Unlock analytics, unlimited bookings & insights.</p>

        <div className="border rounded-xl p-4 mb-4">
          <p className="font-semibold">Pro Plan</p>
          <p className="text-2xl font-bold mt-1">₹999 / month</p>
        </div>

        <Button
          className="w-full mb-3"
          onClick={() => {
            localStorage.setItem('trialStart', 'expired');
            onClose();
          }}
        >
          Upgrade Now
        </Button>

        <Button variant="ghost" className="w-full" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UpgradeModal;
