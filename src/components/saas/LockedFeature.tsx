const LockedFeature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none">{children}</div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
        <p className="font-semibold mb-2">Premium Feature</p>
        <p className="text-sm text-muted-foreground mb-3">Upgrade to unlock analytics</p>
      </div>
    </div>
  );
};

export default LockedFeature;
