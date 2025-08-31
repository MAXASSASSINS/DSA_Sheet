import React, { createContext, useContext, useEffect, useState } from "react";
import { RevisionMapType, buildRevisionMap } from "./revisionIds";


interface RevisionContextType {
    revisionMap: RevisionMapType
    refreshRevisionMap: () => Promise<void>;
    showOnlyRevisionProblem: boolean
    toggleRevisedProblem: (show:boolean) => void
}

const RevisionContext = createContext<RevisionContextType | undefined>(
    undefined
);

export const RevisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [revisionMap, setRevisionMap] = useState(new Map<String, Boolean>());
    const [showOnlyRevisionProblem, setShowOnlyRevisionProblem] = useState(false);

    const refreshRevisionMap = async () => {
        const map = await buildRevisionMap();
        setRevisionMap(map);
    };

    const toggleRevisedProblem = (show: boolean) => {
        setShowOnlyRevisionProblem(show);
    }

    useEffect(() => {
        refreshRevisionMap();
    }, []);

    return (
        <RevisionContext.Provider value={{ revisionMap, refreshRevisionMap, showOnlyRevisionProblem, toggleRevisedProblem }}>
            {children}
        </RevisionContext.Provider>
    );
};

export const useRevision = () => {
    const ctx = useContext(RevisionContext);
    if (!ctx) throw new Error("useRevision must be used inside RevisionProvider");
    return ctx;
};
