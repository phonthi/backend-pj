// ไฟล์ patient-storage.js สำหรับจัดการข้อมูลผู้ป่วย

// ข้อมูลตัวอย่างผู้ป่วย (ปกติจะดึงมาจากฐานข้อมูล)
const samplePatients = [
  {
    id: 1,
    name: "นายสมชาย วิชัยศรี",
    age: 45,
    gender: "ชาย",
    disease: "โรคเบาหวาน",
    status: "active",
    bmi: 27.8,
    weight: 85,
    height: 175,
    createdAt: "2025-01-15"
  },
  {
    id: 2,
    name: "นางสาวสุดา มีสุข",
    age: 32,
    gender: "หญิง",
    disease: "โรคความดันโลหิตสูง",
    status: "active",
    bmi: 22.5,
    weight: 58,
    height: 160,
    createdAt: "2025-01-20"
  },
  {
    id: 3,
    name: "นายวิชัย รักดี",
    age: 55,
    gender: "ชาย",
    disease: "โรคไตวายเรื้อรัง",
    status: "active",
    bmi: 26.2,
    weight: 78,
    height: 172,
    createdAt: "2025-02-01"
  },
  {
    id: 4,
    name: "นางสมศรี ใจดี",
    age: 67,
    gender: "หญิง",
    disease: "โรคกระดูกพรุน",
    status: "pending",
    bmi: 19.7,
    weight: 50,
    height: 159,
    createdAt: "2025-02-05"
  },
  {
    id: 5,
    name: "นายประสิทธิ์ สุขสงบ",
    age: 42,
    gender: "ชาย",
    disease: "โรคหลอดเลือดหัวใจ",
    status: "active",
    bmi: 30.1,
    weight: 92,
    height: 175,
    createdAt: "2025-02-10"
  },
  {
    id: 6,
    name: "นางสาวรัตนา วงศ์ไทย",
    age: 29,
    gender: "หญิง",
    disease: "โรคภูมิแพ้อาหาร",
    status: "active",
    bmi: 18.2,
    weight: 45,
    height: 157,
    createdAt: "2025-02-15"
  },
  {
    id: 7,
    name: "นายอนุชา มั่นคง",
    age: 61,
    gender: "ชาย",
    disease: "โรคเบาหวาน",
    status: "active",
    bmi: 25.6,
    weight: 75,
    height: 171,
    createdAt: "2025-02-20"
  },
  {
    id: 8,
    name: "นางนิภา ศรีวิไล",
    age: 51,
    gender: "หญิง",
    disease: "โรคถุงลมโป่งพอง",
    status: "pending",
    bmi: 23.4,
    weight: 60,
    height: 160,
    createdAt: "2025-02-25"
  },
  {
    id: 9,
    name: "นายธนา มีทรัพย์",
    age: 39,
    gender: "ชาย",
    disease: "โรคกรดไหลย้อน",
    status: "active",
    bmi: 28.3,
    weight: 87,
    height: 175,
    createdAt: "2025-03-01"
  },
  {
    id: 10,
    name: "นางสาวพิมพ์ใจ รักเรียน",
    age: 25,
    gender: "หญิง",
    disease: "โรคภูมิแพ้",
    status: "active",
    bmi: 21.6,
    weight: 55,
    height: 162,
    createdAt: "2025-03-05"
  },
  {
    id: 11,
    name: "นายนพดล ใจกล้า",
    age: 58,
    gender: "ชาย",
    disease: "โรคตับอักเสบ",
    status: "active",
    bmi: 24.5,
    weight: 72,
    height: 170,
    createdAt: "2025-03-10"
  },
  {
    id: 12,
    name: "คุณสมชาย วิชัยศรี",
    age: 45,
    gender: "ชาย",
    disease: "โรคเบาหวาน",
    status: "active",
    bmi: 27.8,
    weight: 85,
    height: 175,
    createdAt: "2025-01-15"
  }
];

// ฟังก์ชันดึงข้อมูลผู้ป่วย
function getPatients() {
  // ตรวจสอบว่ามีข้อมูลในโลคอลสตอเรจหรือไม่
  const storedPatients = localStorage.getItem('patients');
  
  if (storedPatients) {
    return JSON.parse(storedPatients);
  } else {
    // ถ้าไม่มีให้ใช้ข้อมูลตัวอย่าง และบันทึกลงโลคอลสตอเรจ
    localStorage.setItem('patients', JSON.stringify(samplePatients));
    return samplePatients;
  }
}

// ฟังก์ชันดึงข้อมูลผู้ป่วยตาม ID
function getPatientById(patientId) {
  const patients = getPatients();
  return patients.find(patient => patient.id === parseInt(patientId));
}

// ฟังก์ชันบันทึกข้อมูลโภชนาการผู้ป่วย
function saveNutritionData(patientId, nutritionData) {
  // ดึงข้อมูลโภชนาการที่มีอยู่
  let nutritionRecords = JSON.parse(localStorage.getItem('nutritionData') || '{}');
  
  // ถ้ายังไม่มีข้อมูลของผู้ป่วยรายนี้ ให้สร้างเป็นอาร์เรย์ใหม่
  if (!nutritionRecords[patientId]) {
    nutritionRecords[patientId] = [];
  }
  
  // เพิ่มข้อมูลโภชนาการใหม่ โดยเพิ่ม ID อัตโนมัติ
  const newRecordId = nutritionRecords[patientId].length > 0 
    ? Math.max(...nutritionRecords[patientId].map(record => record.id)) + 1 
    : 1;
    
  nutritionData.id = newRecordId;
  
  // เพิ่มข้อมูลใหม่ลงอาร์เรย์
  nutritionRecords[patientId].push(nutritionData);
  
  // บันทึกข้อมูลลงโลคอลสตอเรจ
  localStorage.setItem('nutritionData', JSON.stringify(nutritionRecords));
  
  return nutritionData;
}

// ฟังก์ชันดึงข้อมูลโภชนาการของผู้ป่วย
function getNutritionData(patientId) {
  const nutritionRecords = JSON.parse(localStorage.getItem('nutritionData') || '{}');
  return nutritionRecords[patientId] || [];
}

// ฟังก์ชันลบข้อมูลโภชนาการ
function deleteNutritionRecord(patientId, recordId) {
  let nutritionRecords = JSON.parse(localStorage.getItem('nutritionData') || '{}');
  
  if (nutritionRecords[patientId]) {
    nutritionRecords[patientId] = nutritionRecords[patientId].filter(record => record.id !== parseInt(recordId));
    localStorage.setItem('nutritionData', JSON.stringify(nutritionRecords));
    return true;
  }
  
  return false;
}

// ฟังก์ชันอัปเดตข้อมูลโภชนาการ
function updateNutritionRecord(patientId, recordId, updatedData) {
  let nutritionRecords = JSON.parse(localStorage.getItem('nutritionData') || '{}');
  
  if (nutritionRecords[patientId]) {
    const index = nutritionRecords[patientId].findIndex(record => record.id === parseInt(recordId));
    
    if (index !== -1) {
      // ให้คงค่า ID เดิมไว้
      updatedData.id = parseInt(recordId);
      nutritionRecords[patientId][index] = updatedData;
      localStorage.setItem('nutritionData', JSON.stringify(nutritionRecords));
      return updatedData;
    }
  }
  
  return null;
}

// ฟังก์ชันดึงข้อมูลโภชนาการตามช่วงเวลา
function getNutritionDataByDateRange(patientId, days) {
  const nutritionRecords = getNutritionData(patientId);
  
  if (!nutritionRecords.length) return [];
  
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - days);
  
  return nutritionRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= startDate && recordDate <= today;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ฟังก์ชันคำนวณคำแนะนำโภชนาการ
function calculateNutritionRecommendation(patient) {
  // คำนวณ BMR ด้วยสูตร Harris-Benedict
  let bmr = 0;
  
  if (patient.gender === 'ชาย') {
    bmr = 88.362 + (13.397 * patient.weight) + (4.799 * patient.height) - (5.677 * patient.age);
  } else {
    bmr = 447.593 + (9.247 * patient.weight) + (3.098 * patient.height) - (4.330 * patient.age);
  }
  
  // ปรับตามโรคและ BMI
  let activityFactor = 1.2; // ค่าเริ่มต้นสำหรับการเคลื่อนไหวน้อย
  
  // ปรับตามโรค
  if (patient.disease.includes('เบาหวาน')) {
    bmr = bmr * 0.9; // ลดลง 10% สำหรับโรคเบาหวาน
  } else if (patient.disease.includes('ไต')) {
    bmr = bmr * 0.8; // ลดลง 20% สำหรับโรคไต
  } else if (patient.disease.includes('หัวใจ') || patient.disease.includes('ความดัน')) {
    bmr = bmr * 0.85; // ลดลง 15% สำหรับโรคหัวใจและความดัน
  }
  
  // ปรับตาม BMI
  if (patient.bmi > 25) {
    bmr = bmr * 0.9; // ลดลง 10% สำหรับคนที่มี BMI สูง
  } else if (patient.bmi < 18.5) {
    bmr = bmr * 1.1; // เพิ่มขึ้น 10% สำหรับคนที่มี BMI ต่ำ
  }
  
  const calories = Math.round(bmr * activityFactor);
  
  // คำนวณสัดส่วนสารอาหาร
  let protein, carbs, fats;
  
  if (patient.disease.includes('เบาหวาน')) {
    // ลดคาร์โบไฮเดรต เพิ่มโปรตีนสำหรับเบาหวาน
    protein = Math.round((calories * 0.30) / 4); // 30% จากโปรตีน
    carbs = Math.round((calories * 0.40) / 4);   // 40% จากคาร์โบไฮเดรต
    fats = Math.round((calories * 0.30) / 9);    // 30% จากไขมัน
  } else if (patient.disease.includes('ไต')) {
    // ลดโปรตีนสำหรับโรคไต
    protein = Math.round((calories * 0.15) / 4); // 15% จากโปรตีน
    carbs = Math.round((calories * 0.60) / 4);   // 60% จากคาร์โบไฮเดรต
    fats = Math.round((calories * 0.25) / 9);    // 25% จากไขมัน
  } else if (patient.disease.includes('หัวใจ') || patient.disease.includes('ความดัน')) {
    // ลดไขมันและโซเดียมสำหรับโรคหัวใจและความดัน
    protein = Math.round((calories * 0.25) / 4); // 25% จากโปรตีน
    carbs = Math.round((calories * 0.55) / 4);   // 55% จากคาร์โบไฮเดรต
    fats = Math.round((calories * 0.20) / 9);    // 20% จากไขมัน
  } else {
    // สัดส่วนทั่วไป
    protein = Math.round((calories * 0.20) / 4); // 20% จากโปรตีน
    carbs = Math.round((calories * 0.55) / 4);   // 55% จากคาร์โบไฮเดรต
    fats = Math.round((calories * 0.25) / 9);    // 25% จากไขมัน
  }
  
  return {
    calories,
    protein,
    carbs,
    fats
  };
}

// ฟังก์ชันอัปเดตสถานะผู้ป่วย
function updatePatientStatus(patientId, newStatus) {
  const patients = getPatients();
  const patientIndex = patients.findIndex(p => p.id === parseInt(patientId));
  
  if (patientIndex !== -1) {
    patients[patientIndex].status = newStatus;
    localStorage.setItem('patients', JSON.stringify(patients));
    return true;
  }
  
  return false;
}

// ฟังก์ชันอัปเดตข้อมูลผู้ป่วย
function updatePatient(patientId, updatedData) {
  const patients = getPatients();
  const patientIndex = patients.findIndex(p => p.id === parseInt(patientId));
  
  if (patientIndex !== -1) {
    // อัปเดตข้อมูลผู้ป่วย แต่คงค่า ID เดิมไว้
    patients[patientIndex] = { ...updatedData, id: parseInt(patientId) };
    localStorage.setItem('patients', JSON.stringify(patients));
    return patients[patientIndex];
  }
  
  return null;
}

// ฟังก์ชันเพิ่มผู้ป่วยใหม่
function addNewPatient(patientData) {
  const patients = getPatients();
  
  // กำหนด ID ใหม่สำหรับผู้ป่วย
  const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
  
  // เพิ่มข้อมูลวันที่สร้าง
  const newPatient = {
    ...patientData,
    id: newId,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  patients.push(newPatient);
  localStorage.setItem('patients', JSON.stringify(patients));
  
  return newPatient;
}

// ส่งออกฟังก์ชันเพื่อใช้ในไฟล์อื่น
window.patientStorage = {
  getPatients,
  getPatientById,
  saveNutritionData,
  getNutritionData,
  deleteNutritionRecord,
  updateNutritionRecord,
  getNutritionDataByDateRange,
  calculateNutritionRecommendation,
  updatePatientStatus,
  updatePatient,
  addNewPatient
};

// ฟังก์ชันสำหรับจัดการข้อมูลผู้ป่วยแบบบูรณาการระหว่างหน้าต่างๆ ในระบบ

// ฟังก์ชันบันทึกข้อมูลผู้ป่วยที่เลือกลง localStorage
function storeSelectedPatient(patientId) {
  localStorage.setItem('selectedPatientId', patientId);
}

// ฟังก์ชันดึงข้อมูลผู้ป่วยที่เลือกจาก localStorage
function getSelectedPatient() {
  return localStorage.getItem('selectedPatientId');
}

// ฟังก์ชันลบข้อมูลผู้ป่วยที่เลือกจาก localStorage
function clearSelectedPatient() {
  localStorage.removeItem('selectedPatientId');
}

// ฟังก์ชันบันทึกรายการผู้ป่วยทั้งหมดลง localStorage
function storeAllPatients(patients) {
  localStorage.setItem('allPatients', JSON.stringify(patients));
}

// ฟังก์ชันดึงรายการผู้ป่วยทั้งหมดจาก localStorage
function getAllPatients() {
  const storedPatients = localStorage.getItem('allPatients');
  return storedPatients ? JSON.parse(storedPatients) : [];
}

// ฟังก์ชันนำทางไปยังหน้า history.html พร้อมกับเลือกผู้ป่วย
function goToHistoryPage(patientId) {
  storeSelectedPatient(patientId);
  window.location.href = 'history.html';
}

// ฟังก์ชันนำทางไปยังหน้า nutrition.html พร้อมกับเลือกผู้ป่วย
function goToNutritionPage(patientId) {
  storeSelectedPatient(patientId);
  window.location.href = 'nutrition.html';
}

// ฟังก์ชันอัปเดตข้อมูลผู้ป่วยในรายการทั้งหมด
function updatePatient(updatedPatient) {
  const patients = getAllPatients();
  const index = patients.findIndex(p => p.user_id === updatedPatient.user_id);
  
  if (index !== -1) {
    patients[index] = updatedPatient;
    storeAllPatients(patients);
    return true;
  }
  return false;
}

// ฟังก์ชันดึงข้อมูลผู้ป่วยตาม ID
function getPatientById(patientId) {
  const patients = getAllPatients();
  return patients.find(p => p.user_id == patientId);
}