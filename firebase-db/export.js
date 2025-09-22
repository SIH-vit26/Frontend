const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportData() {
  try {
    const studentsSnap = await db.collection("students").get();

    let exportObj = {};

    for (const studentDoc of studentsSnap.docs) {
      const studentId = studentDoc.id;
      const studentData = studentDoc.data();

      // Start student entry
      exportObj[studentId] = {
        ...studentData,
        marks: {},
        mentor_comments: {},
        reports: {},
        study_plans: {},
        counseling_sessions: {},
      };

      // ---- Export marks ----
      const marksSnap = await studentDoc.ref.collection("marks").get();
      marksSnap.forEach((doc) => {
        exportObj[studentId].marks[doc.id] = doc.data();
      });

      // ---- Export mentor_comments ----
      const commentsSnap = await studentDoc.ref.collection("mentor_comments").get();
      commentsSnap.forEach((doc) => {
        exportObj[studentId].mentor_comments[doc.id] = doc.data();
      });

      // ---- Export reports ----
      const reportsSnap = await studentDoc.ref.collection("reports").get();
      reportsSnap.forEach((doc) => {
        exportObj[studentId].reports[doc.id] = doc.data();
      });

      // ---- Export study_plans ----
      const plansSnap = await studentDoc.ref.collection("study_plans").get();
      plansSnap.forEach((doc) => {
        exportObj[studentId].study_plans[doc.id] = doc.data();
      });

      // ---- Export counseling_sessions ----
      const sessionsSnap = await studentDoc.ref.collection("counseling_sessions").get();
      sessionsSnap.forEach((doc) => {
        exportObj[studentId].counseling_sessions[doc.id] = doc.data();
      });
    }

    // Save to file
    fs.writeFileSync("firestore_export.json", JSON.stringify(exportObj, null, 2));
    console.log("✅ Firestore data exported to firestore_export.json");
  } catch (error) {
    console.error("❌ Error exporting data:", error);
  }
}

exportData();
