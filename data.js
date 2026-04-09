export const discoveryFields = [
  { name: 'names', label: 'Name(s)', placeholder: 'John & Jane Doe' },
  { name: 'vehicleOfInterest', label: 'What did they come in on?', placeholder: '2024 F-150' },
  { name: 'drivenBefore', label: 'Have they driven one before?', placeholder: 'Yes / No' },
  { name: 'reasonForVisit', label: 'What brought them in?', placeholder: 'Saw online ad, towing capacity' },
  { name: 'tradingIn', label: 'Trading in pulled up vehicle?', placeholder: '2018 Silverado' },
  { name: 'occupation', label: 'What do they do for work?', placeholder: 'Construction' },
  { name: 'local', label: 'Are they local?', placeholder: 'Yes, from County' },
  { name: 'buyingReason', label: 'Reason for looking?', placeholder: 'Need more space' },
  { name: 'competition', label: 'What’s my competition?', placeholder: 'Chevy dealer down the road', fullWidth: true },
];

export const phoneChecklist = [
  { key: 'names', label: 'Customer Name' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'stockNumber', label: 'Stock Number' },
  { key: 'vehicleOfInterest', label: 'Vehicle Info' },
  { key: 'buyingReason', label: 'Affinity/Likes' },
  { key: 'phoneOwnerStatus', label: 'Owner Status' },
  { key: 'currentDriver', label: 'Current Driver' },
  { key: 'wantsToTrade', label: 'Trade Intent' },
  { key: 'apptStatus', label: 'Appt Booked?' }
];

export const lotChecklist = [
  { key: 'names', label: 'Customer Name' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'hasLicense', label: 'License Photo', type: 'bool' },
  { key: 'vehicleOfInterest', label: 'Vehicle' },
  { key: 'drivenBefore', label: 'Driven Before?' },
  { key: 'tradingIn', label: 'Trade Info' },
  { key: 'occupation', label: 'Work/Local' },
  { key: 'competition', label: 'Competition' },
  { key: 'softClose', label: 'Closing Intent' }
];

export const lotStages = ["Meet and Greet", "Build Rapport", "Test Drive", "Soft Close"];
export const phoneStages = ["Phone Intro", "Discovery", "Trade-in", "Appointment"];

export const initialLeadDetails = {
  names: '', 
  phoneNumber: '',
  hasLicense: false,
  vehicleOfInterest: '', 
  stockNumber: '',
  buyingReason: '', 
  phoneOwnerStatus: '', 
  currentDriver: '',
  wantsToTrade: '', 
  hasAppraised: '', 
  appraisalTime: '',
  tradeValueObjection: '',
  futurePlan: '',
  apptStatus: '', 
  apptDate: '',
  apptTime: '',
  drivenBefore: '', 
  reasonForVisit: '',
  tradingIn: '', 
  occupation: '', 
  local: '', 
  competition: '',
  softClose: '', 
  softCloseStopping: '',
  softCloseTimeframe: '',
  softCloseFollowUp: '',
  phoneNeeds: '',
  phoneBudget: ''
};