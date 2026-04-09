import React from 'react';

export default function Dashboard({ upType, setUpType, selectedStage, setSelectedStage }) {
  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-200">
      <h2 className="text-2xl font-black italic uppercase text-slate-800 mb-6">Dashboard</h2>
      <button 
        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-sm"
        onClick={() => setSelectedStage('Discovery')}
      >
        Start {upType.toUpperCase()} Stage
      </button>
    </div>
  );
}