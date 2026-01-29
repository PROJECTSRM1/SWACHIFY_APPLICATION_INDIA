import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, User, Circle } from "lucide-react";

/* ---------------- TYPES (JS EQUIVALENT) ---------------- */

const DOCTORS_DATA = [
    { id: "1", name: "Dr. Alice Tan", specialty: "Cardiologist", isActive: true },
    { id: "2", name: "Dr. Bob Khumar", specialty: "Dermatologist", isActive: false },
    { id: "3", name: "Dr. Charlie Day", specialty: "Optometrist", isActive: true },
    { id: "4", name: "Dr. Diana Prince", specialty: "Neurologist", isActive: true },
    { id: "5", name: "Dr. Edward Norton", specialty: "General", isActive: true },
    { id: "6", name: "Dr. Fiona Glenanne", specialty: "Cardiologist", isActive: false },
    { id: "7", name: "Dr. George Costanza", specialty: "Dermatologist", isActive: true },
];

const DoctorsListScreen = ({ onClose }: { onClose: () => void }) => {
    const [activeFilter, setActiveFilter] = useState("All");

    const specialties = [
        "All",
        "Cardiologist",
        "Dermatologist",
        "Optometrist",
        "Neurologist",
        "General",
    ];

    const filteredDoctors =
        activeFilter === "All"
            ? DOCTORS_DATA
            : DOCTORS_DATA.filter((doc) => doc.specialty === activeFilter);

    return (
        <div style={{ ...styles.container, ...styles.overlay }}>
            {/* ---------------- HEADER ---------------- */}
            <div style={styles.header}>
                <button style={styles.backButton} onClick={onClose}>
                    <ChevronLeft size={28} />
                </button>
                <div style={styles.headerTitle}>Available Doctors</div>
                <div style={{ width: 28 }} />
            </div>

            {/* ---------------- FILTER CHIPS ---------------- */}
            <div style={styles.filterWrapper}>
                <div style={styles.filterContainer}>
                    {specialties.map((spec) => (
                        <button
                            key={spec}
                            onClick={() => setActiveFilter(spec)}
                            style={{
                                ...styles.chip,
                                ...(activeFilter === spec ? styles.activeChip : {}),
                            }}
                        >
                            <span
                                style={{
                                    ...styles.chipText,
                                    ...(activeFilter === spec ? styles.activeChipText : {}),
                                }}
                            >
                                {spec}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ---------------- LIST ---------------- */}
            <div style={styles.listContent}>
                {filteredDoctors.length === 0 && (
                    <div style={styles.emptyText}>
                        No doctors found in this category.
                    </div>
                )}

                {filteredDoctors.map((item) => (
                    <div key={item.id} style={styles.card}>
                        <div style={styles.avatarContainer}>
                            <User size={24} color="#4c739a" />
                        </div>

                        <div style={styles.infoContainer}>
                            <div style={styles.docName}>{item.name}</div>
                            <div style={styles.docSpecialty}>{item.specialty}</div>
                        </div>

                        <div
                            style={{
                                ...styles.statusBadge,
                                backgroundColor: item.isActive ? "#dcfce7" : "#fee2e2",
                            }}
                        >
                            <Circle
                                size={8}
                                fill={item.isActive ? "#16a34a" : "#dc2626"}
                                color={item.isActive ? "#16a34a" : "#dc2626"}
                            />
                            <span
                                style={{
                                    ...styles.statusText,
                                    color: item.isActive ? "#16a34a" : "#dc2626",
                                }}
                            >
                                {item.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ---------------- INTERNAL CSS ---------------- */

const styles: Record<string, CSSProperties> = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#f6f7f8",
        fontFamily: "system-ui, -apple-system, sans-serif",
    },

    overlay: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflowY: "auto",
    },

    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
        borderBottom: "1px solid #e2e8f0",
    },

    backButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 4,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0d141b",
    },

    filterWrapper: {
        backgroundColor: "#fff",
        padding: "12px 0",
    },

    filterContainer: {
        display: "flex",
        gap: 8,
        padding: "0 16px",
        overflowX: "auto",
    },

    chip: {
        padding: "8px 16px",
        borderRadius: 20,
        backgroundColor: "#f1f5f9",
        border: "1px solid #e2e8f0",
        cursor: "pointer",
        whiteSpace: "nowrap",
    },

    activeChip: {
        backgroundColor: "#137fec",
        borderColor: "#137fec",
    },

    chipText: {
        fontSize: 14,
        fontWeight: 600,
        color: "#4c739a",
    },

    activeChipText: {
        color: "#fff",
    },

    listContent: {
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },

    card: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        border: "1px solid #e2e8f0",
    },

    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    infoContainer: {
        flex: 1,
    },

    docName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0d141b",
    },

    docSpecialty: {
        fontSize: 14,
        color: "#4c739a",
        marginTop: 2,
    },

    statusBadge: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 12,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "bold",
    },

    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#4c739a",
    },
};


export default DoctorsListScreen;