export default function PluginCardSkeleton() { 
  return (
    <div className="animate-pulse flex flex-col justify-between bg-gray-100 px-6 py-6 rounded-md">
      <div className="w-12 h-12 bg-gray-300 rounded-sm"></div>
      <div className="mt-4 w-2/3 h-8 bg-gray-300 rounded"></div>
      <div className="mt-2 w-full h-4 bg-gray-300 rounded"></div>
      <div className="mt-2 w-4/5 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}