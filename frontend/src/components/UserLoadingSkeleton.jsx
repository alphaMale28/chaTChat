function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-slate-800/30 p-4 rounded-lg animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#353558]/80 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-[#3b3b66]/50 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-[#2f2f5a]/60 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;
