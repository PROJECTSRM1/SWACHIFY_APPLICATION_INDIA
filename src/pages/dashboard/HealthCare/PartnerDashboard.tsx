/**
 * PartnerDashboard.tsx
 * React Native TypeScript — fully typed, zero web APIs.
 * Role-based theming · Online/Offline/Both mode · Tracking for online services
 * Hospital = offline-only (ward beds, doctor roster)
 * Lab / Store / Doctor = online tracking + offline queue
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react'; import './PartnerDashboard.css';

// ─────────────────────────────────────────────────────────────────────────────
// REACT DOM ADAPTER
// ─────────────────────────────────────────────────────────────────────────────
function rns(style: any): React.CSSProperties {
    if (!style) return {};
    if (Array.isArray(style)) return Object.assign({}, ...style.map(rns));

    const {
        paddingHorizontal, paddingVertical, marginHorizontal, marginVertical,
        borderBottomWidth, borderBottomColor, borderRightWidth, borderRightColor,
        borderWidth, borderColor, borderRadius,
        shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation,
        gap, ...rest
    } = style;

    const out: any = { ...rest };
    if (paddingHorizontal !== undefined) { out.paddingLeft = paddingHorizontal; out.paddingRight = paddingHorizontal; }
    if (paddingVertical !== undefined) { out.paddingTop = paddingVertical; out.paddingBottom = paddingVertical; }
    if (marginHorizontal !== undefined) { out.marginLeft = marginHorizontal; out.marginRight = marginHorizontal; }
    if (marginVertical !== undefined) { out.marginTop = marginVertical; out.marginBottom = marginVertical; }

    if (borderBottomWidth !== undefined) { out.borderBottomWidth = borderBottomWidth; out.borderBottomStyle = 'solid'; }
    if (borderBottomColor !== undefined) out.borderBottomColor = borderBottomColor;
    if (borderRightWidth !== undefined) { out.borderRightWidth = borderRightWidth; out.borderRightStyle = 'solid'; }
    if (borderRightColor !== undefined) out.borderRightColor = borderRightColor;
    if (borderWidth !== undefined) { out.borderWidth = borderWidth; out.borderStyle = 'solid'; }
    if (borderColor !== undefined) out.borderColor = borderColor;
    if (borderRadius !== undefined) out.borderRadius = borderRadius;
    if (gap !== undefined) out.gap = gap;

    if (shadowRadius || shadowOpacity || elevation || shadowColor) {
        out.boxShadow = `0px ${shadowOffset?.height ?? 2}px ${shadowRadius ?? 6}px rgba(0,0,0,0.1)`;
    }

    return out;
}

const StyleSheet = {
    create: (s: any) => s,
    absoluteFillObject: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 } as const,
};

const View = React.forwardRef(({ style, className = '', children, pointerEvents, ...props }: any, ref) => (
    <div ref={ref} className={`rn-view ${className}`} style={{ ...rns(style), pointerEvents: pointerEvents === 'none' ? 'none' : pointerEvents === 'auto' ? 'auto' : undefined }} {...props}>
        {children}
    </div>
));

const Text = ({ style, className = '', children, numberOfLines, ellipsizeMode, ...props }: any) => (
    <span className={`rn-text ${numberOfLines === 1 ? 'ellipsize' : ''} ${className}`} style={rns(style)} {...props}>
        {children}
    </span>
);

const ScrollView = ({ style, className = '', children, horizontal, contentContainerStyle, showsVerticalScrollIndicator, showsHorizontalScrollIndicator, ...props }: any) => (
    <div className={`${horizontal ? 'rn-scroll-view-horizontal' : 'rn-scroll-view'} ${className}`} style={rns(style)} {...props}>
        <div className="rn-view" style={rns(contentContainerStyle)}>
            {children}
        </div>
    </div>
);

const TouchableOpacity = ({ style, className = '', children, onPress, activeOpacity, ...props }: any) => (
    <button className={`touchable ${className}`} style={rns(style)} onClick={onPress} {...props}>
        {children}
    </button>
);

const TextInput = ({ style, className = '', value, onChangeText, placeholderTextColor, ...props }: any) => (
    <input type="text" value={value} onChange={e => onChangeText?.(e.target.value)} className={`text-input ${className}`} style={rns(style)} placeholder={props.placeholder} {...props} />
);

const StatusBar = () => null;
const SafeAreaProvider = ({ children }: any) => <div className="app-container">{children}</div>;
const SafeAreaView = ({ style, children }: any) => <View style={style}>{children}</View>;

// const Animated = { View };

function useIsWide() {
    const [isWide, setIsWide] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : true
    );

    useEffect(() => {
        const handler = () => setIsWide(window.innerWidth >= 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return isWide;
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Role = 'Hospital' | 'Lab' | 'Medical Store' | 'Doctor';
type ServiceMode = 'Online' | 'Offline' | 'Both';
type NavKey = 'Dashboard' | 'Appointments' | 'Patients' | 'Doctors' | 'Reports' | 'Analytics' | 'Settings';
type Period = 'Weekly' | 'Monthly';
type AlertLevel = 'critical' | 'warning' | 'info';
type DoctorStatus = 'On Duty' | 'In Session' | 'Off Duty';
type LabQueueStatus = 'In Progress' | 'Waiting';
type DoctorApptStatus = 'In Progress' | 'Waiting' | 'Scheduled';

interface Theme {
    primary: string;
    secondary: string;
    bg: string;
    accent: string;
    dark: string;
    pill: string;
    icon: string;
    facility: string;
}

interface StatCard {
    icon: string;
    label: string;
    value: string;
    delta: string;
    up: boolean;
    color: string;
}

interface BarPoint { l: string; on: number; off: number }

interface PieItem { l: string; v: number; c: string }

interface AlertItem { msg: string; level: AlertLevel; time: string }

interface TrackingStep { icon: string; label: string }

interface TrackingOrder {
    title: string;
    sub: string;
    status: string;
    currentStep: number;
    eta: string;
    steps: TrackingStep[];
}

interface WardItem { name: string; total: number; occupied: number; icon: string }

interface DoctorRosterItem { name: string; dept: string; status: DoctorStatus; avatar: string }

interface LabQueueItem { name: string; test: string; time: string; token: string; status: LabQueueStatus }

interface DoctorApptItem { name: string; reason: string; time: string; room: string; status: DoctorApptStatus }

interface StoreSaleItem { name: string; items: string; amount: string; time: string }

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED BLUE/WHITE THEME REGISTRY
// All roles share the same blue/white palette
// ─────────────────────────────────────────────────────────────────────────────
const BLUE_THEME = {
    primary: '#0EA5E9',
    secondary: '#0284C7',
    bg: '#F0F9FF',
    accent: '#38BDF8',
    dark: '#0C4A6E',
    pill: '#E0F2FE',
};

const THEMES: Record<Role, Theme> = {
    Hospital: {
        ...BLUE_THEME,
        icon: '🏥',
        facility: 'City General Hospital',
    },
    Lab: {
        ...BLUE_THEME,
        icon: '🔬',
        facility: 'HealthPath Diagnostics',
    },
    'Medical Store': {
        ...BLUE_THEME,
        icon: '💊',
        facility: 'MedLife Pharmacy',
    },
    Doctor: {
        ...BLUE_THEME,
        icon: '👨‍⚕️',
        facility: 'Apollo Clinic',
    },
};

// ROLES list removed: switching disabled per UI update
const MODES: ServiceMode[] = ['Online', 'Offline', 'Both'];
const MODE_ICONS: Record<ServiceMode, string> = { Online: '🌐', Offline: '🏢', Both: '⚡' };

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR NAV
// ─────────────────────────────────────────────────────────────────────────────
interface NavItem { key: NavKey; label: string; icon: string }
const NAV_ITEMS: NavItem[] = [
    { key: 'Dashboard', label: 'Dashboard', icon: '⊞' },
    { key: 'Appointments', label: 'Appointments', icon: '📅' },
    { key: 'Patients', label: 'Patients', icon: '👥' },
    { key: 'Doctors', label: 'Doctors', icon: '🩺' },
    { key: 'Reports', label: 'Reports', icon: '📄' },
    { key: 'Analytics', label: 'Analytics', icon: '📈' },
    { key: 'Settings', label: 'Settings', icon: '⚙️' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA FACTORIES
// ─────────────────────────────────────────────────────────────────────────────
const rnd = (lo: number, hi: number): number => Math.round(lo + Math.random() * (hi - lo));

const WK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MO_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const makeBarData = (period: Period): BarPoint[] =>
    (period === 'Weekly' ? WK_LABELS : MO_LABELS).map(l => ({ l, on: rnd(20, 90), off: rnd(30, 110) }));

function getStats(role: Role, mode: ServiceMode): StatCard[] {
    const m = mode === 'Online' ? 0.45 : mode === 'Offline' ? 1 : 1.4;
    // All stat card colors unified to blue palette
    const map: Record<Role, StatCard[]> = {
        Hospital: [
            { icon: '👥', label: 'Total Patients', value: String(Math.round(2015 * m)), delta: '+125', up: true, color: '#0EA5E9' },
            { icon: '🛏️', label: 'Rooms Available', value: '800', delta: '+15', up: true, color: '#0284C7' },
            { icon: '📅', label: 'Appointments', value: String(Math.round(500 * m)), delta: '+200', up: true, color: '#38BDF8' },
            { icon: '🔪', label: 'Surgeries Today', value: String(Math.round(10 * m)), delta: '+5', up: true, color: '#0369A1' },
        ],
        Lab: [
            { icon: '🧪', label: 'Tests Today', value: String(Math.round(312 * m)), delta: '+9%', up: true, color: '#0EA5E9' },
            { icon: '⏳', label: 'Pending Reports', value: '47', delta: '-3', up: true, color: '#0284C7' },
            { icon: '✅', label: 'Completed', value: String(Math.round(265 * m)), delta: '+15%', up: true, color: '#38BDF8' },
            { icon: mode === 'Online' ? '🏠' : mode === 'Offline' ? '🚶' : '💰', label: mode === 'Online' ? 'Home Pickups' : mode === 'Offline' ? 'Walk-ins' : 'Revenue', value: mode === 'Online' ? '89' : mode === 'Offline' ? '223' : '₹88K', delta: '+22%', up: true, color: '#0369A1' },
        ],
        'Medical Store': [
            { icon: '🛒', label: mode === 'Online' ? 'Online Orders' : mode === 'Offline' ? 'Walk-in Orders' : 'Total Orders', value: String(Math.round(184 * m)), delta: '+11%', up: true, color: '#0EA5E9' },
            { icon: '❌', label: 'Out of Stock', value: '12', delta: '+2', up: false, color: '#0284C7' },
            { icon: '💰', label: 'Total Sales', value: `₹${(1.7 * m).toFixed(1)}L`, delta: '+14%', up: true, color: '#38BDF8' },
            { icon: mode === 'Online' ? '🚚' : '📝', label: mode === 'Online' ? 'Home Deliveries' : mode === 'Offline' ? 'Counter Sales' : 'Prescriptions', value: mode === 'Online' ? '39' : mode === 'Offline' ? '145' : '67', delta: '+8%', up: true, color: '#0369A1' },
        ],
        Doctor: [
            { icon: mode === 'Online' ? '💻' : '🩺', label: mode === 'Online' ? 'Tele-consults' : mode === 'Offline' ? 'In-clinic Visits' : 'Total Consults', value: String(Math.round(22 * m)), delta: '+3', up: true, color: '#0EA5E9' },
            { icon: '⏰', label: 'Upcoming', value: '8', delta: '+2', up: true, color: '#0284C7' },
            { icon: '✅', label: 'Completed', value: String(Math.round(14 * m)), delta: '+5', up: true, color: '#38BDF8' },
            { icon: '💰', label: "Today's Earnings", value: `₹${Math.round(18 * m)}K`, delta: '+12%', up: true, color: '#0369A1' },
        ],
    };
    return map[role];
}

function getTrackingOrders(role: Role): TrackingOrder[] {
    const labSteps: TrackingStep[] = [
        { icon: '📋', label: 'Booked' }, { icon: '🚗', label: 'Pickup' },
        { icon: '🔬', label: 'Testing' }, { icon: '📄', label: 'Report' }, { icon: '📱', label: 'Delivered' },
    ];
    const storeSteps: TrackingStep[] = [
        { icon: '🛒', label: 'Placed' }, { icon: '✅', label: 'Confirmed' },
        { icon: '📦', label: 'Packing' }, { icon: '🚚', label: 'Dispatch' }, { icon: '🏠', label: 'Delivered' },
    ];
    const doctorSteps: TrackingStep[] = [
        { icon: '📋', label: 'Booked' }, { icon: '⏰', label: 'Waiting' },
        { icon: '💻', label: 'In Call' }, { icon: '📝', label: 'Rx Sent' },
    ];
    const map: Record<Role, TrackingOrder[]> = {
        Hospital: [],
        Lab: [
            { title: 'Ramesh Yadav — CBC + LFT', sub: 'Ordered 08:30 AM • Home Pickup', status: 'In Progress', currentStep: 2, eta: '11:00 AM Today', steps: labSteps },
            { title: 'Sunita Devi — Thyroid Panel', sub: 'Ordered 09:15 AM • Home Pickup', status: 'Pickup En Route', currentStep: 1, eta: '10:00 AM Today', steps: labSteps },
        ],
        'Medical Store': [
            { title: 'Anil Kapoor — 4 items ₹820', sub: 'Online Order #ORD-2891 • 09:45 AM', status: 'Dispatched', currentStep: 3, eta: '12:30 PM Today', steps: storeSteps },
            { title: 'Mohan Das — 6 items ₹1240', sub: 'Online Order #ORD-2892 • 10:10 AM', status: 'Packing', currentStep: 2, eta: '01:00 PM Today', steps: storeSteps },
        ],
        Doctor: [
            { title: 'Farida Khan — Video Consult', sub: 'Appointment #APT-0091 • 10:00 AM', status: 'Upcoming', currentStep: 1, eta: '10 mins wait', steps: doctorSteps },
            { title: 'Arjun Nair — Chat Consult', sub: 'Appointment #APT-0092 • 11:00 AM', status: 'Scheduled', currentStep: 0, eta: '~45 mins', steps: doctorSteps },
        ],
    };
    return map[role];
}

function getAlerts(role: Role): AlertItem[] {
    const map: Record<Role, AlertItem[]> = {
        Hospital: [
            { msg: 'ICU Bed 5 — O₂ saturation critically low (88%)', level: 'critical', time: '08:42 AM' },
            { msg: 'Blood bank O− stock below 10-unit threshold', level: 'warning', time: '09:10 AM' },
            { msg: '3 insurance pre-auth requests pending review', level: 'info', time: '09:35 AM' },
        ],
        Lab: [
            { msg: 'Hemoglobin critically low — Patient L1043', level: 'critical', time: '08:15 AM' },
            { msg: 'HbA1c reagent expiring in 2 days — reorder now', level: 'warning', time: '09:00 AM' },
            { msg: 'Centrifuge maintenance due today at 2:00 PM', level: 'info', time: '09:30 AM' },
        ],
        'Medical Store': [
            { msg: 'Paracetamol 650mg — completely out of stock', level: 'critical', time: '08:30 AM' },
            { msg: '28 medicines expiring before 31 Mar 2026', level: 'warning', time: '09:05 AM' },
            { msg: 'Supplier invoice from MedLife pending approval', level: 'info', time: '09:50 AM' },
        ],
        Doctor: [
            { msg: 'Emergency referral from Dr. Mehta — urgent review', level: 'critical', time: '08:20 AM' },
            { msg: 'Patient Kavita Sharma missed follow-up', level: 'warning', time: '09:00 AM' },
            { msg: 'CME certification renewal due next month', level: 'info', time: '10:00 AM' },
        ],
    };
    return map[role];
}

function getPieData(role: Role, mode: ServiceMode): PieItem[] {
    // Unified blue palette for pie/distribution charts
    const blueShades = ['#0EA5E9', '#38BDF8', '#0284C7', '#0369A1', '#BAE6FD'];
    if (mode !== 'Both') {
        return [{ l: mode, v: 100, c: '#0EA5E9' }];
    }
    const map: Record<Role, PieItem[]> = {
        Hospital: [
            { l: 'Cardiology', v: 34, c: blueShades[0] }, { l: 'Ortho', v: 22, c: blueShades[1] },
            { l: 'Neuro', v: 18, c: blueShades[2] }, { l: 'Paeds', v: 14, c: blueShades[3] }, { l: 'Others', v: 12, c: blueShades[4] },
        ],
        Lab: [
            { l: 'Blood', v: 40, c: blueShades[0] }, { l: 'Urine', v: 20, c: blueShades[1] },
            { l: 'Imaging', v: 18, c: blueShades[2] }, { l: 'Culture', v: 12, c: blueShades[3] }, { l: 'Others', v: 10, c: blueShades[4] },
        ],
        'Medical Store': [
            { l: 'Antibiotics', v: 30, c: blueShades[0] }, { l: 'Cardiac', v: 22, c: blueShades[1] },
            { l: 'Diabetic', v: 20, c: blueShades[2] }, { l: 'Pain', v: 16, c: blueShades[3] }, { l: 'Others', v: 12, c: blueShades[4] },
        ],
        Doctor: [
            { l: 'New Patients', v: 38, c: blueShades[0] }, { l: 'Follow-ups', v: 42, c: blueShades[1] }, { l: 'Online', v: 20, c: blueShades[2] },
        ],
    };
    return map[role];
}

// ─────────────────────────────────────────────────────────────────────────────
// DIMENSIONS
// ─────────────────────────────────────────────────────────────────────────────
const SIDEBAR_W = 'clamp(220px, 20%, 300px)';
// const CARD_W = '100%';// ─────────────────────────────────────────────────────────────────────────────
// BAR CHART
// ─────────────────────────────────────────────────────────────────────────────
const BarChart: React.FC<{ data: BarPoint[]; primary: string; accent: string; mode: ServiceMode }> = ({
    data, primary, accent, mode,
}) => {
    const vals = data.map(d => mode === 'Online' ? d.on : mode === 'Offline' ? d.off : d.on + d.off);
    const maxV = Math.max(...vals, 1);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 96, gap: 4, paddingTop: 6, width: "100%" }}>
            {data.map((d, i) => {
                const onH = Math.max((d.on / maxV) * 80, 4);
                const offH = Math.max((d.off / maxV) * 80, 4);
                const totH = Math.max((vals[i] / maxV) * 80, 4);
                return (
                    <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                        {mode === 'Both' ? (
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 80 }}>
                                <View style={{ width: 7, height: onH, backgroundColor: primary, borderRadius: 3 }} />
                                <View style={{ width: 7, height: offH, backgroundColor: accent, borderRadius: 3, opacity: 0.75 }} />
                            </View>
                        ) : (
                            <View style={{ width: 13, height: totH, backgroundColor: primary, borderRadius: 4 }} />
                        )}
                        <Text style={{ fontSize: 8, color: '#94A3B8', marginTop: 4 }}>{d.l}</Text>
                    </View>
                );
            })}
        </View>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({
    label, value, max, color,
}) => {
    const pct = Math.round((value / max) * 100);
    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                <Text style={{ fontSize: 11, color: '#64748B' }}>{label}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', color }}>{value}</Text>
            </View>
            <View style={{ height: 5, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 3 }} />
            </View>
        </View>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD — Sparkline removed
// ─────────────────────────────────────────────────────────────────────────────
const StatCardView: React.FC<{ card: StatCard }> = ({ card }) => {
    return (
        <View style={[sc.card, { width: '100%', borderBottomColor: card.color }]}>          <View style={sc.top}>
            <View style={[sc.iconWrap, { backgroundColor: card.color + '18' }]}>
                <Text style={{ fontSize: 14 }}>{card.icon}</Text>            </View>
            <View style={[sc.deltaPill, { backgroundColor: card.up ? '#EFF8FF' : '#FEF2F2' }]}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: card.up ? '#0284C7' : '#EF4444' }}>
                    {card.up ? '↑' : '↓'} {card.delta}
                </Text>
            </View>
        </View>
            <Text style={sc.value}>{card.value}</Text>
            <Text style={sc.label}>{card.label}</Text>
        </View>
    );
};
const sc = StyleSheet.create({
    card: {
        backgroundColor: '#fff', borderRadius: 14, padding: 4,
        shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4,
        borderBottomWidth: 3,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2
    }, iconWrap: { width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    deltaPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    value: { fontSize: 16, fontWeight: '800', color: '#1E293B', lineHeight: 18 },
    label: { fontSize: 10, color: '#64748B', fontWeight: '600', marginTop: 2 },
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────
const SectionHeader: React.FC<{ title: string; accent: string; right?: string }> = ({ title, accent, right }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ width: 4, height: 18, borderRadius: 2, backgroundColor: accent, marginRight: 10 }} />
        <Text style={{ flex: 1, fontSize: 14, fontWeight: '800', color: '#1E293B' }}>{title}</Text>
        {right && <Text style={{ fontSize: 12, color: accent, fontWeight: '700' }}>{right} ›</Text>}
    </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// ALERT ITEM
// ─────────────────────────────────────────────────────────────────────────────
const ALERT_CFG: Record<AlertLevel, { color: string; bg: string; icon: string }> = {
    critical: { color: '#DC2626', bg: '#FEF2F2', icon: '🚨' },
    warning: { color: '#D97706', bg: '#FFFBEB', icon: '⚠️' },
    info: { color: '#0284C7', bg: '#EFF8FF', icon: 'ℹ️' },
};
const AlertRow: React.FC<{ alert: AlertItem }> = ({ alert }) => {
    const cfg = ALERT_CFG[alert.level];
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: cfg.bg, borderLeftWidth: 4, borderLeftColor: cfg.color, borderRadius: 10, padding: 12, gap: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 18 }}>{cfg.icon}</Text>
            <View style={{ flex: 1, minWidth: 0 }}>                <Text style={{ fontSize: 12, fontWeight: '600', color: cfg.color, lineHeight: 17 }}>{alert.msg}</Text>
                <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{alert.time}</Text>
            </View>
        </View>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// TRACKING CARD (Online services)
// ─────────────────────────────────────────────────────────────────────────────
const TrackingCard: React.FC<{ order: TrackingOrder; theme: Theme }> = ({ order, theme }) => (
    <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: theme.pill, shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <View style={{ flex: 1, minWidth: 0 }}>                <Text style={{ fontWeight: '700', fontSize: 13, color: '#1E293B' }}>{order.title}</Text>
                <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{order.sub}</Text>
            </View>
            <View style={{ backgroundColor: theme.pill, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginLeft: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: theme.primary }}>{order.status}</Text>
            </View>
        </View>
        {/* Steps */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {order.steps.map((s, i) => (
                <React.Fragment key={i}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            width: 30, height: 30, borderRadius: 15,
                            backgroundColor: i <= order.currentStep ? theme.primary : '#E2E8F0',
                            alignItems: 'center', justifyContent: 'center',
                            shadowColor: i === order.currentStep ? theme.primary : 'transparent',
                            shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 6,
                        }}>
                            <Text style={{ fontSize: i < order.currentStep ? 12 : 11, color: i <= order.currentStep ? '#fff' : '#94A3B8' }}>
                                {i < order.currentStep ? '✓' : s.icon}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 8, color: i <= order.currentStep ? theme.primary : '#94A3B8', marginTop: 4, fontWeight: i <= order.currentStep ? '700' : '400' }}>
                            {s.label}
                        </Text>
                    </View>
                    {i < order.steps.length - 1 && (
                        <View style={{ flex: 1, height: 2, backgroundColor: i < order.currentStep ? theme.primary : '#E2E8F0', marginBottom: 14, marginHorizontal: 2 }} />
                    )}
                </React.Fragment>
            ))}
        </View>
        {order.eta !== '' && (
            <Text style={{ marginTop: 10, fontSize: 11, color: '#64748B', textAlign: 'center' }}>
                ⏱ Estimated: <Text style={{ color: theme.primary, fontWeight: '700' }}>{order.eta}</Text>
            </Text>
        )}
    </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// HOSPITAL OFFLINE PANEL
// ─────────────────────────────────────────────────────────────────────────────
const WARDS: WardItem[] = [
    { name: 'ICU', total: 20, occupied: 17, icon: '🫀' },
    { name: 'General', total: 80, occupied: 58, icon: '🛏️' },
    { name: 'Pediatric', total: 30, occupied: 22, icon: '👶' },
    { name: 'Maternity', total: 25, occupied: 18, icon: '🤱' },
    { name: 'Surgery', total: 15, occupied: 11, icon: '🔪' },
];
const DOCTORS_ROSTER: DoctorRosterItem[] = [
    { name: 'Dr. Jaylon Stanton', dept: 'Dentist', status: 'On Duty', avatar: '👩‍⚕️' },
    { name: 'Dr. Carla Schleifer', dept: 'Oculist', status: 'In Session', avatar: '👨‍⚕️' },
    { name: 'Dr. Hanna Geidt', dept: 'Surgeon', status: 'On Duty', avatar: '👩‍⚕️' },
    { name: 'Dr. Roger George', dept: 'General', status: 'Off Duty', avatar: '👨‍⚕️' },
];
const DOCTOR_STATUS_COLOR: Record<DoctorStatus, string> = {
    'On Duty': '#0EA5E9', 'In Session': '#38BDF8', 'Off Duty': '#94A3B8',
};

const HospitalOfflinePanel: React.FC<{ theme: Theme }> = ({ theme }) => (
    <>
        {/* Ward Occupancy */}
        <View style={panel.card}>
            <SectionHeader title="Ward Occupancy" accent={theme.primary} />
            {WARDS.map((w, i) => {
                const pct = Math.round((w.occupied / w.total) * 100);
                const col = pct > 85 ? '#EF4444' : pct > 70 ? '#0284C7' : '#0EA5E9';
                return (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                            <Text style={{ fontSize: 12, color: '#1E293B', fontWeight: '600' }}>{w.icon} {w.name}</Text>
                            <Text style={{ fontSize: 11, color: col, fontWeight: '700' }}>{w.occupied}/{w.total} beds</Text>
                        </View>
                        <View style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                            <View style={{ width: `${pct}%`, height: '100%', backgroundColor: col, borderRadius: 3 }} />
                        </View>
                    </View>
                );
            })}
        </View>
        {/* Doctor Roster */}
        <View style={panel.card}>
            <SectionHeader title="Doctor Roster" accent={theme.primary} />
            {DOCTORS_ROSTER.map((d, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, borderBottomWidth: i < DOCTORS_ROSTER.length - 1 ? 1 : 0, borderBottomColor: '#F8FAFC' }}>
                    <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.pill, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{d.avatar}</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>                        <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B' }}>{d.name}</Text>
                        <Text style={{ fontSize: 11, color: '#64748B' }}>{d.dept}</Text>
                    </View>
                    <View style={{ backgroundColor: DOCTOR_STATUS_COLOR[d.status] + '18', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: DOCTOR_STATUS_COLOR[d.status] }}>{d.status}</Text>
                    </View>
                </View>
            ))}
        </View>
    </>
);

// ─────────────────────────────────────────────────────────────────────────────
// LAB OFFLINE PANEL (walk-in queue)
// ─────────────────────────────────────────────────────────────────────────────
const LAB_QUEUE: LabQueueItem[] = [
    { name: 'Ramesh Yadav', test: 'CBC + LFT', time: '09:10 AM', token: 'T-01', status: 'In Progress' },
    { name: 'Vikram Bose', test: 'HbA1c', time: '10:45 AM', token: 'T-02', status: 'Waiting' },
    { name: 'Sunita Jain', test: 'Lipid Profile', time: '11:00 AM', token: 'T-03', status: 'Waiting' },
    { name: 'Ankit Sharma', test: 'Urine Culture', time: '11:30 AM', token: 'T-04', status: 'Waiting' },
];
const LAB_QUEUE_STATUS_COLOR: Record<LabQueueStatus, string> = {
    'In Progress': '#0EA5E9', Waiting: '#94A3B8',
};

const LabOfflinePanel: React.FC<{ theme: Theme }> = ({ theme }) => (
    <View style={panel.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <SectionHeader title="Walk-in Queue" accent={theme.primary} />
            <View style={{ backgroundColor: theme.pill, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: theme.primary }}>{LAB_QUEUE.length} waiting</Text>
            </View>
        </View>
        {LAB_QUEUE.map((q, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: i < LAB_QUEUE.length - 1 ? 1 : 0, borderBottomColor: '#F8FAFC' }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: LAB_QUEUE_STATUS_COLOR[q.status] + '18', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: LAB_QUEUE_STATUS_COLOR[q.status] }}>{q.token}</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B' }}>{q.name}</Text>
                    <Text style={{ fontSize: 11, color: '#64748B' }}>{q.test} • {q.time}</Text>
                </View>
                <View style={{ backgroundColor: LAB_QUEUE_STATUS_COLOR[q.status] + '18', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: LAB_QUEUE_STATUS_COLOR[q.status] }}>{q.status}</Text>
                </View>
            </View>
        ))}
    </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// DOCTOR OFFLINE PANEL (in-clinic appointments)
// ─────────────────────────────────────────────────────────────────────────────
const DOCTOR_APPTS: DoctorApptItem[] = [
    { name: 'Kavita Sharma', reason: 'Follow-up Checkup', time: '09:00 AM', room: 'Room 2', status: 'In Progress' },
    { name: 'Suresh Pillai', reason: 'Knee Pain', time: '10:30 AM', room: 'Room 2', status: 'Waiting' },
    { name: 'Priya Menon', reason: 'Fever & Cold', time: '11:00 AM', room: 'Room 3', status: 'Waiting' },
    { name: 'Rahul Gupta', reason: 'BP Review', time: '11:30 AM', room: 'Room 1', status: 'Scheduled' },
];
const DOCTOR_APPT_STATUS_COLOR: Record<DoctorApptStatus, string> = {
    'In Progress': '#0EA5E9', Waiting: '#38BDF8', Scheduled: '#0284C7',
};

const DoctorOfflinePanel: React.FC<{ theme: Theme }> = ({ theme }) => (
    <View style={panel.card}>
        <SectionHeader title="In-Clinic Appointments" accent={theme.primary} />
        {DOCTOR_APPTS.map((a, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: i < DOCTOR_APPTS.length - 1 ? 1 : 0, borderBottomColor: '#F8FAFC' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.pill, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>🏥</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B' }}>{a.name}</Text>
                    <Text style={{ fontSize: 11, color: '#64748B' }}>{a.reason} • {a.time} • {a.room}</Text>
                </View>
                <View style={{ backgroundColor: DOCTOR_APPT_STATUS_COLOR[a.status] + '18', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: DOCTOR_APPT_STATUS_COLOR[a.status] }}>{a.status}</Text>
                </View>
            </View>
        ))}
    </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// MEDICAL STORE OFFLINE PANEL (counter sales)
// ─────────────────────────────────────────────────────────────────────────────
const STORE_SALES: StoreSaleItem[] = [
    { name: 'Rita Joshi', items: 'Paracetamol × 2, Cough Syrup', amount: '₹340', time: '09:00 AM' },
    { name: 'Sunita Reddy', items: 'Prescription — Amoxicillin × 1', amount: '₹120', time: '09:45 AM' },
    { name: 'Karan Mehta', items: 'Insulin, Strips × 50', amount: '₹890', time: '10:15 AM' },
    { name: 'Divya Nair', items: 'Blood Pressure Meds × 2', amount: '₹540', time: '10:50 AM' },
];

const StoreOfflinePanel: React.FC<{ theme: Theme }> = ({ theme }) => (
    <View style={panel.card}>
        <SectionHeader title="Counter Sales Today" accent={theme.primary} />
        {STORE_SALES.map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: i < STORE_SALES.length - 1 ? 1 : 0, borderBottomColor: '#F8FAFC' }}>
                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.pill, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>🛒</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B' }}>{s.name}</Text>
                    <Text style={{ fontSize: 11, color: '#64748B', lineHeight: 15 }}>{s.items}</Text>
                    <Text style={{ fontSize: 10, color: '#94A3B8' }}>{s.time}</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: '800', color: theme.primary }}>{s.amount}</Text>
            </View>
        ))}
    </View>
);

const panel = StyleSheet.create({
    card: {
        backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 14,
        shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
    },
});

// ─────────────────────────────────────────────────────────────────────────────
// DISTRIBUTION (pie-style progress)
// ─────────────────────────────────────────────────────────────────────────────
const DistPanel: React.FC<{ data: PieItem[] }> = ({ data }) => {
    const total = data.reduce((s, d) => s + d.v, 0) || 1;
    return (
        <>
            <View style={{ flexDirection: 'row', height: 10, borderRadius: 5, overflow: 'hidden', gap: 1.5, marginBottom: 10 }}>
                {data.map((d, i) => <View key={i} style={{ flex: d.v, backgroundColor: d.c }} />)}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {data.map((d, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: d.c }} />
                        <Text style={{ fontSize: 10, color: '#64748B' }}>{d.l}</Text>
                    </View>
                ))}
            </View>
            {data.map((d, i) => (
                <ProgressBar key={i} label={d.l} value={d.v} max={total} color={d.c} />
            ))}
        </>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// REPORTS PANEL
// ─────────────────────────────────────────────────────────────────────────────
const REPORT_DOCS = [
    { name: 'Blood Report', size: '5 KB', icon: '🩸', color: '#0EA5E9' },
    { name: 'Heart Report', size: '15 KB', icon: '❤️', color: '#0284C7' },
    { name: 'ECG Report', size: '25 KB', icon: '📈', color: '#38BDF8' },
    { name: 'Check Up Report', size: '10 MB', icon: '📋', color: '#0369A1' },
];
const ReportsPanel: React.FC<{ theme: Theme }> = ({ theme }) => (
    <View style={panel.card}>
        <SectionHeader title="Reports & Documents" accent={theme.primary} />
        {REPORT_DOCS.map((d, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, borderBottomWidth: i < REPORT_DOCS.length - 1 ? 1 : 0, borderBottomColor: '#F8FAFC' }}>
                <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: d.color + '15', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{d.icon}</Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E293B' }}>{d.name}</Text>
                    <Text style={{ fontSize: 11, color: '#94A3B8' }}>{d.size}</Text>
                </View>
                <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EFF8FF', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 13 }}>⬇</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 13 }}>🗑</Text>
                </TouchableOpacity>
            </View>
        ))}
    </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// MODE TOGGLE
// ─────────────────────────────────────────────────────────────────────────────
const ModeToggle: React.FC<{ mode: ServiceMode; onChange: (m: ServiceMode) => void; primary: string }> = ({
    mode, onChange, primary,
}) => (
    // wrap in horizontal scroll to avoid cramped buttons on narrow screens
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 4 }}
    >
        <View style={{ flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 14, padding: 4, gap: 4 }}>
            {MODES.map(m => {
                const active = mode === m;
                return (
                    <TouchableOpacity key={m} onPress={() => onChange(m)} activeOpacity={0.85}
                        style={[
                            {
                                flexShrink: 1,
                                minWidth: 70,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 10,
                            },
                            active && {
                                backgroundColor: primary,
                                shadowColor: primary,
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.3,
                                shadowRadius: 6,
                                elevation: 4,
                            },
                        ]}>
                        <Text style={{ fontSize: 14, marginRight: 2 }}>{MODE_ICONS[m]}</Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ fontSize: 13, color: active ? '#fff' : '#64748B', fontWeight: active ? '700' : '600' }}
                        >
                            {m}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    </ScrollView>
);

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
interface SidebarProps {
    theme: Theme; role: Role; activeNav: NavKey;
    onNav: (k: NavKey) => void; onRoleChange: (r: Role) => void; onClose?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ theme, activeNav, onNav, onClose }) => (<View style={sb.container}>
    {/* Brand */}
    <View style={[sb.brand, { backgroundColor: theme.primary }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>💙</Text>
            </View>
            <View>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: '900' }}>Medicare</Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>Partner Portal</Text>
            </View>
        </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Nav items */}
        <View style={sb.group}>
            <Text style={sb.groupLabel}>NAVIGATION</Text>
            {NAV_ITEMS.map(item => {
                const isActive = activeNav === item.key;
                return (
                    <TouchableOpacity key={item.key} onPress={() => { onNav(item.key); onClose?.(); }}
                        style={[sb.navItem, isActive && { backgroundColor: theme.pill }]}>
                        {isActive && <View style={[sb.activeBar, { backgroundColor: theme.primary }]} />}
                        <View style={[sb.navIcon, isActive && { backgroundColor: theme.primary + '20' }]}>
                            <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                        </View>
                        <Text style={[sb.navLabel, isActive && { color: theme.primary, fontWeight: '800' }]}>{item.label}</Text>
                        {isActive && <Text style={{ color: theme.primary, fontSize: 12, marginLeft: 'auto' }}>›</Text>}
                    </TouchableOpacity>
                );
            })}
        </View>

        <View style={{ height: 20 }} />
    </ScrollView>

    {/* Footer */}
    <View style={[sb.footer, { backgroundColor: theme.pill }]}>
        <Text style={{ fontSize: 28, marginBottom: 6 }}>{theme.icon}</Text>
        <Text style={{ fontSize: 13, fontWeight: '800', color: '#1E293B' }}>Medicare Admin</Text>
        <Text style={{ fontSize: 10, color: '#64748B', textAlign: 'center', marginTop: 2, marginBottom: 10 }}>{theme.facility}</Text>
        <TouchableOpacity style={[sb.logoutBtn, { borderColor: theme.primary + '40' }]}>
            <Text style={{ fontSize: 12, color: theme.secondary, fontWeight: '700' }}>🚪 Logout</Text>
        </TouchableOpacity>
    </View>
</View>
);
const sb = StyleSheet.create({
    container: {
        width: SIDEBAR_W,
        minWidth: 220,
        maxWidth: 320,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#E0F2FE'
    },
    brand: { paddingTop: 18, paddingBottom: 18, paddingHorizontal: 16 },
    group: { paddingHorizontal: 10, paddingTop: 14 },
    groupLabel: { fontSize: 9, fontWeight: '800', color: '#94A3B8', letterSpacing: 1.2, marginBottom: 5, paddingLeft: 10 },
    navItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, marginVertical: 1, position: 'relative' },
    activeBar: { position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 2 },
    navIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    navLabel: { flex: 1, fontSize: 13, color: '#64748B', fontWeight: '600' },
    footer: { margin: 12, borderRadius: 16, padding: 14, alignItems: 'center' },
    logoutBtn: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 7, width: '100%', alignItems: 'center' },
});

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
const ROLE_GREETING: Record<Role, { title: string; subtitle: string }> = {
    Hospital: { title: 'Hospital Dashboard', subtitle: 'Ward beds, surgeries & in-patient overview' },
    Lab: { title: 'Diagnostics Dashboard', subtitle: 'Tests, reports & sample tracking' },
    'Medical Store': { title: 'Pharmacy Dashboard', subtitle: 'Inventory, orders & prescription overview' },
    Doctor: { title: 'Clinic Dashboard', subtitle: 'Consultations, patients & earnings' },
};

const Header: React.FC<{
    theme: Theme; role: Role;
    onMenuPress: () => void; notifCount: number;
}> = ({ theme, role, onMenuPress, notifCount }) => {
    const IS_WIDE = useIsWide();
    const { title, subtitle } = ROLE_GREETING[role];

    return (
        <View style={hd.container}>
            {!IS_WIDE && (
                <TouchableOpacity style={hd.hamburger} onPress={onMenuPress} activeOpacity={0.7}>
                    <View style={hd.hamLine} />
                    <View style={[hd.hamLine, { width: 14 }]} />
                    <View style={hd.hamLine} />
                </TouchableOpacity>
            )}

            <View style={[hd.roleIconWrap, { backgroundColor: theme.pill, borderColor: theme.primary + '40' }]}>
                <Text style={{ fontSize: 22 }}>{theme.icon}</Text>
            </View>

            <View style={hd.titleBlock}>
                <Text style={hd.greeting} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                <Text style={hd.sub} numberOfLines={1} ellipsizeMode="tail">{subtitle}</Text>
            </View>

            <TouchableOpacity style={hd.bellWrap} activeOpacity={0.7}>
                <Text style={{ fontSize: 22 }}>🔔</Text>
                {notifCount > 0 && (
                    <View style={[hd.badge, { backgroundColor: theme.primary }]}>
                        <Text style={{ color: '#fff', fontSize: 8, fontWeight: '900' }}>{notifCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};
const hd = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0F2FE',
        zIndex: 50,
    },
    hamburger: { gap: 4, padding: 4, flexShrink: 0 },
    hamLine: { width: 20, height: 2.5, backgroundColor: '#1E293B', borderRadius: 2 },
    roleIconWrap: {
        width: 44, height: 44, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, flexShrink: 0,
    },
    titleBlock: { flex: 1, minWidth: 0 },
    greeting: { fontSize: 16, fontWeight: '900', color: '#1E293B' },
    sub: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
    bellWrap: { position: 'relative', padding: 4, flexShrink: 0 },
    badge: {
        position: 'absolute', top: 2, right: 2,
        width: 15, height: 15, borderRadius: 8,
        alignItems: 'center', justifyContent: 'center',
    },
});

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD CONTENT
// ─────────────────────────────────────────────────────────────────────────────
const DashboardContent: React.FC<{ role: Role; mode: ServiceMode; period: Period; theme: Theme }> = ({
    role, mode, period, theme,
}) => {
    const stats = useMemo(() => getStats(role, mode), [role, mode]);
    const barData = useMemo(() => makeBarData(period), [period]);
    const pieData = useMemo(() => getPieData(role, mode), [role, mode]);
    const trackingOrders = useMemo(() => getTrackingOrders(role), [role]);
    const alerts = useMemo(() => getAlerts(role), [role]);

    const showTracking = mode === 'Online' && role !== 'Hospital';
    const showOfflineQueue = mode === 'Offline' || mode === 'Both';

    const trackingLabel: Partial<Record<Role, string>> = {
        Lab: '🏠 Home Pickup Tracking',
        'Medical Store': '🚚 Delivery Tracking',
        Doctor: '💻 Consultation Tracking',
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#50dded' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 40 }}>

            {/* Stats grid */}
            <View
                style={{
                    flexDirection: 'column',
                    gap: 10,
                    width: '100%'
                }}
            >
                {stats.map((card, i) => (
                    <StatCardView key={i} card={card} />
                ))}
            </View>

            {/* Online tracking */}
            {showTracking && trackingOrders.length > 0 && (
                <View style={{ marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <View style={{ width: 4, height: 18, borderRadius: 2, backgroundColor: theme.primary, marginRight: 10 }} />
                        <Text style={{ flex: 1, fontSize: 14, fontWeight: '800', color: '#1E293B' }}>
                            {trackingLabel[role] ?? 'Live Tracking'}
                        </Text>
                        <View style={{ backgroundColor: theme.pill, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                            <Text style={{ fontSize: 10, fontWeight: '700', color: theme.primary }}>● Live</Text>
                        </View>
                    </View>
                    {trackingOrders.map((o, i) => <TrackingCard key={i} order={o} theme={theme} />)}
                </View>
            )}

            {/* Role-specific offline panels */}
            {showOfflineQueue && role === 'Hospital' && <HospitalOfflinePanel theme={theme} />}
            {showOfflineQueue && role === 'Lab' && <LabOfflinePanel theme={theme} />}
            {showOfflineQueue && role === 'Doctor' && <DoctorOfflinePanel theme={theme} />}
            {showOfflineQueue && role === 'Medical Store' && <StoreOfflinePanel theme={theme} />}

            {/* Both mode: also show tracking below offline */}
            {mode === 'Both' && role !== 'Hospital' && trackingOrders.length > 0 && (
                <View style={{ marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <View style={{ width: 4, height: 18, borderRadius: 2, backgroundColor: theme.primary, marginRight: 10 }} />
                        <Text style={{ flex: 1, fontSize: 14, fontWeight: '800', color: '#1E293B' }}>
                            {trackingLabel[role] ?? 'Online Orders'}
                        </Text>
                    </View>
                    {trackingOrders.map((o, i) => <TrackingCard key={i} order={o} theme={theme} />)}
                </View>
            )}

            {/* Bar chart */}
            <View style={[dc.card, { marginBottom: 14 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <SectionHeader title="Visitors / Volume" accent={theme.primary} />
                    {mode === 'Both' && (
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {[['Online', theme.primary], ['Offline', theme.accent]].map(([l, c]) => (
                                <View key={l} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c }} />
                                    <Text style={{ fontSize: 10, color: '#64748B' }}>{l}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
                <BarChart data={barData} primary={theme.primary} accent={theme.accent} mode={mode} />
            </View>

            {/* Distribution */}
            <View style={[dc.card, { marginBottom: 14 }]}>
                <SectionHeader title="Patient Distribution" accent={theme.primary} />
                <DistPanel data={pieData} />
            </View>

            {/* Success rate */}
            <View style={[dc.card, { alignItems: 'center', marginBottom: 14 }]}>
                <SectionHeader title="Success Rate" accent={theme.accent} />
                <View style={{ width: 88, height: 88, borderRadius: 44, borderWidth: 9, borderColor: theme.primary, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: theme.primary }}>88%</Text>
                </View>
                <View style={{ backgroundColor: theme.pill, borderRadius: 12, padding: 12, width: '100%' }}>
                    <Text style={{ fontSize: 12, fontWeight: '800', color: theme.dark, marginBottom: 4 }}>Patient Success Rate is 88%</Text>
                    <Text style={{ fontSize: 11, color: '#64748B', lineHeight: 17 }}>Based on regulatory inspections and public satisfaction surveys.</Text>
                </View>
            </View>

            {/* Reports */}
            <ReportsPanel theme={theme} />

            {/* Alerts */}
            <View style={dc.card}>
                <SectionHeader title="🚨 Alerts & Notifications" accent="#DC2626" right="View All" />
                {alerts.map((a, i) => <AlertRow key={i} alert={a} />)}
            </View>

        </ScrollView>
    );
};
const dc = StyleSheet.create({
    card: {
        backgroundColor: '#fff', borderRadius: 18, padding: 18,
        shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
    },
});

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
interface Props { initialRole?: Role }

const PartnerDashboard: React.FC<Props> = ({ initialRole = 'Hospital' }) => {
    const getSavedRole = () => {
        const saved = localStorage.getItem("partner_category") as Role | null;
        return saved || initialRole || "Hospital";
    };

    const [role, setRole] = useState<Role>(getSavedRole()); const [mode, setMode] = useState<ServiceMode>('Both');

    useEffect(() => {
        const savedRole = localStorage.getItem("partner_category") as Role | null;
        if (savedRole) {
            setRole(savedRole);
        }
    }, []);
    const [period, setPeriod] = useState<Period>('Weekly');
    const [navKey, setNavKey] = useState<NavKey>('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const IS_WIDE = useIsWide();
    const theme = THEMES[role];

    const openSidebar = useCallback(() => setSidebarOpen(true), []);
    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    const handleRoleChange = useCallback((r: Role) => {
        setRole(r);
        setMode('Both');
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, flexDirection: 'row', backgroundColor: '#F0F9FF' }} edges={['top', 'left', 'right']}>
                <StatusBar />
                {/* Persistent sidebar on wide screens */}
                {IS_WIDE && (
                    <Sidebar theme={theme} role={role} activeNav={navKey} onNav={setNavKey} onRoleChange={handleRoleChange} />
                )}

                {/* Main */}
                <View style={{ flex: 1, minWidth: 0 }}>                    <Header theme={theme} role={role} onMenuPress={openSidebar} notifCount={1} />

                    {/* Sub-bar row 1: Search */}
                    <View style={{
                        backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9, gap: 8, borderWidth: 1, borderColor: '#E0F2FE' }}>
                            <Text style={{ fontSize: 14, color: '#94A3B8' }}>🔍</Text>
                            <TextInput
                                placeholder="Search patients, reports, doctors..."
                                placeholderTextColor="#94A3B8"
                                style={{ flex: 1, fontSize: 13, color: '#1E293B', padding: 0 }}
                            />
                        </View>
                    </View>

                    {/* Sub-bar row 2: Mode toggle + Period pills + Import */}
                    <View style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 16,
                        paddingTop: 6,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0F2FE',
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 8,
                    }}>
                        {/* Mode toggle takes all remaining space */}
                        {role !== 'Hospital' ? (
                            <View style={{ flex: 1, minWidth: 0 }}>                                <ModeToggle mode={mode} onChange={setMode} primary={theme.primary} />
                            </View>
                        ) : (
                            <View style={{ flex: 1, minWidth: 0 }} />
                        )}

                        {/* Period toggle pills — fixed size */}
                        <View style={{ flexDirection: 'row', backgroundColor: '#E0F2FE', borderRadius: 10, padding: 3, gap: 2 }}>
                            {(['Weekly', 'Monthly'] as Period[]).map(p => (
                                <TouchableOpacity
                                    key={p}
                                    onPress={() => setPeriod(p)}
                                    style={{
                                        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
                                        backgroundColor: period === p ? theme.primary : 'transparent',
                                        elevation: period === p ? 3 : 0,
                                    }}>
                                    <Text style={{ fontSize: 11, fontWeight: '700', color: period === p ? '#fff' : '#0284C7' }}>{p}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Import button — fixed size */}
                        <TouchableOpacity style={{ backgroundColor: theme.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>⬆ Import</Text>
                        </TouchableOpacity>
                    </View>

                    <DashboardContent role={role} mode={role === 'Hospital' ? 'Offline' : mode} period={period} theme={theme} />
                </View>

                {/* Mobile overlay */}
                {!IS_WIDE && (
                    <View
                        className={`sidebar-overlay ${sidebarOpen ? 'open' : 'closed'}`}
                        pointerEvents={sidebarOpen ? 'auto' : 'none'}
                    >
                        <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={closeSidebar} activeOpacity={1} />
                    </View>
                )}

                {/* Mobile animated drawer */}
                {!IS_WIDE && (
                    <View
                        className={`sidebar-mobile ${sidebarOpen ? 'open' : 'closed'}`}
                        pointerEvents={sidebarOpen ? 'auto' : 'none'}
                    >
                        <Sidebar theme={theme} role={role} activeNav={navKey} onNav={setNavKey} onRoleChange={handleRoleChange} onClose={closeSidebar} />
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default PartnerDashboard;

// ─────────────────────────────────────────────────────────────────────────────
// NAMED EXPORTS (React Navigation compatible)
// ─────────────────────────────────────────────────────────────────────────────
export const HospitalDashboard = () => <PartnerDashboard initialRole="Hospital" />;
export const LabDashboard = () => <PartnerDashboard initialRole="Lab" />;
export const MedicalStoreDashboard = () => <PartnerDashboard initialRole="Medical Store" />;
export const DoctorDashboard = () => <PartnerDashboard initialRole="Doctor" />;

export type HealthcareCategory = Role;

export const DASHBOARD_ROUTE_MAP: Record<Role, string> = {
    Hospital: 'HospitalDashboard',
    Lab: 'LabDashboard',
    'Medical Store': 'MedicalStoreDashboard',
    Doctor: 'DoctorDashboard',
};

export function navigateToDashboard(
    navigation: { replace: (route: string, params?: object) => void },
    category: Role,
    params?: object,
): void {
    navigation.replace(DASHBOARD_ROUTE_MAP[category], params ?? {});
}