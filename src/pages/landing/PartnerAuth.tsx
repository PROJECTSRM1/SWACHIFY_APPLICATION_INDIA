import React, { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════ */
const colors = {
  primary: "#2563eb",
  background: "#f8fafc",
  card: "#ffffff",
  surface: "#f1f5f9",
  border: "#e2e8f0",
  text: "#0f172a",
  subText: "#64748b",
  danger: "#ef4444",
  success: "#22c55e",
  gradientStart: "#eff6ff",
  gradientEnd: "#f8fafc",
};

/* ═══════════════════════════════════════════════════════════
   API CONFIGURATION
   ═══════════════════════════════════════════════════════════ */
const API_BASE_URL = "https://swachify-india-be-1-mcrb.onrender.com";

const formatDateToISO = (date: string) => {
  if (!date) return "";
  const parts = date.split("/");
  if (parts.length !== 3) return date;
  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
};

const MODULE_IDS: Record<string, number> = {
  education: 5, healthcare: 8, food: 9,
  marketplace: 3, swachify: 6, justride: 2,
};

const SERVICE_CATEGORY_IDS: Record<string, number> = {
  general_edu: 1, institution: 2, students: 3, companies: 4, training: 5,
  Hospital: 6, Lab: 7, "Medical Store": 8, Doctor: 9, food_restaurant: 10,
};

/* ═══════════════════════════════════════════════════════════
   API SERVICE LAYER
   ═══════════════════════════════════════════════════════════ */
const apiPost = async <T = any>(endpoint: string, payload: object): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    if (typeof data === "string") msg = data;
    else if (data?.detail) msg = JSON.stringify(data.detail);
    else if (data?.message) msg = data.message;
    throw new Error(msg);
  }
  return data as T;
};

interface CreateUserResponse { id: number; email?: string; }
interface RegisterPartnerResponse { id: number; module_id: number; service_module_category_id: number; user_id: number; }

const createUser = (email: string, password: string, confirmPassword: string) =>
  apiPost<CreateUserResponse>("/partner-registration/users", { email, password, confirm_password: confirmPassword });

const registerPartner = (userId: number, moduleId: number, serviceCategoryId: number) =>
  apiPost<RegisterPartnerResponse>("/partner-registration/register", {
    user_id: userId, module_id: moduleId, service_module_category_id: serviceCategoryId,
  });

/* ═══════════════════════════════════════════════════════════
   ENUM / ID MAPPER HELPERS
   ═══════════════════════════════════════════════════════════ */
const arrayToAdditionalProps = (arr?: string[]): Record<string, any> => {
  if (!arr || arr.length === 0) return {};
  return arr.reduce((acc, val, idx) => ({ ...acc, [`prop${idx + 1}`]: val }), {});
};
const stringToAdditionalProps = (val?: string): Record<string, any> => val ? { prop1: val } : {};
const mapManagementType = (v?: string): number => ({ Private: 1, Government: 2, "Aided": 3, "Trust / Society": 4 }[v ?? ""] ?? 0);
const mapInstitutionType = (v?: string): number => ({ "Primary School": 1, "Secondary / High School": 2, "Inter / Junior College": 3, "Graduation College": 4, "Post Graduation College": 5 }[v ?? ""] ?? 0);
const mapBoardAffiliation = (v?: string): number => ({ "State Board": 1, CBSE: 2, ICSE: 3, IB: 4 }[v ?? ""] ?? 0);
const mapHighestQual = (v?: string): number => ({ "10th / SSC": 1, "12th / Intermediate": 2, Graduation: 3, "Post Graduation": 4, PhD: 5 }[v ?? ""] ?? 0);
const mapMedium = (v?: string): number => ({ English: 1, Telugu: 2, Hindi: 3, Others: 4 }[v ?? ""] ?? 0);
const mapCategory = (v?: string): number => ({ General: 1, OBC: 2, SC: 3, ST: 4, EWS: 5 }[v ?? ""] ?? 0);
const mapGender = (v?: string): number => ({ Male: 1, Female: 2, Other: 3 }[v ?? ""] ?? 0);
const mapCompanyType = (v?: string): number => ({ Startup: 1, SME: 2, MNC: 3, PSU: 4, "Government Body": 5, NGO: 6 }[v ?? ""] ?? 0);
const mapJobSector = (v?: string): number => ({ Government: 1, IT: 2, Healthcare: 3, Banking: 4, Education: 5, Manufacturing: 6, Railway: 7, Legal: 8, Marketing: 9, Retail: 10, Construction: 11, Design: 12, Data: 13, Other: 14 }[v ?? ""] ?? 0);
const mapJobType = (v?: string): number => ({ "Full-Time": 1, "Part-Time": 2, Contract: 3, Internship: 4, Freelance: 5 }[v ?? ""] ?? 0);
const mapWorkMode = (v?: string): number => ({ "On-Site": 1, Remote: 2, Hybrid: 3 }[v ?? ""] ?? 0);
const mapMinEducation = (v?: string): number => ({ "10th": 1, "12th / Diploma": 2, Graduation: 3, "Post Graduation": 4, Any: 5 }[v ?? ""] ?? 0);
const mapTechCategory = (v?: string): number => ({ Frontend: 1, Backend: 2, "Full Stack": 3, Mobile: 4, DevOps: 5, "Data / ML": 6, "QA / Testing": 7, Other: 8 }[v ?? ""] ?? 0);
const mapTrainingType = (v?: string): number => ({ "IT / Technology": 1, "Government Exam": 2 }[v ?? ""] ?? 0);
const mapCourseCategory = (v?: string, side?: string): number => {
  if (side === "Government Exam") return ({ UPSC: 1, SSC: 2, Banking: 3, Railway: 4, StatePSC: 5, Defence: 6, Police: 7, Teaching: 8, Medical: 9, JEE: 10 }[v ?? ""] ?? 0);
  return ({ Java: 1, Python: 2, Frontend: 3, Mobile: 4, Cloud: 5, AI_ML: 6, Cybersecurity: 7, Analytics: 8, Database: 9, FullStack: 10, Management: 11 }[v ?? ""] ?? 0);
};
const mapTrainingMode = (v?: string): number => ({ Online: 1, Offline: 2, Hybrid: 3 }[v ?? ""] ?? 0);
const mapMinQual = (v?: string): number => ({ "10th": 1, "12th": 2, Graduation: 3, Any: 4 }[v ?? ""] ?? 0);
const mapHospitalType = (v?: string): number => ({ General: 1, "Multi-Specialty": 2, "Super-Specialty": 3, "Teaching Hospital": 4, Maternity: 5, "Trauma Center": 6 }[v ?? ""] ?? 0);
const mapLabType = (v?: string): number => ({ Pathology: 1, Radiology: 2, Microbiology: 3, Biochemistry: 4, "Multi-Diagnostic": 5 }[v ?? ""] ?? 0);
const mapStoreType = (v?: string): number => ({ "Retail Pharmacy": 1, "Wholesale Pharmacy": 2, "Online Pharmacy": 3, "Hospital Pharmacy": 4 }[v ?? ""] ?? 0);
const mapPracticeType = (v?: string): number => ({ "Individual Clinic": 1, "Hospital-Attached": 2, Telemedicine: 3, "Visiting Doctor": 4 }[v ?? ""] ?? 0);

/* ═══════════════════════════════════════════════════════════
   MODULE-SPECIFIC API FUNCTIONS
   ═══════════════════════════════════════════════════════════ */
const registerInstitution = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/institution-school-college", {
    partner_registration_id: partnerId, institution_name: form.instName ?? "",
    establishment_year: Number(form.establishYear) || 0, management_type_id: mapManagementType(form.managementType),
    country: form.country ?? "India", state: form.state ?? "", district: form.district ?? "",
    city: form.city ?? "", address: form.address ?? "", pincode: Number(form.pincode) || 0,
    official_email: form.email ?? "", official_phone_number: form.phone ?? "",
    director_principal_name: form.directorName ?? "", director_contact_number: form.directorPhone ?? "",
    registration_number: form.regNumber ?? "", affiliation_board_university: form.affiliation ?? "",
    upload_registration_certificate: form.files?.regCert ?? "", upload_affiliation_proof: form.files?.affiliationProof ?? "",
    upload_principal_id_proof: form.files?.principalId ?? "", education_medium: arrayToAdditionalProps(form.mediums),
    education_grades_offered: arrayToAdditionalProps(form.grades), student_capacity: Number(form.studentCapacity) || 0,
    current_student_strength: Number(form.currentStrength) || 0, teacher_count: Number(form.teacherCount) || 0,
    streams_offered: arrayToAdditionalProps(form.streams), degree_courses_offered: arrayToAdditionalProps(form.degreeTypes),
    board_affiliation_id: mapBoardAffiliation(form.boardAffiliation), available_pg_programs: arrayToAdditionalProps(form.pgPrograms),
    institution_type_id: mapInstitutionType(form.institutionType), upload_institution_logo: form.files?.instLogo ?? "",
    website_url: form.website ?? "", accreditation: form.accreditation ?? "", gst_number: form.gstNumber ?? "", created_by: userId,
  });

const registerStudent = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/student-registration", {
    partner_registration_id: partnerId, student_name: form.studentFullName ?? "",
    aadhar_number: form.aadhar ?? "", mobile_number: form.studentPhone ?? "", email: form.studentEmail ?? "",
    residential_address: form.studentAddress ?? "", city: form.studentCity ?? "", state: form.studentState ?? "",
    pincode: Number(form.studentPincode) || 0, highest_qualification_id: mapHighestQual(form.highestQual),
    school_college_name: form.prevInstitution ?? "", board_university: form.boardUniversity ?? "",
    passing_year: Number(form.yearOfPassing) || 0, cgpa_percentage: Number(form.percentage) || 0,
    study_medium_id: mapMedium(form.mediumOfStudy), applying_application_interst: arrayToAdditionalProps(form.applyingFor),
    cast_category_id: mapCategory(form.category), upload_profile_photo: form.files?.studentPhoto ?? "",
    upload_aadhar_card: form.files?.aadharDoc ?? "", upload_10th_marksheet: form.files?.tenthMarksheet ?? "",
    date_of_birth: formatDateToISO(form.dob), gender_id: mapGender(form.gender),
    preferred_institution_course: form.preferredInstitution ?? "", preferred_location: form.preferredLocation ?? "",
    require_scholarship: form.needScholarship ?? false, require_hostel_facility: form.needHostel ?? false,
    require_transport_facility: form.needTransport ?? false, technical_skills: arrayToAdditionalProps(form.techSkills),
    extra_curricular_achievements: form.achievements ?? "", career_objective: form.careerObjective ?? "",
    upload_12th_marksheet: form.files?.twelfthMarksheet ?? "", upload_degree_certificate: form.files?.degreeCert ?? "",
    upload_resume: form.files?.resume ?? "", upload_transfer_certificate: form.files?.transferCert ?? "",
    upload_cast_certificate: form.files?.casteCert ?? "", upload_income_certificate: form.files?.incomeCert ?? "", created_by: userId,
  });

const registerCompany = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/companies-registration", {
    partner_registration_id: partnerId, company_name: form.companyName ?? "",
    company_registration_number: form.companyRegNo ?? "", official_email: form.companyEmail ?? "",
    hr_contact_number: form.hrPhone ?? "", company_hq_address: form.companyAddress ?? "",
    company_type_id: mapCompanyType(form.companyType), upload_gst_certificate: form.files?.companyGst ?? "",
    job_sector_id: mapJobSector(form.jobSector), job_title: form.jobTitle ?? "",
    job_description: form.jobDescription ?? "", job_type_id: mapJobType(form.jobType),
    work_mode_id: mapWorkMode(form.workMode), job_locations: stringToAdditionalProps(form.jobLocation),
    no_of_vacancies: Number(form.vacancies) || 0, salary_ctc_range: form.salaryRange ?? "",
    application_deadline: form.applicationDeadline ?? "", minimun_education_id: mapMinEducation(form.minEducation),
    department_ministry_name: form.govtDept ?? form.sectorDept ?? "", pay_scale: Number(form.payScale) || 0,
    selection_process: form.selectionProcess ?? "", company_website_url: form.companyWebsite ?? "",
    upload_company_logo: form.files?.companyLogo ?? "", required_experience: form.experience ?? "",
    minimum_percentage_required: Number(form.minPercentage) || 0, age_limit: form.ageLimit ?? "",
    cast_category_preferences: arrayToAdditionalProps(form.categoryPref), required_skills: arrayToAdditionalProps(form.jobSkills),
    exam_notification_number: form.govtNotifNo ?? "", exam_date_announced: form.examDateAnnounced ?? false,
    exam_date: form.examDate ?? "", official_notification_url: form.govtNotifUrl ?? "",
    upload_notification_pdf: form.files?.govtNotifPdf ?? "", tech_stack_category_id: mapTechCategory(form.techCategory),
    preferred_tech_stack: form.preferredStack ?? "", service_agreement_required: form.bondRequired ?? false,
    stock_options_available: form.esopAvailable ?? false, joining_timeline: form.joiningTimeline ?? "",
    benefits_perks: arrayToAdditionalProps(form.benefits), created_by: userId,
  });

const registerTraining = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/training-registration", {
    partner_registration_id: partnerId, training_type_id: mapTrainingType(form.trainingSide),
    course_exam_category_id: 0, exam_category_id: mapCourseCategory(form.courseCategory, form.trainingSide),
    institute_provider_name: form.trainingProvider ?? "", provider_contact_email: form.providerEmail ?? "",
    provider_phone_number: form.providerPhone ?? "", provider_location: form.providerLocation ?? "",
    course_title: form.courseTitle ?? "", course_description: form.courseDescription ?? "",
    training_mode_id: mapTrainingMode(form.trainingMode), batch_start_date: form.batchStartDate ?? "",
    language_instruction: stringToAdditionalProps(form.instructionLanguage),
    min_qualification_required_id: mapMinQual(form.courseMinQual),
    upload_course_banner_image: form.files?.courseBanner ?? "", institute_logo: form.files?.providerLogo ?? "",
    course_tagline: form.courseSubtitle ?? "", course_duration: form.courseDuration ?? "",
    total_sessions_hours: form.totalHours ?? "", training_fee: form.coursePrice ?? "",
    class_schedule_timings: form.classSchedule ?? "", max_students_per_batch: Number(form.batchSize) || 0,
    course_modules: arrayToAdditionalProps(form.courseModules), technologies_covered: form.techStack ?? "",
    projects_included: form.projectsIncluded ?? "", completion_certificate_provided: form.certProvided ?? false,
    placement_assistance: form.placementAssist ?? false, instructor_name_linkedin: form.instructorInfo ?? "",
    previous_batch_enrolled_count: Number(form.prevEnrolled) || 0, previous_batch_pass_percentage: Number(form.prevPassPct) || 0,
    exam_stages_covered: arrayToAdditionalProps(form.examStagesCovered), target_exam_year: Number(form.targetExamYear) || 0,
    pyq_coverage: form.pyqCoverage ?? "", no_of_mock_tests: Number(form.mockTestCount) || 0,
    study_material_provided: form.studyMaterialProvided ?? false, current_affairs_coverage: form.currentAffairsCoverage ?? false,
    past_selection_rank_holders: form.pastSelections ?? "", hostel_facility: form.govtCourseHostel ?? false,
    upload_sample_study_material: form.files?.courseBrochure ?? "", upload_sample_certificate: form.files?.sampleCert ?? "", created_by: userId,
  });

const registerHospital = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/hospital-registration", {
    partner_registration_id: partnerId, hospital_name: form.hcEntityName ?? "",
    upload_entity_photo: form.files?.hcEntityPic ?? "", hospital_type_id: mapHospitalType(form.hcHospitalType),
    bed_capacity: Number(form.hcBedCapacity) || 0, management_type_id: mapManagementType(form.hcManagementType),
    establishment_year: Number(form.hcEstabYear) || 0, address: form.hcAddress ?? "",
    city: form.hcCity ?? "", state: form.hcState ?? "", pincode: Number(form.hcPincode) || 0,
    registration_number: form.hcRegNumber ?? "", doctor_registration: form.hcDoctorReg ?? "",
    official_email: form.hcEmail ?? "", primary_phone_number: form.hcPhone ?? "",
    medical_superintendent_name: form.hcDirectorName ?? "", medical_superintendent_contact: form.hcDirectorPhone ?? "",
    official_mobile_for_otp: form.hcOtpPhone ?? "", official_email_for_otp: form.hcOtpEmail ?? "", created_by: userId,
  });

const registerLab = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/lab-registration", {
    partner_registration_id: partnerId, lab_name: form.hcEntityName ?? "",
    upload_entity_photo: form.files?.hcEntityPic ?? "", lab_type_id: mapLabType(form.hcLabType),
    services_offered: arrayToAdditionalProps(form.hcLabServices), establishment_year: Number(form.hcEstabYear) || 0,
    address: form.hcAddress ?? "", city: form.hcCity ?? "", state: form.hcState ?? "",
    pincode: Number(form.hcPincode) || 0, registration_number: form.hcRegNumber ?? "",
    doctor_registration: form.hcDoctorReg ?? "", upload_registration_certificate: form.files?.hcRegCert ?? "",
    upload_owner_id_proof: form.files?.hcOwnerIdProof ?? "", upload_owner_address_proof: form.files?.hcOwnerAddressProof ?? "",
    upload_doctor_registration: form.files?.hcDoctorRegDoc ?? "",
    upload_labs_equipment_calibration_reports: form.files?.hcCalibDoc ?? "",
    official_email: form.hcEmail ?? "", primary_phone_number: form.hcPhone ?? "",
    lab_in_charge_name: form.hcLabInCharge ?? "", lab_in_charge_contact: form.hcLabInChargePhone ?? "",
    official_mobile_for_otp: form.hcOtpPhone ?? "", official_email_for_otp: form.hcOtpEmail ?? "", created_by: userId,
  });

const registerMedicalStore = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/medical-store-registration", {
    partner_registration_id: partnerId, medical_store_name: form.hcEntityName ?? "",
    upload_entity_photo: form.files?.hcEntityPic ?? "", store_type_id: mapStoreType(form.hcStoreType),
    establishment_year: Number(form.hcEstabYear) || 0, address: form.hcAddress ?? "",
    city: form.hcCity ?? "", state: form.hcState ?? "", pincode: Number(form.hcPincode) || 0,
    registration_number: form.hcRegNumber ?? "", pharmacist_registration: form.hcDoctorReg ?? "",
    upload_registration_certificate: form.files?.hcRegCert ?? "", upload_owner_id_proof: form.files?.hcOwnerIdProof ?? "",
    upload_owner_address_proof: form.files?.hcOwnerAddressProof ?? "",
    upload_pharmacist_registration_certificate: form.files?.hcDoctorRegDoc ?? "",
    upload_shop_registration: form.files?.hcShopReg ?? "", official_email: form.hcEmail ?? "",
    primary_phone_number: form.hcPhone ?? "", pharmacist_owner_name: form.hcPharmacistName ?? "",
    pharmacist_contact: form.hcPharmacistPhone ?? "", official_mobile_for_otp: form.hcOtpPhone ?? "",
    official_email_for_otp: form.hcOtpEmail ?? "", created_by: userId,
  });

const registerDoctor = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/doctor-registration", {
    partner_registration_id: partnerId, doctor_clinic_name: form.hcEntityName ?? "",
    upload_clinic_photo: form.files?.hcEntityPic ?? "", doctor_name: form.hcDoctorName ?? "",
    specialization: form.hcSpecialization ?? "", qualification: form.hcQualification ?? "",
    experience_years: Number(form.hcExperience) || 0, practice_type_id: mapPracticeType(form.hcPracticeType),
    establishment_year: Number(form.hcEstabYear) || 0, address: form.hcAddress ?? "",
    city: form.hcCity ?? "", state: form.hcState ?? "", pincode: Number(form.hcPincode) || 0,
    registration_number: form.hcRegNumber ?? "", doctor_registration: form.hcDoctorReg ?? "",
    upload_registration_certificate: form.files?.hcRegCert ?? "", upload_owner_id_proof: form.files?.hcOwnerIdProof ?? "",
    upload_owner_address_proof: form.files?.hcOwnerAddressProof ?? "",
    upload_doctor_registration: form.files?.hcDoctorRegDoc ?? "",
    upload_medical_degree_certificate: form.files?.hcDegreeCert ?? "",
    upload_specialization_certificate: form.files?.hcSpecCert ?? "",
    official_email: form.hcEmail ?? "", primary_phone_number: form.hcPhone ?? "",
    consultation_timings: form.hcConsultTimings ?? "", official_mobile_for_otp: form.hcOtpPhone ?? "",
    official_email_for_otp: form.hcOtpEmail ?? "", created_by: userId,
  });

const registerFood = (partnerId: number, userId: number, form: any) =>
  apiPost("/partner-registration/my-food-registration", {
    partner_registration_id: partnerId, restaurant_name: form.foodEntityName ?? "",
    restaurant_photo: form.files?.foodEntityPhoto ?? "", establishment_year: Number(form.foodEstabYear) || 0,
    cuisine_type: arrayToAdditionalProps(form.foodCuisineTypes), seating_capacity: Number(form.foodSeatingCapacity) || 0,
    owner_name: form.foodOwnerName ?? "", owner_phone_number: form.foodOwnerPhone ?? "",
    business_registration_number: form.foodRegNumber ?? "", special_menu_items: stringToAdditionalProps(form.foodSpecialMenuItems),
    average_price_per_meal: Number(form.foodAveragePrice) || 0, operating_hours: form.foodOperatingHours ?? "",
    upload_menu_card: form.files?.foodMenuCard ?? "",
    upload_business_registration_certificate: form.files?.foodRegCert ?? "",
    upload_fssai_license_certificate: form.files?.foodFssaiCert ?? "",
    upload_gst_certificate: form.files?.foodGstCert ?? "", upload_owner_id_proof: form.files?.foodOwnerIdProof ?? "",
    upload_owner_address_proof: form.files?.foodOwnerAddressProof ?? "",
    upload_food_license_certificate: form.files?.foodLicenseCert ?? "",
    upload_health_inspection_report: form.files?.foodHealthCert ?? "",
    upload_fire_noc_certificate: form.files?.foodFireNocCert ?? "",
    manager_name: form.foodManagerName ?? "", manager_phone_number: form.foodManagerPhone ?? "",
    fssai_license_registered: form.foodFssaiRegistered ?? false, fssai_license_number: form.foodFssaiNumber ?? "",
    gst_registered: form.foodGstRegistered ?? false, gst_number: form.foodGstNumber ?? "",
    food_license_applicable: form.foodFoodLicenseApplicable ?? false, food_license_number: form.foodFoodLicenseNo ?? "",
    health_safety_certfied: form.foodHealthInspection ?? false,
    health_inspection_certifiate_number: form.foodHealthInspectionNo ?? "",
    fire_noc_certficate: form.foodFireNoc ?? false, fire_noc_number: form.foodFireNocNo ?? "",
    avialable_dining_options: arrayToAdditionalProps(form.foodDiningOptions), created_by: userId,
  });

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
type InstitutionType = "Primary School" | "Secondary / High School" | "Inter / Junior College" | "Graduation College" | "Post Graduation College" | null;
type EducationSubModule = "general_edu" | "institution" | "students" | "companies" | "training" | null;
type HealthcareCategory = "Hospital" | "Lab" | "Medical Store" | "Doctor" | null;

/* ═══════════════════════════════════════════════════════════
   STEP DEFINITIONS
   ═══════════════════════════════════════════════════════════ */
const BASE_STEPS = ["Basic Info", "Location", "Contact", "Legal"];
const TYPE_STEPS: Record<string, string[]> = {
  "Primary School": [...BASE_STEPS, "Academics", "Facilities", "Activities"],
  "Secondary / High School": [...BASE_STEPS, "Academics", "Facilities", "Advanced"],
  "Inter / Junior College": [...BASE_STEPS, "Streams", "Facilities", "Performance"],
  "Graduation College": [...BASE_STEPS, "Courses", "Infrastructure"],
  "Post Graduation College": [...BASE_STEPS, "Courses", "Infrastructure", "PG Details"],
};
const STUDENT_STEPS = ["Personal", "Education", "Application", "Skills", "Documents"];
const COMPANY_STEPS = ["Company Info", "Job Details", "Eligibility", "Sector Specific", "Benefits"];
const TRAINING_STEPS = ["Training Type", "Provider Info", "Course Details", "Specifics", "Documents"];
const HEALTHCARE_STEPS = ["Basic Info", "Legal & Compliance", "Documents", "Contact & Verification"];
const FOOD_STEPS = ["Basic Info", "Legal & Compliance", "Menu & Services", "Documents"];

/* ═══════════════════════════════════════════════════════════
   PRIMITIVE COMPONENTS
   ═══════════════════════════════════════════════════════════ */
const InputField = ({ label, value, onChange, secure, multiline, type, placeholder, optional }: any) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5, gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: colors.subText }}>{label}</label>
      {optional && <span style={{ fontSize: 10, color: colors.subText + "80" }}>(Optional)</span>}
    </div>
    {multiline ? (
      <textarea
        style={{ width: "100%", background: colors.surface, borderRadius: 10, padding: "12px 14px", color: colors.text, border: `1px solid ${colors.border}`, height: 80, fontSize: 14, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
      />
    ) : (
      <input
        style={{ width: "100%", background: colors.surface, borderRadius: 10, padding: "12px 14px", color: colors.text, border: `1px solid ${colors.border}`, height: 44, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }}
        type={secure ? "password" : type ?? "text"}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
      />
    )}
  </div>
);

const UploadBtn = ({ label, onPress, picked }: any) => (
  <div
    onClick={onPress}
    style={{ padding: 13, border: `1.5px dashed ${picked ? colors.success : colors.primary}`, borderRadius: 10, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: picked ? colors.success + "10" : colors.primary + "08", cursor: "pointer" }}
  >
    <span style={{ fontSize: 18 }}>{picked ? "✅" : "☁️"}</span>
    <span style={{ color: picked ? colors.success : colors.primary, fontSize: 12, fontWeight: 600 }}>{picked ? `✓ ${label}` : label}</span>
  </div>
);

const ToggleRow = ({ label, active, onToggle }: any) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingTop: 2, paddingBottom: 2 }}>
    <span style={{ fontSize: 13, color: colors.text, flex: 1, paddingRight: 10 }}>{label}</span>
    <div onClick={() => onToggle(!active)} style={{ width: 52, height: 28, borderRadius: 14, background: active ? colors.primary : colors.border, display: "flex", alignItems: "center", padding: "0 3px", cursor: "pointer", transition: "background 0.2s" }}>
      <div style={{ width: 22, height: 22, borderRadius: 11, background: "#fff", marginLeft: active ? "auto" : 0, boxShadow: "0 1px 3px rgba(0,0,0,0.15)", transition: "margin 0.2s" }} />
    </div>
  </div>
);

const CheckboxGroup = ({ label, options, selected, onToggle }: any) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 12, fontWeight: 700, color: colors.subText, marginBottom: 10 }}>{label}</div>}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt: string) => {
        const isSelected = (selected ?? []).includes(opt);
        return (
          <div key={opt} onClick={() => onToggle(opt)} style={{ padding: "7px 13px", borderRadius: 22, border: `1.5px solid ${isSelected ? colors.primary : colors.border}`, background: isSelected ? colors.primary + "18" : colors.surface, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <span style={{ fontSize: 13 }}>{isSelected ? "☑" : "☐"}</span>
            <span style={{ fontSize: 12, color: isSelected ? colors.primary : colors.text, fontWeight: isSelected ? 700 : 400 }}>{opt}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const RadioGroup = ({ label, options, selected, onSelect }: any) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 12, fontWeight: 700, color: colors.subText, marginBottom: 10 }}>{label}</div>}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt: string) => {
        const isSelected = selected === opt;
        return (
          <div key={opt} onClick={() => onSelect(opt)} style={{ padding: "7px 13px", borderRadius: 22, border: `1.5px solid ${isSelected ? colors.primary : colors.border}`, background: isSelected ? colors.primary : colors.surface, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <span style={{ fontSize: 12 }}>{isSelected ? "🔵" : "⚪"}</span>
            <span style={{ fontSize: 12, color: isSelected ? "#fff" : colors.text, fontWeight: isSelected ? 700 : 400 }}>{opt}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const TagAdder = ({ items, onAdd, onRemove, label, placeholder }: any) => {
  const [input, setInput] = useState("");
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: colors.subText, marginBottom: 10 }}>{label}</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input style={{ flex: 1, background: colors.surface, borderRadius: 10, padding: "0 14px", height: 44, color: colors.text, border: `1px solid ${colors.border}`, fontSize: 13, fontFamily: "inherit" }} value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder ?? "Type and add..."} onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { onAdd(input.trim()); setInput(""); } }} />
        <button onClick={() => { if (input.trim()) { onAdd(input.trim()); setInput(""); } }} style={{ width: 44, height: 44, borderRadius: 10, background: colors.primary, border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>+</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(items ?? []).map((item: string, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 22, background: colors.primary + "18", border: `1px solid ${colors.primary}40` }}>
            <span style={{ fontSize: 12, color: colors.primary, fontWeight: 600 }}>{item}</span>
            <span onClick={() => onRemove(i)} style={{ fontSize: 12, color: colors.primary, cursor: "pointer" }}>✕</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SelectDropdown = ({ label, value, onSelect, options, placeholder }: { label: string; value: string; onSelect: (v: string) => void; options: { label: string; value: string }[]; placeholder?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 14, position: "relative" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: colors.subText, marginBottom: 5 }}>{label}</div>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: colors.surface, padding: "0 14px", height: 44, borderRadius: 10, border: `1px solid ${colors.border}`, cursor: "pointer", fontSize: 14, color: value ? colors.text : colors.subText + "80" }}>
        <span>{value ? options.find(o => o.value === value)?.label ?? value : (placeholder ?? "Select...")}</span>
        <span style={{ fontSize: 12 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, zIndex: 100, maxHeight: 220, overflowY: "auto", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
          {options.map(o => (
            <div key={o.value} onClick={() => { onSelect(o.value); setOpen(false); }} style={{ padding: "12px 16px", cursor: "pointer", color: colors.text, fontSize: 14, borderBottom: `1px solid ${colors.border}` }}
              onMouseEnter={e => (e.currentTarget.style.background = colors.surface)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >{o.label}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ title, color }: any) => (
  <div style={{ background: (color ?? colors.primary) + "15", borderRadius: 10, padding: 12, marginBottom: 16, marginTop: 4, borderLeft: `3px solid ${color ?? colors.primary}` }}>
    <span style={{ fontSize: 13, fontWeight: 800, color: color ?? colors.primary }}>{title}</span>
  </div>
);

const StepProgressBar = ({ steps, currentStep, accent }: any) => {
  const primary = accent ?? colors.primary;
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: colors.text }}>Step {currentStep} of {steps.length}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: primary }}>{steps[currentStep - 1]}</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {steps.map((_: string, i: number) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < currentStep - 1 ? primary : i === currentStep - 1 ? primary + "AA" : colors.border }} />
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 6 }}>
        {steps.map((s: string, i: number) => {
          const done = i < currentStep - 1;
          const active = i === currentStep - 1;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, marginBottom: 2, background: done || active ? primary : colors.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {done ? <span style={{ fontSize: 9, color: "#fff" }}>✓</span> : <span style={{ fontSize: 9, color: active ? "#fff" : colors.subText, fontWeight: 700 }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 8, color: done || active ? primary : colors.subText, fontWeight: done || active ? 700 : 400, textAlign: "center", maxWidth: 48, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MultiStepWrapper = ({ steps, currentStep, onNext, onBack, isLast, accent, children, loading }: any) => (
  <div>
    <StepProgressBar steps={steps} currentStep={currentStep} accent={accent} />
    <div style={{ background: colors.surface, borderRadius: 14, padding: 16, marginBottom: 4, border: `1px solid ${colors.border}` }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: colors.text, marginBottom: 16 }}>{steps[currentStep - 1]}</div>
      {children}
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
      {currentStep > 1 && (
        <button onClick={onBack} disabled={loading} style={{ flex: 1, padding: 14, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 14, color: colors.text }}>← Back</button>
      )}
      <button onClick={onNext} disabled={loading} style={{ flex: 2, padding: 14, borderRadius: 12, border: "none", background: accent ?? colors.primary, cursor: "pointer", fontWeight: 800, fontSize: 14, color: "#fff" }}>
        {loading && isLast ? "Submitting..." : isLast ? "✓ Submit" : `Next: ${steps[currentStep]} →`}
      </button>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   STEP RENDERERS — EDUCATION INSTITUTION
   ═══════════════════════════════════════════════════════════ */
const StepBasicInfo = ({ form, setForm, institutionType, handlePickFile }: any) => (
  <div>
    <InputField label="Institution Name *" value={form.instName} onChange={(t: string) => setForm({ ...form, instName: t })} />
    <UploadBtn label="Upload Institution Logo" picked={!!form.files?.instLogo} onPress={() => handlePickFile("instLogo")} />
    <InputField label="Establishment Year *" value={form.establishYear} onChange={(t: string) => setForm({ ...form, establishYear: t })} type="number" />
    <InputField label="Institution Type" value={institutionType ?? ""} onChange={() => {}} />
    <RadioGroup label="Management Type *" options={["Private", "Government", "Aided", "Trust / Society"]} selected={form.managementType} onSelect={(v: string) => setForm({ ...form, managementType: v })} />
  </div>
);

const StepLocation = ({ form, setForm }: any) => (
  <div>
    <InputField label="Country *" value={form.country} onChange={(t: string) => setForm({ ...form, country: t })} placeholder="India" />
    <InputField label="State *" value={form.state} onChange={(t: string) => setForm({ ...form, state: t })} />
    <InputField label="District *" value={form.district} onChange={(t: string) => setForm({ ...form, district: t })} />
    <InputField label="City *" value={form.city} onChange={(t: string) => setForm({ ...form, city: t })} />
    <InputField label="Full Address *" value={form.address} onChange={(t: string) => setForm({ ...form, address: t })} multiline />
    <InputField label="Pincode *" value={form.pincode} onChange={(t: string) => setForm({ ...form, pincode: t })} type="number" />
  </div>
);

const StepContact = ({ form, setForm }: any) => (
  <div>
    <InputField label="Official Email *" value={form.email} onChange={(t: string) => setForm({ ...form, email: t })} type="email" />
    <InputField label="Official Phone Number *" value={form.phone} onChange={(t: string) => setForm({ ...form, phone: t })} type="tel" />
    <InputField label="Website URL" value={form.website} onChange={(t: string) => setForm({ ...form, website: t })} optional placeholder="https://" />
    <InputField label="Director / Principal Name *" value={form.directorName} onChange={(t: string) => setForm({ ...form, directorName: t })} />
    <InputField label="Director Contact Number *" value={form.directorPhone} onChange={(t: string) => setForm({ ...form, directorPhone: t })} type="tel" />
  </div>
);

const StepLegal = ({ form, setForm, handlePickFile }: any) => (
  <div>
    <InputField label="Registration Number *" value={form.regNumber} onChange={(t: string) => setForm({ ...form, regNumber: t })} />
    <InputField label="Affiliation Board / University *" value={form.affiliation} onChange={(t: string) => setForm({ ...form, affiliation: t })} />
    <InputField label="Accreditation (NAAC/NBA etc.)" value={form.accreditation} onChange={(t: string) => setForm({ ...form, accreditation: t })} optional />
    <InputField label="GST Number" value={form.gstNumber} onChange={(t: string) => setForm({ ...form, gstNumber: t })} optional />
    <UploadBtn label="Registration Certificate *" picked={!!form.files?.regCert} onPress={() => handlePickFile("regCert")} />
    <UploadBtn label="Affiliation Proof *" picked={!!form.files?.affiliationProof} onPress={() => handlePickFile("affiliationProof")} />
    <UploadBtn label="Principal ID Proof *" picked={!!form.files?.principalId} onPress={() => handlePickFile("principalId")} />
  </div>
);

const StepAcademics = ({ form, setForm }: any) => {
  const t = (k: string, v: string) => {
    const a: string[] = form[k] ?? [];
    setForm({ ...form, [k]: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  return (
    <div>
      <CheckboxGroup label="Medium of Instruction *" options={["English", "Telugu", "Hindi", "Others"]} selected={form.mediums} onToggle={(v: string) => t("mediums", v)} />
      <CheckboxGroup label="Grades Offered *" options={["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]} selected={form.grades} onToggle={(v: string) => t("grades", v)} />
      <InputField label="Student Capacity *" value={form.studentCapacity} onChange={(t2: string) => setForm({ ...form, studentCapacity: t2 })} type="number" />
      <InputField label="Current Student Strength *" value={form.currentStrength} onChange={(t2: string) => setForm({ ...form, currentStrength: t2 })} type="number" />
      <InputField label="Teacher Count *" value={form.teacherCount} onChange={(t2: string) => setForm({ ...form, teacherCount: t2 })} type="number" />
    </div>
  );
};

const StepFacilities = ({ form, setForm }: any) => (
  <div>
    {[["midDayMeal", "Mid-Day Meal Available?"], ["transport", "Transport Facility?"], ["playground", "Playground Available?"], ["smartClass", "Smart Classrooms?"], ["computerLab", "Computer Lab?"], ["library", "Library?"], ["cctv", "CCTV Surveillance?"], ["roDrinking", "RO Drinking Water?"], ["firstAid", "First Aid Room?"], ["securityGuard", "Security Guard?"]].map(([k, l]) => (
      <ToggleRow key={k} label={l} active={form[k] ?? false} onToggle={(v: boolean) => setForm({ ...form, [k]: v })} />
    ))}
  </div>
);

const StepActivities = ({ form, setForm }: any) => {
  const t = (v: string) => {
    const a: string[] = form.extraActivities ?? [];
    setForm({ ...form, extraActivities: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  return <CheckboxGroup label="Extra-Curricular Activities" options={["Sports Training", "Dance", "Music", "Karate", "Olympiad Coaching", "Field Trips"]} selected={form.extraActivities} onToggle={t} />;
};

const StepAdvanced = ({ form, setForm }: any) => {
  const t = (k: string, v: string) => {
    const a: string[] = form[k] ?? [];
    setForm({ ...form, [k]: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  return (
    <div>
      <RadioGroup label="Board Affiliation *" options={["State Board", "CBSE", "ICSE", "IB"]} selected={form.boardAffiliation} onSelect={(v: string) => setForm({ ...form, boardAffiliation: v })} />
      <InputField label="10th Result % — Year 1" value={form.result1} onChange={(t2: string) => setForm({ ...form, result1: t2 })} type="number" />
      <InputField label="10th Result % — Year 2" value={form.result2} onChange={(t2: string) => setForm({ ...form, result2: t2 })} type="number" />
      <InputField label="10th Result % — Year 3" value={form.result3} onChange={(t2: string) => setForm({ ...form, result3: t2 })} type="number" />
      <CheckboxGroup label="Competitive Exam Training" options={["IIT Foundation", "NEET Foundation", "Olympiads"]} selected={form.competitiveTraining} onToggle={(v: string) => t("competitiveTraining", v)} />
    </div>
  );
};

const StepStreams = ({ form, setForm }: any) => {
  const t = (v: string) => {
    const a: string[] = form.streams ?? [];
    setForm({ ...form, streams: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  return <CheckboxGroup label="Streams Offered *" options={["MPC", "BiPC", "CEC", "MEC", "HEC", "Vocational"]} selected={form.streams} onToggle={t} />;
};

const StepPerformance = ({ form, setForm }: any) => (
  <div>
    <InputField label="Pass % — Year 1" value={form.passY1} onChange={(t: string) => setForm({ ...form, passY1: t })} type="number" />
    <InputField label="Pass % — Year 2" value={form.passY2} onChange={(t: string) => setForm({ ...form, passY2: t })} type="number" />
    <InputField label="Pass % — Year 3" value={form.passY3} onChange={(t: string) => setForm({ ...form, passY3: t })} type="number" />
    <InputField label="Top Rankers Info" value={form.topRankers} onChange={(t: string) => setForm({ ...form, topRankers: t })} multiline />
    <InputField label="Faculty Experience (Avg. Years)" value={form.facultyExp} onChange={(t: string) => setForm({ ...form, facultyExp: t })} type="number" />
  </div>
);

const StepCourses = ({ form, setForm }: any) => {
  const t = (v: string) => {
    const a: string[] = form.degreeTypes ?? [];
    setForm({ ...form, degreeTypes: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  return (
    <div>
      <CheckboxGroup label="Degree Types Offered *" options={["B.Tech", "B.Sc", "B.Com", "BBA", "BA", "Others"]} selected={form.degreeTypes} onToggle={t} />
      <TagAdder label="Departments Available" items={form.departments} onAdd={(d: string) => setForm({ ...form, departments: [...(form.departments ?? []), d] })} onRemove={(i: number) => setForm({ ...form, departments: (form.departments ?? []).filter((_: string, idx: number) => idx !== i) })} placeholder="e.g. Computer Science" />
      <InputField label="Intake per Course" value={form.intakePerCourse} onChange={(t2: string) => setForm({ ...form, intakePerCourse: t2 })} type="number" />
      <InputField label="University Affiliation *" value={form.universityAffil} onChange={(t2: string) => setForm({ ...form, universityAffil: t2 })} />
    </div>
  );
};

const StepInfrastructure = ({ form, setForm }: any) => (
  <div>
    {[["placementCell", "Placement Cell?"], ["internshipSupport", "Internship Support?"], ["researchLabs", "Research Labs?"], ["innovationCell", "Innovation Cell?"], ["auditorium", "Auditorium?"], ["seminarHalls", "Seminar Halls?"], ["wifiCampus", "WiFi Campus?"], ["cafeteria", "Cafeteria?"], ["hostelBoys", "Hostel (Boys)?"], ["hostelGirls", "Hostel (Girls)?"], ["sportsComplex", "Sports Complex?"]].map(([k, l]) => (
      <ToggleRow key={k} label={l} active={form[k] ?? false} onToggle={(v: boolean) => setForm({ ...form, [k]: v })} />
    ))}
    <InputField label="Placement % — Year 1" value={form.placeY1} onChange={(t: string) => setForm({ ...form, placeY1: t })} type="number" />
    <InputField label="Placement % — Year 2" value={form.placeY2} onChange={(t: string) => setForm({ ...form, placeY2: t })} type="number" />
    <InputField label="Placement % — Year 3" value={form.placeY3} onChange={(t: string) => setForm({ ...form, placeY3: t })} type="number" />
  </div>
);

const StepPGDetails = ({ form, setForm }: any) => {
  const t = (k: string, v: string) => {
    const a: string[] = form[k] ?? [];
    setForm({ ...form, [k]: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  return (
    <div>
      <CheckboxGroup label="PG Programs Available *" options={["M.Tech", "M.Sc", "MBA", "M.Com", "MA", "MCA", "Others"]} selected={form.pgPrograms} onToggle={(v: string) => t("pgPrograms", v)} />
      <CheckboxGroup label="Research Programs (PhD)" options={["PhD (CS)", "PhD (Management)", "PhD (Sciences)", "PhD (Humanities)", "Others"]} selected={form.phdPrograms} onToggle={(v: string) => t("phdPrograms", v)} />
      <RadioGroup label="NAAC Grade" options={["A++", "A+", "A", "B++", "B+", "B", "C", "Not Accredited"]} selected={form.naacGrade} onSelect={(v: string) => setForm({ ...form, naacGrade: v })} />
      <InputField label="Research Publications Count" value={form.researchPubs} onChange={(t2: string) => setForm({ ...form, researchPubs: t2 })} type="number" />
    </div>
  );
};

const RenderInstStep = ({ stepLabel, institutionType, form, setForm, handlePickFile }: any) => {
  const p = { form, setForm };
  switch (stepLabel) {
    case "Basic Info": return <StepBasicInfo {...p} institutionType={institutionType} handlePickFile={handlePickFile} />;
    case "Location": return <StepLocation {...p} />;
    case "Contact": return <StepContact {...p} />;
    case "Legal": return <StepLegal {...p} handlePickFile={handlePickFile} />;
    case "Academics": return <StepAcademics {...p} />;
    case "Facilities": return <StepFacilities {...p} />;
    case "Activities": return <StepActivities {...p} />;
    case "Advanced": return <StepAdvanced {...p} />;
    case "Streams": return <StepStreams {...p} />;
    case "Performance": return <StepPerformance {...p} />;
    case "Courses": return <StepCourses {...p} />;
    case "Infrastructure": return <StepInfrastructure {...p} />;
    case "PG Details": return <StepPGDetails {...p} />;
    default: return null;
  }
};

/* ─── Student Steps ─── */
const RenderStudentStep = ({ step, form, setForm, handlePickFile }: any) => {
  const tog = (k: string, v: string) => {
    const a: string[] = form[k] ?? [];
    setForm({ ...form, [k]: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  switch (step) {
    case "Personal": return (
      <div>
        <SectionHeader title="👤 Personal Information" />
        <InputField label="Full Name *" value={form.studentFullName} onChange={(t: string) => setForm({ ...form, studentFullName: t })} />
        <InputField label="Date of Birth *" value={form.dob} onChange={(t: string) => setForm({ ...form, dob: t })} placeholder="DD/MM/YYYY" />
        <RadioGroup label="Gender *" options={["Male", "Female", "Other"]} selected={form.gender} onSelect={(v: string) => setForm({ ...form, gender: v })} />
        <InputField label="Aadhar Card Number *" value={form.aadhar} onChange={(t: string) => setForm({ ...form, aadhar: t })} type="number" />
        <InputField label="Mobile Number *" value={form.studentPhone} onChange={(t: string) => setForm({ ...form, studentPhone: t })} type="tel" />
        <InputField label="Email Address *" value={form.studentEmail} onChange={(t: string) => setForm({ ...form, studentEmail: t })} type="email" />
        <InputField label="Residential Address *" value={form.studentAddress} onChange={(t: string) => setForm({ ...form, studentAddress: t })} multiline />
        <InputField label="City *" value={form.studentCity} onChange={(t: string) => setForm({ ...form, studentCity: t })} />
        <InputField label="State *" value={form.studentState} onChange={(t: string) => setForm({ ...form, studentState: t })} />
        <InputField label="Pincode *" value={form.studentPincode} onChange={(t: string) => setForm({ ...form, studentPincode: t })} type="number" />
      </div>
    );
    case "Education": return (
      <div>
        <SectionHeader title="🎓 Educational Background" />
        <RadioGroup label="Highest Qualification *" options={["10th / SSC", "12th / Intermediate", "Graduation", "Post Graduation", "PhD"]} selected={form.highestQual} onSelect={(v: string) => setForm({ ...form, highestQual: v })} />
        <InputField label="School / College Name *" value={form.prevInstitution} onChange={(t: string) => setForm({ ...form, prevInstitution: t })} />
        <InputField label="Board / University *" value={form.boardUniversity} onChange={(t: string) => setForm({ ...form, boardUniversity: t })} />
        <InputField label="Year of Passing *" value={form.yearOfPassing} onChange={(t: string) => setForm({ ...form, yearOfPassing: t })} type="number" />
        <InputField label="Percentage / CGPA *" value={form.percentage} onChange={(t: string) => setForm({ ...form, percentage: t })} type="number" />
        <RadioGroup label="Medium of Study *" options={["English", "Telugu", "Hindi", "Others"]} selected={form.mediumOfStudy} onSelect={(v: string) => setForm({ ...form, mediumOfStudy: v })} />
      </div>
    );
    case "Application": return (
      <div>
        <SectionHeader title="📋 Application Interest" />
        <CheckboxGroup label="Applying For *" options={["School Admission", "College Admission", "IT Training Course", "Government Exam Coaching", "Job Opening"]} selected={form.applyingFor} onToggle={(v: string) => tog("applyingFor", v)} />
        <InputField label="Preferred Institution / Course Name" value={form.preferredInstitution} onChange={(t: string) => setForm({ ...form, preferredInstitution: t })} optional />
        <InputField label="Preferred Location" value={form.preferredLocation} onChange={(t: string) => setForm({ ...form, preferredLocation: t })} optional />
        <RadioGroup label="Category *" options={["General", "OBC", "SC", "ST", "EWS"]} selected={form.category} onSelect={(v: string) => setForm({ ...form, category: v })} />
        <ToggleRow label="Require Scholarship / Financial Aid?" active={form.needScholarship ?? false} onToggle={(v: boolean) => setForm({ ...form, needScholarship: v })} />
        <ToggleRow label="Require Hostel Facility?" active={form.needHostel ?? false} onToggle={(v: boolean) => setForm({ ...form, needHostel: v })} />
        <ToggleRow label="Require Transport Facility?" active={form.needTransport ?? false} onToggle={(v: boolean) => setForm({ ...form, needTransport: v })} />
      </div>
    );
    case "Skills": return (
      <div>
        <SectionHeader title="💡 Skills & Interests" />
        <CheckboxGroup label="Technical Skills (if any)" options={["Programming", "Data Analysis", "Web Development", "Mobile Development", "Design", "Marketing"]} selected={form.techSkills} onToggle={(v: string) => tog("techSkills", v)} />
        <InputField label="Extra Curricular Achievements" value={form.achievements} onChange={(t: string) => setForm({ ...form, achievements: t })} multiline optional />
        <InputField label="Career Objective / Statement" value={form.careerObjective} onChange={(t: string) => setForm({ ...form, careerObjective: t })} multiline optional />
      </div>
    );
    case "Documents": return (
      <div>
        <SectionHeader title="📁 Documents" />
        <UploadBtn label="Profile Photo *" picked={!!form.files?.studentPhoto} onPress={() => handlePickFile("studentPhoto")} />
        <UploadBtn label="Aadhar Card *" picked={!!form.files?.aadharDoc} onPress={() => handlePickFile("aadharDoc")} />
        <UploadBtn label="10th Marksheet *" picked={!!form.files?.tenthMarksheet} onPress={() => handlePickFile("tenthMarksheet")} />
        <UploadBtn label="12th / Intermediate Marksheet" picked={!!form.files?.twelfthMarksheet} onPress={() => handlePickFile("twelfthMarksheet")} />
        <UploadBtn label="Degree Certificate (if applicable)" picked={!!form.files?.degreeCert} onPress={() => handlePickFile("degreeCert")} />
        <UploadBtn label="Resume / CV (if applying for job)" picked={!!form.files?.resume} onPress={() => handlePickFile("resume")} />
      </div>
    );
    default: return null;
  }
};

/* ─── Company Steps ─── */
const JOB_SECTOR_OPTIONS = [
  { label: "🏛️ Government / PSU", value: "Government" }, { label: "💻 IT / Software", value: "IT" },
  { label: "🏥 Healthcare / Medical", value: "Healthcare" }, { label: "🏦 Banking / Finance", value: "Banking" },
  { label: "🎓 Education / Teaching", value: "Education" }, { label: "🏭 Manufacturing / Engineering", value: "Manufacturing" },
  { label: "🚂 Railway / Transport", value: "Railway" }, { label: "⚖️ Legal / Law", value: "Legal" },
  { label: "📢 Marketing / Sales", value: "Marketing" }, { label: "🛒 Retail / E-Commerce", value: "Retail" },
  { label: "🏗️ Construction / Real Estate", value: "Construction" }, { label: "🎨 Design / Creative", value: "Design" },
  { label: "📊 Data / Analytics", value: "Data" }, { label: "🌐 Other", value: "Other" },
];

const RenderCompanyStep = ({ step, form, setForm, handlePickFile }: any) => {
  const tog = (k: string, v: string) => {
    const a: string[] = form[k] ?? [];
    setForm({ ...form, [k]: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  switch (step) {
    case "Company Info": return (
      <div>
        <SectionHeader title="🏢 Company Information" />
        <InputField label="Company Name *" value={form.companyName} onChange={(t: string) => setForm({ ...form, companyName: t })} />
        <InputField label="Company Registration Number *" value={form.companyRegNo} onChange={(t: string) => setForm({ ...form, companyRegNo: t })} />
        <InputField label="Company Website" value={form.companyWebsite} onChange={(t: string) => setForm({ ...form, companyWebsite: t })} optional placeholder="https://" />
        <InputField label="Official Email *" value={form.companyEmail} onChange={(t: string) => setForm({ ...form, companyEmail: t })} type="email" />
        <InputField label="HR Contact Number *" value={form.hrPhone} onChange={(t: string) => setForm({ ...form, hrPhone: t })} type="tel" />
        <InputField label="Company HQ Address *" value={form.companyAddress} onChange={(t: string) => setForm({ ...form, companyAddress: t })} multiline />
        <RadioGroup label="Company Type *" options={["Startup", "SME", "MNC", "PSU", "Government Body", "NGO"]} selected={form.companyType} onSelect={(v: string) => setForm({ ...form, companyType: v })} />
        <UploadBtn label="Company Logo" picked={!!form.files?.companyLogo} onPress={() => handlePickFile("companyLogo")} />
        <UploadBtn label="GST Certificate *" picked={!!form.files?.companyGst} onPress={() => handlePickFile("companyGst")} />
      </div>
    );
    case "Job Details": return (
      <div>
        <SectionHeader title="📋 Job Opening Details" />
        <SelectDropdown label="Job Sector *" value={form.jobSector} onSelect={(v: string) => setForm({ ...form, jobSector: v })} options={JOB_SECTOR_OPTIONS} placeholder="Select Job Sector" />
        <InputField label="Job Title / Role *" value={form.jobTitle} onChange={(t: string) => setForm({ ...form, jobTitle: t })} />
        <InputField label="Job Description *" value={form.jobDescription} onChange={(t: string) => setForm({ ...form, jobDescription: t })} multiline />
        <RadioGroup label="Job Type *" options={["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"]} selected={form.jobType} onSelect={(v: string) => setForm({ ...form, jobType: v })} />
        <RadioGroup label="Work Mode *" options={["On-Site", "Remote", "Hybrid"]} selected={form.workMode} onSelect={(v: string) => setForm({ ...form, workMode: v })} />
        <InputField label="Job Location(s) *" value={form.jobLocation} onChange={(t: string) => setForm({ ...form, jobLocation: t })} placeholder="e.g. Hyderabad, Remote" />
        <InputField label="Number of Vacancies *" value={form.vacancies} onChange={(t: string) => setForm({ ...form, vacancies: t })} type="number" />
        <InputField label="Salary / CTC Range *" value={form.salaryRange} onChange={(t: string) => setForm({ ...form, salaryRange: t })} placeholder="e.g. ₹3 LPA – ₹6 LPA" />
        <InputField label="Application Deadline *" value={form.applicationDeadline} onChange={(t: string) => setForm({ ...form, applicationDeadline: t })} placeholder="DD/MM/YYYY" />
      </div>
    );
    case "Eligibility": return (
      <div>
        <SectionHeader title="✅ Eligibility Criteria" />
        <RadioGroup label="Minimum Education *" options={["10th", "12th / Diploma", "Graduation", "Post Graduation", "Any"]} selected={form.minEducation} onSelect={(v: string) => setForm({ ...form, minEducation: v })} />
        <InputField label="Required Experience" value={form.experience} onChange={(t: string) => setForm({ ...form, experience: t })} placeholder="e.g. 0-1 Years / Fresher" />
        <InputField label="Minimum Percentage Required" value={form.minPercentage} onChange={(t: string) => setForm({ ...form, minPercentage: t })} type="number" optional />
        <InputField label="Age Limit" value={form.ageLimit} onChange={(t: string) => setForm({ ...form, ageLimit: t })} placeholder="e.g. 18–30 years" optional />
        <CheckboxGroup label="Category Preferences (if any)" options={["General", "OBC", "SC", "ST", "EWS", "PH / Divyang", "Ex-Servicemen"]} selected={form.categoryPref} onToggle={(v: string) => tog("categoryPref", v)} />
        <TagAdder label="Required Skills / Technologies" items={form.jobSkills} onAdd={(s: string) => setForm({ ...form, jobSkills: [...(form.jobSkills ?? []), s] })} onRemove={(i: number) => setForm({ ...form, jobSkills: (form.jobSkills ?? []).filter((_: string, idx: number) => idx !== i) })} placeholder="e.g. React Native, Java" />
      </div>
    );
    case "Sector Specific": return (
      <div>
        {!form.jobSector && <div style={{ textAlign: "center", padding: "24px 0", color: colors.subText }}>Please select a Job Sector in the previous step.</div>}
        {form.jobSector === "Government" && (
          <div>
            <SectionHeader title="🏛️ Government Job Specifics" color="#f59e0b" />
            <InputField label="Exam / Notification Number" value={form.govtNotifNo} onChange={(t: string) => setForm({ ...form, govtNotifNo: t })} optional />
            <InputField label="Department / Ministry Name *" value={form.govtDept} onChange={(t: string) => setForm({ ...form, govtDept: t })} />
            <InputField label="Pay Scale / Pay Band *" value={form.payScale} onChange={(t: string) => setForm({ ...form, payScale: t })} />
            <InputField label="Selection Process *" value={form.selectionProcess} onChange={(t: string) => setForm({ ...form, selectionProcess: t })} multiline />
            <ToggleRow label="Exam Date Announced?" active={form.examDateAnnounced ?? false} onToggle={(v: boolean) => setForm({ ...form, examDateAnnounced: v })} />
            {form.examDateAnnounced && <InputField label="Exam Date" value={form.examDate} onChange={(t: string) => setForm({ ...form, examDate: t })} placeholder="DD/MM/YYYY" />}
          </div>
        )}
        {form.jobSector === "IT" && (
          <div>
            <SectionHeader title="💻 IT Job Specifics" color="#3b82f6" />
            <RadioGroup label="Tech Stack Category" options={["Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Data / ML", "QA / Testing", "Other"]} selected={form.techCategory} onSelect={(v: string) => setForm({ ...form, techCategory: v })} />
            <InputField label="Preferred Tech Stack" value={form.preferredStack} onChange={(t: string) => setForm({ ...form, preferredStack: t })} />
            <ToggleRow label="Bond / Service Agreement Required?" active={form.bondRequired ?? false} onToggle={(v: boolean) => setForm({ ...form, bondRequired: v })} />
            {form.bondRequired && <InputField label="Bond Duration" value={form.bondDuration} onChange={(t: string) => setForm({ ...form, bondDuration: t })} />}
            <ToggleRow label="ESOP / Stock Options Available?" active={form.esopAvailable ?? false} onToggle={(v: boolean) => setForm({ ...form, esopAvailable: v })} />
          </div>
        )}
        {form.jobSector && form.jobSector !== "Government" && form.jobSector !== "IT" && (
          <div>
            <SectionHeader title={`📋 ${form.jobSector} Sector Details`} />
            <InputField label="Department / Division Name" value={form.sectorDept} onChange={(t: string) => setForm({ ...form, sectorDept: t })} optional />
            <InputField label="Interview Process" value={form.interviewProcess} onChange={(t: string) => setForm({ ...form, interviewProcess: t })} multiline optional />
            <InputField label="Joining Timeline" value={form.joiningTimeline} onChange={(t: string) => setForm({ ...form, joiningTimeline: t })} optional />
          </div>
        )}
      </div>
    );
    case "Benefits": return (
      <div>
        <SectionHeader title="🎁 Benefits & Perks" />
        <CheckboxGroup label="Benefits Offered" options={["Health Insurance", "PF / Gratuity", "Paid Leave", "WFH Allowance", "Meal Allowance", "Transport Allowance", "Annual Bonus", "Training & Upskilling"]} selected={form.benefits} onToggle={(v: string) => tog("benefits", v)} />
      </div>
    );
    default: return null;
  }
};

/* ─── Training Steps ─── */
const IT_COURSE_CATEGORIES = [
  { label: "☕ Java / Backend", value: "Java" }, { label: "🐍 Python / Data", value: "Python" },
  { label: "⚛️ React / Frontend", value: "Frontend" }, { label: "📱 Mobile Development", value: "Mobile" },
  { label: "☁️ Cloud / DevOps", value: "Cloud" }, { label: "🤖 AI / ML / Data Science", value: "AI_ML" },
  { label: "🔐 Cybersecurity", value: "Cybersecurity" }, { label: "📊 Data Analytics", value: "Analytics" },
  { label: "🗃️ Database / SQL", value: "Database" }, { label: "🏗️ Full Stack", value: "FullStack" },
  { label: "🌐 Management / Agile", value: "Management" },
];
const GOV_COURSE_CATEGORIES = [
  { label: "🏛️ UPSC / IAS Prep", value: "UPSC" }, { label: "📝 SSC (CGL / CHSL)", value: "SSC" },
  { label: "🏦 Banking (SBI/IBPS)", value: "Banking" }, { label: "🚂 Railway (RRB)", value: "Railway" },
  { label: "🗺️ State PSC (TSPSC/APPSC)", value: "StatePSC" }, { label: "🛡️ Defence (NDA/CDS)", value: "Defence" },
  { label: "👮 Police / SI", value: "Police" }, { label: "📐 Teaching (TET/CTET/DSC)", value: "Teaching" },
  { label: "⚕️ NEET / Medical Entrance", value: "Medical" }, { label: "🎓 JEE / IIT Foundation", value: "JEE" },
];

const RenderTrainingStep = ({ step, form, setForm, handlePickFile }: any) => {
  const tog = (k: string, v: string) => {
    const a: string[] = form[k] ?? [];
    setForm({ ...form, [k]: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] });
  };
  const isGovt = form.trainingSide === "Government Exam";
  const catOptions = isGovt ? GOV_COURSE_CATEGORIES : IT_COURSE_CATEGORIES;
  switch (step) {
    case "Training Type": return (
      <div>
        <SectionHeader title="🎓 Training Type" />
        <RadioGroup label="Select Training Side *" options={["IT / Technology", "Government Exam"]} selected={form.trainingSide} onSelect={(v: string) => setForm({ ...form, trainingSide: v, courseCategory: "" })} />
        {form.trainingSide && (
          <SelectDropdown label={isGovt ? "Exam Category *" : "Course Category *"} value={form.courseCategory} onSelect={(v: string) => setForm({ ...form, courseCategory: v })} options={catOptions} placeholder={`Select ${isGovt ? "Exam" : "Course"} Category`} />
        )}
      </div>
    );
    case "Provider Info": return (
      <div>
        <SectionHeader title="🏫 Training Provider Info" />
        <InputField label="Institute / Provider Name *" value={form.trainingProvider} onChange={(t: string) => setForm({ ...form, trainingProvider: t })} />
        <InputField label="Provider Contact Email *" value={form.providerEmail} onChange={(t: string) => setForm({ ...form, providerEmail: t })} type="email" />
        <InputField label="Provider Phone *" value={form.providerPhone} onChange={(t: string) => setForm({ ...form, providerPhone: t })} type="tel" />
        <InputField label="Provider Location *" value={form.providerLocation} onChange={(t: string) => setForm({ ...form, providerLocation: t })} />
        <UploadBtn label="Institute Logo" picked={!!form.files?.providerLogo} onPress={() => handlePickFile("providerLogo")} />
      </div>
    );
    case "Course Details": return (
      <div>
        <SectionHeader title="📚 Course Details" />
        <InputField label="Course Title *" value={form.courseTitle} onChange={(t: string) => setForm({ ...form, courseTitle: t })} />
        <InputField label="Course Description *" value={form.courseDescription} onChange={(t: string) => setForm({ ...form, courseDescription: t })} multiline />
        <InputField label="Course Duration *" value={form.courseDuration} onChange={(t: string) => setForm({ ...form, courseDuration: t })} placeholder="e.g. 3 Months" />
        <InputField label="Price / Fee *" value={form.coursePrice} onChange={(t: string) => setForm({ ...form, coursePrice: t })} placeholder="e.g. ₹999 or Free" />
        <RadioGroup label="Mode of Training *" options={["Online", "Offline", "Hybrid"]} selected={form.trainingMode} onSelect={(v: string) => setForm({ ...form, trainingMode: v })} />
        <InputField label="Batch Start Date *" value={form.batchStartDate} onChange={(t: string) => setForm({ ...form, batchStartDate: t })} placeholder="DD/MM/YYYY" />
        <InputField label="Maximum Students per Batch" value={form.batchSize} onChange={(t: string) => setForm({ ...form, batchSize: t })} type="number" />
        <RadioGroup label="Minimum Qualification Required *" options={["10th", "12th", "Graduation", "Any"]} selected={form.courseMinQual} onSelect={(v: string) => setForm({ ...form, courseMinQual: v })} />
      </div>
    );
    case "Specifics": return (
      <div>
        {!isGovt && form.trainingSide && (
          <div>
            <SectionHeader title="💻 IT Course Specifics" color="#3b82f6" />
            <InputField label="Technologies / Frameworks Covered *" value={form.techStack} onChange={(t: string) => setForm({ ...form, techStack: t })} />
            <InputField label="Projects Included" value={form.projectsIncluded} onChange={(t: string) => setForm({ ...form, projectsIncluded: t })} optional />
            <ToggleRow label="Certificate Provided on Completion?" active={form.certProvided ?? false} onToggle={(v: boolean) => setForm({ ...form, certProvided: v })} />
            <ToggleRow label="Placement Assistance?" active={form.placementAssist ?? false} onToggle={(v: boolean) => setForm({ ...form, placementAssist: v })} />
          </div>
        )}
        {isGovt && (
          <div>
            <SectionHeader title="🏛️ Government Exam Specifics" color="#f59e0b" />
            <CheckboxGroup label="Exam Stages Covered *" options={["Prelims", "Mains", "Interview", "Descriptive", "Physical Test"]} selected={form.examStagesCovered} onToggle={(v: string) => tog("examStagesCovered", v)} />
            <InputField label="Target Exam Year" value={form.targetExamYear} onChange={(t: string) => setForm({ ...form, targetExamYear: t })} />
            <InputField label="No. of Mock Tests Included" value={form.mockTestCount} onChange={(t: string) => setForm({ ...form, mockTestCount: t })} type="number" optional />
            <ToggleRow label="Study Material / Notes Provided?" active={form.studyMaterialProvided ?? false} onToggle={(v: boolean) => setForm({ ...form, studyMaterialProvided: v })} />
          </div>
        )}
      </div>
    );
    case "Documents": return (
      <div>
        <SectionHeader title="📁 Documents" />
        <UploadBtn label="Course Banner / Image *" picked={!!form.files?.courseBanner} onPress={() => handlePickFile("courseBanner")} />
        <UploadBtn label="Sample Study Material / Brochure" picked={!!form.files?.courseBrochure} onPress={() => handlePickFile("courseBrochure")} />
        {!isGovt && <UploadBtn label="Sample Certificate" picked={!!form.files?.sampleCert} onPress={() => handlePickFile("sampleCert")} />}
      </div>
    );
    default: return null;
  }
};

/* ─── Healthcare Steps ─── */
const HC_ACCENT = "#2563eb";
const HEALTHCARE_CATEGORY_META: Record<string, { icon: string; subtitle: string }> = {
  Hospital: { icon: "🏥", subtitle: "Multi-specialty / General hospitals" },
  Lab: { icon: "🔬", subtitle: "Diagnostic & pathology labs" },
  "Medical Store": { icon: "💊", subtitle: "Pharmacy / drug store" },
  Doctor: { icon: "👨‍⚕️", subtitle: "Individual doctor / clinic" },
};

const HCStepBasicInfo = ({ form, setForm, healthcareCategory, handlePickFile }: any) => (
  <div>
    <SectionHeader title="🏥 Entity Basic Information" color={HC_ACCENT} />
    <InputField label={healthcareCategory === "Doctor" ? "Doctor / Clinic Name *" : `${healthcareCategory} Name *`} value={form.hcEntityName} onChange={(t: string) => setForm({ ...form, hcEntityName: t })} />
    <UploadBtn label="Entity Photo *" picked={!!form.files?.hcEntityPic} onPress={() => handlePickFile("hcEntityPic")} />
    {healthcareCategory === "Hospital" && (<>
      <RadioGroup label="Hospital Type *" options={["General", "Multi-Specialty", "Super-Specialty", "Teaching Hospital", "Maternity", "Trauma Center"]} selected={form.hcHospitalType} onSelect={(v: string) => setForm({ ...form, hcHospitalType: v })} />
      <InputField label="Bed Capacity *" value={form.hcBedCapacity} onChange={(t: string) => setForm({ ...form, hcBedCapacity: t })} type="number" />
      <InputField label="ICU Bed Count" value={form.hcIcuBeds} onChange={(t: string) => setForm({ ...form, hcIcuBeds: t })} type="number" optional />
      <RadioGroup label="Management Type *" options={["Private", "Government", "Trust / NGO", "Aided"]} selected={form.hcManagementType} onSelect={(v: string) => setForm({ ...form, hcManagementType: v })} />
    </>)}
    {healthcareCategory === "Lab" && (<>
      <RadioGroup label="Lab Type *" options={["Pathology", "Radiology", "Microbiology", "Biochemistry", "Multi-Diagnostic"]} selected={form.hcLabType} onSelect={(v: string) => setForm({ ...form, hcLabType: v })} />
      <CheckboxGroup label="Services Offered *" options={["Blood Tests", "Urine Tests", "X-Ray", "CT Scan", "MRI", "Ultrasound", "ECG", "Biopsy", "Culture Tests"]} selected={form.hcLabServices} onToggle={(v: string) => { const a: string[] = form.hcLabServices ?? []; setForm({ ...form, hcLabServices: a.includes(v) ? a.filter((x: string) => x !== v) : [...a, v] }); }} />
    </>)}
    {healthcareCategory === "Medical Store" && (<>
      <RadioGroup label="Store Type *" options={["Retail Pharmacy", "Wholesale Pharmacy", "Online Pharmacy", "Hospital Pharmacy"]} selected={form.hcStoreType} onSelect={(v: string) => setForm({ ...form, hcStoreType: v })} />
      <ToggleRow label="24-Hour Operation?" active={form.hc24HrOp ?? false} onToggle={(v: boolean) => setForm({ ...form, hc24HrOp: v })} />
      <ToggleRow label="Home Delivery Available?" active={form.hcHomeDelivery ?? false} onToggle={(v: boolean) => setForm({ ...form, hcHomeDelivery: v })} />
    </>)}
    {healthcareCategory === "Doctor" && (<>
      <InputField label="Doctor Full Name *" value={form.hcDoctorName} onChange={(t: string) => setForm({ ...form, hcDoctorName: t })} />
      <InputField label="Specialization *" value={form.hcSpecialization} onChange={(t: string) => setForm({ ...form, hcSpecialization: t })} placeholder="e.g. Cardiologist" />
      <InputField label="Qualification *" value={form.hcQualification} onChange={(t: string) => setForm({ ...form, hcQualification: t })} placeholder="e.g. MBBS, MD" />
      <InputField label="Years of Experience *" value={form.hcExperience} onChange={(t: string) => setForm({ ...form, hcExperience: t })} type="number" />
      <RadioGroup label="Practice Type *" options={["Individual Clinic", "Hospital-Attached", "Telemedicine", "Visiting Doctor"]} selected={form.hcPracticeType} onSelect={(v: string) => setForm({ ...form, hcPracticeType: v })} />
    </>)}
    <InputField label="Year of Establishment *" value={form.hcEstabYear} onChange={(t: string) => setForm({ ...form, hcEstabYear: t })} type="number" />
    <InputField label="Full Address *" value={form.hcAddress} onChange={(t: string) => setForm({ ...form, hcAddress: t })} multiline />
    <InputField label="City *" value={form.hcCity} onChange={(t: string) => setForm({ ...form, hcCity: t })} />
    <InputField label="State *" value={form.hcState} onChange={(t: string) => setForm({ ...form, hcState: t })} />
    <InputField label="Pincode *" value={form.hcPincode} onChange={(t: string) => setForm({ ...form, hcPincode: t })} type="number" />
  </div>
);

const HCStepLegalCompliance = ({ form, setForm, healthcareCategory }: any) => (
  <div>
    <SectionHeader title="⚖️ Legal & Compliance Details" color={HC_ACCENT} />
    <InputField label="Registration Number *" value={form.hcRegNumber} onChange={(t: string) => setForm({ ...form, hcRegNumber: t })} />
    <InputField label={healthcareCategory === "Medical Store" ? "Pharmacist Registration (NPC) *" : "Doctor Registration (NMC / SMC) *"} value={form.hcDoctorReg} onChange={(t: string) => setForm({ ...form, hcDoctorReg: t })} />
    {["Hospital", "Medical Store", "Lab"].includes(healthcareCategory) && (<>
      <ToggleRow label="Drug License Applicable?" active={form.hcDrugLicenseApplicable ?? false} onToggle={(v: boolean) => setForm({ ...form, hcDrugLicenseApplicable: v })} />
      {form.hcDrugLicenseApplicable && <InputField label="Drug License Number *" value={form.hcDrugLicenseNo} onChange={(t: string) => setForm({ ...form, hcDrugLicenseNo: t })} />}
    </>)}
    <ToggleRow label="Fire NOC Obtained?" active={form.hcFireNoc ?? false} onToggle={(v: boolean) => setForm({ ...form, hcFireNoc: v })} />
    <ToggleRow label="GST Registered?" active={form.hcGstRegistered ?? false} onToggle={(v: boolean) => setForm({ ...form, hcGstRegistered: v })} />
    {form.hcGstRegistered && <InputField label="GST Number *" value={form.hcGstNumber} onChange={(t: string) => setForm({ ...form, hcGstNumber: t })} />}
  </div>
);

const HCStepDocuments = ({ form, handlePickFile, healthcareCategory }: any) => (
  <div>
    <SectionHeader title="📁 Required Documents" color={HC_ACCENT} />
    <UploadBtn label="Registration Certificate *" picked={!!form.files?.hcRegCert} onPress={() => handlePickFile("hcRegCert")} />
    <UploadBtn label="Owner / Authorized Signatory ID Proof *" picked={!!form.files?.hcOwnerIdProof} onPress={() => handlePickFile("hcOwnerIdProof")} />
    <UploadBtn label="Owner / Signatory Address Proof *" picked={!!form.files?.hcOwnerAddressProof} onPress={() => handlePickFile("hcOwnerAddressProof")} />
    <UploadBtn label={healthcareCategory === "Medical Store" ? "Pharmacist Registration Certificate *" : "Doctor Registration (NMC / SMC) *"} picked={!!form.files?.hcDoctorRegDoc} onPress={() => handlePickFile("hcDoctorRegDoc")} />
    {healthcareCategory === "Doctor" && (<>
      <UploadBtn label="Medical Degree Certificate *" picked={!!form.files?.hcDegreeCert} onPress={() => handlePickFile("hcDegreeCert")} />
      <UploadBtn label="Specialization Certificate (if any)" picked={!!form.files?.hcSpecCert} onPress={() => handlePickFile("hcSpecCert")} />
    </>)}
    {healthcareCategory === "Lab" && <UploadBtn label="Lab Equipment Calibration Reports" picked={!!form.files?.hcCalibDoc} onPress={() => handlePickFile("hcCalibDoc")} />}
    {healthcareCategory === "Medical Store" && <UploadBtn label="Shop / Premises Registration *" picked={!!form.files?.hcShopReg} onPress={() => handlePickFile("hcShopReg")} />}
  </div>
);

const HCStepContactVerification = ({ form, setForm, healthcareCategory }: any) => (
  <div>
    <SectionHeader title="📞 Contact & Verification" color={HC_ACCENT} />
    <InputField label="Official Email *" value={form.hcEmail} onChange={(t: string) => setForm({ ...form, hcEmail: t })} type="email" />
    <InputField label="Primary Phone Number *" value={form.hcPhone} onChange={(t: string) => setForm({ ...form, hcPhone: t })} type="tel" />
    <InputField label="Alternate Phone Number" value={form.hcAltPhone} onChange={(t: string) => setForm({ ...form, hcAltPhone: t })} type="tel" optional />
    {healthcareCategory === "Hospital" && (<>
      <InputField label="Emergency / Helpline Number" value={form.hcEmergencyNo} onChange={(t: string) => setForm({ ...form, hcEmergencyNo: t })} type="tel" optional />
      <InputField label="Medical Superintendent / Director Name *" value={form.hcDirectorName} onChange={(t: string) => setForm({ ...form, hcDirectorName: t })} />
      <InputField label="Medical Superintendent Contact *" value={form.hcDirectorPhone} onChange={(t: string) => setForm({ ...form, hcDirectorPhone: t })} type="tel" />
    </>)}
    {healthcareCategory === "Lab" && (<>
      <InputField label="Lab In-Charge Name *" value={form.hcLabInCharge} onChange={(t: string) => setForm({ ...form, hcLabInCharge: t })} />
      <InputField label="Lab In-Charge Contact *" value={form.hcLabInChargePhone} onChange={(t: string) => setForm({ ...form, hcLabInChargePhone: t })} type="tel" />
    </>)}
    {healthcareCategory === "Medical Store" && (<>
      <InputField label="Pharmacist / Owner Name *" value={form.hcPharmacistName} onChange={(t: string) => setForm({ ...form, hcPharmacistName: t })} />
      <InputField label="Pharmacist Contact *" value={form.hcPharmacistPhone} onChange={(t: string) => setForm({ ...form, hcPharmacistPhone: t })} type="tel" />
    </>)}
    {healthcareCategory === "Doctor" && (<>
      <InputField label="Consultation Timings" value={form.hcConsultTimings} onChange={(t: string) => setForm({ ...form, hcConsultTimings: t })} placeholder="e.g. Mon–Sat, 9 AM – 6 PM" />
      <InputField label="Consultation Fee (₹)" value={form.hcConsultFee} onChange={(t: string) => setForm({ ...form, hcConsultFee: t })} type="number" optional />
      <ToggleRow label="Online Consultation Available?" active={form.hcOnlineConsult ?? false} onToggle={(v: boolean) => setForm({ ...form, hcOnlineConsult: v })} />
    </>)}
    <div style={{ background: HC_ACCENT + "12", borderRadius: 10, padding: 13, marginTop: 6, marginBottom: 14, border: `1px solid ${HC_ACCENT}30`, display: "flex", gap: 10 }}>
      <span>🔐</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: HC_ACCENT, marginBottom: 3 }}>OTP Verification</div>
        <div style={{ fontSize: 11, color: colors.subText }}>Your official mobile number and email will be verified via OTP after submission.</div>
      </div>
    </div>
    <InputField label="Verify Official Mobile (OTP will be sent) *" value={form.hcOtpPhone} onChange={(t: string) => setForm({ ...form, hcOtpPhone: t })} type="tel" placeholder="Enter mobile for OTP" />
    <InputField label="Verify Official Email ID (OTP will be sent) *" value={form.hcOtpEmail} onChange={(t: string) => setForm({ ...form, hcOtpEmail: t })} type="email" placeholder="Enter email for OTP" />
  </div>
);

const RenderHealthcareStep = ({ stepLabel, healthcareCategory, form, setForm, handlePickFile }: any) => {
  const p = { form, setForm, healthcareCategory, handlePickFile };
  switch (stepLabel) {
    case "Basic Info": return <HCStepBasicInfo {...p} />;
    case "Legal & Compliance": return <HCStepLegalCompliance {...p} />;
    case "Documents": return <HCStepDocuments {...p} />;
    case "Contact & Verification": return <HCStepContactVerification {...p} />;
    default: return null;
  }
};

/* ─── Food Steps ─── */
const FOOD_ACCENT = "#f59e0b";

const FoodStepBasicInfo = ({ form, setForm, handlePickFile }: any) => (
  <div>
    <SectionHeader title="🍽️ Food Business Basic Information" color={FOOD_ACCENT} />
    <InputField label="Restaurant Name *" value={form.foodEntityName} onChange={(t: string) => setForm({ ...form, foodEntityName: t })} />
    <UploadBtn label="Restaurant Logo / Photo *" picked={!!form.files?.foodEntityPhoto} onPress={() => handlePickFile("foodEntityPhoto")} />
    <InputField label="Establishment Year *" value={form.foodEstabYear} onChange={(t: string) => setForm({ ...form, foodEstabYear: t })} type="number" />
    <CheckboxGroup label="Cuisine Types *" options={["North Indian", "South Indian", "Chinese", "Continental", "Multi-Cuisine", "Fast Food"]} selected={form.foodCuisineTypes} onToggle={(v: string) => { const types = form.foodCuisineTypes ?? []; setForm({ ...form, foodCuisineTypes: types.includes(v) ? types.filter((x: string) => x !== v) : [...types, v] }); }} />
    <InputField label="Seating Capacity *" value={form.foodSeatingCapacity} onChange={(t: string) => setForm({ ...form, foodSeatingCapacity: t })} type="number" />
  </div>
);

const FoodStepLegalCompliance = ({ form, setForm }: any) => (
  <div>
    <SectionHeader title="⚖️ Legal & Compliance" color={FOOD_ACCENT} />
    <InputField label="Owner Name *" value={form.foodOwnerName} onChange={(t: string) => setForm({ ...form, foodOwnerName: t })} />
    <InputField label="Owner Phone *" value={form.foodOwnerPhone} onChange={(t: string) => setForm({ ...form, foodOwnerPhone: t })} type="tel" />
    <InputField label="Manager Name" value={form.foodManagerName} onChange={(t: string) => setForm({ ...form, foodManagerName: t })} optional />
    <InputField label="Manager Phone" value={form.foodManagerPhone} onChange={(t: string) => setForm({ ...form, foodManagerPhone: t })} type="tel" optional />
    <InputField label="Business Registration Number *" value={form.foodRegNumber} onChange={(t: string) => setForm({ ...form, foodRegNumber: t })} />
    <ToggleRow label="FSSAI License Registered?" active={form.foodFssaiRegistered ?? false} onToggle={(v: boolean) => setForm({ ...form, foodFssaiRegistered: v })} />
    {form.foodFssaiRegistered && <InputField label="FSSAI License Number *" value={form.foodFssaiNumber} onChange={(t: string) => setForm({ ...form, foodFssaiNumber: t })} />}
    <ToggleRow label="GST Registered?" active={form.foodGstRegistered ?? false} onToggle={(v: boolean) => setForm({ ...form, foodGstRegistered: v })} />
    {form.foodGstRegistered && <InputField label="GST Number *" value={form.foodGstNumber} onChange={(t: string) => setForm({ ...form, foodGstNumber: t })} />}
    <ToggleRow label="Food License Applicable?" active={form.foodFoodLicenseApplicable ?? false} onToggle={(v: boolean) => setForm({ ...form, foodFoodLicenseApplicable: v })} />
    {form.foodFoodLicenseApplicable && <InputField label="Food License Number" value={form.foodFoodLicenseNo} onChange={(t: string) => setForm({ ...form, foodFoodLicenseNo: t })} optional />}
    <ToggleRow label="Health & Safety Certified?" active={form.foodHealthInspection ?? false} onToggle={(v: boolean) => setForm({ ...form, foodHealthInspection: v })} />
    <ToggleRow label="Fire NOC Certificate?" active={form.foodFireNoc ?? false} onToggle={(v: boolean) => setForm({ ...form, foodFireNoc: v })} />
  </div>
);

const FoodStepMenuServices = ({ form, setForm }: any) => (
  <div>
    <SectionHeader title="🍴 Menu & Services" color={FOOD_ACCENT} />
    <InputField label="Special Menu Items / Specialties *" value={form.foodSpecialMenuItems} onChange={(t: string) => setForm({ ...form, foodSpecialMenuItems: t })} multiline />
    <InputField label="Average Price Per Meal / Serving (₹) *" value={form.foodAveragePrice} onChange={(t: string) => setForm({ ...form, foodAveragePrice: t })} type="number" />
    <InputField label="Operating Hours *" value={form.foodOperatingHours} onChange={(t: string) => setForm({ ...form, foodOperatingHours: t })} placeholder="e.g. 11 AM - 11 PM" />
    <CheckboxGroup label="Dining Options Available" options={["Dine-in", "Takeaway", "Online Delivery", "Outdoor Seating", "Parking Available"]} selected={form.foodDiningOptions} onToggle={(v: string) => { const options = form.foodDiningOptions ?? []; setForm({ ...form, foodDiningOptions: options.includes(v) ? options.filter((x: string) => x !== v) : [...options, v] }); }} />
  </div>
);

const FoodStepDocuments = ({ form, handlePickFile }: any) => (
  <div>
    <SectionHeader title="📁 Required Documents" color={FOOD_ACCENT} />
    <UploadBtn label="Menu Card / Digital Menu *" picked={!!form.files?.foodMenuCard} onPress={() => handlePickFile("foodMenuCard")} />
    <UploadBtn label="Business Registration Certificate *" picked={!!form.files?.foodRegCert} onPress={() => handlePickFile("foodRegCert")} />
    {form.foodFssaiRegistered && <UploadBtn label="FSSAI License Certificate *" picked={!!form.files?.foodFssaiCert} onPress={() => handlePickFile("foodFssaiCert")} />}
    {form.foodGstRegistered && <UploadBtn label="GST Certificate *" picked={!!form.files?.foodGstCert} onPress={() => handlePickFile("foodGstCert")} />}
    <UploadBtn label="Owner ID Proof *" picked={!!form.files?.foodOwnerIdProof} onPress={() => handlePickFile("foodOwnerIdProof")} />
    <UploadBtn label="Owner Address Proof *" picked={!!form.files?.foodOwnerAddressProof} onPress={() => handlePickFile("foodOwnerAddressProof")} />
    {form.foodFoodLicenseApplicable && <UploadBtn label="Food License Certificate *" picked={!!form.files?.foodLicenseCert} onPress={() => handlePickFile("foodLicenseCert")} />}
    {form.foodHealthInspection && <UploadBtn label="Health Inspection Report *" picked={!!form.files?.foodHealthCert} onPress={() => handlePickFile("foodHealthCert")} />}
    {form.foodFireNoc && <UploadBtn label="Fire NOC Certificate *" picked={!!form.files?.foodFireNocCert} onPress={() => handlePickFile("foodFireNocCert")} />}
  </div>
);

const RenderFoodStep = ({ stepLabel, form, setForm, handlePickFile }: any) => {
  const p = { form, setForm, handlePickFile };
  switch (stepLabel) {
    case "Basic Info": return <FoodStepBasicInfo {...p} />;
    case "Legal & Compliance": return <FoodStepLegalCompliance {...p} />;
    case "Menu & Services": return <FoodStepMenuServices {...p} />;
    case "Documents": return <FoodStepDocuments {...p} />;
    default: return null;
  }
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
const PartnerAuth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedSubModule, setSelectedSubModule] = useState<EducationSubModule>(null);
  const [institutionType, setInstitutionType] = useState<InstitutionType>(null);
  const [healthcareCategory, setHealthcareCategory] = useState<HealthcareCategory>(null);
  const [healthcareStep, setHealthcareStep] = useState(1);
  const [foodStep, setFoodStep] = useState(1);
  const [instStep, setInstStep] = useState(1);
  const [studentStep, setStudentStep] = useState(1);
  const [companyStep, setCompanyStep] = useState(1);
  const [trainingStep, setTrainingStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState<any>({
    loginEmail: "", loginPassword: "",
    registerUsername: "", registerPassword: "", registerConfirmPassword: "",
    name: "", registrationType: "", panTan: "",
    hasGst: false, hasTradeLicense: false, hasNoc: false,
    buildingType: "own", address: "", pincode: "", website: "", email: "", phone: "",
    files: {},
    instName: "", establishYear: "", managementType: "",
    country: "India", state: "", district: "", city: "",
    directorName: "", directorPhone: "", regNumber: "", affiliation: "",
    accreditation: "", gstNumber: "",
    mediums: [], grades: [], studentCapacity: "", currentStrength: "", teacherCount: "",
    streams: [], departments: [], degreeTypes: [], pgPrograms: [], phdPrograms: [],
    extraActivities: [], competitiveTraining: [],
    studentFullName: "", dob: "", gender: "", aadhar: "",
    studentPhone: "", studentEmail: "", studentAddress: "",
    studentCity: "", studentState: "", studentPincode: "",
    highestQual: "", prevInstitution: "", boardUniversity: "",
    yearOfPassing: "", percentage: "", mediumOfStudy: "",
    applyingFor: [], preferredInstitution: "", preferredLocation: "",
    category: "", needScholarship: false, needHostel: false, needTransport: false,
    techSkills: [], achievements: "", careerObjective: "",
    companyName: "", companyRegNo: "", companyWebsite: "",
    companyEmail: "", hrPhone: "", companyAddress: "", companyType: "",
    jobSector: "", jobTitle: "", jobDescription: "", jobType: "", workMode: "",
    jobLocation: "", vacancies: "", salaryRange: "", applicationDeadline: "",
    minEducation: "", experience: "", minPercentage: "", ageLimit: "",
    categoryPref: [], jobSkills: [], benefits: [],
    govtNotifNo: "", govtDept: "", payScale: "", selectionProcess: "",
    examDateAnnounced: false, examDate: "", govtNotifUrl: "",
    techCategory: "", preferredStack: "", bondRequired: false,
    bondDuration: "", esopAvailable: false, sectorDept: "",
    interviewProcess: "", joiningTimeline: "",
    trainingSide: "", courseCategory: "", trainingProvider: "",
    providerEmail: "", providerPhone: "", providerLocation: "",
    courseTitle: "", courseSubtitle: "", courseDescription: "",
    courseDuration: "", totalHours: "", coursePrice: "",
    trainingMode: "", batchStartDate: "", classSchedule: "",
    batchSize: "", instructionLanguage: "", courseModules: [],
    courseMinQual: "", techStack: "", projectsIncluded: "",
    certProvided: false, placementAssist: false,
    instructorInfo: "", prevEnrolled: "", prevPassPct: "",
    examStagesCovered: [], targetExamYear: "", mockTestCount: "",
    studyMaterialProvided: false, currentAffairsCoverage: false,
    pastSelections: "", govtCourseHostel: false,
    hcEntityName: "", hcEstabYear: "", hcAddress: "", hcCity: "",
    hcState: "", hcPincode: "", hcHospitalType: "", hcBedCapacity: "",
    hcIcuBeds: "", hcManagementType: "", hcLabType: "", hcLabServices: [],
    hcStoreType: "", hc24HrOp: false, hcHomeDelivery: false,
    hcDoctorName: "", hcSpecialization: "", hcQualification: "",
    hcExperience: "", hcPracticeType: "", hcRegNumber: "", hcDoctorReg: "",
    hcDrugLicenseApplicable: false, hcDrugLicenseNo: "",
    hcFireNoc: false, hcGstRegistered: false, hcGstNumber: "",
    hcEmail: "", hcPhone: "", hcAltPhone: "",
    hcEmergencyNo: "", hcDirectorName: "", hcDirectorPhone: "",
    hcLabInCharge: "", hcLabInChargePhone: "",
    hcPharmacistName: "", hcPharmacistPhone: "",
    hcConsultTimings: "", hcConsultFee: "", hcOnlineConsult: false,
    hcOtpPhone: "", hcOtpEmail: "",
    foodEntityName: "", foodEstabYear: "", foodCuisineTypes: [], foodSeatingCapacity: "",
    foodOperatingHours: "", foodOwnerName: "", foodOwnerPhone: "",
    foodManagerName: "", foodManagerPhone: "", foodRegNumber: "",
    foodFssaiRegistered: false, foodFssaiNumber: "",
    foodGstRegistered: false, foodGstNumber: "",
    foodFoodLicenseApplicable: false, foodFoodLicenseNo: "",
    foodHealthInspection: false, foodHealthInspectionNo: "",
    foodFireNoc: false, foodFireNocNo: "",
    foodSpecialMenuItems: "", foodAveragePrice: "", foodDiningOptions: [],
  });

  const instSteps: string[] = institutionType ? (TYPE_STEPS[institutionType] ?? BASE_STEPS) : BASE_STEPS;

  const modules = [
    { label: "🎓 Education", value: "education" },
    { label: "🏥 Health Care", value: "healthcare" },
    { label: "🍽️ My Food", value: "food" },
    { label: "🛒 Rent / Marketplace", value: "marketplace" },
    { label: "♻️ Swachify Products", value: "swachify" },
    { label: "🚗 Just Ride", value: "justride" },
  ];
  const educationSubModules = [
    { label: "General Education", value: "general_edu" },
    { label: "Institution / School / College", value: "institution" },
    { label: "Students", value: "students" },
    { label: "Companies", value: "companies" },
    { label: "Training", value: "training" },
  ];
  const institutionTypes: Array<{ label: string; value: InstitutionType }> = [
    { label: "🏫 Primary School", value: "Primary School" },
    { label: "🏫 Secondary / High School", value: "Secondary / High School" },
    { label: "🎓 Inter / Junior College", value: "Inter / Junior College" },
    { label: "🎓 Graduation College", value: "Graduation College" },
    { label: "🎓 Post Graduation College", value: "Post Graduation College" },
  ];
  const healthcareCategoryOptions = [
    { label: "🏥 Hospital", value: "Hospital" },
    { label: "🔬 Lab", value: "Lab" },
    { label: "💊 Medical Store", value: "Medical Store" },
    { label: "👨‍⚕️ Doctor", value: "Doctor" },
  ];
  const regTypes = [
    { label: "Proprietorship", value: "Proprietorship" }, { label: "Partnership", value: "Partnership" },
    { label: "LLP", value: "LLP" }, { label: "Pvt Ltd", value: "Pvt Ltd" },
    { label: "Trust", value: "Trust" }, { label: "Society", value: "Society" },
  ];

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handlePickFile = (key: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev: any) => ({ ...prev, files: { ...prev.files, [key]: file.name } }));
      }
    };
    input.click();
  };

  const handleLogin = async () => {
    if (!formData.loginEmail || !formData.loginPassword) {
      showAlert("error", "Please enter username and password"); return;
    }
    setLoading(true);
    try {
      const stored = localStorage.getItem("partnerUserDetails");
      if (!stored) { showAlert("error", "No user found. Please register first."); return; }
      const userDetails = JSON.parse(stored);
      if (userDetails.username !== formData.loginEmail || userDetails.password !== formData.loginPassword) {
        showAlert("error", "Invalid credentials"); return;
      }
      showAlert("success", `Welcome back! Redirecting to ${userDetails.module} dashboard...`);
    } catch (err) {
      showAlert("error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const runRegistrationFlow = async (
    dashboardType: string, moduleKey: string, categoryKey: string,
    callModuleApi: (partnerId: number, userId: number) => Promise<any>,
  ) => {
    if (!formData.registerUsername || !formData.registerPassword) {
      showAlert("error", "Username and password are required"); return;
    }
    if (formData.registerPassword !== formData.registerConfirmPassword) {
      showAlert("error", "Passwords do not match"); return;
    }
    setLoading(true);
    try {
      const userRes = await createUser(formData.registerUsername, formData.registerPassword, formData.registerConfirmPassword);
      const userId = userRes.id;
      const moduleId = MODULE_IDS[moduleKey] ?? 0;
      const serviceCatId = SERVICE_CATEGORY_IDS[categoryKey] ?? 0;
      const partnerRes = await registerPartner(userId, moduleId, serviceCatId);
      const partnerId = partnerRes.id;
      await callModuleApi(partnerId, userId);
      localStorage.setItem("partnerUserDetails", JSON.stringify({
        username: formData.registerUsername, password: formData.registerPassword,
        module: moduleKey, healthcareCategory, dashboardType,
      }));
      showAlert("success", "🎉 Registration Successful! Your profile has been submitted for review.");
    } catch (err: any) {
      showAlert("error", err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInstitution = () => runRegistrationFlow("institution", "education", "institution", (pid, uid) => registerInstitution(pid, uid, { ...formData, institutionType }));
  const handleSubmitStudent = () => runRegistrationFlow("student", "education", "students", (pid, uid) => registerStudent(pid, uid, formData));
  const handleSubmitCompany = () => runRegistrationFlow("company", "education", "companies", (pid, uid) => registerCompany(pid, uid, formData));
  const handleSubmitTraining = () => runRegistrationFlow("training", "education", "training", (pid, uid) => registerTraining(pid, uid, formData));
  const handleSubmitGeneralEdu = () => runRegistrationFlow("general_edu", "education", "general_edu", async () => {});
  const handleSubmitHealthcare = () => {
    if (!healthcareCategory) { showAlert("error", "Please select a healthcare category"); return; }
    const apiMap: Record<string, (pid: number, uid: number) => Promise<any>> = {
      Hospital: (pid, uid) => registerHospital(pid, uid, formData),
      Lab: (pid, uid) => registerLab(pid, uid, formData),
      "Medical Store": (pid, uid) => registerMedicalStore(pid, uid, formData),
      Doctor: (pid, uid) => registerDoctor(pid, uid, formData),
    };
    runRegistrationFlow("healthcare", "healthcare", healthcareCategory, apiMap[healthcareCategory]);
  };
  const handleSubmitFood = () => runRegistrationFlow("food", "food", "food_restaurant", (pid, uid) => registerFood(pid, uid, formData));

  const resetSteps = () => { setInstStep(1); setStudentStep(1); setCompanyStep(1); setTrainingStep(1); };

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Global Styles */}
      <style>{`
        * { box-sizing: border-box; }
        input, textarea, select { outline: none; }
        input:focus, textarea:focus { border-color: ${colors.primary} !important; box-shadow: 0 0 0 3px ${colors.primary}20; }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        button { transition: all 0.15s ease; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.surface}; }
        ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ background: colors.card, borderBottom: `1px solid ${colors.border}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "center", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18 }}>🤝</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.primary }}>Partner Portal</div>
            <div style={{ fontSize: 11, color: colors.subText }}>Swachify India</div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 200, background: alert.type === "success" ? "#dcfce7" : "#fee2e2", color: alert.type === "success" ? "#166534" : "#991b1b", padding: "12px 24px", borderRadius: 12, border: `1px solid ${alert.type === "success" ? "#bbf7d0" : "#fecaca"}`, fontWeight: 600, fontSize: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", maxWidth: 480, textAlign: "center" }}>
          {alert.message}
        </div>
      )}

      {/* Main Content */}
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 16px", minHeight: "calc(100vh - 69px)" }}>
        <div style={{ width: "100%", maxWidth: 540 }}>

          {/* Card */}
          <div style={{ background: colors.card, borderRadius: 24, padding: 28, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: `1px solid ${colors.border}` }}>

            {/* Tabs */}
            <div style={{ display: "flex", background: colors.surface, borderRadius: 12, padding: 4, marginBottom: 24 }}>
              {(["login", "register"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", background: activeTab === tab ? colors.primary : "transparent", color: activeTab === tab ? "#fff" : colors.subText, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  {tab === "login" ? "🔑 Login" : "📝 Register"}
                </button>
              ))}
            </div>

            {/* Module selector (register only) */}
            {activeTab === "register" && (
              <SelectDropdown label="Select Service Module *" value={selectedModule ?? ""} onSelect={(v) => { setSelectedModule(v); setSelectedSubModule(null); setInstitutionType(null); setHealthcareCategory(null); setHealthcareStep(1); setFoodStep(1); resetSteps(); }} options={modules} placeholder="Select Module" />
            )}

            {/* Education sub-module */}
            {activeTab === "register" && selectedModule === "education" && (
              <SelectDropdown label="Education Category *" value={selectedSubModule ?? ""} onSelect={(v) => { setSelectedSubModule(v as EducationSubModule); setInstitutionType(null); resetSteps(); }} options={educationSubModules} placeholder="Select Category" />
            )}

            {/* Healthcare category */}
            {activeTab === "register" && selectedModule === "healthcare" && (
              <SelectDropdown label="Healthcare Category *" value={healthcareCategory ?? ""} onSelect={(v) => { setHealthcareCategory(v as HealthcareCategory); setHealthcareStep(1); }} options={healthcareCategoryOptions} placeholder="Select Healthcare Category" />
            )}

            {/* Institution type */}
            {activeTab === "register" && selectedModule === "education" && selectedSubModule === "institution" && (
              <SelectDropdown label="Institution Type *" value={institutionType ?? ""} onSelect={(v) => { setInstitutionType(v as InstitutionType); setInstStep(1); }} options={institutionTypes.map(t => ({ label: t.label, value: t.value ?? "" }))} placeholder="Select Institution Type" />
            )}

            {/* ── LOGIN ── */}
            {activeTab === "login" && (
              <div>
                <InputField label="Username / Email" value={formData.loginEmail} onChange={(t: string) => setFormData({ ...formData, loginEmail: t })} type="email" />
                <InputField label="Password" secure value={formData.loginPassword} onChange={(t: string) => setFormData({ ...formData, loginPassword: t })} />
                <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: colors.primary, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 10 }}>
                  {loading ? "Logging in..." : "Login →"}
                </button>
              </div>
            )}

            {/* ── REGISTER ── */}
            {activeTab === "register" && (
              <div>
                {/* Credentials */}
                <InputField label="Username / Email *" value={formData.registerUsername} onChange={(t: string) => setFormData({ ...formData, registerUsername: t })} type="email" />
                <InputField label="Password *" secure value={formData.registerPassword} onChange={(t: string) => setFormData({ ...formData, registerPassword: t })} />
                <InputField label="Confirm Password *" secure value={formData.registerConfirmPassword} onChange={(t: string) => setFormData({ ...formData, registerConfirmPassword: t })} />

                {/* ── Education: Students ── */}
                {selectedModule === "education" && selectedSubModule === "students" && (
                  <MultiStepWrapper
                    steps={STUDENT_STEPS} currentStep={studentStep}
                    onNext={() => studentStep === STUDENT_STEPS.length ? handleSubmitStudent() : setStudentStep(s => s + 1)}
                    onBack={() => setStudentStep(s => s - 1)}
                    isLast={studentStep === STUDENT_STEPS.length} colors={colors} loading={loading}
                  >
                    <RenderStudentStep step={STUDENT_STEPS[studentStep - 1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile} />
                  </MultiStepWrapper>
                )}

                {/* ── Education: Companies ── */}
                {selectedModule === "education" && selectedSubModule === "companies" && (
                  <MultiStepWrapper
                    steps={COMPANY_STEPS} currentStep={companyStep}
                    onNext={() => companyStep === COMPANY_STEPS.length ? handleSubmitCompany() : setCompanyStep(s => s + 1)}
                    onBack={() => setCompanyStep(s => s - 1)}
                    isLast={companyStep === COMPANY_STEPS.length} accent="#6366f1" colors={colors} loading={loading}
                  >
                    <RenderCompanyStep step={COMPANY_STEPS[companyStep - 1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile} />
                  </MultiStepWrapper>
                )}

                {/* ── Education: Training ── */}
                {selectedModule === "education" && selectedSubModule === "training" && (
                  <MultiStepWrapper
                    steps={TRAINING_STEPS} currentStep={trainingStep}
                    onNext={() => trainingStep === TRAINING_STEPS.length ? handleSubmitTraining() : setTrainingStep(s => s + 1)}
                    onBack={() => setTrainingStep(s => s - 1)}
                    isLast={trainingStep === TRAINING_STEPS.length} accent="#10b981" colors={colors} loading={loading}
                  >
                    <RenderTrainingStep step={TRAINING_STEPS[trainingStep - 1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile} />
                  </MultiStepWrapper>
                )}

                {/* ── Education: General ── */}
                {selectedModule === "education" && selectedSubModule === "general_edu" && (
                  <div>
                    <InputField label="1. Name *" value={formData.name} onChange={(t: string) => setFormData({ ...formData, name: t })} />
                    <SelectDropdown label="2. Registration Type *" value={formData.registrationType} onSelect={(v) => setFormData({ ...formData, registrationType: v })} options={regTypes} placeholder="Select Type" />
                    <InputField label="3. PAN / TAN *" value={formData.panTan} onChange={(t: string) => setFormData({ ...formData, panTan: t })} />
                    <ToggleRow label="4. GST Registration?" active={formData.hasGst} onToggle={(v: boolean) => setFormData({ ...formData, hasGst: v })} />
                    {formData.hasGst && <UploadBtn label="Upload GST Cert" picked={!!formData.files.gst} onPress={() => handlePickFile("gst")} />}
                    <InputField label="10. Address & Pincode *" multiline value={formData.address} onChange={(t: string) => setFormData({ ...formData, address: t })} />
                    <InputField label="11. Official Email *" type="email" value={formData.email} onChange={(t: string) => setFormData({ ...formData, email: t })} />
                    <InputField label="12. Phone Number *" type="tel" value={formData.phone} onChange={(t: string) => setFormData({ ...formData, phone: t })} />
                    <button onClick={handleSubmitGeneralEdu} disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: colors.primary, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 10 }}>
                      {loading ? "Submitting..." : "Submit Registration"}
                    </button>
                  </div>
                )}

                {/* ── Education: Institution ── */}
                {selectedModule === "education" && selectedSubModule === "institution" && (
                  <div>
                    {!institutionType ? (
                      <div style={{ textAlign: "center", padding: "32px 0", color: colors.subText }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🏫</div>
                        <div style={{ fontWeight: 700, color: colors.text, marginBottom: 6 }}>Select Institution Type</div>
                        <div style={{ fontSize: 13 }}>Choose the institution type above to load the registration form</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, background: colors.primary + "15", borderRadius: 10, padding: "9px 12px", marginBottom: 18, border: `1px solid ${colors.primary}35` }}>
                          <span>✅</span>
                          <span style={{ color: colors.primary, fontWeight: 700, fontSize: 13, flex: 1 }}>{institutionTypes.find(t => t.value === institutionType)?.label}</span>
                          <span onClick={() => { setInstitutionType(null); setInstStep(1); }} style={{ cursor: "pointer", color: colors.primary, fontSize: 13 }}>✏️</span>
                        </div>
                        <MultiStepWrapper
                          steps={instSteps} currentStep={instStep}
                          onNext={() => instStep === instSteps.length ? handleSubmitInstitution() : setInstStep(s => s + 1)}
                          onBack={() => setInstStep(s => s - 1)}
                          isLast={instStep === instSteps.length} colors={colors} loading={loading}
                        >
                          <RenderInstStep stepLabel={instSteps[instStep - 1]} institutionType={institutionType} form={formData} setForm={setFormData} handlePickFile={handlePickFile} />
                        </MultiStepWrapper>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Healthcare ── */}
                {selectedModule === "healthcare" && healthcareCategory && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: HC_ACCENT + "15", borderRadius: 10, padding: "9px 12px", marginBottom: 18, border: `1px solid ${HC_ACCENT}35` }}>
                      <span>{HEALTHCARE_CATEGORY_META[healthcareCategory]?.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: HC_ACCENT, fontWeight: 700, fontSize: 13 }}>{healthcareCategory}</div>
                        <div style={{ fontSize: 10, color: colors.subText }}>{HEALTHCARE_CATEGORY_META[healthcareCategory]?.subtitle}</div>
                      </div>
                      <span onClick={() => { setHealthcareCategory(null); setHealthcareStep(1); }} style={{ cursor: "pointer", color: HC_ACCENT, fontSize: 13 }}>✏️</span>
                    </div>
                    <MultiStepWrapper
                      steps={HEALTHCARE_STEPS} currentStep={healthcareStep}
                      onNext={() => healthcareStep === HEALTHCARE_STEPS.length ? handleSubmitHealthcare() : setHealthcareStep(s => s + 1)}
                      onBack={() => setHealthcareStep(s => s - 1)}
                      isLast={healthcareStep === HEALTHCARE_STEPS.length} accent={HC_ACCENT} colors={colors} loading={loading}
                    >
                      <RenderHealthcareStep stepLabel={HEALTHCARE_STEPS[healthcareStep - 1]} healthcareCategory={healthcareCategory} form={formData} setForm={setFormData} handlePickFile={handlePickFile} />
                    </MultiStepWrapper>
                  </div>
                )}

                {/* ── Food ── */}
                {selectedModule === "food" && (
                  <MultiStepWrapper
                    steps={FOOD_STEPS} currentStep={foodStep}
                    onNext={() => foodStep === FOOD_STEPS.length ? handleSubmitFood() : setFoodStep(s => s + 1)}
                    onBack={() => setFoodStep(s => s - 1)}
                    isLast={foodStep === FOOD_STEPS.length} accent={FOOD_ACCENT} colors={colors} loading={loading}
                  >
                    <RenderFoodStep stepLabel={FOOD_STEPS[foodStep - 1]} form={formData} setForm={setFormData} handlePickFile={handlePickFile} />
                  </MultiStepWrapper>
                )}

                {/* Placeholder modules */}
                {selectedModule && !["education", "healthcare", "food"].includes(selectedModule) && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: colors.subText }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{modules.find(m => m.value === selectedModule)?.label.split(" ")[0]}</div>
                    <div style={{ fontWeight: 700, color: colors.text, marginBottom: 8 }}>{modules.find(m => m.value === selectedModule)?.label} Registration</div>
                    <div style={{ fontSize: 13, marginBottom: 24 }}>Fill your credentials above and submit to register for this module.</div>
                    <button onClick={() => runRegistrationFlow(selectedModule, selectedModule, selectedModule, async () => {})} disabled={loading} style={{ padding: "12px 32px", borderRadius: 12, border: "none", background: colors.primary, color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                      {loading ? "Submitting..." : "Submit Registration"}
                    </button>
                  </div>
                )}

                {!selectedModule && (
                  <div style={{ textAlign: "center", color: colors.subText, marginTop: 20, fontSize: 13 }}>Please select a module to start registration</div>
                )}
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: colors.subText }}>
            © 2025 Swachify India · Partner Portal
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerAuth;
