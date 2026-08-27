import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "FREEMOCKS_CBT_DB";
const STORE_NAME = "exam_responses";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (typeof window === "undefined") return null;
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}

export async function saveExamStateToLocal(testId: string, data: any) {
  try {
    const db = await getDB();
    if (db) {
      await db.put(STORE_NAME, data, `test_${testId}`);
    }
  } catch (err) {
    console.warn("IndexedDB save failed", err);
  }
}

export async function loadExamStateFromLocal(testId: string) {
  try {
    const db = await getDB();
    if (db) {
      return await db.get(STORE_NAME, `test_${testId}`);
    }
  } catch (err) {
    console.warn("IndexedDB load failed", err);
  }
  return null;
}

export async function clearExamStateFromLocal(testId: string) {
  try {
    const db = await getDB();
    if (db) {
      await db.delete(STORE_NAME, `test_${testId}`);
    }
  } catch (err) {
    console.warn("IndexedDB delete failed", err);
  }
}
