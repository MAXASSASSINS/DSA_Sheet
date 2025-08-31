import json from "./learnyard_sheet.json";
import { getDB, REVISION_STORE_NAME } from "./mydb";

const problemsData = json["Problems"];

export type RevisionMapType = Map<String, Boolean>;

export const buildRevisionMap = async (): Promise<RevisionMapType> => {
    const db = await getDB(); // db with both stores
    const revisionMap:RevisionMapType = new Map<String, Boolean>();


    for (const problem of problemsData) {
        let revisionReq = await db.get(REVISION_STORE_NAME, problem.id)
        if (!revisionReq) revisionReq = false;
        revisionMap.set(problem.id, revisionReq);
    }

    return revisionMap;
};