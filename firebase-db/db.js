// db.js

const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Utility to read a CSV file
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

async function importData() {
  try {
    // 1. Import main student_master_balanced
    const students = await readCSV("./student_master_balanced.csv");

    for (const row of students) {
      const studentId = row.id; // <-- use "id" from CSV
      const studentRef = db.collection("students").doc(studentId);

      await studentRef.set({
        ...row,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log("✅ student_master_balanced.csv imported!");

    // 2. Import attendance_db as subcollection
    const attendance = await readCSV("./attendance_db.csv");
    for (const row of attendance) {
      if (!row.id) continue;
      const studentRef = db.collection("students").doc(row.id);
      await studentRef.collection("attendance").doc().set({
        ...row,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log("✅ attendance_db.csv imported!");

    // 3. Import marks_db as subcollection
    const marks = await readCSV("./marks_db.csv");
    for (const row of marks) {
      if (!row.id) continue;
      const studentRef = db.collection("students").doc(row.id);
      await studentRef.collection("marks").doc().set({
        ...row,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log("✅ marks_db.csv imported!");

    // 4. Import fee_db as subcollection
    const fees = await readCSV("./fee_db.csv");
    for (const row of fees) {
      if (!row.id) continue;
      const studentRef = db.collection("students").doc(row.id);
      await studentRef.collection("fees").doc().set({
        ...row,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log("✅ fee_db.csv imported!");

    console.log("🎉 Firestore setup complete with all CSV data!");
  } catch (error) {
    console.error("❌ Error importing data:", error);
  }
}

importData();
    