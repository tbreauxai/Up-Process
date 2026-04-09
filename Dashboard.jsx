import React from 'react';
import { Phone, Users, ClipboardList, CheckCircle2, Camera, Trash2, Sparkles, Copy, Loader2 } from 'lucide-react';
import { lotStages, phoneStages, lotChecklist, phoneChecklist } from './data.js';

export default function Dashboard({ 
  upType, setUpType, 
  selectedStage, setSelectedStage, 
  savedLeads, 
  hasData, resetCurrentLead, handleCapture, 
  leadDetails, 
  generateGeminiContent, generatingId, generatingType, copyToClipboard 
}) {
  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-black tracking-tighter text-slate-800 italic uppercase underline decoration-blue-600 underline-offset-4">Lead Tracker</h1>
        </div>
        {hasData() && (
          <button onClick={resetCurrentLead} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </header>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-6">
            <button onClick={() => setUpType('phone')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center ${upType === 'phone' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>
              <Phone className="w-4 h-4 mr-2" /> Phone Up
            </button>
            <button onClick={() => setUpType('lot')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center ${upType === 'lot' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}>
              <Users className="w-4 h-4 mr-2" /> Lot Up
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(upType === 'lot' ? lotStages : phoneStages).map(stage => (
              <button key={stage} type="button" onClick={() => setSelectedStage(stage)} className={`active:scale-95 relative p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center min-h-[90px] shadow-sm ${selectedStage === stage ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 hover:border-blue-200 text-slate-600'}`}>
                <span className="font-black text-[11px] uppercase tracking-wider">{stage}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-2">
        <button onClick={handleCapture} disabled={!hasData()} className={`w-full relative flex items-center justify-center py-6 px-4 rounded-3xl font-black text-xl italic uppercase transition-all shadow-2xl active:scale-95 ${hasData() ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
          <Camera className="w-7 h-7 absolute left-8 opacity-50" />
          Capture Snapshot
        </button>
      </div>

      {hasData() && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Live Discovery Record</h2>
          <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-2xl p-6 space-y-3">
              {(upType === 'lot' ? lotChecklist : phoneChecklist).map((item) => {
                  const val = leadDetails[item.key];
                  const isMissing = item.type === 'bool' ? !val : !val || val.trim() === '';
                  return (
                      <div key={item.key} className="flex items-center justify-between border-b border-slate-50 pb-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase">{item.label}</span>
                          <div className="flex items-center">
                              {isMissing ? (
                                  <span className="text-[11px] font-black text-red-500 italic uppercase">N/A</span>
                              ) : (
                                  <span className="text-[11px] font-black text-emerald-600 uppercase flex items-center">
                                      <CheckCircle2 className="w-3 h-3 mr-1" />
                                      {item.type === 'bool' ? 'YES' : val}
                                  </span>
                              )}
                          </div>
                      </div>
                  );
              })}
          </div>
        </div>
      )}

      {savedLeads.length > 0 && (
        <div className="mt-12 space-y-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Recent Archives</h2>
          {savedLeads.map(lead => (
            <div key={lead.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className={`p-2 rounded-xl flex-shrink-0 ${lead.type === 'phone' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {lead.type === 'phone' ? <Phone className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono whitespace-pre-wrap text-slate-700 leading-relaxed">{lead.data}</p>
                  <p className="text-[9px] font-black text-slate-300 mt-3 uppercase">{lead.timestamp}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 mt-2 border-t border-slate-100">
                     <button onClick={() => generateGeminiContent(lead.id, 'crm', lead.rawData)} disabled={generatingId === lead.id} className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-colors disabled:opacity-50">
                       {generatingId === lead.id && generatingType === 'crm' ? <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1.5" />}
                       ✨ Gen CRM Note
                     </button>
                     <button onClick={() => generateGeminiContent(lead.id, 'sms', lead.rawData)} disabled={generatingId === lead.id} className="flex items-center px-3 py-2 bg-pink-50 text-pink-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-pink-100 transition-colors disabled:opacity-50">
                       {generatingId === lead.id && generatingType === 'sms' ? <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1.5" />}
                       ✨ Draft Follow-Up
                     </button>
                  </div>

                  {lead.crmNote && (
                    <div className="mt-4 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl relative group">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Generated CRM Note</p>
                      <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">{lead.crmNote}</p>
                      <button onClick={() => copyToClipboard(lead.crmNote)} className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-600 transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>
                  )}

                  {lead.followUpSms && (
                    <div className="mt-4 p-4 bg-pink-50/50 border border-pink-100 rounded-2xl relative group">
                      <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-2 flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Drafted SMS Message</p>
                      <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">{lead.followUpSms}</p>
                      <button onClick={() => copyToClipboard(lead.followUpSms)} className="absolute top-4 right-4 text-pink-300 hover:text-pink-600 transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}