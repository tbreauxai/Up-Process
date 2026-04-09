import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PhoneStages from './components/PhoneStages';
import LotStages from './components/LotStages';
import { initialLeadDetails, lotChecklist, phoneChecklist } from './constants/data';
import { generateGeminiContentApi } from './services/gemini';
import { copyToClipboard } from './utils/helpers';

const apiKey = ""; // Add your API key here

export default function App() {
  const [upType, setUpType] = useState('phone');
  const [selectedStage, setSelectedStage] = useState('');
  const [savedLeads, setSavedLeads] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [phoneDiscoveryType, setPhoneDiscoveryType] = useState('specific'); 
  const [generatingId, setGeneratingId] = useState(null);
  const [generatingType, setGeneratingType] = useState(null);
  const [leadDetails, setLeadDetails] = useState(initialLeadDetails);

  const generateGeminiContent = async (leadId, type, rawData) => {
    setGeneratingId(leadId);
    setGeneratingType(type);
    
    const generatedText = await generateGeminiContentApi(apiKey, type, rawData);
    
    setSavedLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, [type === 'crm' ? 'crmNote' : 'followUpSms']: generatedText } : lead
    ));

    setGeneratingId(null);
    setGeneratingType(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLeadDetails(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const setStatus = (key, val) => {
    setLeadDetails(prev => ({ ...prev, [key]: val }));
  };

  const hasData = () => {
    return Object.values(leadDetails).some(val => val === true || (typeof val === 'string' && val.trim() !== ''));
  };

  const resetCurrentLead = () => {
    setLeadDetails(initialLeadDetails);
  };

  const handleCapture = () => {
    if (!hasData()) return;
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 300);

    let loggedData = `[${upType.toUpperCase()} UP] SUMMARY`;
    const activeChecklist = upType === 'lot' ? lotChecklist : phoneChecklist;
    const lines = activeChecklist.map(item => {
        const val = leadDetails[item.key];
        let displayVal = 'N/A';
        if (item.type === 'bool') displayVal = val ? 'Verified' : 'N/A';
        else displayVal = val || 'N/A';
        return `${item.label}: ${displayVal}`;
    });

    loggedData += `\n${lines.join('\n')}`;

    const newLead = {
      id: Date.now(),
      type: upType,
      data: loggedData,
      rawData: { ...leadDetails },
      timestamp: new Date().toLocaleTimeString()
    };

    setSavedLeads([newLead, ...savedLeads]);
    resetCurrentLead();
    setSelectedStage('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isCapturing ? 'bg-white' : 'bg-slate-50'} text-slate-900 p-4 md:p-8 font-sans overflow-x-hidden w-full fixed inset-0 overflow-y-auto select-none`}>
      <style>{`
        html, body { overflow: hidden; overscroll-behavior: none; position: fixed; width: 100%; height: 100%; touch-action: pan-y; }
        input, textarea { user-select: text !important; }
        .capture-flash { animation: flash 0.3s ease-out; }
        @keyframes flash { 0% { opacity: 1; background: white; } 100% { opacity: 0; } }
      `}</style>

      {isCapturing && <div className="fixed inset-0 bg-white z-[100] pointer-events-none capture-flash" />}

      <div className="max-w-2xl mx-auto space-y-6 pb-24">
        {!selectedStage ? (
          <Dashboard 
            upType={upType} setUpType={setUpType} 
            selectedStage={selectedStage} setSelectedStage={setSelectedStage} 
            savedLeads={savedLeads} 
            hasData={hasData} resetCurrentLead={resetCurrentLead} handleCapture={handleCapture} 
            leadDetails={leadDetails} 
            generateGeminiContent={generateGeminiContent} generatingId={generatingId} generatingType={generatingType} copyToClipboard={copyToClipboard}
          />
        ) : (
          <>
            <header className="flex items-center space-x-4 mb-8">
              <button onClick={() => setSelectedStage('')} className="flex items-center space-x-2 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 font-black text-[11px] uppercase shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Save & Back</span>
              </button>
              <h1 className="text-xl font-black italic tracking-tighter text-slate-800 uppercase">{selectedStage}</h1>
            </header>

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="space-y-8">
                  <PhoneStages 
                    selectedStage={selectedStage} 
                    leadDetails={leadDetails} 
                    handleInputChange={handleInputChange} 
                    setStatus={setStatus} 
                    phoneDiscoveryType={phoneDiscoveryType} 
                    setPhoneDiscoveryType={setPhoneDiscoveryType} 
                  />
                  <LotStages 
                    selectedStage={selectedStage} 
                    leadDetails={leadDetails} 
                    handleInputChange={handleInputChange} 
                    setStatus={setStatus} 
                  />
                  <button onClick={() => {
                      if (selectedStage === 'Appointment' && leadDetails.apptStatus) handleCapture();
                      else if (selectedStage === 'Soft Close' && leadDetails.softClose) handleCapture();
                      else setSelectedStage('');
                  }} className={`w-full py-6 rounded-3xl font-black text-xl italic uppercase tracking-widest shadow-2xl active:scale-95 transition-all ${(selectedStage === 'Appointment' && leadDetails.apptStatus) || (selectedStage === 'Soft Close' && leadDetails.softClose) ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-900 text-white'}`}>
                    {((selectedStage === 'Appointment' && leadDetails.apptStatus) || (selectedStage === 'Soft Close' && leadDetails.softClose)) ? 'Log & Archive' : 'Save & Continue'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}