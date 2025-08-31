import { openDB, DBSchema, IDBPDatabase } from "idb";

export const DB_NAME = "MyDSASheetDB";

export const REVISION_STORE_NAME = "RevisionFlags";
export const COMPLETED_STORE_NAME = "CompletedFlags";
export const SOLVED_TIMESTAMP_STORE_NAME = 'SolvedTimestamps';

export type IStoreName = typeof REVISION_STORE_NAME | typeof COMPLETED_STORE_NAME | typeof SOLVED_TIMESTAMP_STORE_NAME;

export interface MyDB extends DBSchema {
  RevisionFlags: {
    key: string;
    value: boolean;
  };
  CompletedFlags: {
    key: string;
    value: boolean;
  };
  SolvedTimestamps: {
    key: number; // autoIncrement ID
    value: {
      problemId: string;
      solvedAt: number;
      dayKey: number;
    };
    indexes: {
      "problem_day": [string, number]; // (problemId, dayKey)
      "problemId": string;
      "dayKey": number;
    };
  };
}

// Open the DB and return typed instance
export const getDB = async (): Promise<IDBPDatabase<MyDB>> => {
  return openDB<MyDB>(DB_NAME, 1, {
    upgrade(db) {
      // Create both stores if they don't exist
      if (!db.objectStoreNames.contains(REVISION_STORE_NAME)) {
        db.createObjectStore(REVISION_STORE_NAME);
      }
      if (!db.objectStoreNames.contains(COMPLETED_STORE_NAME)) {
        db.createObjectStore(COMPLETED_STORE_NAME);
      }
      if (!db.objectStoreNames.contains(SOLVED_TIMESTAMP_STORE_NAME)) {
        const store = db.createObjectStore(SOLVED_TIMESTAMP_STORE_NAME, {
          keyPath: "id", // primary key
          autoIncrement: true,
        });

        store.createIndex("problem_day", ["problemId", "dayKey"], { unique: true });
        store.createIndex("problemId", "problemId");
        store.createIndex("dayKey", "dayKey");
      }
    },
  });
};

// Set a flag for a problem id
export const setFlag = async (
  id: string,
  value: boolean,
  storeName: IStoreName
): Promise<void> => {
  const db = await getDB();
  await db.put(storeName, value, id);
};

// Get a flag for a problem id
export const getFlag = async (
  id: string,
  storeName: IStoreName
): Promise<boolean> => {
  const db = await getDB();
  const value = await db.get(storeName, id);
  return !!value;
};

export async function addSolvedTimestamp(problemId: string) {
  const db = await getDB();
  const tx = db.transaction(SOLVED_TIMESTAMP_STORE_NAME, "readwrite");
  const store = tx.store;

  // normalize dayKey → midnight of today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayKey = today.getTime();

  try {
    await store.add({
      problemId,
      solvedAt: Date.now(),
      dayKey,
    });
    console.log(`✅ Stored ${problemId} for ${new Date(dayKey).toDateString()}`);
  } catch (err: any) {
    if (err.name === "ConstraintError") {
      // This happens if (problemId, dayKey) already exists due to unique index
      console.log(`⚠️ Problem ${problemId} already solved today → skipping`);
    } else {
      console.log("error")
    }
  }

  await tx.done;
}
