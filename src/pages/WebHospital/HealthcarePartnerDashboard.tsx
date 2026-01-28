import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Doctorlist from "./Doctorlist";
import {
    Bell,
    TrendingUp,
    AlertCircle,
    PlusCircle,
    Stethoscope,
    CheckCircle2,
    Microscope,
    Calendar,
    Home,
    Users,
    User,
    UserCheck,
    UserX,
} from "lucide-react";

import HospitalBookingScreen from "./HospitalBookingsScreen";


const HealthcarePartner = () => {
    const navigate = useNavigate();
    const [showDoctors, setShowDoctors] = useState(false);
    const [showBookings, setShowBookings] = useState(false);



    useEffect(() => {
        if (localStorage.getItem("partner_module") !== "healthcare") {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        document.body.style.overflow = showBookings || showDoctors ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showBookings, showDoctors]);


    const activities = [
        { id: "1", type: "report", title: "Report Uploaded", patient: "John Doe", time: "10 mins ago" },
        { id: "2", type: "sample", title: "Sample Collected", patient: "Sarah Smith", time: "45 mins ago" },
        { id: "3", type: "appointment", title: "New Appointment", patient: "Mike Ross", time: "2 hours ago" },
    ];

    return (
        <>
            <div style={styles.container}>
                {/* TOP BAR */}
                <div style={styles.topBar}>
                    <div style={styles.titleRow}>
                        <div style={styles.logo}>🏥</div>
                        <span style={styles.title}>City Health Clinic</span>
                    </div>
                    <Bell size={22} />
                </div>

                {/* METRICS */}
                <div style={styles.metrics}>
                    <Metric title="Total Admitted" value="24" icon={<UserCheck size={18} />} />
                    <Metric title=" Total Discharged" value="18" icon={<UserX size={18} />} />
                    <Metric title="Total Bookings" value="45" icon={<TrendingUp size={18} />} />
                    <Metric title="Pending Reports" value="8" icon={<AlertCircle size={18} />} />
                </div>
                {/* TODAY REVENUE */}
                <div style={styles.revenueCard}>
                    <div>
                        <div style={styles.revenueLabel}>Today Revenue</div>
                        <div style={styles.revenueValue}>₹1,24,000</div>
                        <div style={styles.revenueTrend}>▲ 12% from yesterday</div>
                    </div>

                    <div style={styles.revenueIcon}>₹</div>
                </div>


                {/* ACTIONS */}
                <div style={styles.actions}>
                    <Action
                        icon={<PlusCircle size={26} color="#3b82f6" />}
                        label="Appointments"
                        onClick={() => setShowBookings(true)}
                    />                    <Action
                        icon={<Stethoscope size={26} color="#3b82f6" />}
                        label="Available Doctors"
                        sub="12"
                        onClick={() => setShowDoctors(true)}
                    />
                </div>
                {/* BOOKING TRENDS */}
                <div style={styles.trendsHeader}>
                    <h3 style={styles.sectionTitle}>Booking Trends</h3>
                    <span style={styles.trendsBadge}>Last 7 Days</span>
                </div>

                <div style={styles.trendsCard}>
                    <div style={styles.trendsBars}>
                        {[30, 50, 40, 70, 60, 85, 75].map((h, i) => (
                            <div
                                key={i}
                                style={{
                                    ...styles.trendBar,
                                    height: `${h}%`,
                                    opacity: h / 100,
                                }}
                            />
                        ))}
                    </div>

                    <div style={styles.trendsLabels}>
                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                            <span key={i} style={styles.trendLabel}>
                                {d}
                            </span>
                        ))}
                    </div>
                </div>


                {/* RECENT ACTIVITY */}
                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                <div style={styles.activityList}>
                    {activities.map(a => (
                        <div key={a.id} style={styles.activityCard}>
                            <div style={styles.activityIcon}>
                                {a.type === "report" && <CheckCircle2 size={18} />}
                                {a.type === "sample" && <Microscope size={18} />}
                                {a.type === "appointment" && <Calendar size={18} />}
                            </div>
                            <div>
                                <div style={styles.activityTitle}>{a.title}</div>
                                <div style={styles.activitySub}>
                                    {a.patient} • {a.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM NAV */}
                <div style={styles.bottomNav}>
                    <NavItem icon={<Home size={22} />} label="Home" active />
                    <NavItem icon={<Calendar size={22} />} label="Bookings" />
                    <NavItem icon={<Users size={22} />} label="Patients" />
                    <NavItem icon={<User size={22} />} label="Profile" />
                </div>
            </div>

            {/* FULL SCREEN OVERLAY */}
            {showDoctors && <Doctorlist onClose={() => setShowDoctors(false)} />}
            {showBookings && (
                <HospitalBookingScreen onClose={() => setShowBookings(false)} />
            )}

        </>
    );
};

/* ---------------- FULL SCREEN DOCTORS ---------------- */



/* ---------------- SMALL COMPONENTS ---------------- */

const Metric = ({ title, value, icon }: any) => (
    <div style={styles.metricCard}>
        <div>
            <div style={styles.metricTitle}>{title}</div>
            <div style={styles.metricValue}>{value}</div>
        </div>
        {icon}
    </div>
);

const Action = ({ icon, label, sub, onClick }: any) => (
    <button style={styles.actionBtn} onClick={onClick}>
        {icon}
        <div style={styles.actionText}>{label}</div>
        {sub && <div style={styles.actionSub}>{sub}</div>}
    </button>
);

const NavItem = ({ icon, label, active }: any) => (
    <div style={styles.navItem}>
        {icon}
        <span style={{ fontSize: 12, color: active ? "#2563eb" : "#64748b" }}>
            {label}
        </span>
    </div>
);

/* ---------------- STYLES ---------------- */




const styles: any = {
    container: {
        minHeight: "100vh",
        background: "#f6f7f8",
        paddingBottom: 80,
        fontFamily: "system-ui",
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        padding: 16,
        background: "#fff",
    },
    titleRow: { display: "flex", alignItems: "center", gap: 10 },
    logo: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "#2563eb",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: 18, fontWeight: 700 },
    metrics: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12,
        padding: 16,
    },
    metricCard: {
        background: "#fff",
        borderRadius: 14,
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
    },
    metricTitle: { fontSize: 13, color: "#64748b" },
    metricValue: { fontSize: 22, fontWeight: 700 },
    actions: { display: "flex", gap: 12, padding: "0 16px" },
    actionBtn: {
        flex: 1,
        background: "#eaf2fd",
        borderRadius: 16,
        padding: 18,
        border: "none",
    },
    revenueCard: {
        margin: "0 16px 16px",
        background: "linear-gradient(135deg, #2563eb, #1e40af)",
        borderRadius: 18,
        padding: 20,
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    revenueLabel: {
        fontSize: 14,
        opacity: 0.9,
    },

    revenueValue: {
        fontSize: 28,
        fontWeight: 800,
        marginTop: 6,
    },

    revenueTrend: {
        fontSize: 13,
        marginTop: 4,
        opacity: 0.85,
    },

    revenueIcon: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 700,
    },

    actionText: { fontWeight: 600 },
    actionSub: { fontSize: 22, fontWeight: 700, color: "#2563eb" },
    sectionTitle: { fontSize: 18, fontWeight: 700, margin: "16px" },
    activityList: { padding: "0 16px" },
    activityCard: {
        background: "#fff",
        borderRadius: 16,
        padding: 14,
        display: "flex",
        gap: 12,
        marginBottom: 12,
    },
    activityIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "#eaf2fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    activityTitle: { fontWeight: 700 },
    activitySub: { fontSize: 13, color: "#64748b" },
    bottomNav: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        display: "flex",
        justifyContent: "space-around",
        padding: 10,
    },
    navItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    trendsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
    },

    trendsBadge: {
        background: "#eaf2fd",
        color: "#2563eb",
        fontSize: 12,
        padding: "4px 10px",
        borderRadius: 12,
        fontWeight: 600,
    },

    trendsCard: {
        background: "#fff",
        margin: "8px 16px 16px",
        padding: 16,
        borderRadius: 16,
    },

    trendsBars: {
        display: "flex",
        alignItems: "flex-end",
        height: 120,
        gap: 8,
    },

    trendBar: {
        flex: 1,
        background: "#3b82f6",
        borderRadius: "6px 6px 0 0",
    },

    trendsLabels: {
        display: "flex",
        marginTop: 8,
    },

    trendLabel: {
        flex: 1,
        textAlign: "center",
        fontSize: 12,
        color: "#64748b",
        fontWeight: 600,
    },

};


export default HealthcarePartner;