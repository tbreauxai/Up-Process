import React from 'react';
import { CalendarCheck, Clock } from 'lucide-react';

export default function PhoneStages({ selectedStage, leadDetails, handleInputChange, setStatus, phoneDiscoveryType, setPhoneDiscoveryType }) {
  return (
    <>
      {selectedStage === 'Phone Intro' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
          <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 italic font-black text-blue-900 leading-snug">
            "Good Morning / Afternoon this is Tyler with Giles Volvo and who do I have the pleasure of speaking with today?"
          </div>
          <input type="text" name="names" value={leadDetails.names} onChange={handleInputChange} className="w-full p-4 text-lg border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold" placeholder="Customer Name" />
          <div className="p-5 bg-slate-50 rounded-2xl italic font-bold text-slate-600">
            "And just in case we get disconnected, is the number I’m seeing the best one to reach you back at?"
          </div>
          <input type="tel" name="phoneNumber" value={leadDetails.phoneNumber} onChange={handleInputChange} className="w-full p-4 text-lg border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold" placeholder="Phone Number" />
          <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200 font-black text-emerald-900 italic uppercase text-center">
            "Perfect, and how can I help you today?"
          </div>
        </div>
      )}

      {selectedStage === 'Discovery' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                <button onClick={() => setPhoneDiscoveryType('specific')} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${phoneDiscoveryType === 'specific' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>SPECIFIC</button>
                <button onClick={() => setPhoneDiscoveryType('non-specific')} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${phoneDiscoveryType === 'non-specific' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>NON-SPECIFIC</button>
            </div>
            {phoneDiscoveryType === 'specific' ? (
                <div className="space-y-12">
                    <div className="space-y-4">
                        <p className="p-5 bg-blue-50 rounded-2xl italic font-bold text-blue-800 border border-blue-100">"Perfect, did you happen to see a stock number listed so I can make sure we’re talking about the same one?"</p>
                        <input name="stockNumber" value={leadDetails.stockNumber} onChange={handleInputChange} className="w-full p-4 border-2 border-slate-100 rounded-2xl font-black text-lg focus:border-blue-500 outline-none" placeholder="Stock #" />
                    </div>
                    <div className="space-y-4">
                        <p className="p-5 bg-slate-50 rounded-2xl italic font-bold text-slate-600 border border-slate-200">"Got it, that’s the ‘Color’ one with ___ miles for ____$ right?"</p>
                        <input name="vehicleOfInterest" value={leadDetails.vehicleOfInterest} onChange={handleInputChange} className="w-full p-4 border-2 border-slate-100 rounded-2xl font-black text-lg focus:border-blue-500 outline-none" placeholder="Vehicle Info" />
                    </div>
                    <div className="space-y-4">
                        <p className="p-6 bg-indigo-50 rounded-3xl border-4 border-indigo-200 font-black text-indigo-900 italic text-xl">"I believe you're in luck that one is still available. What was it that you saw that you liked about it?"</p>
                        <textarea name="buyingReason" value={leadDetails.buyingReason} onChange={handleInputChange} className="w-full p-5 border-2 border-slate-100 rounded-3xl focus:border-indigo-500 outline-none font-bold" rows="2" placeholder="Describe affinity..." />
                    </div>
                    <div className="space-y-6 pt-8 border-t border-slate-100">
                        <p className="p-5 bg-emerald-50 rounded-2xl font-black text-emerald-900 italic text-lg border border-emerald-200">"Are you currently a {leadDetails.vehicleOfInterest?.split(' ')[1] || 'Brand'} owner?"</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setStatus('phoneOwnerStatus', 'Yes')} className={`p-6 rounded-3xl border-4 font-black text-xl italic transition-all ${leadDetails.phoneOwnerStatus === 'Yes' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>YES</button>
                            <button onClick={() => setStatus('phoneOwnerStatus', 'No')} className={`p-6 rounded-3xl border-4 font-black text-xl italic transition-all ${leadDetails.phoneOwnerStatus === 'No' ? 'bg-slate-800 text-white border-slate-900' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>NO</button>
                        </div>
                        {leadDetails.phoneOwnerStatus === 'No' && (
                            <div className="space-y-4 pt-4">
                                <p className="p-4 bg-slate-100 rounded-2xl font-bold text-slate-700 italic">"What are you currently driving?"</p>
                                <input name="currentDriver" value={leadDetails.currentDriver} onChange={handleInputChange} className="w-full p-4 border-2 border-slate-100 rounded-2xl font-black" placeholder="Current Driver" />
                            </div>
                        )}
                        {leadDetails.phoneOwnerStatus && (
                            <div className="space-y-6 pt-6">
                                <div className="p-6 bg-blue-50 rounded-3xl border-2 border-blue-300 font-black text-blue-900 italic text-lg leading-tight">
                                    "Awesome we're always looking for clean {leadDetails.phoneOwnerStatus === 'Yes' ? (leadDetails.vehicleOfInterest?.split(' ')[1] || 'Brand') : (leadDetails.currentDriver || 'Trade')}'s for our pre-owned lot, were you planning to trade in?"
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => setStatus('wantsToTrade', 'Yes')} className={`p-4 rounded-2xl border-2 font-black ${leadDetails.wantsToTrade === 'Yes' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-400'}`}>YES, TRADE</button>
                                    <button onClick={() => setStatus('wantsToTrade', 'No')} className={`p-4 rounded-2xl border-2 font-black ${leadDetails.wantsToTrade === 'No' ? 'bg-slate-800 text-white border-slate-900' : 'bg-white text-slate-400'}`}>NO TRADE</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="p-10 text-center text-slate-300 font-black uppercase italic">Non-Specific flow pending...</div>
            )}
        </div>
      )}

      {selectedStage === 'Trade-in' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
            {leadDetails.wantsToTrade === 'Yes' ? (
                <div className="space-y-12">
                    <div className="space-y-4">
                        <p className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-300 italic font-black text-blue-900">"Have you had it appraised before?"</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setStatus('hasAppraised', 'Yes')} className={`p-4 rounded-xl border-2 font-black ${leadDetails.hasAppraised === 'Yes' ? 'bg-blue-600 text-white' : 'bg-white'}`}>YES</button>
                            <button onClick={() => setStatus('hasAppraised', 'No')} className={`p-4 rounded-xl border-2 font-black ${leadDetails.hasAppraised === 'No' ? 'bg-slate-800 text-white' : 'bg-white'}`}>NO</button>
                        </div>
                    </div>
                    {leadDetails.hasAppraised === 'Yes' && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="p-4 bg-slate-50 italic font-bold text-slate-600 border border-slate-200 rounded-xl">"How long ago was that?"</p>
                                <input name="appraisalTime" value={leadDetails.appraisalTime} onChange={handleInputChange} className="w-full p-4 border-2 rounded-2xl font-bold" placeholder="Timeframe" />
                            </div>
                            <div className="space-y-4">
                                <p className="p-5 bg-slate-50 italic font-bold text-slate-700 leading-snug rounded-xl border border-slate-200">
                                    "Was there something you didn't like about the trade value that prevented you from moving forward with a purchase at the time?"
                                </p>
                                <textarea name="tradeValueObjection" value={leadDetails.tradeValueObjection} onChange={handleInputChange} className="w-full p-5 border-2 rounded-2xl font-bold focus:border-blue-500 outline-none" rows="3" placeholder="Objection details..." />
                            </div>
                        </div>
                    )}
                    <div className="p-6 bg-emerald-50 rounded-3xl border-4 border-emerald-300 font-black text-emerald-900 italic text-xl leading-snug">
                        "Well we are extremely aggressive with our trade values. What I'd like to do is set up an appointment for you to swing by so that we can take a look at your trade and the {leadDetails.vehicleOfInterest || 'vehicle'} together. It looks like I currently have _:00 today / tomorrow morning and _:30 available today / tomorrow afternoon which would work better?"
                    </div>
                </div>
            ) : (
                <div className="space-y-12">
                    <div className="space-y-4">
                        <p className="p-5 bg-slate-50 rounded-2xl italic font-bold text-slate-600 border border-slate-200">
                            "Ah well, as much as we'd have loved it for the lot, that's not a problem. out of curiosity, what do you plan to do with it when you buy the {leadDetails.vehicleOfInterest || 'vehicle'}?"
                        </p>
                        <input name="futurePlan" value={leadDetails.futurePlan} onChange={handleInputChange} className="w-full p-4 border-2 rounded-2xl font-black focus:border-slate-800 outline-none" placeholder="Future plan..." />
                    </div>
                    <div className="p-6 bg-emerald-50 rounded-3xl border-4 border-emerald-300 font-black text-emerald-900 italic text-xl leading-snug mt-4">
                        "That sounds like a great idea. What I'd like to do is set up an appointment for you to come check out the {leadDetails.vehicleOfInterest || 'vehicle'} in person and make sure that it fits your needs. It looks like I currently have _:00 today / tomorrow morning and _:30 available today / tomorrow afternoon which would work better?"
                    </div>
                </div>
            )}
        </div>
      )}

      {selectedStage === 'Appointment' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <p className="text-xl font-black italic text-slate-800 leading-tight">Are we booking an appointment today?</p>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setStatus('apptStatus', 'Yes')} className={`p-8 rounded-3xl border-4 font-black text-2xl italic transition-all active:scale-95 ${leadDetails.apptStatus === 'Yes' ? 'bg-blue-600 text-white border-blue-700 shadow-2xl' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>YES</button>
                <button onClick={() => setStatus('apptStatus', 'No')} className={`p-8 rounded-3xl border-4 font-black text-2xl italic transition-all active:scale-95 ${leadDetails.apptStatus === 'No' ? 'bg-slate-800 text-white border-slate-900 shadow-2xl' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>NO</button>
            </div>

            {leadDetails.apptStatus === 'Yes' && (
                <div className="space-y-10 animate-in slide-in-from-top-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 pl-2 tracking-widest flex items-center"><CalendarCheck className="w-3 h-3 mr-1" /> Set Date</label>
                            <input type="date" name="apptDate" value={leadDetails.apptDate} onChange={handleInputChange} className="w-full p-4 border-2 border-slate-100 rounded-2xl font-black text-lg focus:border-blue-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 pl-2 tracking-widest flex items-center"><Clock className="w-3 h-3 mr-1" /> Set Time</label>
                            <input type="time" name="apptTime" value={leadDetails.apptTime} onChange={handleInputChange} className="w-full p-4 border-2 border-slate-100 rounded-2xl font-black text-lg focus:border-blue-500 outline-none" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-blue-50 rounded-3xl border-4 border-blue-200 shadow-lg">
                            <p className="text-lg font-black text-blue-900 italic leading-snug">
                                "Perfect I think I have everything set up for you Mr / Ms {leadDetails.names || '____'}, I'll see you {leadDetails.apptDate || '___'} at {leadDetails.apptTime || '__:00'}. If anything changes and you need to push it back a little please just give me a heads up."
                            </p>
                        </div>

                        <div className="p-6 bg-emerald-50 rounded-3xl border-4 border-emerald-200">
                            <p className="text-xl font-black text-emerald-900 italic leading-snug">
                                "Is there anything else I can do to help today?"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}
    </>
  );
}