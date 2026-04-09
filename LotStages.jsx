import React from 'react';
import { Camera, Smartphone, Zap, Clock, PhoneForwarded, UserCircle, MessageSquare } from 'lucide-react';
import { discoveryFields } from '../constants/data';

export default function LotStages({ selectedStage, leadDetails, handleInputChange, setStatus }) {
  return (
    <>
      {selectedStage === 'Meet and Greet' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in slide-in-from-right-4">
          {discoveryFields.map(field => (
            <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
              <label className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
              <input 
                type="text" 
                name={field.name} 
                value={leadDetails[field.name]} 
                onChange={handleInputChange} 
                className="w-full p-4 text-base border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold" 
                placeholder={field.placeholder} 
              />
            </div>
          ))}
        </div>
      )}

      {selectedStage === 'Build Rapport' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <UserCircle className="w-5 h-5 text-blue-500" />
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Things About Me (Your Hooks)</h3>
            </div>
            <div className="grid gap-4">
              <div className="p-5 bg-blue-50 rounded-3xl border-2 border-blue-200">
                <p className="text-xs font-black text-blue-600 mb-2 uppercase tracking-widest">INTERESTING WEEK</p>
                <p className="text-base text-blue-900 leading-snug font-bold italic">
                  "Girl I’m seeing had a dream where I said I was getting good food but when she asked for some I told her I’d gotten her Oreos. She texted me with 'you made me mad'."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">ORIGIN</p>
                  <p className="text-lg font-black text-slate-700">Kaplan</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">HOBBY</p>
                  <p className="text-lg font-black text-slate-700">Shoot Pool</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Get Them Talking</h3>
            </div>
            <div className="space-y-3">
              <div className="group flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1" />
                <p className="text-base font-bold text-slate-700">How’s your week / weekend been?</p>
              </div>
              <div className="group flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1" />
                <div>
                  <p className="text-base font-bold text-slate-700">"I really like your __ (watch, shoes…)"</p>
                  <p className="text-sm text-slate-500 mt-1 font-bold italic">Bridge: "Where’d you get them? I’m always looking for ones like that."</p>
                </div>
              </div>
              <div className="group flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1" />
                <div>
                  <p className="text-base font-bold text-slate-700">If couple: "How long have y’all been together?"</p>
                  <p className="text-sm text-slate-500 mt-1 font-bold italic">Hook: "I’ve been talking to this girl…" (use Oreo story here)</p>
                </div>
              </div>
              <div className="group flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1" />
                <div>
                  <p className="text-base font-bold text-slate-700">"Any pets / kids?"</p>
                  <p className="text-sm text-slate-500 mt-1 font-bold italic">Link: "My sister has..." (build common ground)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedStage === 'Test Drive' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 bg-blue-50/50 rounded-3xl border-2 border-blue-100">
            <div className="flex items-center space-x-4 bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
              <input 
                type="checkbox" 
                id="hasLicense" 
                name="hasLicense" 
                checked={leadDetails.hasLicense} 
                onChange={handleInputChange} 
                className="w-8 h-8 text-blue-600 rounded-lg border-slate-300 focus:ring-blue-500" 
              />
              <label htmlFor="hasLicense" className="flex items-center text-lg font-black text-slate-700 cursor-pointer select-none">
                <Camera className="w-6 h-6 mr-2 text-blue-500" />
                License Photo Taken
              </label>
            </div>
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
              <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                <Smartphone className="w-4 h-4 mr-1" /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phoneNumber" 
                value={leadDetails.phoneNumber} 
                onChange={handleInputChange} 
                className="w-full p-2 text-xl font-bold border-b-2 border-slate-100 focus:border-blue-500 outline-none transition-all" 
                placeholder="(555) 000-0000" 
              />
            </div>
          </div>

          {discoveryFields.some(f => !leadDetails[f.name]) && (
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Missing Discovery Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {discoveryFields.map(field => (
                  !leadDetails[field.name] && (
                    <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
                      <label className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
                      <input 
                        type="text" 
                        name={field.name} 
                        value={leadDetails[field.name]} 
                        onChange={handleInputChange} 
                        className="w-full p-4 text-base border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold" 
                        placeholder={field.placeholder} 
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedStage === 'Soft Close' && (
        <div className="space-y-10 animate-in zoom-in-95 duration-300 text-center">
            <p className="text-2xl font-black italic text-slate-800 leading-tight px-4">"Is this something that you’re looking to move forward with today?"</p>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setStatus('softClose', 'Yes')} className={`p-8 rounded-3xl border-4 font-black text-3xl italic transition-all active:scale-95 ${leadDetails.softClose === 'Yes' ? 'bg-blue-600 text-white border-blue-700 shadow-2xl' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>YES</button>
                <button onClick={() => setStatus('softClose', 'No')} className={`p-8 rounded-3xl border-4 font-black text-3xl italic transition-all active:scale-95 ${leadDetails.softClose === 'No' ? 'bg-slate-800 text-white border-slate-900 shadow-2xl' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>NO</button>
            </div>
            
            {leadDetails.softClose === 'No' && (
                <div className="space-y-6 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4 duration-300 text-left">
                    <div>
                        <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2"><Zap className="w-4 h-4 mr-1 text-orange-400" /> What’s stopping them?</label>
                        <textarea name="softCloseStopping" value={leadDetails.softCloseStopping} onChange={handleInputChange} rows="2" className="w-full p-4 text-base border-2 border-slate-100 rounded-2xl focus:border-slate-800 outline-none font-bold" placeholder="Objection details..." />
                    </div>
                    <div>
                        <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2"><Clock className="w-4 h-4 mr-1 text-blue-400" /> Timeframe?</label>
                        <input type="text" name="softCloseTimeframe" value={leadDetails.softCloseTimeframe} onChange={handleInputChange} className="w-full p-4 text-base border-2 border-slate-100 rounded-2xl focus:border-slate-800 outline-none font-bold" placeholder="Next week? 3 months?" />
                    </div>
                    <div>
                        <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2"><PhoneForwarded className="w-4 h-4 mr-1 text-emerald-400" /> Follow up plan?</label>
                        <input type="text" name="softCloseFollowUp" value={leadDetails.softCloseFollowUp} onChange={handleInputChange} className="w-full p-4 text-base border-2 border-slate-100 rounded-2xl focus:border-slate-800 outline-none font-bold" placeholder="Text on Friday..." />
                    </div>
                </div>
            )}
        </div>
      )}
    </>
  );
}