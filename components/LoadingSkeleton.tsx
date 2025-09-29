export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-slate-800/50 rounded-lg p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="h-4 w-4 bg-slate-700 rounded"></div>
              <div className="h-4 w-32 bg-slate-700 rounded"></div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="h-4 w-24 bg-slate-700 rounded"></div>
              <div className="h-4 w-24 bg-slate-700 rounded"></div>
              <div className="h-4 w-20 bg-slate-700 rounded"></div>
              <div className="h-4 w-16 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}