import { CSSProperties } from "react";

export const getStateStyle = (state: string): CSSProperties => {
    switch (state) {
        case "pendiente":
            return { color: "#ffb166", backgroundColor: "#fff1e3", textAlign: "center", borderRadius: "5px", width: "50%", height: "25px", padding: "2px" };
        case "Tiempo":
            return { color: "#867bf2", backgroundColor: "#d9f8fc", textAlign: "center", borderRadius: "5px", width: "50%", height: "25px", padding: "2px" };
        case "preparando":
            return { color: "#13d2ea", backgroundColor: "#d9f8fc", textAlign: "center", borderRadius: "5px", width: "50%", height: "25px", padding: "2px" };
        case "listo":
            return { color: "#36ca78", backgroundColor: "#dff7e9", textAlign: "center", borderRadius: "5px", width: "50%", height: "25px", padding: "2px" };
        default:
            return { color: "#13d2ea", backgroundColor: "#d9f8fc", textAlign: "center", borderRadius: "5px", width: "50%", height: "25px", padding: "2px" };
    }
};