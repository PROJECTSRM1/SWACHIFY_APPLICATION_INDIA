import React, { useState } from "react";
import {
    Search,
    Calendar,
    Stethoscope,
    Truck,
    Hourglass,
    CheckCircle2,
    LayoutDashboard,
    ClipboardList,
    BarChart2,
    Settings,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type Props = {
    onClose: () => void;
};

type BookingStatus = "Scheduled" | "Pending" | "In-Transit" | "Completed";

type Booking = {
    id: string;
    patientName: string;
    status: BookingStatus;
    service: string;
    dateTime: string;
};

/* ---------------- COMPONENT ---------------- */

const HospitalBookingScreen: React.FC<Props> = ({ onClose }) => {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const bookings: Booking[] = [
        {
            id: "1",
            patientName: "John Doe",
            status: "Scheduled",
            service: "Full Body Checkup - Platinum",
            dateTime: "Oct 24, 2023 | 09:00 AM",
        },
        {
            id: "2",
            patientName: "Jane Smith",
            status: "Pending",
            service: "Basic Wellness Package",
            dateTime: "Oct 24, 2023 | 10:30 AM",
        },
        {
            id: "3",
            patientName: "Robert Wilson",
            status: "In-Transit",
            service: "Diabetes Management Kit",
            dateTime: "Oct 24, 2023 | 01:15 PM",
        },
        {
            id: "4",
            patientName: "Emily Davis",
            status: "Completed",
            service: "Cardiac Screening Plus",
            dateTime: "Oct 23, 2023 | 04:45 PM",
        },
    ];

    const getStatusConfig = (status: BookingStatus) => {
        switch (status) {
            case "Scheduled":
                return { color: "#137fec", bg: "#e7f2fd", icon: <Calendar size={20} /> };
            case "Pending":
                return { color: "#f97316", bg: "#fff7ed", icon: <Hourglass size={20} /> };
            case "In-Transit":
                return { color: "#a855f7", bg: "#f5f3ff", icon: <Truck size={20} /> };
            case "Completed":
                return { color: "#10b981", bg: "#ecfdf5", icon: <CheckCircle2 size={20} /> };
            default:
                return { color: "#64748b", bg: "#f1f5f9", icon: null };
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <button onClick={onClose} style={styles.iconButton}>←</button>
            </div>

            {/* Scroll Area */}
            <div style={styles.scrollArea}>
                {/* Search */}
                <div style={styles.searchSection}>
                    <div style={styles.searchContainer}>
                        <Search size={18} color="#94a3b8" />
                        <input
                            style={styles.searchInput}
                            placeholder="Search by name or phone"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div style={styles.filterSection}>
                    {["All", "Pending", "Scheduled", "In-Transit"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                ...styles.chip,
                                ...(activeFilter === filter ? styles.activeChip : {}),
                            }}
                        >
                            <span
                                style={{
                                    ...styles.chipText,
                                    ...(activeFilter === filter ? styles.activeChipText : {}),
                                }}
                            >
                                {filter}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Booking Cards */}
                <div style={styles.listContainer}>
                    {bookings.map((item) => {
                        const config = getStatusConfig(item.status);
                        return (
                            <div
                                key={item.id}
                                style={{
                                    ...styles.card,
                                    ...(item.status === "Completed" ? { opacity: 0.8 } : {}),
                                }}
                            >
                                <div style={styles.cardHeader}>
                                    <div>
                                        <div style={{ ...styles.statusLabel, color: config.color }}>
                                            {item.status.toUpperCase()}
                                        </div>
                                        <div style={styles.patientName}>{item.patientName}</div>
                                    </div>

                                    <div
                                        style={{
                                            ...styles.statusIconContainer,
                                            backgroundColor: config.bg,
                                            color: config.color,
                                        }}
                                    >
                                        {config.icon}
                                    </div>
                                </div>

                                <div style={styles.detailsContainer}>
                                    <div style={styles.detailRow}>
                                        <Stethoscope size={16} />
                                        <span style={styles.detailTextMedium}>{item.service}</span>
                                    </div>
                                    <div style={styles.detailRow}>
                                        <Calendar size={16} />
                                        <span>{item.dateTime}</span>
                                    </div>
                                </div>

                                <button
                                    style={{
                                        ...styles.actionButton,
                                        ...(item.status === "Completed"
                                            ? styles.btnSecondary
                                            : styles.btnPrimary),
                                    }}
                                >
                                    <span
                                        style={{
                                            ...styles.actionButtonText,
                                            ...(item.status === "Completed"
                                                ? styles.btnSecondaryText
                                                : styles.btnPrimaryText),
                                        }}
                                    >
                                        {item.status === "Completed" ? "View Results" : "View Details"}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div style={styles.bottomNav}>
                <div style={styles.navItem}>
                    <LayoutDashboard size={22} />
                    <span style={styles.navText}>Home</span>
                </div>
                <div style={styles.navItem}>
                    <ClipboardList size={22} color="#137fec" />
                    <span style={{ ...styles.navText, color: "#137fec", fontWeight: "bold" }}>
                        Bookings
                    </span>
                </div>
                <div style={styles.navItem}>
                    <BarChart2 size={22} />
                    <span style={styles.navText}>Insights</span>
                </div>
                <div style={styles.navItem}>
                    <Settings size={22} />
                    <span style={styles.navText}>Profile</span>
                </div>
            </div>
        </div>
    );
};

/* ---------------- INTERNAL CSS ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#f6f7f8",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        zIndex: 9999,
    },

    header: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid #e2e8f0",
        backgroundColor: "#fff",
    },

    iconButton: {
        background: "none",
        border: "none",
        fontSize: 20,
        cursor: "pointer",
    },
    scrollArea: {
        flex: 1,
        overflowY: "auto",
        paddingBottom: 120,
    },
    searchSection: {
        padding: 16,
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "0 12px",
        borderRadius: 12,
        height: 48,
        gap: 8,
    },
    searchInput: {
        border: "none",
        outline: "none",
        width: "100%",
        fontSize: 15,
    },
    filterSection: {
        display: "flex",
        gap: 8,
        padding: "0 16px 12px",
        overflowX: "auto",
    },
    chip: {
        padding: "8px 20px",
        borderRadius: 20,
        border: "1px solid #e2e8f0",
        backgroundColor: "#fff",
        cursor: "pointer",
    },
    activeChip: {
        backgroundColor: "#137fec",
        borderColor: "#137fec",
    },
    chipText: {
        fontSize: 14,
        color: "#475569",
    },
    activeChipText: {
        color: "#fff",
        fontWeight: "bold",
    },
    listContainer: {
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    patientName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statusIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 16,
    },
    detailRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "#64748b",
    },
    detailTextMedium: {
        fontWeight: 600,
    },
    actionButton: {
        height: 44,
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
    },
    btnPrimary: {
        backgroundColor: "#137fec",
    },
    btnSecondary: {
        backgroundColor: "#f1f5f9",
    },
    actionButtonText: {
        fontWeight: "bold",
    },
    btnPrimaryText: {
        color: "#fff",
    },
    btnSecondaryText: {
        color: "#475569",
    },
    bottomNav: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0 20px",
        borderTop: "1px solid #e2e8f0",
        backgroundColor: "rgba(255,255,255,0.95)",
    },
    navItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        color: "#94a3b8",
        cursor: "pointer",
    },
    navText: {
        fontSize: 10,
    },
};

export default HospitalBookingScreen;