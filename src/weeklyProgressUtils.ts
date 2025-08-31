import { DB_NAME, SOLVED_TIMESTAMP_STORE_NAME } from "./mydb";

// Utility: get Monday 00:00 of current week as timestamp
function getThisWeeksMonday(): number {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.getTime();
}

// Utility: map timestamp -> weekday index (0=Mon, 6=Sun)
function getWeekdayIndex(ts: number): number {
  const d = new Date(ts);
  let idx = d.getDay(); // 0 = Sun, 1 = Mon ...
  return idx === 0 ? 6 : idx - 1;
}

interface ProblemEntry {
  problemId: string;
  timestamp: number;
}

export async function getSolvedProblemsCountByDay() {
  return new Promise<Record<string, number>>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    const storeName = SOLVED_TIMESTAMP_STORE_NAME;
    const results: Record<string, number> = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    const weekStart = getThisWeeksMonday();
    const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const value = cursor.value as { problemId: string; solvedAt: number; dayKey: number };
          if (value.dayKey >= weekStart) {
            const dayIdx = getWeekdayIndex(value.dayKey);
            results[weekdays[dayIdx]]++;
          }
          cursor.continue();
        }
      };

      tx.oncomplete = () => resolve(results);
      tx.onerror = () => reject(tx.error);
    };

    request.onerror = () => reject(request.error);
  });
}

