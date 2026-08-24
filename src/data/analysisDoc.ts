export interface SystemAnalysisDoc {
  projectTitle: string;
  collegeName: string;
  creator: {
    name: string;
    department: string;
    role: string;
    studentId: string;
    photoUrl: string;
  };
  promptTemplate: string;
  executiveSummary: string;
  problemStatements: { title: string; desc: string; impact: string }[];
  objectives: string[];
  targetUsers: { role: string; description: string; privileges: string }[];
  systemScope: { module: string; features: string[] }[];
  systemArchitecture: {
    frontend: string;
    stateManagement: string;
    designSystem: string;
    security: string;
    database: string;
  };
  dataFlowDiagram: {
    level0: {
      entities: string[];
      processes: string;
      dataStores: string[];
    };
    level1Processes: { id: string; name: string; input: string; output: string }[];
  };
  databaseSchema: {
    tableName: string;
    description: string;
    fields: { name: string; type: string; key?: string; note: string }[];
  }[];
  benefits: { group: string; points: string[] }[];
}

export const SYSTEM_ANALYSIS_DATA: SystemAnalysisDoc = {
  projectTitle: 'วิเคราะห์และออกแบบระบบงานร้านค้าสหกรณ์ออนไลน์ (KPTC Smart Cooperative E-Commerce System)',
  collegeName: 'วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ (Kanchanaphisek Technical College Samutprakan)',
  creator: {
    name: 'นายภูวนัย แก้วโต',
    department: 'แผนกเทคโนโลยีธุรกิจดิจิทัล',
    role: 'ผู้จัดทำ / นักศึกษาระบบสารสนเทศและธุรกิจดิจิทัล',
    studentId: '6630901xxxx',
    photoUrl: 'https://cdn.phototourl.com/free/2026-08-24-82bcfbf4-0aa9-492f-9334-0441bab3209a.png',
  },
  promptTemplate: `[System Prompt]: จงทำหน้าที่เป็น Senior Full-Stack Software Engineer และ Systems Analyst วิเคราะห์และออกแบบระบบงานร้านค้าสหกรณ์ออนไลน์ (Cooperative Store E-Commerce System) ประจำวิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ

[Context & Study Data]:
1. สถาบันเป้าหมาย: วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ สังกัดสำนักงานคณะกรรมการการอาชีวศึกษา (สอศ.)
2. กลุ่มผู้ใช้งาน: จำกัดเฉพาะ นักเรียน ปวช., นักศึกษา ปวส., ครู และบุคลากรทางการศึกษาภายในวิทยาลัยเท่านั้น
3. คลังสินค้าสหกรณ์:
   - เครื่องแบบนักศึกษา/ชุดช็อปช่าง/เสื้อพละ/เครื่องหมายสถาบัน
   - อุปกรณ์เครื่องเขียน สมุดเขียนแบบ ไม้สเกล และชุดเรขาคณิต
   - เครื่องมือช่างและอุปกรณ์เซฟตี้ (มัลติมิเตอร์ แว่นตานิรภัย ถุงมือช่าง)
   - ของที่ระลึกตราสัญลักษณ์วิทยาลัย (KPTC)
   - อาหารว่าง เครื่องดื่มสดใหม่ยามเช้าและช่วงพักเที่ยง
4. อัตลักษณ์ผู้จัดทำ:
   - ชื่อผู้จัดทำ: นายภูวนัย แก้วโต
   - แผนกวิชา: เทคโนโลยีธุรกิจดิจิทัล วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
   - รูปภาพโปรไฟล์: https://cdn.phototourl.com/free/2026-08-24-82bcfbf4-0aa9-492f-9334-0441bab3209a.png
   - โลโก้วิทยาลัยฯ (มุมบนซ้าย): https://cdn.phototourl.com/free/2026-08-24-24b27552-29da-4756-acc8-c2055f54f8fd.png

[Functional Requirements]:
1. ระบบล็อกอิน/ระบุตัวตนสมาชิกนักเรียน-ครู ด้วยรหัสนักศึกษา/บุคลากรเพื่อรับราคาสมาชิก (Member Price)
2. แคตตาล็อกสินค้าพร้อมระบบตัวเลือกขนาด (ไซส์เสื้อ/สี/รูปแบบ) และระบบค้นหาแยกตามแผนกวิชา
3. ระบบตะกร้าสินค้าแบบ Real-time คำนวณส่วนลดสมาชิกอัตโนมัติ
4. ระบบชำระเงินออนไลน์แบบรวดเร็ว (PromptPay QR Code / สหกรณ์วอลเล็ต)
5. ระบบเลือกจุดนัดรับสินค้าด่วนและช่วงเวลานัดรับ (อาคารสหกรณ์ ชั้น 1, ส่งห้องพักครู)
6. ระบบพิมพ์ใบเสร็จดิจิทัลและรหัส QR เพื่อยืนยันการรับสินค้าที่จุดบริการ`,

  executiveSummary: 'โครงการพัฒนาระบบร้านค้าสหกรณ์ออนไลน์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ จัดทำขึ้นเพื่อเปลี่ยนผ่านระบบการจำหน่ายสินค้าของสหกรณ์จากรูปแบบดั้งเดิม (หน้าร้าน physical) ไปสู่ระบบดิจิทัล (Omnichannel Smart Campus Commerce) เพื่อแก้ไขปัญหาความแออัดของนักเรียนนักศึกษาในชั่วโมงเร่งด่วน เพิ่มความสะดวกรวดเร็วในการสั่งซื้อเครื่องแบบ อุปกรณ์ช่าง และเครื่องเขียน พร้อมระบบคัดกรองสิทธิประโยชน์เฉพาะบุคลากรและนักเรียนของวิทยาลัยฯ อย่างแท้จริง',

  problemStatements: [
    {
      title: 'ความแออัดหน้าเคาน์เตอร์สหกรณ์ในช่วงเวลาเร่งด่วน',
      desc: 'นักเรียนนักศึกษากว่า 2,000 คน มักมาซื้ออุปกรณ์และชุดช็อปพร้อมกันก่อนเข้าแถว 08:00 น. และช่วงพักเที่ยง ทำให้คิวหนาแน่น ใช้เวลาเฉลี่ย 15-25 นาทีต่อการซื้อหนึ่งครั้ง',
      impact: 'เสียเวลาการเรียนรู้ และเกิดความล่าช้าในการเข้าเรียนภาคปฏิบัติ',
    },
    {
      title: 'ความไม่แน่นอนของสต็อกสินค้าเฉพาะทาง',
      desc: 'สินค้าช่าง เช่น เสื้อช็อปขนาดพิเศษ มัลติมิเตอร์ หรือสมุดเขียนแบบ มักหมดสต็อกโดยที่ผู้เรียนไม่ทราบล่วงหน้า ทำให้เดินทางมาเสียเที่ยว',
      impact: 'ขาดอุปกรณ์ในชั่วโมงเรียนปฏิบัติการ',
    },
    {
      title: 'การบริหารจัดการสิทธิราคาสมาชิกสหกรณ์และการตรวจสอบสิทธิ',
      desc: 'ระบบเดิมต้องใช้สมุดบันทึกหรือตรวจบัตรประจำตัวแบบ Manual ส่งผลให้การคิดราคาสมาชิกและสรุปยอดปันผลสิ้นปีมีความซับซ้อน',
      impact: 'เกิดความผิดพลาดในระบบบัญชีและไม่สะดวกต่อผู้ใช้งาน',
    },
  ],

  objectives: [
    'เพื่อศึกษาและวิเคราะห์กระบวนการดำเนินงานของร้านค้าสหกรณ์ วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ',
    'เพื่อออกแบบและพัฒนาระบบร้านค้าสหกรณ์ออนไลน์ที่รองรับการสั่งซื้อผ่านสมาร์ตโฟนและคอมพิวเตอร์แบบ Responsive',
    'เพื่อจำกัดและอำนวยความสะดวกเฉพาะนักเรียน นักศึกษา ครู และบุคลากรทางการศึกษาของวิทยาลัยฯ พร้อมระบบราคาสมาชิก',
    'เพื่อสร้างระบบสั่งซื้อล่วงหน้า (Pre-order & Instant Pickup) ลดเวลาการรอคอยหน้าสหกรณ์เหลือไม่เกิน 2 นาที',
    'เพื่อแสดงผลงานและการประยุกต์ใช้องค์ความรู้ของแผนกวิชาเทคโนโลยีธุรกิจดิจิทัล',
  ],

  targetUsers: [
    {
      role: 'นักเรียน ปวช. (ระดับประกาศนียบัตรวิชาชีพ)',
      description: 'ผู้เรียนชั้นปีที่ 1-3 ทุกสาขางาน ต้องการสั่งซื้อชุดนักศึกษา เสื้อพละ สมุด และอุปกรณ์ช่างพื้นฐาน',
      privileges: 'รับสิทธิ์ราคาสมาชิกสหกรณ์, ระบบค้นหาอุปกรณ์ตามรายวิชาและแผนก',
    },
    {
      role: 'นักศึกษา ปวส. (ระดับประกาศนียบัตรวิชาชีพชั้นสูง)',
      description: 'ผู้เรียนชั้นปีที่ 1-2 สั่งซื้อเสื้อช็อป เครื่องมือวัดทางไฟฟ้า อุปกรณ์นิรภัย และเอกสารโครงงาน',
      privileges: 'รับสิทธิ์ราคาสมาชิก, บันทึกประวัติใบเสร็จสำหรับเบิกอุปกรณ์การเรียน',
    },
    {
      role: 'ครูและอาจารย์ผู้สอน (Faculty)',
      description: 'ครูประจำแผนกช่างและพาณิชยกรรม สั่งซื้ออุปกรณ์การสอน เครื่องเขียน และของที่ระลึกวิทยาลัย',
      privileges: 'บริการจัดส่งตรงถึงห้องพักครู/ห้องปฏิบัติการ, สิทธิ์สั่งซื้อเป็นชุดการเรียนรู้',
    },
    {
      role: 'บุคลากรทางการศึกษาและเจ้าหน้าที่สหกรณ์ (Admin & Staff)',
      description: 'เจ้าหน้าที่ดูแลคลังสินค้าสหกรณ์ บรรจุสินค้า และตรวจสอบสลิปการรับสินค้า',
      privileges: 'Dashboard จัดการคำสั่งซื้อ, ตัดสต็อกแบบ Real-time, ออกใบกำกับและใบเสร็จสหกรณ์',
    },
  ],

  systemScope: [
    {
      module: 'ระบบจัดการสินค้าและแคตตาล็อก (Product Catalog & Inventory)',
      features: [
        'แสดงสินค้า 5 หมวดหลัก: เครื่องแบบ, เครื่องเขียน, เครื่องมือช่าง, ของที่ระลึก KPTC, อาหารว่าง',
        'ระบบเลือกไซส์/ตัวเลือกสินค้า (เสื้อช็อป S-3XL, สเปกสายเข็มขัด, สี)',
        'ระบบกรองสินค้าเฉพาะแผนกวิชา (เช่น ช่างยนต์, ช่างไฟฟ้า, เทคโนโลยีธุรกิจดิจิทัล)',
        'แสดงราคาทั่วไปเทียบกับราคาสมาชิกสหกรณ์ (Member Discount Highlight)',
      ],
    },
    {
      module: 'ระบบตะกร้าสินค้าและการคิดเงิน (Smart Cart & Calculation)',
      features: [
        'ตะกร้าสินค้า Real-time ปรับเพิ่ม-ลดจำนวนได้ทันที',
        'คำนวณส่วนลดสมาชิกอัตโนมัติเมื่อระบุสถานะผู้เรียน/บุคลากร',
        'ระบบบันทึกสถานะตะกร้าสินค้าใน Local State ใช้งานต่อเนื่องได้',
      ],
    },
    {
      module: 'ระบบสั่งซื้อและนัดรับด่วน (Checkout & Pickup Dispatch)',
      features: [
        'เลือกรอบเวลาการรับสินค้า (เช้าก่อนเข้าแถว / พักเที่ยง / หลังเลิกเรียน)',
        'เลือกจุดรับสินค้า (อาคารสหกรณ์ ชั้น 1, จุดนัดรับหน้าอาคารอำนวยการ, จัดส่งห้องพักครู)',
        'รองรับการชำระเงินผ่าน PromptPay QR Code สหกรณ์ และสหกรณ์วอลเล็ต',
      ],
    },
    {
      module: 'ระบบใบเสร็จดิจิทัลและประวัติคำสั่งซื้อ (Receipt & Order Slip)',
      features: [
        'ออกใบเสร็จแบบดิจิทัลพร้อม QR Code สหกรณ์สำหรับสแกนรับของที่หน้าร้าน',
        'จัดเก็บประวัติคำสั่งซื้อและสถานะ (กำลังจัดเตรียม, พร้อมรับสินค้า, สำเร็จ)',
        'ปุ่มพิมพ์และบันทึกใบเสร็จ (Print / Save Receipt)',
      ],
    },
    {
      module: 'ระบบข้อมูลผู้จัดทำและสถาบัน (Creator & Branding Identity)',
      features: [
        'แสดงโลโก้วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ มุมบนซ้าย',
        'ข้อมูลผู้จัดทำ นายภูวนัย แก้วโต แผนกเทคโนโลยีธุรกิจดิจิทัล พร้อมรูปถ่าย',
        'ระบบสลับ Role เพื่อทดสอบมุมมอง ปวช., ปวส., ครู และเจ้าหน้าที่',
      ],
    },
  ],

  systemArchitecture: {
    frontend: 'React 19 + TypeScript + Vite Single Page Application',
    stateManagement: 'React State + LocalStorage Client-side Persistence',
    designSystem: 'Tailwind CSS v4 + Responsive Mobile-first UX + Prompt/Bai Jamjuree Thai Typography',
    security: 'Student/Staff ID Validation + Client-side Sanitization + Role-Based Access Views',
    database: 'Structured In-Memory & Local Database Architecture ready for Cloud Firestore Sync',
  },

  dataFlowDiagram: {
    level0: {
      entities: ['นักเรียน / นักศึกษา', 'ครู / อาจารย์', 'เจ้าหน้าที่สหกรณ์ KPTC', 'ระบบชำระเงิน PromptPay'],
      processes: 'ระบบร้านค้าสหกรณ์ออนไลน์ วท.กาญจนาภิเษก สมุทรปราการ (Process 0.0)',
      dataStores: ['D1: ฐานข้อมูลสินค้า (Products)', 'D2: ฐานข้อมูลสมาชิก (Members)', 'D3: ฐานข้อมูลคำสั่งซื้อ (Orders)', 'D4: ฐานข้อมูลสลิปใบเสร็จ (Receipts)'],
    },
    level1Processes: [
      { id: '1.0', name: 'ตรวจสอบสิทธิ์สมาชิกและข้อมูลประจำตัว', input: 'รหัสนักเรียน/บุคลากร, แผนกวิชา', output: 'สถานะสิทธิราคาสมาชิกสหกรณ์' },
      { id: '2.0', name: 'สืบค้นและเลือกซื้อสินค้าสหกรณ์', input: 'หมวดหมู่, แผนก, ไซส์สินค้า', output: 'รายการสินค้าลงตะกร้าพร้อมราคาลด' },
      { id: '3.0', name: 'ประมวลผลคำสั่งซื้อและเลือกเวลารับของ', input: 'ข้อมูลตะกร้า, จุดรับสินค้า, ช่วงเวลารับ', output: 'สรุปยอดชำระเงินและคิวสั่งซื้อ' },
      { id: '4.0', name: 'ประมวลผลการชำระเงินผ่าน QR Code', input: 'หลักฐานการโอน / สหกรณ์วอลเล็ต', output: 'สถานะการชำระเงิน (Paid / Pending)' },
      { id: '5.0', name: 'ออกใบเสร็จดิจิทัลและรหัสคิวรับสินค้า', input: 'คำสั่งซื้อที่ได้รับการอนุมัติ', output: 'Digital Receipt + QR Pickup Code' },
    ],
  },

  databaseSchema: [
    {
      tableName: 'tbl_members (ข้อมูลสมาชิกสหกรณ์วิทยาลัย)',
      description: 'จัดเก็บข้อมูลนักเรียน นักศึกษา ครู และบุคลากร',
      fields: [
        { name: 'member_id', type: 'VARCHAR(20)', key: 'PK', note: 'รหัสนักศึกษา หรือ รหัสประจำตัวบุคลากร' },
        { name: 'full_name', type: 'VARCHAR(100)', note: 'ชื่อ-นามสกุล' },
        { name: 'user_role', type: 'ENUM', note: 'student_voc, student_dip, teacher, staff' },
        { name: 'department_name', type: 'VARCHAR(80)', note: 'แผนกวิชา เช่น เทคโนโลยีธุรกิจดิจิทัล, ช่างยนต์' },
        { name: 'phone_number', type: 'VARCHAR(15)', note: 'เบอร์โทรศัพท์ติดต่อ' },
        { name: 'coop_points', type: 'INT', note: 'คะแนนสะสมสหกรณ์สำหรับรับเงินปันผล' },
      ],
    },
    {
      tableName: 'tbl_products (ข้อมูลสินค้าสหกรณ์)',
      description: 'จัดเก็บรายละเอียดสินค้า เครื่องแบบ เครื่องเขียน เครื่องมือช่าง',
      fields: [
        { name: 'product_id', type: 'VARCHAR(20)', key: 'PK', note: 'รหัสสินค้าสหกรณ์' },
        { name: 'category_id', type: 'VARCHAR(20)', note: 'หมวดหมู่สินค้า' },
        { name: 'product_name', type: 'VARCHAR(150)', note: 'ชื่อสินค้า' },
        { name: 'normal_price', type: 'DECIMAL(10,2)', note: 'ราคาปกติหน้าร้าน' },
        { name: 'member_price', type: 'DECIMAL(10,2)', note: 'ราคาสมาชิกสหกรณ์ (ส่วนลด 5-15%)' },
        { name: 'stock_quantity', type: 'INT', note: 'จำนวนคงเหลือในสต็อก' },
        { name: 'target_department', type: 'VARCHAR(80)', note: 'แผนกวิชาที่เกี่ยวข้อง' },
        { name: 'options_json', type: 'TEXT', note: 'ไซส์และตัวเลือก เช่น [S, M, L, XL]' },
      ],
    },
    {
      tableName: 'tbl_orders (ข้อมูลการสั่งซื้อออนไลน์)',
      description: 'จัดเก็บบันทึกประวัติคำสั่งซื้อและการนัดรับสินค้า',
      fields: [
        { name: 'order_id', type: 'VARCHAR(30)', key: 'PK', note: 'รหัสคำสั่งซื้อ เช่น KPTC-20260824-001' },
        { name: 'member_id', type: 'VARCHAR(20)', key: 'FK', note: 'อ้างอิงรหัสสมาชิกผู้สั่ง' },
        { name: 'total_amount', type: 'DECIMAL(10,2)', note: 'ยอดรวมสุทธิหลังหักส่วนลด' },
        { name: 'pickup_location', type: 'VARCHAR(100)', note: 'จุดรับสินค้า เช่น อาคารสหกรณ์ ชั้น 1' },
        { name: 'pickup_timeslot', type: 'VARCHAR(50)', note: 'ช่วงเวลาที่นัดรับของ' },
        { name: 'payment_method', type: 'ENUM', note: 'promptpay, wallet, cash' },
        { name: 'payment_status', type: 'ENUM', note: 'paid, pending' },
        { name: 'order_status', type: 'ENUM', note: 'preparing, ready_for_pickup, completed' },
        { name: 'created_at', type: 'DATETIME', note: 'เวลาที่สร้างคำสั่งซื้อ' },
      ],
    },
    {
      tableName: 'tbl_order_items (รายการสินค้าในแต่ละออเดอร์)',
      description: 'จัดเก็บรายละเอียดสินค้าแต่ละชิ้นในคำสั่งซื้อ',
      fields: [
        { name: 'item_id', type: 'INT AUTO_INCREMENT', key: 'PK', note: 'ลำดับรายการ' },
        { name: 'order_id', type: 'VARCHAR(30)', key: 'FK', note: 'อ้างอิง tbl_orders' },
        { name: 'product_id', type: 'VARCHAR(20)', key: 'FK', note: 'อ้างอิง tbl_products' },
        { name: 'selected_option', type: 'VARCHAR(50)', note: 'ไซส์หรือตัวเลือกที่เลือก' },
        { name: 'quantity', type: 'INT', note: 'จำนวนที่สั่ง' },
        { name: 'unit_price', type: 'DECIMAL(10,2)', note: 'ราคาต่อหน่วย ณ เวลาที่ซื้อ' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', note: 'ยอดรวมของรายการ' },
      ],
    },
  ],

  benefits: [
    {
      group: 'ประโยชน์ต่อนักเรียนและนักศึกษา',
      points: [
        'ประหยัดเวลา ไม่ต้องยืนรอคิวช่วงเช้าก่อนเข้าแถวหรือช่วงพักกลางวัน',
        'สามารถเช็คสต็อกสินค้าและไซส์เสื้อช็อปได้ทันทีก่อนสั่งซื้อ',
        'ได้รับสิทธิ์ราคาสมาชิกสหกรณ์สะสมแต้มปันผลอย่างโปร่งใสและตรวจสอบได้',
        'ได้รับแจ้งเตือนเวลานัดรับของที่แน่นอน',
      ],
    },
    {
      group: 'ประโยชน์ต่อครูและบุคลากร',
      points: [
        'สั่งซื้อสื่อการเรียนการสอนและเครื่องเขียนได้จากห้องพักครู',
        'มีบริการนำส่งตรงถึงแผนกวิชาเพื่อความสะดวกรวดเร็ว',
        'มีใบเสร็จดิจิทัลสำหรับแนบเบิกโครงการและรายวิชาการสอน',
      ],
    },
    {
      group: 'ประโยชน์ต่อร้านค้าสหกรณ์และวิทยาลัยฯ',
      points: [
        'ลดความแออัดบริเวณหน้าอาคารสหกรณ์อย่างเป็นรูปธรรม',
        'เตรียมแพ็คสินค้าล่วงหน้าตามรอบเวลาอย่างมีประสิทธิภาพ',
        'ทราบปริมาณความต้องการสินค้า (Demand Forecasting) สั่งของเข้าคลังได้แม่นยำ',
        'ยกระดับวิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ สู่การเป็น Smart Vocational Campus',
      ],
    },
  ],
};
