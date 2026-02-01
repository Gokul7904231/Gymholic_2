import { Button } from '@/components/ui/button';

interface Props {
  daysLeft: number;
  onUpgrade: () => void;
}

const TrialBadge = ({ daysLeft, onUpgrade }: Props) => {
  const urgent = daysLeft <= 1;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-1.5 rounded-full border text-sm font-medium
      ${urgent
        ? 'bg-red-50 text-red-600 border-red-200'
        : 'bg-orange-50 text-orange-600 border-orange-200'
      }`}
    >
      ⏳ Trial: {daysLeft} day{daysLeft !== 1 && 's'} left
      <Button
        size="sm"
        className="h-7 px-3 text-xs"
        onClick={onUpgrade}
      >
        Upgrade
      </Button>
    </div>
  );
};

export default TrialBadge;
