import { useState } from "react";
import type { CSSProperties } from "react";

type InstitutionType = 'Primary School'|'Secondary / High School'|'Inter / Junior College'|'Graduation College'|'Post Graduation College'|null;
type EducationSubModule = 'general_edu'|'institution'|'students'|'companies'|'training'|null;
type HealthcareCategory = 'Hospital'|'Lab'|'Medical Store'|'Doctor'|null;
type ActiveTab = 'login'|'register';
interface SelectOption { label:string; value:string; }
interface StoredUser { username:string; password:string; module:string|null; subModule:EducationSubModule; healthcareCategory:HealthcareCategory; dashboardType:string; }
interface FormData {
  loginEmail:string; loginPassword:string; registerUsername:string; registerPassword:string; registerConfirmPassword:string;
  name:string; registrationType:string; panTan:string; hasGst:boolean; gstNumber:string; hasTradeLicense:boolean; hasNoc:boolean; files:Record<string,string>;
  instName:string; establishYear:string; managementType:string; state:string; district:string; city:string; pincode:string;
  address:string; directorName:string; directorPhone:string; email:string; phone:string; website:string;
  regNumber:string; affiliation:string; mediums:string[]; grades:string[]; studentCapacity:string; currentStrength:string; teacherCount:string;
  studentFullName:string; dob:string; gender:string; aadhar:string; studentPhone:string; studentEmail:string;
  studentAddress:string; studentCity:string; studentState:string; studentPincode:string;
  highestQual:string; prevInstitution:string; boardUniversity:string; yearOfPassing:string; percentage:string;
  mediumOfStudy:string; applyingFor:string[]; preferredInstitution:string; preferredLocation:string;
  category:string; needScholarship:boolean; needHostel:boolean; needTransport:boolean;
  techSkills:string[]; achievements:string; careerObjective:string;
  companyName:string; companyRegNo:string; companyWebsite:string; companyEmail:string;
  hrPhone:string; companyAddress:string; companyType:string; jobSector:string;
  jobTitle:string; jobDescription:string; jobType:string; workMode:string; jobLocation:string;
  vacancies:string; salaryRange:string; applicationDeadline:string; minEducation:string;
  experience:string; minPercentage:string; ageLimit:string; categoryPref:string[]; jobSkills:string[]; benefits:string[];
  govtNotifNo:string; govtDept:string; payScale:string; selectionProcess:string;
  examDateAnnounced:boolean; examDate:string; govtNotifUrl:string;
  techCategory:string; preferredStack:string; bondRequired:boolean; bondDuration:string; esopAvailable:boolean;
  sectorDept:string; interviewProcess:string; joiningTimeline:string;
  trainingSide:string; courseCategory:string; trainingProvider:string; providerEmail:string; providerPhone:string; providerLocation:string;
  courseTitle:string; courseSubtitle:string; courseDescription:string; courseDuration:string; coursePrice:string;
  trainingMode:string; batchStartDate:string; batchSize:string; instructionLanguage:string; courseModules:string[]; courseMinQual:string;
  hcEntityName:string; hcEstabYear:string; hcAddress:string; hcCity:string; hcState:string; hcPincode:string;
  hcHospitalType:string; hcBedCapacity:string; hcIcuBeds:string; hcManagementType:string;
  hcLabType:string; hcLabServices:string[]; hcStoreType:string; hc24HrOp:boolean; hcHomeDelivery:boolean;
  hcDoctorName:string; hcSpecialization:string; hcQualification:string; hcExperience:string; hcPracticeType:string;
  hcRegNumber:string; hcDoctorReg:string;
  hcDrugLicenseApplicable:boolean; hcDrugLicenseNo:string;
  hcBmwAuth:boolean; hcBmwAuthNo:string; hcFireNoc:boolean; hcFireNocNo:string;
  hcAerbApplicable:boolean; hcAerbNo:string; hcNablAccred:boolean; hcNablNo:string;
  hcNabhAccred:boolean; hcNabhNo:string; hcGstRegistered:boolean; hcGstNumber:string;
  hcEmail:string; hcPhone:string; hcAltPhone:string; hcWebsite:string;
  hcEmergencyNo:string; hcDirectorName:string;
  hcConsultTimings:string; hcConsultFee:string; hcOnlineConsult:boolean;
  hcOtpPhone:string; hcOtpEmail:string;
  foodEntityName:string; foodEstabYear:string; foodAddress:string; foodCity:string; foodState:string; foodPincode:string;
  foodRestaurantType:string; foodCuisineTypes:string[];
  foodOwnerName:string; foodOwnerPhone:string; foodManagerName:string; foodManagerPhone:string;
  foodRegNumber:string; foodFssaiRegistered:boolean; foodFssaiNumber:string;
  foodGstRegistered:boolean; foodGstNumber:string; foodFoodLicenseApplicable:boolean; foodFoodLicenseNo:string;
  foodHealthInspection:boolean; foodHealthInspectionNo:string; foodFireNoc:boolean; foodFireNocNo:string;
  foodEmail:string; foodPhone:string; foodWebsite:string;
  foodSpecialMenuItems:string; foodAveragePrice:string; foodOperatingHours:string; foodDiningOptions:string[];
}

const BASE_STEPS:string[]=['Basic Info','Location','Contact','Legal'];
const TYPE_STEPS:Record<string,string[]>={
  'Primary School':[...BASE_STEPS,'Academics','Facilities','Activities'],
  'Secondary / High School':[...BASE_STEPS,'Academics','Facilities','Advanced'],
  'Inter / Junior College':[...BASE_STEPS,'Streams','Facilities','Performance'],
  'Graduation College':[...BASE_STEPS,'Courses','Infrastructure'],
  'Post Graduation College':[...BASE_STEPS,'Courses','Infrastructure','PG Details'],
};
const STUDENT_STEPS=['Personal','Education','Application','Skills','Documents'];
const COMPANY_STEPS=['Company Info','Job Details','Eligibility','Sector Specific','Benefits'];
const TRAINING_STEPS=['Training Type','Provider Info','Course Details','Specifics','Documents'];
const HEALTHCARE_STEPS=['Basic Info','Legal & Compliance','Documents','Contact & Verification'];
const FOOD_STEPS=['Basic Info','Legal & Compliance','Menu & Services','Documents'];
const HC_ACCENT='#0ea5e9';
const FOOD_ACCENT='#f97316';

const JOB_SECTOR_OPTIONS:SelectOption[]=[
  {label:'🏛️ Government / PSU',value:'Government'},{label:'💻 IT / Software',value:'IT'},
  {label:'🏥 Healthcare / Medical',value:'Healthcare'},{label:'🏦 Banking / Finance',value:'Banking'},
  {label:'🎓 Education / Teaching',value:'Education'},{label:'🏭 Manufacturing / Engineering',value:'Manufacturing'},
  {label:'🚂 Railway / Transport',value:'Railway'},{label:'⚖️ Legal / Law',value:'Legal'},
  {label:'📢 Marketing / Sales',value:'Marketing'},{label:'🛒 Retail / E-Commerce',value:'Retail'},
  {label:'🏗️ Construction / Real Estate',value:'Construction'},{label:'🎨 Design / Creative',value:'Design'},
  {label:'📊 Data / Analytics',value:'Data'},{label:'🌐 Other',value:'Other'},
];
const IT_COURSE_CATEGORIES:SelectOption[]=[
  {label:'☕ Java / Backend',value:'Java'},{label:'🐍 Python / Data',value:'Python'},
  {label:'⚛️ React / Frontend',value:'Frontend'},{label:'📱 Mobile Development',value:'Mobile'},
  {label:'☁️ Cloud / DevOps',value:'Cloud'},{label:'🤖 AI / ML / Data Science',value:'AI_ML'},
  {label:'🔐 Cybersecurity',value:'Cybersecurity'},{label:'📊 Data Analytics',value:'Analytics'},
  {label:'🗃️ Database / SQL',value:'Database'},{label:'🏗️ Full Stack',value:'FullStack'},
  {label:'🌐 Management / Agile',value:'Management'},
];
const GOV_COURSE_CATEGORIES:SelectOption[]=[
  {label:'🏛️ UPSC / IAS Prep',value:'UPSC'},{label:'📝 SSC (CGL / CHSL)',value:'SSC'},
  {label:'🏦 Banking (SBI/IBPS)',value:'Banking'},{label:'🚂 Railway (RRB)',value:'Railway'},
  {label:'🗺️ State PSC (TSPSC/APPSC)',value:'StatePSC'},{label:'🛡️ Defence (NDA/CDS)',value:'Defence'},
  {label:'👮 Police / SI',value:'Police'},{label:'📐 Teaching (TET/CTET/DSC)',value:'Teaching'},
  {label:'⚕️ NEET / Medical Entrance',value:'Medical'},{label:'🎓 JEE / IIT Foundation',value:'JEE'},
];

const t={bg:'#f8faff',card:'#ffffff',surface:'#f1f5f9',border:'#e2e8f0',primary:'#4f46e5',text:'#1e293b',subText:'#64748b',danger:'#ef4444',success:'#22c55e'};

/* ── PRIMITIVES ── */
interface IFProps{label:string;value:string;onChange:(v:string)=>void;secure?:boolean;multiline?:boolean;type?:string;placeholder?:string;optional?:boolean;}
const InputField=({label,value,onChange,secure,multiline,type,placeholder,optional}:IFProps)=>(
  <div style={{marginBottom:14}}>
    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
      <label style={{fontSize:12,fontWeight:700,color:t.subText}}>{label}</label>
      {optional&&<span style={{fontSize:10,color:t.subText+'80'}}>(Optional)</span>}
    </div>
    {multiline
      ?<textarea value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder||''} rows={3} style={{width:'100%',background:t.surface,borderRadius:10,padding:'10px 14px',color:t.text,border:`1px solid ${t.border}`,fontSize:14,resize:'vertical',boxSizing:'border-box',fontFamily:'inherit',outline:'none'}}/>
      :<input type={secure?'password':type||'text'} value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder||''} style={{width:'100%',background:t.surface,borderRadius:10,padding:'11px 14px',color:t.text,border:`1px solid ${t.border}`,fontSize:14,boxSizing:'border-box',outline:'none',height:46}}/>
    }
  </div>
);
const UploadBtn=({label,onPress,picked}:{label:string;onPress:()=>void;picked:boolean})=>(
  <button onClick={onPress} style={{width:'100%',padding:'12px 16px',border:`1.5px dashed ${picked?t.success:t.primary}`,borderRadius:10,marginBottom:14,display:'flex',alignItems:'center',justifyContent:'center',gap:8,background:picked?t.success+'18':t.primary+'0a',cursor:'pointer',color:picked?t.success:t.primary,fontSize:12,fontWeight:600,fontFamily:'inherit'}}>
    <span>{picked?'✓':'☁'}</span><span>{picked?`✓ ${label}`:label}</span>
  </button>
);
const ToggleRow=({label,active,onToggle}:{label:string;active:boolean;onToggle:(v:boolean)=>void})=>(
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,paddingBottom:8,borderBottom:`1px solid ${t.border}`}}>
    <span style={{fontSize:13,color:t.text,flex:1,paddingRight:12}}>{label}</span>
    <div onClick={()=>onToggle(!active)} style={{width:52,height:28,borderRadius:14,background:active?t.primary:t.border,cursor:'pointer',position:'relative',transition:'background 0.2s',flexShrink:0}}>
      <div style={{position:'absolute',top:3,left:active?'calc(100% - 25px)':3,width:22,height:22,borderRadius:11,background:'#fff',transition:'left 0.2s',boxShadow:'0 1px 4px rgba(0,0,0,0.2)'}}/>
    </div>
  </div>
);
const CheckboxGroup=({label,options,selected,onToggle}:{label?:string;options:string[];selected:string[];onToggle:(v:string)=>void})=>(
  <div style={{marginBottom:16}}>
    {label&&<div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:10}}>{label}</div>}
    <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
      {options.map(opt=>{const sel=(selected||[]).includes(opt);return(
        <button key={opt} onClick={()=>onToggle(opt)} style={{padding:'6px 13px',borderRadius:22,border:`1.5px solid ${sel?t.primary:t.border}`,background:sel?t.primary+'18':t.surface,color:sel?t.primary:t.text,fontSize:12,fontWeight:sel?700:400,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontFamily:'inherit'}}>
          <span>{sel?'☑':'☐'}</span>{opt}
        </button>
      );})}
    </div>
  </div>
);
const RadioGroup=({label,options,selected,onSelect}:{label?:string;options:string[];selected:string;onSelect:(v:string)=>void})=>(
  <div style={{marginBottom:16}}>
    {label&&<div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:10}}>{label}</div>}
    <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
      {options.map(opt=>{const sel=selected===opt;return(
        <button key={opt} onClick={()=>onSelect(opt)} style={{padding:'6px 13px',borderRadius:22,border:`1.5px solid ${sel?t.primary:t.border}`,background:sel?t.primary:t.surface,color:sel?'#fff':t.text,fontSize:12,fontWeight:sel?700:400,cursor:'pointer',display:'flex',alignItems:'center',gap:5,transition:'all 0.15s',fontFamily:'inherit'}}>
          <span style={{fontSize:10}}>{sel?'⦿':'○'}</span>{opt}
        </button>
      );})}
    </div>
  </div>
);
const TagAdder=({items,onAdd,onRemove,label,placeholder}:{items:string[];onAdd:(v:string)=>void;onRemove:(i:number)=>void;label:string;placeholder?:string})=>{
  const[input,setInput]=useState('');
  return(
    <div style={{marginBottom:14}}>
      <div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:10}}>{label}</div>
      <div style={{display:'flex',gap:8,marginBottom:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&input.trim()){onAdd(input.trim());setInput('');}}} placeholder={placeholder||'Type and press Enter...'} style={{flex:1,background:t.surface,borderRadius:10,padding:'10px 14px',color:t.text,border:`1px solid ${t.border}`,fontSize:13,outline:'none'}}/>
        <button onClick={()=>{if(input.trim()){onAdd(input.trim());setInput('');}}} style={{width:44,height:44,borderRadius:10,background:t.primary,border:'none',color:'#fff',fontSize:20,cursor:'pointer',fontFamily:'inherit'}}>+</button>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {(items||[]).map((item,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:22,background:t.primary+'18',border:`1px solid ${t.primary}40`,color:t.primary,fontSize:12,fontWeight:600}}>
            {item}<button onClick={()=>onRemove(i)} style={{background:'none',border:'none',color:t.primary,cursor:'pointer',padding:0,fontSize:14,lineHeight:1}}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};
const SelectDropdown=({label,value,options,onSelect,placeholder}:{label?:string;value:string;options:SelectOption[];onSelect:(v:string)=>void;placeholder?:string})=>{
  const[open,setOpen]=useState(false);
  const found=options.find(o=>o.value===value);
  return(
    <div style={{marginBottom:14,position:'relative'}}>
      {label&&<div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:5}}>{label}</div>}
      <div onClick={()=>setOpen(!open)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:t.surface,padding:'12px 14px',borderRadius:10,border:`1px solid ${t.border}`,cursor:'pointer',height:46,boxSizing:'border-box'}}>
        <span style={{color:found?t.text:t.subText+'80',fontSize:14}}>{found?found.label:(placeholder||'Select...')}</span>
        <span style={{color:t.subText,display:'inline-block',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▾</span>
      </div>
      {open&&(
        <div style={{position:'absolute',top:'100%',left:0,right:0,background:t.card,border:`1px solid ${t.border}`,borderRadius:10,boxShadow:'0 8px 32px rgba(0,0,0,0.12)',zIndex:100,maxHeight:260,overflowY:'auto'}}>
          {options.map(o=>(
            <div key={o.value} onClick={()=>{onSelect(o.value);setOpen(false);}} style={{padding:'12px 16px',cursor:'pointer',fontSize:14,color:t.text,borderBottom:`1px solid ${t.border}`,background:value===o.value?t.primary+'10':'transparent'}}>
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const SectionHeader=({title,color}:{title:string;color?:string})=>(
  <div style={{background:(color||t.primary)+'15',borderRadius:10,padding:'10px 14px',marginBottom:16,marginTop:4,borderLeft:`3px solid ${color||t.primary}`}}>
    <span style={{fontSize:13,fontWeight:800,color:color||t.primary}}>{title}</span>
  </div>
);
const StepProgressBar=({steps,currentStep,accent}:{steps:string[];currentStep:number;accent?:string})=>{
  const p=accent||t.primary;
  return(
    <div style={{marginBottom:22}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <span style={{fontSize:13,fontWeight:800,color:t.text}}>Step {currentStep} of {steps.length}</span>
        <span style={{fontSize:12,fontWeight:700,color:p}}>{steps[currentStep-1]}</span>
      </div>
      <div style={{display:'flex',gap:4,marginBottom:8}}>
        {steps.map((_,i)=><div key={i} style={{flex:1,height:5,borderRadius:3,background:i<currentStep-1?p:i===currentStep-1?p+'AA':t.border,transition:'background 0.3s'}}/>)}
      </div>
      <div style={{display:'flex'}}>
        {steps.map((s,i)=>{const done=i<currentStep-1,active=i===currentStep-1;return(
          <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{width:18,height:18,borderRadius:9,marginBottom:2,background:done||active?p:t.border,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {done?<span style={{fontSize:10,color:'#fff'}}>✓</span>:<span style={{fontSize:9,color:active?'#fff':t.subText,fontWeight:700}}>{i+1}</span>}
            </div>
            <span style={{fontSize:8,color:done||active?p:t.subText,fontWeight:done||active?700:400,textAlign:'center',overflow:'hidden',whiteSpace:'nowrap',maxWidth:40,textOverflow:'ellipsis'}}>{s}</span>
          </div>
        );})}
      </div>
    </div>
  );
};
const MultiStepWrapper=({steps,currentStep,onNext,onBack,isLast,accent,children}:{steps:string[];currentStep:number;onNext:()=>void;onBack:()=>void;isLast:boolean;accent?:string;children:React.ReactNode})=>(
  <div>
    <StepProgressBar steps={steps} currentStep={currentStep} accent={accent}/>
    <div style={{background:t.surface,borderRadius:14,padding:16,marginBottom:4,border:`1px solid ${t.border}`}}>
      <div style={{fontSize:15,fontWeight:800,color:t.text,marginBottom:16}}>{steps[currentStep-1]}</div>
      {children}
    </div>
    <div style={{display:'flex',gap:10,marginTop:20}}>
      {currentStep>1&&<button onClick={onBack} style={{flex:1,padding:'13px 0',borderRadius:12,border:`1.5px solid ${t.border}`,background:'transparent',color:t.text,fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>← Back</button>}
      <button onClick={onNext} style={{flex:2,padding:'13px 0',borderRadius:12,border:'none',background:accent||t.primary,color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',transition:'opacity 0.2s',fontFamily:'inherit'}}>
        {isLast?'🎉 Submit Registration':'Next Step →'}
      </button>
    </div>
  </div>
);

/* ── STEP PROP TYPES ── */
interface SP{form:FormData;setForm:(f:FormData)=>void;handlePickFile:(key:string)=>void;}
const tog=(form:FormData,setForm:(f:FormData)=>void,k:keyof FormData,v:string)=>{const a=(form[k]as string[])||[];setForm({...form,[k]:a.includes(v)?a.filter((x:string)=>x!==v):[...a,v]});};

/* ── STUDENT STEPS ── */
const RenderStudentStep=({step,form,setForm,handlePickFile}:SP&{step:string})=>{
  const tg=(k:keyof FormData,v:string)=>tog(form,setForm,k,v);
  switch(step){
    case'Personal':return(<div><SectionHeader title="👤 Personal Information"/><InputField label="Full Name *" value={form.studentFullName} onChange={v=>setForm({...form,studentFullName:v})}/><InputField label="Date of Birth *" value={form.dob} onChange={v=>setForm({...form,dob:v})} placeholder="DD/MM/YYYY"/><RadioGroup label="Gender *" options={['Male','Female','Other']} selected={form.gender} onSelect={v=>setForm({...form,gender:v})}/><InputField label="Aadhar Number *" value={form.aadhar} onChange={v=>setForm({...form,aadhar:v})}/><InputField label="Phone *" value={form.studentPhone} onChange={v=>setForm({...form,studentPhone:v})} type="tel"/><InputField label="Email *" value={form.studentEmail} onChange={v=>setForm({...form,studentEmail:v})} type="email"/><InputField label="Address *" value={form.studentAddress} onChange={v=>setForm({...form,studentAddress:v})} multiline/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="City *" value={form.studentCity} onChange={v=>setForm({...form,studentCity:v})}/><InputField label="State *" value={form.studentState} onChange={v=>setForm({...form,studentState:v})}/></div><InputField label="Pincode *" value={form.studentPincode} onChange={v=>setForm({...form,studentPincode:v})}/></div>);
    case'Education':return(<div><SectionHeader title="🎓 Educational Background"/><RadioGroup label="Highest Qualification *" options={['10th','12th','Diploma','Graduation','Post Graduation']} selected={form.highestQual} onSelect={v=>setForm({...form,highestQual:v})}/><InputField label="Previous Institution *" value={form.prevInstitution} onChange={v=>setForm({...form,prevInstitution:v})}/><InputField label="Board / University *" value={form.boardUniversity} onChange={v=>setForm({...form,boardUniversity:v})}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Year of Passing *" value={form.yearOfPassing} onChange={v=>setForm({...form,yearOfPassing:v})}/><InputField label="Percentage / CGPA *" value={form.percentage} onChange={v=>setForm({...form,percentage:v})}/></div><RadioGroup label="Medium of Study *" options={['English','Telugu','Hindi','Other']} selected={form.mediumOfStudy} onSelect={v=>setForm({...form,mediumOfStudy:v})}/></div>);
    case'Application':return(<div><SectionHeader title="📋 Application Details"/><CheckboxGroup label="Applying For *" options={['Admission','Job','Training','Scholarship']} selected={form.applyingFor} onToggle={v=>tg('applyingFor',v)}/><InputField label="Preferred Institution / Company" value={form.preferredInstitution} onChange={v=>setForm({...form,preferredInstitution:v})} optional/><InputField label="Preferred Location" value={form.preferredLocation} onChange={v=>setForm({...form,preferredLocation:v})} optional/><RadioGroup label="Category *" options={['General','OBC','SC','ST','EWS']} selected={form.category} onSelect={v=>setForm({...form,category:v})}/><ToggleRow label="Need Scholarship?" active={form.needScholarship} onToggle={v=>setForm({...form,needScholarship:v})}/><ToggleRow label="Need Hostel?" active={form.needHostel} onToggle={v=>setForm({...form,needHostel:v})}/><ToggleRow label="Need Transport?" active={form.needTransport} onToggle={v=>setForm({...form,needTransport:v})}/></div>);
    case'Skills':return(<div><SectionHeader title="💡 Skills & Achievements"/><TagAdder label="Technical Skills" items={form.techSkills} onAdd={s=>setForm({...form,techSkills:[...form.techSkills,s]})} onRemove={i=>setForm({...form,techSkills:form.techSkills.filter((_,idx)=>idx!==i)})} placeholder="e.g. Python, Photoshop"/><InputField label="Achievements" value={form.achievements} onChange={v=>setForm({...form,achievements:v})} multiline optional/><InputField label="Career Objective" value={form.careerObjective} onChange={v=>setForm({...form,careerObjective:v})} multiline optional/></div>);
    case'Documents':return(<div><SectionHeader title="📁 Required Documents"/><UploadBtn label="Aadhar Card *" onPress={()=>handlePickFile('aadhar')} picked={!!form.files?.aadhar}/><UploadBtn label="10th Marksheet *" onPress={()=>handlePickFile('marksheet10')} picked={!!form.files?.marksheet10}/><UploadBtn label="12th / Latest Marksheet" onPress={()=>handlePickFile('marksheet12')} picked={!!form.files?.marksheet12}/><UploadBtn label="Degree Certificate (if applicable)" onPress={()=>handlePickFile('degreeCert')} picked={!!form.files?.degreeCert}/><UploadBtn label="Resume / CV" onPress={()=>handlePickFile('resume')} picked={!!form.files?.resume}/><UploadBtn label="Transfer Certificate" onPress={()=>handlePickFile('transferCert')} picked={!!form.files?.transferCert}/><UploadBtn label="Caste Certificate (if applicable)" onPress={()=>handlePickFile('casteCert')} picked={!!form.files?.casteCert}/><UploadBtn label="Income Certificate (if applicable)" onPress={()=>handlePickFile('incomeCert')} picked={!!form.files?.incomeCert}/></div>);
    default:return null;
  }
};

/* ── COMPANY STEPS ── */
const RenderCompanyStep=({step,form,setForm,handlePickFile}:SP&{step:string})=>{
  const tg=(k:keyof FormData,v:string)=>tog(form,setForm,k,v);
  switch(step){
    case'Company Info':return(<div><SectionHeader title="🏢 Company Information"/><InputField label="Company Name *" value={form.companyName} onChange={v=>setForm({...form,companyName:v})}/><InputField label="Registration Number *" value={form.companyRegNo} onChange={v=>setForm({...form,companyRegNo:v})}/><InputField label="Company Website" value={form.companyWebsite} onChange={v=>setForm({...form,companyWebsite:v})} optional placeholder="https://"/><InputField label="Official Email *" value={form.companyEmail} onChange={v=>setForm({...form,companyEmail:v})} type="email"/><InputField label="HR Contact Number *" value={form.hrPhone} onChange={v=>setForm({...form,hrPhone:v})} type="tel"/><InputField label="HQ Address *" value={form.companyAddress} onChange={v=>setForm({...form,companyAddress:v})} multiline/><RadioGroup label="Company Type *" options={['Startup','SME','MNC','PSU','Government Body','NGO']} selected={form.companyType} onSelect={v=>setForm({...form,companyType:v})}/><UploadBtn label="Company Logo" onPress={()=>handlePickFile('companyLogo')} picked={!!form.files?.companyLogo}/><UploadBtn label="GST Certificate *" onPress={()=>handlePickFile('companyGst')} picked={!!form.files?.companyGst}/></div>);
    case'Job Details':return(<div><SectionHeader title="📋 Job Opening Details"/><SelectDropdown label="Job Sector *" value={form.jobSector} options={JOB_SECTOR_OPTIONS} onSelect={v=>setForm({...form,jobSector:v})} placeholder="Select Job Sector"/><InputField label="Job Title / Role *" value={form.jobTitle} onChange={v=>setForm({...form,jobTitle:v})}/><InputField label="Job Description *" value={form.jobDescription} onChange={v=>setForm({...form,jobDescription:v})} multiline/><RadioGroup label="Job Type *" options={['Full-Time','Part-Time','Contract','Internship','Freelance']} selected={form.jobType} onSelect={v=>setForm({...form,jobType:v})}/><RadioGroup label="Work Mode *" options={['On-Site','Remote','Hybrid']} selected={form.workMode} onSelect={v=>setForm({...form,workMode:v})}/><InputField label="Job Location(s) *" value={form.jobLocation} onChange={v=>setForm({...form,jobLocation:v})} placeholder="e.g. Hyderabad, Remote"/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="No. of Vacancies *" value={form.vacancies} onChange={v=>setForm({...form,vacancies:v})}/><InputField label="Salary / CTC Range *" value={form.salaryRange} onChange={v=>setForm({...form,salaryRange:v})} placeholder="₹3–6 LPA"/></div><InputField label="Application Deadline *" value={form.applicationDeadline} onChange={v=>setForm({...form,applicationDeadline:v})} placeholder="DD/MM/YYYY"/></div>);
    case'Eligibility':return(<div><SectionHeader title="✅ Eligibility Criteria"/><RadioGroup label="Minimum Education *" options={['10th','12th / Diploma','Graduation','Post Graduation','Any']} selected={form.minEducation} onSelect={v=>setForm({...form,minEducation:v})}/><InputField label="Required Experience" value={form.experience} onChange={v=>setForm({...form,experience:v})} placeholder="e.g. 0-1 Years / Fresher"/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Min. Percentage" value={form.minPercentage} onChange={v=>setForm({...form,minPercentage:v})} optional/><InputField label="Age Limit" value={form.ageLimit} onChange={v=>setForm({...form,ageLimit:v})} placeholder="18–30 years" optional/></div><CheckboxGroup label="Category Preferences" options={['General','OBC','SC','ST','EWS','PH / Divyang','Ex-Servicemen']} selected={form.categoryPref} onToggle={v=>tg('categoryPref',v)}/><TagAdder label="Required Skills / Technologies" items={form.jobSkills} onAdd={s=>setForm({...form,jobSkills:[...form.jobSkills,s]})} onRemove={i=>setForm({...form,jobSkills:form.jobSkills.filter((_,idx)=>idx!==i)})} placeholder="e.g. React Native, Java"/></div>);
    case'Sector Specific':return(<div>{form.jobSector==='Government'&&<div><SectionHeader title="🏛️ Government Job Specifics" color="#f59e0b"/><InputField label="Notification Number" value={form.govtNotifNo} onChange={v=>setForm({...form,govtNotifNo:v})} optional/><InputField label="Department / Ministry *" value={form.govtDept} onChange={v=>setForm({...form,govtDept:v})}/><InputField label="Pay Scale *" value={form.payScale} onChange={v=>setForm({...form,payScale:v})} placeholder="e.g. ₹25,500 – ₹81,100"/><InputField label="Selection Process *" value={form.selectionProcess} onChange={v=>setForm({...form,selectionProcess:v})} multiline/><ToggleRow label="Exam Date Announced?" active={form.examDateAnnounced} onToggle={v=>setForm({...form,examDateAnnounced:v})}/>{form.examDateAnnounced&&<InputField label="Exam Date" value={form.examDate} onChange={v=>setForm({...form,examDate:v})} placeholder="DD/MM/YYYY"/>}<InputField label="Notification URL" value={form.govtNotifUrl} onChange={v=>setForm({...form,govtNotifUrl:v})} optional placeholder="https://"/><UploadBtn label="Notification PDF" onPress={()=>handlePickFile('govtNotifPdf')} picked={!!form.files?.govtNotifPdf}/></div>}{form.jobSector==='IT'&&<div><SectionHeader title="💻 IT Job Specifics" color="#3b82f6"/><RadioGroup label="Tech Stack Category" options={['Frontend','Backend','Full Stack','Mobile','DevOps','Data / ML','QA / Testing','Other']} selected={form.techCategory} onSelect={v=>setForm({...form,techCategory:v})}/><InputField label="Preferred Tech Stack" value={form.preferredStack} onChange={v=>setForm({...form,preferredStack:v})} placeholder="e.g. React Native, Node.js"/><ToggleRow label="Bond / Service Agreement Required?" active={form.bondRequired} onToggle={v=>setForm({...form,bondRequired:v})}/>{form.bondRequired&&<InputField label="Bond Duration" value={form.bondDuration} onChange={v=>setForm({...form,bondDuration:v})} placeholder="e.g. 2 Years"/>}<ToggleRow label="ESOP / Stock Options Available?" active={form.esopAvailable} onToggle={v=>setForm({...form,esopAvailable:v})}/></div>}{form.jobSector&&form.jobSector!=='Government'&&form.jobSector!=='IT'&&<div><SectionHeader title={`📋 ${form.jobSector} Sector Details`}/><InputField label="Department / Division Name" value={form.sectorDept} onChange={v=>setForm({...form,sectorDept:v})} optional/><InputField label="Interview Process" value={form.interviewProcess} onChange={v=>setForm({...form,interviewProcess:v})} multiline optional/><InputField label="Joining Timeline" value={form.joiningTimeline} onChange={v=>setForm({...form,joiningTimeline:v})} optional/></div>}{!form.jobSector&&<div style={{textAlign:'center',padding:'24px 0',color:t.subText}}><span style={{fontSize:36}}>ℹ️</span><p style={{fontSize:13,marginTop:8}}>Please select a Job Sector in the previous step.</p></div>}</div>);
    case'Benefits':return(<div><SectionHeader title="🎁 Benefits & Perks"/><CheckboxGroup label="Benefits Offered" options={['Health Insurance','PF / Gratuity','Paid Leave','WFH Allowance','Meal Allowance','Transport Allowance','Annual Bonus','Training & Upskilling']} selected={form.benefits} onToggle={v=>tg('benefits',v)}/></div>);
    default:return null;
  }
};

/* ── TRAINING STEPS ── */
const RenderTrainingStep=({step,form,setForm,handlePickFile}:SP&{step:string})=>{
  const isGovt=form.trainingSide==='Government Exam';
  const catOptions=isGovt?GOV_COURSE_CATEGORIES:IT_COURSE_CATEGORIES;
  switch(step){
    case'Training Type':return(<div><SectionHeader title="🎓 Training Type"/><RadioGroup label="Select Training Side *" options={['IT / Technology','Government Exam']} selected={form.trainingSide} onSelect={v=>setForm({...form,trainingSide:v,courseCategory:''})}/>{form.trainingSide&&<SelectDropdown label={isGovt?'Exam Category *':'Course Category *'} value={form.courseCategory} options={catOptions} onSelect={v=>setForm({...form,courseCategory:v})} placeholder={`Select ${isGovt?'Exam':'Course'} Category`}/>}</div>);
    case'Provider Info':return(<div><SectionHeader title="🏫 Training Provider Info"/><InputField label="Institute / Provider Name *" value={form.trainingProvider} onChange={v=>setForm({...form,trainingProvider:v})}/><InputField label="Provider Contact Email *" value={form.providerEmail} onChange={v=>setForm({...form,providerEmail:v})} type="email"/><InputField label="Provider Phone *" value={form.providerPhone} onChange={v=>setForm({...form,providerPhone:v})} type="tel"/><InputField label="Provider Location *" value={form.providerLocation} onChange={v=>setForm({...form,providerLocation:v})}/><UploadBtn label="Institute Logo" onPress={()=>handlePickFile('providerLogo')} picked={!!form.files?.providerLogo}/></div>);
    case'Course Details':return(<div><SectionHeader title="📚 Course Details"/><InputField label="Course Title *" value={form.courseTitle} onChange={v=>setForm({...form,courseTitle:v})}/><InputField label="Course Subtitle / Tagline" value={form.courseSubtitle} onChange={v=>setForm({...form,courseSubtitle:v})} optional/><InputField label="Course Description *" value={form.courseDescription} onChange={v=>setForm({...form,courseDescription:v})} multiline/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Duration *" value={form.courseDuration} onChange={v=>setForm({...form,courseDuration:v})} placeholder="e.g. 3 Months"/><InputField label="Price / Fee *" value={form.coursePrice} onChange={v=>setForm({...form,coursePrice:v})} placeholder="₹999 or Free"/></div><RadioGroup label="Mode of Training *" options={['Online','Offline','Hybrid']} selected={form.trainingMode} onSelect={v=>setForm({...form,trainingMode:v})}/><InputField label="Batch Start Date *" value={form.batchStartDate} onChange={v=>setForm({...form,batchStartDate:v})} placeholder="DD/MM/YYYY"/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Max Students / Batch" value={form.batchSize} onChange={v=>setForm({...form,batchSize:v})}/><InputField label="Language of Instruction *" value={form.instructionLanguage} onChange={v=>setForm({...form,instructionLanguage:v})} placeholder="e.g. English"/></div><TagAdder label="Course Modules" items={form.courseModules} onAdd={m=>setForm({...form,courseModules:[...form.courseModules,m]})} onRemove={i=>setForm({...form,courseModules:form.courseModules.filter((_,idx)=>idx!==i)})} placeholder="e.g. Module 1 Title"/><RadioGroup label="Min. Qualification Required *" options={['10th','12th','Graduation','Any']} selected={form.courseMinQual} onSelect={v=>setForm({...form,courseMinQual:v})}/></div>);
    case'Documents':return(<div><SectionHeader title="📁 Required Documents"/><UploadBtn label="Course Brochure / Syllabus *" onPress={()=>handlePickFile('courseBrochure')} picked={!!form.files?.courseBrochure}/><UploadBtn label="Institute Registration Certificate *" onPress={()=>handlePickFile('instRegCert')} picked={!!form.files?.instRegCert}/><UploadBtn label="GST Certificate (if applicable)" onPress={()=>handlePickFile('trainingGst')} picked={!!form.files?.trainingGst}/><UploadBtn label="Sample Certificate Issued to Students" onPress={()=>handlePickFile('sampleCert')} picked={!!form.files?.sampleCert}/></div>);
    default:return null;
  }
};

/* ── HEALTHCARE STEPS ── */
const RenderHealthcareStep=({step,form,setForm,healthcareCategory,handlePickFile}:SP&{step:string;healthcareCategory:HealthcareCategory})=>{
  const cat=healthcareCategory;
  const togLab=(v:string)=>{const s=form.hcLabServices||[];setForm({...form,hcLabServices:s.includes(v)?s.filter((x:string)=>x!==v):[...s,v]});};
  switch(step){
    case'Basic Info':return(<div><SectionHeader title="🏥 Basic Information" color={HC_ACCENT}/>{cat==='Hospital'&&<><InputField label="Hospital Name *" value={form.hcEntityName} onChange={v=>setForm({...form,hcEntityName:v})}/><RadioGroup label="Hospital Type *" options={['Government','Private','Trust / NGO','Corporate']} selected={form.hcHospitalType} onSelect={v=>setForm({...form,hcHospitalType:v})}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Total Bed Capacity *" value={form.hcBedCapacity} onChange={v=>setForm({...form,hcBedCapacity:v})}/><InputField label="ICU Beds" value={form.hcIcuBeds} onChange={v=>setForm({...form,hcIcuBeds:v})} optional/></div><RadioGroup label="Management Type *" options={['Single Owner','Partnership','Trust','Corporate']} selected={form.hcManagementType} onSelect={v=>setForm({...form,hcManagementType:v})}/></>}{cat==='Lab'&&<><InputField label="Lab / Diagnostic Centre Name *" value={form.hcEntityName} onChange={v=>setForm({...form,hcEntityName:v})}/><RadioGroup label="Lab Type *" options={['Pathology','Radiology','Multi-Specialty','Home Collection']} selected={form.hcLabType} onSelect={v=>setForm({...form,hcLabType:v})}/><CheckboxGroup label="Lab Services *" options={['Blood Tests','Urine Tests','X-Ray','MRI','CT Scan','Ultrasound','ECG','Home Collection']} selected={form.hcLabServices} onToggle={togLab}/></>}{cat==='Medical Store'&&<><InputField label="Medical Store / Pharmacy Name *" value={form.hcEntityName} onChange={v=>setForm({...form,hcEntityName:v})}/><RadioGroup label="Store Type *" options={['Retail Pharmacy','Hospital Pharmacy','Online Pharmacy','Wholesale']} selected={form.hcStoreType} onSelect={v=>setForm({...form,hcStoreType:v})}/><ToggleRow label="24-Hour Operations?" active={form.hc24HrOp} onToggle={v=>setForm({...form,hc24HrOp:v})}/><ToggleRow label="Home Delivery Available?" active={form.hcHomeDelivery} onToggle={v=>setForm({...form,hcHomeDelivery:v})}/></>}{cat==='Doctor'&&<><InputField label="Doctor's Full Name *" value={form.hcDoctorName} onChange={v=>setForm({...form,hcDoctorName:v})}/><InputField label="Specialization *" value={form.hcSpecialization} onChange={v=>setForm({...form,hcSpecialization:v})} placeholder="e.g. Cardiologist, General Physician"/><InputField label="Qualification *" value={form.hcQualification} onChange={v=>setForm({...form,hcQualification:v})} placeholder="e.g. MBBS, MD"/><InputField label="Years of Experience *" value={form.hcExperience} onChange={v=>setForm({...form,hcExperience:v})}/><RadioGroup label="Practice Type *" options={['Private Clinic','Hospital-Attached','Both']} selected={form.hcPracticeType} onSelect={v=>setForm({...form,hcPracticeType:v})}/></>}<InputField label="Year of Establishment *" value={form.hcEstabYear} onChange={v=>setForm({...form,hcEstabYear:v})}/><InputField label="Full Address *" value={form.hcAddress} onChange={v=>setForm({...form,hcAddress:v})} multiline/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="City *" value={form.hcCity} onChange={v=>setForm({...form,hcCity:v})}/><InputField label="State *" value={form.hcState} onChange={v=>setForm({...form,hcState:v})}/></div><InputField label="Pincode *" value={form.hcPincode} onChange={v=>setForm({...form,hcPincode:v})}/></div>);
    case'Legal & Compliance':return(<div><SectionHeader title="⚖️ Legal & Compliance Details" color={HC_ACCENT}/><InputField label="Registration Number *" value={form.hcRegNumber} onChange={v=>setForm({...form,hcRegNumber:v})} placeholder={cat==='Hospital'?'Clinical Establishment Reg. No.':cat==='Lab'?'Lab / Diagnostic Reg. No.':cat==='Medical Store'?'Drug License / Shop Reg. No.':'NMC / SMC Registration No.'}/><InputField label={cat==='Medical Store'?'Pharmacist Registration (NPC) *':'Doctor Registration (NMC / SMC) *'} value={form.hcDoctorReg} onChange={v=>setForm({...form,hcDoctorReg:v})} placeholder="e.g. MCI-XXXXXX / SMC-XXXXXX"/>{(cat==='Hospital'||cat==='Medical Store'||cat==='Lab')&&<><ToggleRow label="Drug License Applicable?" active={form.hcDrugLicenseApplicable} onToggle={v=>setForm({...form,hcDrugLicenseApplicable:v})}/>{form.hcDrugLicenseApplicable&&<InputField label="Drug License Number *" value={form.hcDrugLicenseNo} onChange={v=>setForm({...form,hcDrugLicenseNo:v})}/>}</>}{(cat==='Hospital'||cat==='Lab')&&<><ToggleRow label="Biomedical Waste Authorization (BMW) Obtained?" active={form.hcBmwAuth} onToggle={v=>setForm({...form,hcBmwAuth:v})}/>{form.hcBmwAuth&&<InputField label="BMW Authorization Number *" value={form.hcBmwAuthNo} onChange={v=>setForm({...form,hcBmwAuthNo:v})}/>}<ToggleRow label="AERB Licence (for Radiology) Applicable?" active={form.hcAerbApplicable} onToggle={v=>setForm({...form,hcAerbApplicable:v})}/>{form.hcAerbApplicable&&<InputField label="AERB Licence Number *" value={form.hcAerbNo} onChange={v=>setForm({...form,hcAerbNo:v})}/>}</>}<ToggleRow label="Fire NOC Obtained?" active={form.hcFireNoc} onToggle={v=>setForm({...form,hcFireNoc:v})}/>{form.hcFireNoc&&<InputField label="Fire NOC Number" value={form.hcFireNocNo} onChange={v=>setForm({...form,hcFireNocNo:v})} optional/>}{cat==='Lab'&&<><ToggleRow label="NABL Accreditation?" active={form.hcNablAccred} onToggle={v=>setForm({...form,hcNablAccred:v})}/>{form.hcNablAccred&&<InputField label="NABL Certificate Number" value={form.hcNablNo} onChange={v=>setForm({...form,hcNablNo:v})} optional/>}</>}{cat==='Hospital'&&<><ToggleRow label="NABH Accreditation?" active={form.hcNabhAccred} onToggle={v=>setForm({...form,hcNabhAccred:v})}/>{form.hcNabhAccred&&<InputField label="NABH Certificate Number" value={form.hcNabhNo} onChange={v=>setForm({...form,hcNabhNo:v})} optional/>}</>}<ToggleRow label="GST Registered?" active={form.hcGstRegistered} onToggle={v=>setForm({...form,hcGstRegistered:v})}/>{form.hcGstRegistered&&<InputField label="GST Number *" value={form.hcGstNumber} onChange={v=>setForm({...form,hcGstNumber:v})}/>}</div>);
    case'Documents':return(<div><SectionHeader title="📁 Required Documents" color={HC_ACCENT}/><UploadBtn label="Entity / Clinic Photo *" onPress={()=>handlePickFile('hcEntityPicDoc')} picked={!!form.files?.hcEntityPicDoc}/><UploadBtn label="Registration Certificate *" onPress={()=>handlePickFile('hcRegCert')} picked={!!form.files?.hcRegCert}/><UploadBtn label="Owner / Authorized Signatory ID Proof *" onPress={()=>handlePickFile('hcOwnerIdProof')} picked={!!form.files?.hcOwnerIdProof}/><UploadBtn label="Owner / Signatory Address Proof *" onPress={()=>handlePickFile('hcOwnerAddressProof')} picked={!!form.files?.hcOwnerAddressProof}/><UploadBtn label={cat==='Medical Store'?'Pharmacist Registration Certificate *':'Doctor Registration (NMC / SMC) *'} onPress={()=>handlePickFile('hcDoctorRegDoc')} picked={!!form.files?.hcDoctorRegDoc}/>{form.hcDrugLicenseApplicable&&<UploadBtn label="Drug License Certificate *" onPress={()=>handlePickFile('hcDrugLicenseDoc')} picked={!!form.files?.hcDrugLicenseDoc}/>}{form.hcBmwAuth&&<UploadBtn label="BMW Authorization Certificate *" onPress={()=>handlePickFile('hcBmwDoc')} picked={!!form.files?.hcBmwDoc}/>}{form.hcFireNoc&&<UploadBtn label="Fire NOC Certificate *" onPress={()=>handlePickFile('hcFireNocDoc')} picked={!!form.files?.hcFireNocDoc}/>}{form.hcAerbApplicable&&<UploadBtn label="AERB Licence Document *" onPress={()=>handlePickFile('hcAerbDoc')} picked={!!form.files?.hcAerbDoc}/>}{form.hcGstRegistered&&<UploadBtn label="GST Registration Certificate *" onPress={()=>handlePickFile('hcGstDoc')} picked={!!form.files?.hcGstDoc}/>}{cat==='Doctor'&&<><UploadBtn label="Medical Degree Certificate *" onPress={()=>handlePickFile('hcDegreeCert')} picked={!!form.files?.hcDegreeCert}/><UploadBtn label="Specialization Certificate (if any)" onPress={()=>handlePickFile('hcSpecCert')} picked={!!form.files?.hcSpecCert}/></>}</div>);
    case'Contact & Verification':return(<div><SectionHeader title="📞 Contact & Verification" color={HC_ACCENT}/><InputField label="Official Email *" value={form.hcEmail} onChange={v=>setForm({...form,hcEmail:v})} type="email"/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Primary Phone *" value={form.hcPhone} onChange={v=>setForm({...form,hcPhone:v})} type="tel"/><InputField label="Alternate Phone" value={form.hcAltPhone} onChange={v=>setForm({...form,hcAltPhone:v})} type="tel" optional/></div><InputField label="Website URL" value={form.hcWebsite} onChange={v=>setForm({...form,hcWebsite:v})} optional placeholder="https://"/>{cat==='Hospital'&&<><InputField label="Emergency Contact Number *" value={form.hcEmergencyNo} onChange={v=>setForm({...form,hcEmergencyNo:v})} type="tel"/><InputField label="Director / In-Charge Name *" value={form.hcDirectorName} onChange={v=>setForm({...form,hcDirectorName:v})}/></>}{cat==='Doctor'&&<><InputField label="Consultation Timings *" value={form.hcConsultTimings} onChange={v=>setForm({...form,hcConsultTimings:v})} placeholder="e.g. Mon-Sat 9AM–6PM"/><InputField label="Consultation Fee (₹) *" value={form.hcConsultFee} onChange={v=>setForm({...form,hcConsultFee:v})}/><ToggleRow label="Online Consultation Available?" active={form.hcOnlineConsult} onToggle={v=>setForm({...form,hcOnlineConsult:v})}/></>}<div style={{background:HC_ACCENT+'10',border:`1px solid ${HC_ACCENT}30`,borderRadius:10,padding:14,marginTop:16}}><div style={{fontSize:13,fontWeight:700,color:HC_ACCENT,marginBottom:10}}>📲 OTP Verification</div><InputField label="Phone for OTP *" value={form.hcOtpPhone} onChange={v=>setForm({...form,hcOtpPhone:v})} type="tel"/><InputField label="Email for OTP *" value={form.hcOtpEmail} onChange={v=>setForm({...form,hcOtpEmail:v})} type="email"/><button style={{width:'100%',padding:'11px 0',background:HC_ACCENT,color:'#fff',borderRadius:10,border:'none',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>Send OTP</button></div></div>);
    default:return null;
  }
};

/* ── FOOD STEPS ── */
const RenderFoodStep=({step,form,setForm,handlePickFile}:SP&{step:string})=>{
  const tg=(k:keyof FormData,v:string)=>tog(form,setForm,k,v);
  switch(step){
    case'Basic Info':return(<div><SectionHeader title="🍽️ Restaurant Basic Info" color={FOOD_ACCENT}/><InputField label="Restaurant / Business Name *" value={form.foodEntityName} onChange={v=>setForm({...form,foodEntityName:v})}/><RadioGroup label="Type *" options={['Restaurant','Cloud Kitchen','Catering Service','Food Truck','Tiffin Service','Bakery / Café']} selected={form.foodRestaurantType} onSelect={v=>setForm({...form,foodRestaurantType:v})}/><CheckboxGroup label="Cuisine Types *" options={['North Indian','South Indian','Chinese','Continental','Fast Food','Street Food','Biryani','Desserts','Vegan','Multi-Cuisine']} selected={form.foodCuisineTypes} onToggle={v=>tg('foodCuisineTypes',v)}/><InputField label="Year of Establishment *" value={form.foodEstabYear} onChange={v=>setForm({...form,foodEstabYear:v})}/><InputField label="Full Address *" value={form.foodAddress} onChange={v=>setForm({...form,foodAddress:v})} multiline/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="City *" value={form.foodCity} onChange={v=>setForm({...form,foodCity:v})}/><InputField label="State *" value={form.foodState} onChange={v=>setForm({...form,foodState:v})}/></div><InputField label="Pincode *" value={form.foodPincode} onChange={v=>setForm({...form,foodPincode:v})}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Owner Name *" value={form.foodOwnerName} onChange={v=>setForm({...form,foodOwnerName:v})}/><InputField label="Owner Phone *" value={form.foodOwnerPhone} onChange={v=>setForm({...form,foodOwnerPhone:v})} type="tel"/></div></div>);
    case'Legal & Compliance':return(<div><SectionHeader title="⚖️ Legal & Compliance" color={FOOD_ACCENT}/><InputField label="Business Registration Number *" value={form.foodRegNumber} onChange={v=>setForm({...form,foodRegNumber:v})}/><ToggleRow label="FSSAI License Registered?" active={form.foodFssaiRegistered} onToggle={v=>setForm({...form,foodFssaiRegistered:v})}/>{form.foodFssaiRegistered&&<InputField label="FSSAI License Number *" value={form.foodFssaiNumber} onChange={v=>setForm({...form,foodFssaiNumber:v})}/>}<ToggleRow label="GST Registered?" active={form.foodGstRegistered} onToggle={v=>setForm({...form,foodGstRegistered:v})}/>{form.foodGstRegistered&&<InputField label="GST Number *" value={form.foodGstNumber} onChange={v=>setForm({...form,foodGstNumber:v})}/>}<ToggleRow label="Food License Applicable?" active={form.foodFoodLicenseApplicable} onToggle={v=>setForm({...form,foodFoodLicenseApplicable:v})}/>{form.foodFoodLicenseApplicable&&<InputField label="Food License Number" value={form.foodFoodLicenseNo} onChange={v=>setForm({...form,foodFoodLicenseNo:v})} optional/>}<ToggleRow label="Health & Safety Certified?" active={form.foodHealthInspection} onToggle={v=>setForm({...form,foodHealthInspection:v})}/>{form.foodHealthInspection&&<InputField label="Health Inspection Certificate Number" value={form.foodHealthInspectionNo} onChange={v=>setForm({...form,foodHealthInspectionNo:v})} optional/>}<ToggleRow label="Fire NOC Certificate?" active={form.foodFireNoc} onToggle={v=>setForm({...form,foodFireNoc:v})}/>{form.foodFireNoc&&<InputField label="Fire NOC Number" value={form.foodFireNocNo} onChange={v=>setForm({...form,foodFireNocNo:v})} optional/>}</div>);
    case'Menu & Services':return(<div><SectionHeader title="🍴 Menu & Services" color={FOOD_ACCENT}/><InputField label="Special Menu Items / Specialties *" value={form.foodSpecialMenuItems} onChange={v=>setForm({...form,foodSpecialMenuItems:v})} placeholder="e.g. Biryani, Pizza, Desserts" multiline/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Average Price Per Meal (₹) *" value={form.foodAveragePrice} onChange={v=>setForm({...form,foodAveragePrice:v})}/><InputField label="Operating Hours *" value={form.foodOperatingHours} onChange={v=>setForm({...form,foodOperatingHours:v})} placeholder="11 AM - 11 PM"/></div><CheckboxGroup label="Dining Options Available" options={['Dine-in','Takeaway','Online Delivery','Outdoor Seating','Parking Available']} selected={form.foodDiningOptions} onToggle={v=>tg('foodDiningOptions',v)}/></div>);
    case'Documents':return(<div><SectionHeader title="📁 Required Documents" color={FOOD_ACCENT}/><UploadBtn label="Business Logo / Photo *" onPress={()=>handlePickFile('foodBusinessPhoto')} picked={!!form.files?.foodBusinessPhoto}/><UploadBtn label="Menu Card / Digital Menu *" onPress={()=>handlePickFile('foodMenuCard')} picked={!!form.files?.foodMenuCard}/><UploadBtn label="Business Registration Certificate *" onPress={()=>handlePickFile('foodRegCert')} picked={!!form.files?.foodRegCert}/>{form.foodFssaiRegistered&&<UploadBtn label="FSSAI License Certificate *" onPress={()=>handlePickFile('foodFssaiCert')} picked={!!form.files?.foodFssaiCert}/>}{form.foodGstRegistered&&<UploadBtn label="GST Certificate *" onPress={()=>handlePickFile('foodGstCert')} picked={!!form.files?.foodGstCert}/>}<UploadBtn label="Owner ID Proof *" onPress={()=>handlePickFile('foodOwnerIdProof')} picked={!!form.files?.foodOwnerIdProof}/><UploadBtn label="Owner Address Proof *" onPress={()=>handlePickFile('foodOwnerAddressProof')} picked={!!form.files?.foodOwnerAddressProof}/>{form.foodFireNoc&&<UploadBtn label="Fire NOC Certificate *" onPress={()=>handlePickFile('foodFireNocCert')} picked={!!form.files?.foodFireNocCert}/>}</div>);
    default:return null;
  }
};

/* ── INSTITUTION STEPS ── */
const RenderInstStep=({stepLabel,institutionType,form,setForm,handlePickFile}:SP&{stepLabel:string;institutionType:InstitutionType})=>{
  const tg=(k:keyof FormData,v:string)=>tog(form,setForm,k,v);
  switch(stepLabel){
    case'Basic Info':return(<div><SectionHeader title="🏫 Institution Basic Info"/><InputField label="Institution Name *" value={form.instName} onChange={v=>setForm({...form,instName:v})}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Establish Year *" value={form.establishYear} onChange={v=>setForm({...form,establishYear:v})}/><InputField label="Student Capacity *" value={form.studentCapacity} onChange={v=>setForm({...form,studentCapacity:v})}/></div><RadioGroup label="Management Type *" options={['Government','Government Aided','Private Unaided','International']} selected={form.managementType} onSelect={v=>setForm({...form,managementType:v})}/></div>);
    case'Location':return(<div><SectionHeader title="📍 Location"/><InputField label="Full Address *" value={form.address} onChange={v=>setForm({...form,address:v})} multiline/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="State *" value={form.state} onChange={v=>setForm({...form,state:v})}/><InputField label="District *" value={form.district} onChange={v=>setForm({...form,district:v})}/></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="City *" value={form.city} onChange={v=>setForm({...form,city:v})}/><InputField label="Pincode *" value={form.pincode} onChange={v=>setForm({...form,pincode:v})}/></div></div>);

    case'Contact':return(<div><SectionHeader title="📞 Contact Details"/><InputField label="Director / Principal Name *" value={form.directorName} onChange={v=>setForm({...form,directorName:v})}/><InputField label="Director Phone *" value={form.directorPhone} onChange={v=>setForm({...form,directorPhone:v})} type="tel"/><InputField label="Official Email *" value={form.email} onChange={v=>setForm({...form,email:v})} type="email"/><InputField label="Phone *" value={form.phone} onChange={v=>setForm({...form,phone:v})} type="tel"/><InputField label="Website" value={form.website} onChange={v=>setForm({...form,website:v})} optional placeholder="https://"/></div>);
    case'Legal':return(<div><SectionHeader title="⚖️ Legal Details"/><InputField label="Registration Number *" value={form.regNumber} onChange={v=>setForm({...form,regNumber:v})}/><InputField label="Affiliation *" value={form.affiliation} onChange={v=>setForm({...form,affiliation:v})} placeholder="e.g. CBSE, ICSE, State Board"/><InputField label="GST Number" value={form.gstNumber} onChange={v=>setForm({...form,gstNumber:v})} optional/><UploadBtn label="Registration Certificate *" onPress={()=>handlePickFile('regCert')} picked={!!form.files?.regCert}/><UploadBtn label="Affiliation Certificate *" onPress={()=>handlePickFile('affCert')} picked={!!form.files?.affCert}/></div>);
    case'Academics':return(<div><SectionHeader title="📚 Academics"/><CheckboxGroup label="Mediums Offered *" options={['English','Telugu','Hindi','Urdu','Other']} selected={form.mediums} onToggle={v=>tg('mediums',v)}/><CheckboxGroup label="Grades / Classes *" options={['1–5','6–8','6–10','11–12','Pre-Primary']} selected={form.grades} onToggle={v=>tg('grades',v)}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><InputField label="Teacher Count *" value={form.teacherCount} onChange={v=>setForm({...form,teacherCount:v})}/><InputField label="Current Strength" value={form.currentStrength} onChange={v=>setForm({...form,currentStrength:v})} optional/></div></div>);
    console.log(institutionType);
    default:return(<div style={{textAlign:'center',padding:'20px 0',color:t.subText}}><p style={{fontWeight:600}}>Step: {stepLabel}</p><p style={{fontSize:12}}>Fill in details for this step.</p></div>);
  }
};

/* ── GENERAL EDU FORM ── */
const GeneralEduForm=({form,setForm,handlePickFile}:SP)=>(
  <div style={{background:t.surface,borderRadius:14,padding:16,border:`1px solid ${t.border}`}}>
    <SectionHeader title="🎓 General Education Registration"/>
    <InputField label="Organization / Institute Name *" value={form.name} onChange={v=>setForm({...form,name:v})}/>
    <SelectDropdown label="Registration Type *" value={form.registrationType} options={[{label:'Proprietorship',value:'Proprietorship'},{label:'Partnership',value:'Partnership'},{label:'LLP',value:'LLP'},{label:'Pvt Ltd',value:'Pvt Ltd'},{label:'Trust',value:'Trust'},{label:'Society',value:'Society'}]} onSelect={v=>setForm({...form,registrationType:v})} placeholder="Select Registration Type"/>
    <InputField label="PAN / TAN Number *" value={form.panTan} onChange={v=>setForm({...form,panTan:v})}/>
    <ToggleRow label="Have GST?" active={form.hasGst} onToggle={v=>setForm({...form,hasGst:v})}/>
    {form.hasGst&&<InputField label="GST Number *" value={form.gstNumber} onChange={v=>setForm({...form,gstNumber:v})}/>}
    <ToggleRow label="Have Trade License?" active={form.hasTradeLicense} onToggle={v=>setForm({...form,hasTradeLicense:v})}/>
    <ToggleRow label="Have NOC?" active={form.hasNoc} onToggle={v=>setForm({...form,hasNoc:v})}/>
    <UploadBtn label="Upload Logo / Photo" onPress={()=>handlePickFile('logo')} picked={!!form.files?.logo}/>
    <UploadBtn label="Upload Registration Certificate *" onPress={()=>handlePickFile('regCert')} picked={!!form.files?.regCert}/>
  </div>
);

/* ── MODAL ── */
const ModuleModal=({visible,title,options,onSelect,onClose}:{visible:boolean;title:string;options:SelectOption[];onSelect:(v:string)=>void;onClose:()=>void})=>{
  if(!visible)return null;
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:24}} onClick={onClose}>
      <div style={{background:t.card,borderRadius:18,padding:22,width:'100%',maxWidth:400,maxHeight:'80vh',display:'flex',flexDirection:'column'}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
        <div style={{fontSize:17,fontWeight:800,marginBottom:16,color:t.text}}>Select {title}</div>
        <div style={{overflowY:'auto',flex:1}}>
          {options.map(o=>(
            <div key={o.value} onClick={()=>onSelect(o.value)} style={{padding:'13px 14px',borderBottom:`1px solid ${t.border}`,cursor:'pointer',fontSize:14,color:t.text,display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:8}}>
              {o.label}<span style={{color:t.subText}}>›</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{marginTop:16,background:'none',border:'none',color:t.danger,fontWeight:600,cursor:'pointer',fontSize:14,alignSelf:'center',fontFamily:'inherit'}}>Cancel</button>
      </div>
    </div>
  );
};

/* ── TOAST ── */
const Toast=({msg,onClose}:{msg:string;onClose:()=>void})=>{
  if(!msg)return null;
  return(<div style={{position:'fixed',bottom:32,left:'50%',transform:'translateX(-50%)',background:'#1e293b',color:'#fff',padding:'14px 24px',borderRadius:12,fontSize:14,fontWeight:600,zIndex:2000,maxWidth:340,textAlign:'center',boxShadow:'0 8px 32px rgba(0,0,0,0.2)',display:'flex',alignItems:'center',gap:12}}>{msg}<button onClick={onClose} style={{background:'none',border:'none',color:'#fff',cursor:'pointer',fontSize:18,lineHeight:1,fontFamily:'inherit'}}>×</button></div>);
};

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
const PartnerAuth=()=>{
  const[activeTab,setActiveTab]=useState<ActiveTab>('login');
  const[selectedModule,setSelectedModule]=useState<string|null>(null);
  const[selectedSubModule,setSelectedSubModule]=useState<EducationSubModule>(null);
  const[institutionType,setInstitutionType]=useState<InstitutionType>(null);
  const[healthcareCategory,setHealthcareCategory]=useState<HealthcareCategory>(null);
  const[healthcareStep,setHealthcareStep]=useState(1);
  const[foodStep,setFoodStep]=useState(1);
  const[instStep,setInstStep]=useState(1);
  const[studentStep,setStudentStep]=useState(1);
  const[companyStep,setCompanyStep]=useState(1);
  const[trainingStep,setTrainingStep]=useState(1);
  const[loading,setLoading]=useState(false);
  const[toast,setToast]=useState('');
  const[showModuleModal,setShowModuleModal]=useState(false);
  const[showSubModuleModal,setShowSubModuleModal]=useState(false);
  const[showInstTypeModal,setShowInstTypeModal]=useState(false);
  const[showHCCategoryModal,setShowHCCategoryModal]=useState(false);
  const[storedUser,setStoredUser]=useState<StoredUser|null>(null);
  const[currentDashboard,setCurrentDashboard]=useState<string|null>(null);

  const[formData,setFormData]=useState<FormData>({
    loginEmail:'',loginPassword:'',registerUsername:'',registerPassword:'',registerConfirmPassword:'',
    name:'',registrationType:'',panTan:'',hasGst:false,gstNumber:'',hasTradeLicense:false,hasNoc:false,files:{},
    instName:'',establishYear:'',managementType:'',state:'',district:'',city:'',pincode:'',
    address:'',directorName:'',directorPhone:'',email:'',phone:'',website:'',
    regNumber:'',affiliation:'',mediums:[],grades:[],studentCapacity:'',currentStrength:'',teacherCount:'',
    studentFullName:'',dob:'',gender:'',aadhar:'',studentPhone:'',studentEmail:'',
    studentAddress:'',studentCity:'',studentState:'',studentPincode:'',
    highestQual:'',prevInstitution:'',boardUniversity:'',yearOfPassing:'',percentage:'',
    mediumOfStudy:'',applyingFor:[],preferredInstitution:'',preferredLocation:'',
    category:'',needScholarship:false,needHostel:false,needTransport:false,
    techSkills:[],achievements:'',careerObjective:'',
    companyName:'',companyRegNo:'',companyWebsite:'',companyEmail:'',
    hrPhone:'',companyAddress:'',companyType:'',jobSector:'',
    jobTitle:'',jobDescription:'',jobType:'',workMode:'',jobLocation:'',
    vacancies:'',salaryRange:'',applicationDeadline:'',minEducation:'',
    experience:'',minPercentage:'',ageLimit:'',categoryPref:[],jobSkills:[],benefits:[],
    govtNotifNo:'',govtDept:'',payScale:'',selectionProcess:'',
    examDateAnnounced:false,examDate:'',govtNotifUrl:'',
    techCategory:'',preferredStack:'',bondRequired:false,bondDuration:'',esopAvailable:false,
    sectorDept:'',interviewProcess:'',joiningTimeline:'',
    trainingSide:'',courseCategory:'',trainingProvider:'',providerEmail:'',providerPhone:'',providerLocation:'',
    courseTitle:'',courseSubtitle:'',courseDescription:'',courseDuration:'',coursePrice:'',
    trainingMode:'',batchStartDate:'',batchSize:'',instructionLanguage:'',courseModules:[],courseMinQual:'',
    hcEntityName:'',hcEstabYear:'',hcAddress:'',hcCity:'',hcState:'',hcPincode:'',
    hcHospitalType:'',hcBedCapacity:'',hcIcuBeds:'',hcManagementType:'',
    hcLabType:'',hcLabServices:[],hcStoreType:'',hc24HrOp:false,hcHomeDelivery:false,
    hcDoctorName:'',hcSpecialization:'',hcQualification:'',hcExperience:'',hcPracticeType:'',
    hcRegNumber:'',hcDoctorReg:'',
    hcDrugLicenseApplicable:false,hcDrugLicenseNo:'',
    hcBmwAuth:false,hcBmwAuthNo:'',hcFireNoc:false,hcFireNocNo:'',
    hcAerbApplicable:false,hcAerbNo:'',hcNablAccred:false,hcNablNo:'',
    hcNabhAccred:false,hcNabhNo:'',hcGstRegistered:false,hcGstNumber:'',
    hcEmail:'',hcPhone:'',hcAltPhone:'',hcWebsite:'',
    hcEmergencyNo:'',hcDirectorName:'',
    hcConsultTimings:'',hcConsultFee:'',hcOnlineConsult:false,
    hcOtpPhone:'',hcOtpEmail:'',
    foodEntityName:'',foodEstabYear:'',foodAddress:'',foodCity:'',foodState:'',foodPincode:'',
    foodRestaurantType:'',foodCuisineTypes:[],
    foodOwnerName:'',foodOwnerPhone:'',foodManagerName:'',foodManagerPhone:'',
    foodRegNumber:'',foodFssaiRegistered:false,foodFssaiNumber:'',
    foodGstRegistered:false,foodGstNumber:'',foodFoodLicenseApplicable:false,foodFoodLicenseNo:'',
    foodHealthInspection:false,foodHealthInspectionNo:'',foodFireNoc:false,foodFireNocNo:'',
    foodEmail:'',foodPhone:'',foodWebsite:'',
    foodSpecialMenuItems:'',foodAveragePrice:'',foodOperatingHours:'',foodDiningOptions:[],
  });

  const modules:SelectOption[]=[{label:'🎓 Education',value:'education'},{label:'🏥 Health Care',value:'healthcare'},{label:'🍽️ My Food',value:'food'},{label:'🛒 Rent / Marketplace',value:'marketplace'},{label:'♻️ Swachify Products',value:'swachify'},{label:'🚗 Just Ride',value:'justride'}];
  const educationSubModules:SelectOption[]=[{label:'📚 General Education',value:'general_edu'},{label:'🏫 Institution / School / College',value:'institution'},{label:'👨‍🎓 Students',value:'students'},{label:'🏢 Companies',value:'companies'},{label:'🎯 Training',value:'training'}];
  const healthcareCategoryOptions:SelectOption[]=[{label:'🏥 Hospital',value:'Hospital'},{label:'🔬 Lab',value:'Lab'},{label:'💊 Medical Store',value:'Medical Store'},{label:'👨‍⚕️ Doctor',value:'Doctor'}];
  const institutionTypes:Array<{label:string;value:InstitutionType}>=[{label:'🏫 Primary School',value:'Primary School'},{label:'🏫 Secondary / High School',value:'Secondary / High School'},{label:'🎓 Inter / Junior College',value:'Inter / Junior College'},{label:'🎓 Graduation College',value:'Graduation College'},{label:'🎓 Post Graduation College',value:'Post Graduation College'}];

  const instSteps:string[]=institutionType?(TYPE_STEPS[institutionType]??BASE_STEPS):BASE_STEPS;
  const currentModuleObj=modules.find(m=>m.value===selectedModule);
  const headerTitle=currentModuleObj?currentModuleObj.label+' Partner':(activeTab==='login'?'Partner Login':'Partner Registration');

  const handlePickFile=(key:string):void=>{
    const input=document.createElement('input');
    input.type='file';input.accept='image/*,.pdf';
    input.onchange=(e:Event)=>{const target=e.target as HTMLInputElement;if(target.files?.[0]){setFormData(prev=>({...prev,files:{...prev.files,[key]:target.files![0].name}}));}};
    input.click();
  };
  const showToast=(msg:string):void=>{setToast(msg);setTimeout(()=>setToast(''),3500);};
  const handleLogin=():void=>{
    if(!formData.loginEmail||!formData.loginPassword){showToast('❌ Please enter username and password');return;}
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      if(!storedUser){showToast('❌ No account found. Please register first.');return;}
      if(storedUser.username!==formData.loginEmail||storedUser.password!==formData.loginPassword){showToast('❌ Invalid credentials');return;}
      setCurrentDashboard(storedUser.module+'_dashboard');
      showToast(`✅ Welcome back! Logged into ${currentModuleObj?.label||storedUser.module} dashboard.`);
    },800);
  };
  const handleSubmitRegistration=(dashboardType:string):void=>{
    if(formData.registerPassword!==formData.registerConfirmPassword){showToast('❌ Passwords do not match');return;}
    if(!formData.registerUsername||!formData.registerPassword){showToast('❌ Username and password are required');return;}
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      setStoredUser({username:formData.registerUsername,password:formData.registerPassword,module:selectedModule,subModule:selectedSubModule,healthcareCategory,dashboardType});
      showToast('🎉 Registration Successful! You can now log in.');
      setActiveTab('login');
    },1000);
  };
  const resetSteps=():void=>{setInstStep(1);setStudentStep(1);setCompanyStep(1);setTrainingStep(1);};
  const ddStyle:CSSProperties={display:'flex',justifyContent:'space-between',alignItems:'center',background:t.surface,padding:'12px 14px',borderRadius:10,border:`1px solid ${t.border}`,marginBottom:16,cursor:'pointer',height:46,boxSizing:'border-box'};
  const btnStyle=(bg:string):CSSProperties=>({width:'100%',padding:'14px 0',background:bg,color:'#fff',border:'none',borderRadius:12,fontWeight:700,fontSize:15,cursor:'pointer',marginTop:8,fontFamily:'inherit',transition:'background 0.2s'});

  if(currentDashboard)return(
    <div style={{minHeight:'100vh',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Outfit',sans-serif"}}>
      <div style={{background:t.card,borderRadius:24,padding:40,textAlign:'center',maxWidth:400,boxShadow:'0 8px 40px rgba(0,0,0,0.1)'}}>
        <div style={{fontSize:60,marginBottom:16}}>🎉</div>
        <h2 style={{color:t.text,margin:'0 0 8px'}}>Welcome to your Dashboard!</h2>
        <p style={{color:t.subText,marginBottom:24}}>Logged into <strong>{currentModuleObj?.label||selectedModule}</strong> partner dashboard.</p>
        <button onClick={()=>setCurrentDashboard(null)} style={{background:t.primary,color:'#fff',border:'none',borderRadius:12,padding:'12px 32px',fontWeight:700,fontSize:15,cursor:'pointer',fontFamily:'inherit'}}>← Back to Auth</button>
      </div>
    </div>
  );

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#eef2ff 0%,#f8faff 60%,#fef3ff 100%)',fontFamily:"'Outfit',sans-serif",padding:'20px 16px 60px'}}>
        <div style={{textAlign:'center',marginBottom:24,paddingTop:8}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:10,background:t.primary+'12',borderRadius:16,padding:'8px 20px',marginBottom:12}}>
            <span style={{fontSize:22}}>🤝</span>
            <span style={{fontSize:13,fontWeight:700,color:t.primary}}>Partner Portal</span>
          </div>
          <h1 style={{margin:0,fontSize:26,fontWeight:800,color:t.text}}>{headerTitle}</h1>
        </div>
        <div style={{background:t.card,borderRadius:24,padding:24,maxWidth:560,margin:'0 auto',boxShadow:'0 4px 40px rgba(79,70,229,0.08)',border:`1px solid ${t.border}`}}>
          {/* TABS */}
          <div style={{display:'flex',background:t.surface,borderRadius:10,padding:4,marginBottom:24,gap:4}}>
            {(['login','register']as ActiveTab[]).map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{flex:1,padding:'11px 0',borderRadius:8,border:'none',background:activeTab===tab?t.primary:'transparent',color:activeTab===tab?'#fff':t.subText,fontWeight:700,fontSize:14,cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit'}}>
                {tab==='login'?'🔐 Login':'📝 Register'}
              </button>
            ))}
          </div>

          {/* LOGIN */}
          {activeTab==='login'&&(
            <div>
              <InputField label="Username / Email" value={formData.loginEmail} onChange={v=>setFormData({...formData,loginEmail:v})} placeholder="Enter your username"/>
              <InputField label="Password" value={formData.loginPassword} onChange={v=>setFormData({...formData,loginPassword:v})} secure placeholder="Enter your password"/>
              <button onClick={handleLogin} disabled={loading} style={btnStyle(loading?t.subText:t.primary)}>{loading?'⏳ Logging in...':'🚀 Login'}</button>
              <p style={{textAlign:'center',fontSize:13,color:t.subText,marginTop:16}}>Don't have an account?{' '}<button onClick={()=>setActiveTab('register')} style={{background:'none',border:'none',color:t.primary,fontWeight:700,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>Register here</button></p>
            </div>
          )}

          {/* REGISTER */}
          {activeTab==='register'&&(
            <div>
              <div style={{background:t.primary+'08',border:`1px solid ${t.primary}25`,borderRadius:12,padding:16,marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:700,color:t.primary,marginBottom:12}}>🔐 Account Credentials</div>
                <InputField label="Username / Email *" value={formData.registerUsername} onChange={v=>setFormData({...formData,registerUsername:v})} placeholder="Choose a username"/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <InputField label="Password *" value={formData.registerPassword} onChange={v=>setFormData({...formData,registerPassword:v})} secure/>
                  <InputField label="Confirm Password *" value={formData.registerConfirmPassword} onChange={v=>setFormData({...formData,registerConfirmPassword:v})} secure/>
                </div>
              </div>

              <div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:5}}>Select Service Module *</div>
              <div onClick={()=>setShowModuleModal(true)} style={ddStyle}>
                <span style={{color:selectedModule?t.text:t.subText+'80',fontSize:14}}>{selectedModule?modules.find(m=>m.value===selectedModule)?.label:'Select Module'}</span>
                <span style={{color:t.subText}}>▾</span>
              </div>

              {selectedModule==='education'&&<><div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:5}}>Education Category *</div><div onClick={()=>setShowSubModuleModal(true)} style={ddStyle}><span style={{color:selectedSubModule?t.text:t.subText+'80',fontSize:14}}>{selectedSubModule?educationSubModules.find(m=>m.value===selectedSubModule)?.label:'Select Category'}</span><span style={{color:t.subText}}>▾</span></div></>}
              {selectedModule==='healthcare'&&<><div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:5}}>Healthcare Category *</div><div onClick={()=>setShowHCCategoryModal(true)} style={ddStyle}><span style={{color:healthcareCategory?t.text:t.subText+'80',fontSize:14}}>{healthcareCategory?healthcareCategoryOptions.find(o=>o.value===healthcareCategory)?.label:'Select Category'}</span><span style={{color:t.subText}}>▾</span></div></>}

              {/* HEALTHCARE */}
              {selectedModule==='healthcare'&&healthcareCategory&&<div>
                <div style={{display:'flex',alignItems:'center',gap:8,background:HC_ACCENT+'15',borderRadius:10,padding:'9px 12px',marginBottom:18,border:`1px solid ${HC_ACCENT}35`}}>
                  <span style={{color:HC_ACCENT,fontWeight:700,fontSize:13,flex:1}}>✅ {healthcareCategoryOptions.find(o=>o.value===healthcareCategory)?.label}</span>
                  <button onClick={()=>{setHealthcareCategory(null);setHealthcareStep(1);}} style={{background:'none',border:'none',color:HC_ACCENT,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>✏️ Change</button>
                </div>
                <MultiStepWrapper steps={HEALTHCARE_STEPS} currentStep={healthcareStep} accent={HC_ACCENT} onNext={()=>{if(healthcareStep===HEALTHCARE_STEPS.length){handleSubmitRegistration('healthcare');}else{setHealthcareStep(s=>s+1);}}} onBack={()=>setHealthcareStep(s=>s-1)} isLast={healthcareStep===HEALTHCARE_STEPS.length}>
                  <RenderHealthcareStep step={HEALTHCARE_STEPS[healthcareStep-1]} form={formData} setForm={setFormData} healthcareCategory={healthcareCategory} handlePickFile={handlePickFile}/>
                </MultiStepWrapper>
              </div>}
              {selectedModule==='healthcare'&&!healthcareCategory&&<div style={{textAlign:'center',padding:'24px 0',color:t.subText}}><span style={{fontSize:40}}>🏥</span><p style={{fontSize:13,marginTop:8}}>Select a healthcare category above to load the registration form.</p></div>}

              {/* FOOD */}
              {selectedModule==='food'&&<MultiStepWrapper steps={FOOD_STEPS} currentStep={foodStep} accent={FOOD_ACCENT} onNext={()=>{if(foodStep===FOOD_STEPS.length){handleSubmitRegistration('food');}else{setFoodStep(s=>s+1);}}} onBack={()=>setFoodStep(s=>s-1)} isLast={foodStep===FOOD_STEPS.length}><RenderFoodStep step={FOOD_STEPS[foodStep-1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile}/></MultiStepWrapper>}

              {/* EDU: GENERAL */}
              {selectedModule==='education'&&selectedSubModule==='general_edu'&&<div><GeneralEduForm form={formData} setForm={setFormData} handlePickFile={handlePickFile}/><button onClick={()=>handleSubmitRegistration('general_edu')} disabled={loading} style={btnStyle(loading?t.subText:t.primary)}>{loading?'⏳ Submitting...':'🎉 Submit Registration'}</button></div>}

              {/* EDU: STUDENTS */}
              {selectedModule==='education'&&selectedSubModule==='students'&&<MultiStepWrapper steps={STUDENT_STEPS} currentStep={studentStep} onNext={()=>{if(studentStep===STUDENT_STEPS.length){handleSubmitRegistration('students');}else{setStudentStep(s=>s+1);}}} onBack={()=>setStudentStep(s=>s-1)} isLast={studentStep===STUDENT_STEPS.length}><RenderStudentStep step={STUDENT_STEPS[studentStep-1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile}/></MultiStepWrapper>}

              {/* EDU: COMPANIES */}
              {selectedModule==='education'&&selectedSubModule==='companies'&&<MultiStepWrapper steps={COMPANY_STEPS} currentStep={companyStep} onNext={()=>{if(companyStep===COMPANY_STEPS.length){handleSubmitRegistration('companies');}else{setCompanyStep(s=>s+1);}}} onBack={()=>setCompanyStep(s=>s-1)} isLast={companyStep===COMPANY_STEPS.length}><RenderCompanyStep step={COMPANY_STEPS[companyStep-1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile}/></MultiStepWrapper>}

              {/* EDU: TRAINING */}
              {selectedModule==='education'&&selectedSubModule==='training'&&<MultiStepWrapper steps={TRAINING_STEPS} currentStep={trainingStep} onNext={()=>{if(trainingStep===TRAINING_STEPS.length){handleSubmitRegistration('training');}else{setTrainingStep(s=>s+1);}}} onBack={()=>setTrainingStep(s=>s-1)} isLast={trainingStep===TRAINING_STEPS.length}><RenderTrainingStep step={TRAINING_STEPS[trainingStep-1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile}/></MultiStepWrapper>}

              {/* EDU: INSTITUTION */}
              {selectedModule==='education'&&selectedSubModule==='institution'&&<div>
                {!institutionType?<div>
                  <div style={{fontSize:12,fontWeight:700,color:t.subText,marginBottom:5}}>Institution Type *</div>
                  <div onClick={()=>setShowInstTypeModal(true)} style={{...ddStyle,marginBottom:0}}><span style={{color:t.subText+'80',fontSize:14}}>Select Institution Type</span><span>▾</span></div>
                  <div style={{textAlign:'center',padding:'24px 0',color:t.subText}}><span style={{fontSize:36}}>🏛️</span><p style={{fontSize:12,marginTop:8}}>Choose the institution type above to load the registration form.</p></div>
                </div>:<div>
                  <div style={{display:'flex',alignItems:'center',gap:8,background:t.primary+'15',borderRadius:10,padding:'9px 12px',marginBottom:18,border:`1px solid ${t.primary}35`}}>
                    <span style={{color:t.primary,fontWeight:700,fontSize:13,flex:1}}>✅ {institutionTypes.find(t=>t.value===institutionType)?.label}</span>
                    <button onClick={()=>{setInstitutionType(null);setInstStep(1);}} style={{background:'none',border:'none',color:t.primary,cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>✏️ Change</button>
                  </div>
                  <MultiStepWrapper steps={instSteps} currentStep={instStep} onNext={()=>{if(instStep===instSteps.length){handleSubmitRegistration('institution');}else{setInstStep(s=>s+1);}}} onBack={()=>setInstStep(s=>s-1)} isLast={instStep===instSteps.length}>
                    <RenderInstStep stepLabel={instSteps[instStep-1]} institutionType={institutionType} form={formData} setForm={setFormData} handlePickFile={handlePickFile}/>
                  </MultiStepWrapper>
                </div>}
              </div>}

              {/* SIMPLE MODULES */}
              {selectedModule&&['marketplace','swachify','justride'].includes(selectedModule)&&<div>
                <div style={{background:t.surface,borderRadius:12,padding:16,border:`1px solid ${t.border}`,marginBottom:16}}>
                  <SectionHeader title={`${modules.find(m=>m.value===selectedModule)?.label} Registration`}/>
                  <InputField label="Business / Entity Name *" value={formData.name} onChange={v=>setFormData({...formData,name:v})}/>
                  <InputField label="Owner / Contact Name *" value={formData.directorName} onChange={v=>setFormData({...formData,directorName:v})}/>
                  <InputField label="Phone *" value={formData.phone} onChange={v=>setFormData({...formData,phone:v})} type="tel"/>
                  <InputField label="Email *" value={formData.email} onChange={v=>setFormData({...formData,email:v})} type="email"/>
                  <InputField label="Address *" value={formData.address} onChange={v=>setFormData({...formData,address:v})} multiline/>
                </div>
                <button onClick={()=>handleSubmitRegistration(selectedModule!)} disabled={loading} style={btnStyle(loading?t.subText:t.primary)}>{loading?'⏳ Submitting...':'🎉 Submit Registration'}</button>
              </div>}

              {!selectedModule&&<div style={{textAlign:'center',padding:'32px 0',color:t.subText}}><span style={{fontSize:40}}>👆</span><p style={{fontSize:13,marginTop:8}}>Please select a module to start registration</p></div>}
            </div>
          )}
        </div>
      </div>

      <ModuleModal visible={showModuleModal} title="Module" options={modules} onSelect={v=>{setSelectedModule(v);setSelectedSubModule(null);setInstitutionType(null);setHealthcareCategory(null);setHealthcareStep(1);setFoodStep(1);resetSteps();setShowModuleModal(false);}} onClose={()=>setShowModuleModal(false)}/>
      <ModuleModal visible={showSubModuleModal} title="Education Category" options={educationSubModules} onSelect={v=>{setSelectedSubModule(v as EducationSubModule);setInstitutionType(null);resetSteps();setShowSubModuleModal(false);}} onClose={()=>setShowSubModuleModal(false)}/>
      <ModuleModal visible={showInstTypeModal} title="Institution Type" options={institutionTypes.map(t=>({label:t.label,value:t.value as string}))} onSelect={v=>{setInstitutionType(v as InstitutionType);setInstStep(1);setShowInstTypeModal(false);}} onClose={()=>setShowInstTypeModal(false)}/>
      <ModuleModal visible={showHCCategoryModal} title="Healthcare Category" options={healthcareCategoryOptions} onSelect={v=>{setHealthcareCategory(v as HealthcareCategory);setHealthcareStep(1);setShowHCCategoryModal(false);}} onClose={()=>setShowHCCategoryModal(false)}/>
      <Toast msg={toast} onClose={()=>setToast('')}/>
    </>
  );
};

export default PartnerAuth;
