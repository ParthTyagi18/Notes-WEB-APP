import { Link } from 'react-router-dom';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center font-mono border-2 border-dashed border-green-500/30 rounded-lg my-8">
      <div className="text-5xl mb-4 opacity-50">📝</div>
      
      <h2 className="text-2xl font-bold text-green-500 mb-2 uppercase">
        No Notes Found
      </h2>
      
      <p className="text-green-400/70 mb-6">
        Your notebook is empty. Time to start writing!
      </p>
      
      <Link
        to="/create"
        className="px-6 py-3 bg-green-500 text-black font-bold uppercase tracking-wider rounded hover:bg-green-400 transition-colors"
      >
        + Create First Note
      </Link>
    </div>
  );
};

export default EmptyState;