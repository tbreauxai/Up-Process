import React from 'react';

export default function LotStages({ selectedStage }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-700">Lot Stages</h3>
      <p className="text-slate-500">Current Stage: {selectedStage}</p>
    </div>
  );
}