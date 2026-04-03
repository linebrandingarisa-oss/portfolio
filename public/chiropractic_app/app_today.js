// State
let patients = JSON.parse(localStorage.getItem('patients')) || [
    { id: 1000, name: '山田 太郎', phone: '090-1234-5678', lineUrl: '', visitCount: 4, lastVisit: '2026-03-10' },
    { id: 1001, name: '佐藤 花子', phone: '080-9876-5432', lineUrl: '', visitCount: 2, lastVisit: '2026-02-15' },
    { id: 1002, name: '鈴木 一郎', phone: '070-1111-2222', lineUrl: '', visitCount: 1, lastVisit: '2026-03-13' }
];

let visits = JSON.parse(localStorage.getItem('visits')) || [
    { id: 500, patientId: 1000, patientName: '山田 太郎', date: '2026-03-10', menuId: 1, staffId: 1, symptoms: '腰痛の緩和', status: 'completed' },
    { id: 501, patientId: 1001, patientName: '佐藤 花子', date: '2026-02-15', menuId: 2, staffId: 1, symptoms: '肩こり', status: 'completed' },
    { id: 502, patientId: 1002, patientName: '鈴木 一郎', date: '2026-03-13', menuId: 1, staffId: 2, symptoms: '膝の痛み', status: 'completed' }
];

let staff = JSON.parse(localStorage.getItem('staff')) || [
    { id: 1, name: "院長 鈴木", role: "柔道整復師" },
    { id: 2, name: "佐藤", role: "鍼灸師" }
];

let menus = JSON.parse(localStorage.getItem('menus')) || [
    { id: 1, name: "初回整体コース", duration: 60, price: 8800 },
    { id: 2, name: "通常整体", duration: 30, price: 5500 },
    { id: 3, name: "産後骨盤矯正", duration: 45, price: 6600 }
];

let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];

let gmbStats = JSON.parse(localStorage.getItem('gmbStats')) || [];
let marketingGoals = JSON.parse(localStorage.getItem('marketingGoals')) || { searches: 1000, routes: 50, calls: 20 };
let appPasscode = localStorage.getItem('appPasscode') || '';
let isUnlocked = false;

// Passcode Logic
window.handleNumKey = (key) => {
    const dots = document.querySelectorAll('.passcode-dot');
    const currentInput = Array.from(dots).map(d => d.value).join('').replace(/\s/g, '');
    
    if (key === 'C') {
        dots.forEach(d => { d.value = ''; d.classList.remove('active'); });
        return;
    }
    
    if (currentInput.length < 4) {
        const nextIdx = currentInput.length;
        dots[nextIdx].value = key;
        dots[nextIdx].classList.add('active');
    }
    
    // Auto submit on 4th digit
    if (currentInput.length + 1 === 4 && key !== 'C') {
        setTimeout(handlePasscodeSubmit, 300);
    }
};

window.handlePasscodeSubmit = () => {
    const dots = document.querySelectorAll('.passcode-dot');
    const input = Array.from(dots).map(d => d.value).join('');
    
    if (input === appPasscode) {
        isUnlocked = true;
        document.getElementById('passcode-overlay').style.display = 'none';
        refreshAll();
    } else {
        alert('パスコードが正しくありません');
        window.handleNumKey('C');
    }
};

// Constants
const CHURN_DAYS = 30;

// DOM Elements
const totalPatientsEl = document.getElementById('total-patients');
const todayVisitsEl = document.getElementById('today-visits');
const churnRiskCountEl = document.getElementById('churn-risk-count');
const recentPatientsTbody = document.getElementById('recent-patients-tbody');
const todayVisitorsTbody = document.getElementById('today-visitors-tbody');
const allPatientsTbody = document.getElementById('all-patients-tbody');
const visitHistoryTbody = document.getElementById('visit-history-tbody');
const reactivationTbody = document.getElementById('reactivation-tbody');
const reactivationCountEl = document.getElementById('reactivation-count');
const waitingListTbody = document.getElementById('waiting-list-tbody');
const staffListTbody = document.getElementById('staff-list-tbody');
const menuListTbody = document.getElementById('menu-list-tbody');
const calendarGridEl = document.getElementById('calendar-grid');
const reviewTbody = document.getElementById('review-tbody');
const reviewCountEl = document.getElementById('review-count');
const statsRevenueEl = document.getElementById('stats-revenue');
const statsSystemRevenueEl = document.getElementById('stats-system-revenue');
const marketingForm = document.getElementById('marketing-stats-form');
const marketingHistoryTbody = document.getElementById('marketing-history-tbody');

// Forms & Modals
const patientModal = document.getElementById('patient-modal');
const visitModal = document.getElementById('visit-modal');
const patientForm = document.getElementById('patient-form');
const visitForm = document.getElementById('visit-form');
const syncModal = document.getElementById('sync-modal');
const syncForm = document.getElementById('sync-form');
const gasUrlInput = document.getElementById('gas-url');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    console.log("---v3.1--- Initializing...");
    
    // Check Passcode
    if (appPasscode && !isUnlocked) {
        document.getElementById('passcode-overlay').style.display = 'flex';
    } else {
        document.getElementById('passcode-overlay').style.display = 'none';
        isUnlocked = true;
    }

    setupNavigation();
    setupEventListeners();
    setupMarketingHandlers();
    if (isUnlocked) refreshAll();
    checkAutoSync();
}

function refreshAll() {
    updateDashboard();
    renderPatients();
    renderVisits();
    renderReactivation();
    renderStaff();
    renderMenus();
    renderWaitingList();
    renderCalendar();
    renderMarketing();
    renderAnalytics();
    renderReviewFollowUp();
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = item.dataset.view;
            
            navItems.forEach(n => n.classList.toggle('active', n === item));
            views.forEach(v => v.classList.toggle('active', v.id === `${targetView}-view`));
        });
    });

    document.getElementById('view-all-patients-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('[data-view="patients"]').click();
    });
}

window.setTab = (tabId) => {
    const navItem = document.querySelector(`.nav-item[data-view="${tabId}"]`);
    if (navItem) navItem.click();
};

// Stats & Dashboard
function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const riskPatients = patients.filter(p => isAtRisk(p.lastVisit));
    
    totalPatientsEl.textContent = patients.length;
    
    const todayVisits = visits.filter(v => v.date === today);
    const remainingVisits = todayVisits.filter(v => v.status === 'scheduled' || !v.status);
    
    todayVisitsEl.textContent = `あと ${remainingVisits.length}名 / 全 ${todayVisits.length}名`;
    churnRiskCountEl.textContent = riskPatients.length;

    // Today's Visitors logic (To-do style: hide completed/cancelled)
    if (remainingVisits.length === 0) {
        todayVisitorsTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-light); padding:32px;">予定されている来院はありません</td></tr>';
    } else {
        todayVisitorsTbody.innerHTML = remainingVisits.map(v => {
            const p = patients.find(p => p.id === v.patientId) || { phone: '-', name: v.patientName, visitCount: 0 };
            const ltv = calculateLTV(v.patientId);
            const isVIP = ltv >= 50000;
            return `
                <tr>
                    <td><strong>${v.time || '--:--'}</strong></td>
                    <td>
                        <strong>${v.patientName}</strong>
                        ${isVIP ? '<span class="badge badge-vip" style="padding:2px 6px; font-size:10px; margin-left:5px;">VIP</span>' : ''}
                    </td>
                    <td>${p.phone}</td>
                    <td>${v.symptoms}</td>
                    <td style="text-align:center;"><span class="badge badge-active">${p.visitCount || 0}回</span></td>
                    <td><span class="badge badge-active">予定</span></td>
                    <td>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <input type="checkbox" 
                                   class="status-checkbox" 
                                   onchange="handleUpdateVisitStatus(${v.id}, 'completed')"
                                   title="施術完了にする">
                            <button class="btn btn-icon" title="編集" onclick="openEditVisitModal(${v.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-icon" title="削除" onclick="handleDeleteVisit(${v.id})"><i class="fas fa-trash-alt" style="color:var(--danger)"></i></button>
                            <button class="btn btn-icon" title="LINEで送信" onclick="handleLineSend('${v.patientName}')"><i class="fab fa-line" style="color:#06C755"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Recent Patients (Last 10 visits - including completed)
    const recentVisits = [...visits].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
    recentPatientsTbody.innerHTML = recentVisits.map(v => {
        const p = patients.find(p => p.id === v.patientId) || { id: '-', phone: '-', name: v.patientName, visitCount: 0 };
        const ltv = calculateLTV(v.patientId);
        const isVIP = ltv >= 50000;
        return `
            <tr>
                <td>#${p.id}</td>
                <td>
                    <strong>${v.patientName}</strong>
                    ${isVIP ? '<span class="badge badge-vip" style="padding:2px 6px; font-size:10px; margin-left:5px;">VIP</span>' : ''}
                </td>
                <td>${p.phone}</td>
                <td>${v.date}</td>
                <td style="text-align:center;"><span class="badge badge-active">${p.visitCount || 0}回</span></td>
                <td><span class="badge ${v.status === 'completed' ? 'badge-completed' : (v.status === 'cancelled' ? 'badge-cancelled' : 'badge-active')}">${v.status === 'completed' ? '完了' : (v.status === 'cancelled' ? '取消' : '予定')}</span></td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <input type="checkbox" 
                               class="status-checkbox" 
                               ${v.status === 'completed' ? 'checked' : ''} 
                               onchange="handleUpdateVisitStatus(${v.id}, this.checked ? 'completed' : 'scheduled')">
                        <button class="btn btn-icon" title="編集" onclick="openEditVisitModal(${v.id})"><i class="fas fa-edit"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderReactivation() {
    const today = new Date();
    const targetPatients = patients.filter(p => {
        if (!p.lastVisit || p.lastVisit === '-') return false;
        const daysSinceVisit = Math.floor((today - new Date(p.lastVisit)) / (1000 * 60 * 60 * 24));
        
        // 30日以上経過しており、且つ14日以内にフォローしていない人
        const daysSinceFollowUp = p.lastFollowUp ? Math.floor((today - new Date(p.lastFollowUp)) / (1000 * 60 * 60 * 24)) : 999;
        
        return daysSinceVisit >= CHURN_DAYS && daysSinceFollowUp >= 14;
    });

    reactivationCountEl.textContent = `${targetPatients.length}名がフォロー対象`;

    if (targetPatients.length === 0) {
        reactivationTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-light); padding:32px;">フォローが必要な患者はいません</td></tr>';
        return;
    }

    reactivationTbody.innerHTML = targetPatients.map(p => {
        const daysSinceVisit = Math.floor((today - new Date(p.lastVisit)) / (1000 * 60 * 60 * 24));
        const lastFollowUpStr = p.lastFollowUp ? p.lastFollowUp : '未実施';
        
        return `
            <tr>
                <td><strong>${p.name}</strong></td>
                <td>${daysSinceVisit}日経過</td>
                <td>${lastFollowUpStr}</td>
                <td><span class="badge badge-risk">${daysSinceVisit >= 90 ? '超休眠' : (daysSinceVisit >= 60 ? '休眠' : '離脱注意')}</span></td>
                <td>
                    <button class="btn btn-primary" style="font-size:12px; padding:6px 12px;" onclick="handleReactivationFollowUp(${p.id}, ${daysSinceVisit})">
                        <i class="fab fa-line"></i> LINEを送る
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function isAtRisk(lastVisit) {
    if (!lastVisit || lastVisit === '-') return true;
    const diff = (new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24);
    return diff > CHURN_DAYS;
}

// Render Lists
function renderPatients() {
    if (!allPatientsTbody) return;
    
    const searchInput = document.getElementById('patient-search');
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    let filteredList = patients;

    if (query) {
        if (query === "vip" || query === "vip顧客") {
            const patientLtv = patients.map(p => ({ ...p, ltv: calculateLTV(p.id) })).sort((a,b) => b.ltv - a.ltv);
            const threshold = Math.ceil(patients.length * 0.2);
            const vipIds = patientLtv.slice(0, threshold).filter(p => p.ltv > 0).map(p => p.id);
            filteredList = patients.filter(p => vipIds.includes(p.id));
        } else if (query === "休眠" || query === "休眠リスク" || query === "離脱予備軍") {
             const thirtyDaysAgo = new Date();
             thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
             const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
             filteredList = patients.filter(p => {
                 const pVisits = visits.filter(v => v.patientId === p.id && v.status === 'completed');
                 if (pVisits.length === 0) return false;
                 const lastVisitDate = pVisits.sort((a, b) => b.date.localeCompare(a.date))[0].date;
                 return lastVisitDate < thirtyDaysAgoStr;
             });
        } else if (query === "予約制限" || query === "予約制限候補") {
            filteredList = patients.filter(p => isConsecutiveCanceller(p.id));
        } else {
            filteredList = patients.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.phone.includes(query) || 
                (p.id + "").includes(query)
            );
        }
    }
    
    if (filteredList.length === 0) {
        allPatientsTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-light); padding:32px;">該当する患者は見つかりませんでした</td></tr>';
        return;
    }

    allPatientsTbody.innerHTML = filteredList.map(p => {
        const ltv = calculateLTV(p.id);
        const isVIP = ltv >= 50000;
        const isRisk = isConsecutiveCanceller(p.id);
        
        return `
            <tr>
                <td>#${p.id}</td>
                <td>
                    <strong>${p.name}</strong>
                    ${isVIP ? '<span class="badge badge-vip" style="padding:2px 6px; font-size:10px; margin-left:5px;">VIP</span>' : ''}
                    ${isRisk ? `
                        <span class="badge" style="background:#f3f4f6; color:#6b7280; border:1px solid #d1d5db; padding:2px 6px; font-size:10px; margin-left:5px; cursor:help;" title="3回連続キャンセル中" onclick="handleResetCancellations(${p.id})">
                            <i class="fas fa-exclamation-triangle" style="color:#ef4444; margin-right:3px;"></i>要確認
                        </span>
                    ` : ''}
                </td>
                <td>${p.phone}</td>
                <td><span class="badge-active" style="padding:2px 6px; border-radius:4px; font-size:11px;">${p.source || '不明'}</span></td>
                <td style="text-align:center;"><span class="badge badge-active">${p.visitCount || 0}回</span></td>
                <td style="font-weight:600;">¥${ltv.toLocaleString()}</td>
                <td>
                    <button class="btn btn-icon" title="写真分析" onclick="openVisualProofModal(${p.id})"><i class="fas fa-camera"></i></button>
                    <button class="btn btn-icon" title="記録追加" onclick="openVisitModal(${p.id})"><i class="fas fa-notes-medical"></i></button>
                    <button class="btn btn-icon" title="編集" onclick="openEditPatientModal(${p.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon" title="LINEで送信" onclick="handleLineSend('${p.name}')"><i class="fab fa-line" style="color:#06C755"></i></button>
                    <button class="btn btn-icon" title="電話をかける" onclick="handleCall('${p.phone}')"><i class="fas fa-phone-alt" style="color:#3b82f6"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

window.handlePatientSearch = (query) => {
    // Just trigger re-render, query is already in input
    renderPatients();
};

function calculateLTV(pId) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    return visits
        .filter(v => v.patientId === pId && new Date(v.date) >= oneYearAgo && v.status === 'completed')
        .reduce((sum, v) => {
            const menu = menus.find(m => m.id === v.menuId);
            return sum + (menu ? menu.price : 0);
        }, 0);
}
function renderVisits() {
    if (!visitHistoryTbody) return;
    const sortedVisits = [...visits].sort((a, b) => new Date(b.date) - new Date(a.date));
    visitHistoryTbody.innerHTML = sortedVisits.map(v => `
        <tr>
            <td>${v.time || '--:--'}</td>
            <td><strong>${v.patientName}</strong></td>
            <td>${v.date}</td>
            <td>${v.symptoms}</td>
            <td><span class="badge ${v.status === 'completed' ? 'badge-completed' : (v.status === 'cancelled' ? 'badge-cancelled' : 'badge-active')}">${v.status === 'completed' ? '完了' : (v.status === 'cancelled' ? '取消' : '予定')}</span></td>
            <td>
                <div style="display:flex; align-items:center; gap:8px;">
                    <input type="checkbox" 
                           class="status-checkbox" 
                           ${v.status === 'completed' ? 'checked' : ''} 
                           onchange="handleUpdateVisitStatus(${v.id}, this.checked ? 'completed' : 'scheduled')">
                    <button class="btn btn-icon" title="編集" onclick="openEditVisitModal(${v.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon" title="削除" onclick="handleDeleteVisit(${v.id})"><i class="fas fa-trash-alt" style="color:var(--danger)"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderStaff() {
    if (!staffListTbody) return;
    staffListTbody.innerHTML = staff.map(s => `
        <tr>
            <td>#${s.id}</td>
            <td><strong>${s.name}</strong></td>
            <td>${s.role}</td>
            <td>
                <button class="btn btn-icon" title="編集" onclick="openEditStaffModal(${s.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-icon" title="削除" style="color:var(--danger)" onclick="handleDeleteStaff(${s.id})"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderMenus() {
    if (!menuListTbody) return;
    menuListTbody.innerHTML = menus.map(m => `
        <tr>
            <td>#${m.id}</td>
            <td><strong>${m.name}</strong></td>
            <td>${m.duration}分</td>
            <td>¥${m.price.toLocaleString()}</td>
            <td>
                <button class="btn btn-icon" title="編集" onclick="openEditMenuModal(${m.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-icon" title="削除" style="color:var(--danger)" onclick="handleDeleteMenu(${m.id})"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderWaitingList() {
    if (!waitingListTbody) return;
    if (waitingList.length === 0) {
        waitingListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-light); padding:32px;">キャンセル待ちはありません</td></tr>';
        return;
    }
    waitingListTbody.innerHTML = waitingList.map(w => {
        const p = patients.find(p => p.id === w.patientId);
        return `
            <tr>
                <td><strong>${p ? p.name : '不明'}</strong></td>
                <td>${w.preferredDate}</td>
                <td>${w.preferredTime}</td>
                <td>${w.createdAt}</td>
                <td>
                    <button class="btn btn-icon" title="削除" style="color:var(--danger)" onclick="handleDeleteWaiting(${w.id})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}


window.handleReviewFollowUp = (pId) => {
    const p = patients.find(x => x.id === pId);
    const msg = `${p.name}様、お世話になっております。本日の施術はいかがでしたか？\nもしよろしければ、今後の励みになりますのでこちらから口コミをご記入いただけますと幸いです！\n\n★口コミはこちら：https://g.page/r/YOUR_ID/review\n\n※このメッセージは施術後に自動で案内しております。`;
    
    if (confirm(`以下の内容で口コミ依頼を送りますか？\n\n${msg}`)) {
        p.lastReviewRequest = new Date().toISOString().split('T')[0];
        saveData();
        refreshAll();
        
        const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
        window.open(lineUrl, '_blank');
    }
};

function renderCalendar() {
    if (!calendarGridEl) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let html = '';
    // Days of week header
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    days.forEach(d => html += `<div class="calendar-day-header">${d}</div>`);
    
    // Padding for first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        html += `<div class="calendar-day other-month"></div>`;
    }
    
    // Days of month
    for (let d = 1; d <= lastDay.getDate(); d++) {
        const isToday = d === today.getDate() ? 'today' : '';
        const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayAppts = visits.filter(v => v.date === dayStr).sort((a,b) => (a.time || '').localeCompare(b.time || ''));
        
        html += `
            <div class="calendar-day ${isToday}" onclick="handleCalendarDateClick('${dayStr}')">
                <div style="font-weight:600; margin-bottom:8px;">${d}</div>
                <div class="calendar-appt-container">
                    ${dayAppts.map(a => {
                        const statusSymbol = a.status === 'completed' ? '〇' : (a.status === 'cancelled' ? 'CXL' : '');
                        const statusClass = a.status === 'completed' ? 'is-completed' : (a.status === 'cancelled' ? 'is-cancelled' : '');
                        return `
                        <div class="appt-pill ${statusClass}" onclick="event.stopPropagation(); openEditVisitModal(${a.id})">
                            <span class="appt-status" style="font-size: 9px; font-weight: 800; margin-right: 4px;">${statusSymbol}</span>
                            <span class="appt-time">${a.time || '--:--'}</span>
                            <span class="appt-name">${a.patientName || (patients.find(p => p.id === a.patientId)?.name) || '不明'}</span>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    calendarGridEl.innerHTML = html;
}

window.handleCalendarDateClick = (date) => {
    openVisitModal(null, date);
};

// Modals
function setupEventListeners() {
    document.getElementById('add-patient-btn').addEventListener('click', () => {
        document.getElementById('patient-modal-title').textContent = '新規患者追加';
        document.getElementById('edit-patient-id').value = '';
        patientForm.reset();
        patientModal.classList.add('active');
    });


    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('edit-patient-id').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const source = document.getElementById('patient-source').value;
        const lineUrl = document.getElementById('line_url').value;

        if (editId) {
            const p = patients.find(x => x.id === parseInt(editId));
            if (p) { 
                p.name = name; 
                p.phone = phone; 
                p.source = source;
                p.lineUrl = lineUrl; 
            }
        } else {
            patients.push({
                id: patients.length > 0 ? Math.max(...patients.map(x => x.id)) + 1 : 1000,
                name, phone, source, lineUrl, visitCount: 0, lastVisit: '-'
            });
        }
        completeAction(patientModal, patientForm);
    });

    visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const hiddenPId = document.getElementById('visit-patient-id').value;
        const selectorPId = document.getElementById('visit-patient-select').value;
        const pId = parseInt(hiddenPId || selectorPId);
        
        if (!pId) {
            alert('患者を選択してください。');
            return;
        }

        const vId = document.getElementById('edit-visit-id').value;
        // Check for cancellation risk only on new visits
        if (!vId && isConsecutiveCanceller(pId)) {
            const confirmRisk = confirm("【警告：予約制限候補】\nこの患者様は3回連続でキャンセルされています。再度予約を受け付ける前に、電話等で確実に来院されるか最終確認を行うことを強く推奨します。\n\n予約を続行しますか？");
            if (!confirmRisk) return;
        }

        let date = document.getElementById('visit-date').value;
        const time = document.getElementById('visit-time').value;
// ... (rest of the handler)
        const menuId = parseInt(document.getElementById('visit-menu').value);
        const staffId = parseInt(document.getElementById('visit-staff').value);
        const symptoms = document.getElementById('symptoms').value;
        const patient = patients.find(p => p.id === pId);

        if (date.length > 10) date = date.substring(0, 10);

        if (vId) {
            const v = visits.find(x => x.id === parseInt(vId));
            if (v) { 
                v.date = date; 
                v.time = time;
                v.menuId = menuId; 
                v.staffId = staffId; 
                v.symptoms = symptoms; 
            }
        } else {
            visits.push({
                id: visits.length > 0 ? Math.max(...visits.map(x => x.id)) + 1 : 500,
                patientId: pId, patientName: patient.name, date, time, menuId, staffId, symptoms,
                status: 'scheduled'
            });
            patient.visitCount = visits.filter(v => v.patientId === pId && v.status === 'completed').length;
        }
        
        if (patient) {
            const pVisits = visits.filter(v => v.patientId === pId);
            if (pVisits.length > 0) {
                patient.lastVisit = pVisits.sort((a,b) => new Date(b.date) - new Date(a.date))[0].date;
            }
        }

        completeAction(visitModal, visitForm);
    });

window.openVisitModal = (pId, date = null) => {
    const selectorGroup = document.getElementById('visit-patient-selector-group');
    const nameDisplay = document.getElementById('visit-patient-name-display');
    const patientSelect = document.getElementById('visit-patient-select');
    const patientNameEl = document.getElementById('visit-patient-name');
    const patientIdInput = document.getElementById('visit-patient-id');
    const dateInput = document.getElementById('visit-date');
    const timeInput = document.getElementById('visit-time');

    // Populate common selects
    const menuSelect = document.getElementById('visit-menu');
    menuSelect.innerHTML = menus.map(m => `<option value="${m.id}">${m.name} (¥${m.price.toLocaleString()})</option>`).join('');
    
    const staffSelect = document.getElementById('visit-staff');
    staffSelect.innerHTML = staff.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    visitForm.reset();
    document.getElementById('edit-visit-id').value = '';
    dateInput.value = date || new Date().toISOString().split('T')[0];
    
    // Set default time to nearest hour or current
    if (!date) {
        const now = new Date();
        timeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    if (pId) {
        // Called from Patient List or Edit
        const patient = patients.find(p => p.id === pId);
        patientIdInput.value = pId;
        patientNameEl.textContent = patient.name;
        selectorGroup.style.display = 'none';
        nameDisplay.style.display = 'block';
        patientSelect.required = false;
    } else {
        // Called from Calendar
        patientIdInput.value = '';
        patientSelect.innerHTML = '<option value="">-- 患者を選択 --</option>' + 
            patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        selectorGroup.style.display = 'block';
        nameDisplay.style.display = 'none';
        patientSelect.required = true;
    }
    
    document.getElementById('visit-modal-title').textContent = '来院記録の追加';
    visitModal.classList.add('active');
};

    document.querySelectorAll('.js-backup-export').forEach((el) => {
        el.addEventListener('click', handleExportData);
    });

    document.getElementById('add-staff-btn').addEventListener('click', openStaffModal);
    document.getElementById('add-menu-btn').addEventListener('click', openMenuModal);

    const staffForm = document.getElementById('staff-form');
    staffForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-staff-id').value;
        const name = document.getElementById('staff-name').value;
        const role = document.getElementById('staff-role').value;

        if (id) {
            const s = staff.find(x => x.id === parseInt(id));
            if (s) { s.name = name; s.role = role; }
        } else {
            staff.push({
                id: staff.length > 0 ? Math.max(...staff.map(x => x.id)) + 1 : 1,
                name, role
            });
        }
        completeAction(document.getElementById('staff-modal'), staffForm);
    });

    const menuForm = document.getElementById('menu-form');
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-menu-id').value;
        const name = document.getElementById('menu-name').value;
        const duration = parseInt(document.getElementById('menu-duration').value);
        const price = parseInt(document.getElementById('menu-price').value);

        if (id) {
            const m = menus.find(x => x.id === parseInt(id));
            if (m) { m.name = name; m.duration = duration; m.price = price; }
        } else {
            menus.push({
                id: menus.length > 0 ? Math.max(...menus.map(x => x.id)) + 1 : 1,
                name, duration, price
            });
        }
        completeAction(document.getElementById('menu-modal'), menuForm);
    });

    document.getElementById('sync-settings-btn').addEventListener('click', () => {
        gasUrlInput.value = localStorage.getItem('gas_url') || '';
        document.getElementById('app-passcode').value = appPasscode || '';
        syncModal.classList.add('active');
    });

    syncForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = gasUrlInput.value;
        const newPasscode = document.getElementById('app-passcode').value;
        
        localStorage.setItem('gas_url', url);
        localStorage.setItem('appPasscode', newPasscode);
        appPasscode = newPasscode;
        
        alert('設定を保存しました。次回起動時から適用されます。');
        syncModal.classList.remove('active');
    });

    document.getElementById('add-waiting-btn').addEventListener('click', openWaitingModal);

    const waitingForm = document.getElementById('waiting-form');
    waitingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pId = parseInt(document.getElementById('waiting-patient').value);
        const date = document.getElementById('waiting-date').value;
        const time = document.getElementById('waiting-time').value;

        waitingList.push({
            id: Date.now(),
            patientId: pId,
            preferredDate: date,
            preferredTime: time,
            createdAt: new Date().toISOString().split('T')[0]
        });

        completeAction(waitingModal, waitingForm);
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            patientModal.classList.remove('active');
            visitModal.classList.remove('active');
            syncModal.classList.remove('active');
            document.getElementById('staff-modal').classList.remove('active');
            document.getElementById('menu-modal').classList.remove('active');
            waitingModal.classList.remove('active');
        });
    });
}

function completeAction(modal, form) {
    saveData();
    refreshAll();
    modal.classList.remove('active');
    form.reset();
}

// Global Handlers

window.openEditPatientModal = (id) => {
    const p = patients.find(x => x.id === id);
    if (!p) return;
    
    document.getElementById('patient-modal-title').textContent = '患者情報の編集';
    document.getElementById('edit-patient-id').value = p.id;
    document.getElementById('name').value = p.name;
    document.getElementById('phone').value = p.phone;
    document.getElementById('patient-source').value = p.source || 'GMB';
    document.getElementById('line_url').value = p.lineUrl || '';
    
    patientModal.classList.add('active');
};

window.openEditVisitModal = (vId) => {
    const v = visits.find(x => x.id === vId);
    if (!v) return;
    
    openVisitModal(v.patientId, v.date);
    document.getElementById('edit-visit-id').value = v.id;
    document.getElementById('visit-time').value = v.time || '';
    document.getElementById('visit-menu').value = v.menuId;
    document.getElementById('visit-staff').value = v.staffId;
    document.getElementById('symptoms').value = v.symptoms;
    document.getElementById('visit-modal-title').textContent = '来院記録の編集';
};

window.handleDeleteVisit = (vId) => {
    if (!confirm('この来院記録を削除しますか？')) return;
    const vIndex = visits.findIndex(x => x.id === vId);
    if (vIndex === -1) return;
    const visit = visits[vIndex];
    const patient = patients.find(p => p.id === visit.patientId);
    
    visits.splice(vIndex, 1);
    if (patient) {
        patient.visitCount = Math.max(0, patient.visitCount - 1);
        const pVisits = visits.filter(v => v.patientId === patient.id);
        patient.lastVisit = pVisits.length > 0 ? pVisits.sort((a,b) => new Date(b.date) - new Date(a.date))[0].date : '-';
    }
    
    saveData();
    refreshAll();
    checkWaitingListForSlot(visit.date);
};

window.handleDeleteWaiting = (id) => {
    if (!confirm('このキャンセル待ち登録を削除しますか？')) return;
    const index = waitingList.findIndex(x => x.id === id);
    if (index !== -1) {
        waitingList.splice(index, 1);
        saveData();
        refreshAll();
    }
};

window.openWaitingModal = () => {
    const patientSelect = document.getElementById('waiting-patient');
    patientSelect.innerHTML = patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    document.getElementById('waiting-date').value = new Date().toISOString().split('T')[0];
    waitingModal.classList.add('active');
};

window.openStaffModal = () => {
    document.getElementById('staff-modal-title').textContent = 'スタッフの追加';
    document.getElementById('edit-staff-id').value = '';
    document.getElementById('staff-form').reset();
    document.getElementById('staff-modal').classList.add('active');
};

window.openEditStaffModal = (id) => {
    const s = staff.find(x => x.id === id);
    if (!s) return;
    document.getElementById('staff-modal-title').textContent = 'スタッフ情報の編集';
    document.getElementById('edit-staff-id').value = s.id;
    document.getElementById('staff-name').value = s.name;
    document.getElementById('staff-role').value = s.role;
    document.getElementById('staff-modal').classList.add('active');
};

window.handleDeleteStaff = (id) => {
    if (!confirm('このスタッフを削除しますか？')) return;
    const index = staff.findIndex(x => x.id === id);
    if (index !== -1) {
        staff.splice(index, 1);
        saveData();
        refreshAll();
    }
};

window.openMenuModal = () => {
    document.getElementById('menu-modal-title').textContent = 'メニューの追加';
    document.getElementById('edit-menu-id').value = '';
    document.getElementById('menu-form').reset();
    document.getElementById('menu-modal').classList.add('active');
};

window.openEditMenuModal = (id) => {
    const m = menus.find(x => x.id === id);
    if (!m) return;
    document.getElementById('menu-modal-title').textContent = 'メニュー情報の編集';
    document.getElementById('edit-menu-id').value = m.id;
    document.getElementById('menu-name').value = m.name;
    document.getElementById('menu-duration').value = m.duration;
    document.getElementById('menu-price').value = m.price;
    document.getElementById('menu-modal').classList.add('active');
};

window.handleDeleteMenu = (id) => {
    if (!confirm('このメニューを削除しますか？')) return;
    const index = menus.findIndex(x => x.id === id);
    if (index !== -1) {
        menus.splice(index, 1);
        saveData();
        refreshAll();
    }
};

function checkWaitingListForSlot(date) {
    if (waitingList.length === 0) return;
    const matches = waitingList.filter(w => w.preferredDate === date);
    if (matches.length > 0) {
        const match = matches[0];
        const p = patients.find(p => p.id === match.patientId);
        if (p && confirm(`【キャンセル空き通知】\n${date}に空きが出ました。キャンセル待ちの${p.name}様にLINEで通知しますか？`)) {
            const msg = `${p.name}様、お世話になっております。ご希望いただいていた${date}にキャンセルによる空きが出ました！先着順となりますので、ご希望の場合はお早めにお返事ください。`;
            const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
            window.open(lineUrl, '_blank');
            const index = waitingList.findIndex(w => w.id === match.id);
            if (index !== -1) waitingList.splice(index, 1);
            saveData();
            refreshAll();
        }
    }
}

window.handleReviewRequest = (name) => {
    const msg = `${name}様、本日はご来院ありがとうございました。今後の励みになりますので、ぜひ口コミへのご協力をお願いします！\nhttps://g.page/r/YOUR_ID/review`;
    if (confirm(`コピーしますか？\n\n${msg}`)) {
        navigator.clipboard.writeText(msg).then(() => {
            alert('コピーしました');
        }).catch(err => {
            alert('コピーに失敗しました。');
        });
    }
};

window.handleLineSend = (name) => {
    const msg = `${name}様、本日はご来院ありがとうございました。今後の励みになりますので、ぜひ口コミへのご協力をお願いします！\nhttps://g.page/r/YOUR_ID/review`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
    window.open(lineUrl, '_blank');
};

window.handleCall = (phone) => {
    if (!phone || phone === '-') {
        alert('電話番号が登録されていません');
        return;
    }
    window.location.href = `tel:${phone}`;
};

window.handleReactivationFollowUp = (pId, days) => {
    const p = patients.find(x => x.id === pId);
    let template = "";
    if (days >= 90) {
        template = `${p.name}様、ご無沙汰しております。お体の調子はいかがでしょうか？\n現在、久しぶりの方限定で【特別再診クーポン】をお送りしています。またお力になれれば幸いです。`;
    } else if (days >= 60) {
        template = `${p.name}様、こんにちは。前回の施術から2ヶ月が経ちましたが、その後お痛みなどは出ていませんか？\nメンテナンスの時期ですので、お気軽にご相談くださいね。`;
    } else {
        template = `${p.name}様、こんにちは！前回の来院から1ヶ月ほど経ちますが、調子はいかがですか？\nまた気になることがあればいつでもご連絡ください！`;
    }
    if (confirm(`以下の内容でLINEを開きますか？\n\n${template}`)) {
        p.lastFollowUp = new Date().toISOString().split('T')[0];
        saveData();
        refreshAll();
        const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(template)}`;
        window.open(lineUrl, '_blank');
    }
};

window.handleExportData = () => {
    const data = {
        patients: patients,
        visits: visits,
        exportDate: new Date().toLocaleString(),
        version: "1.4"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chiropractic_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('バックアップファイルを作成しました。');
};

window.handleCloudSync = async () => {
    const gasUrl = localStorage.getItem('gas_url');
    if (!gasUrl) {
        alert('クラウド同期設定（URL）が未設定です。');
        return;
    }
    const syncBtn = document.getElementById('sync-settings-btn');
    const originalText = syncBtn ? syncBtn.innerHTML : '';
    if (syncBtn) {
        syncBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 同期中...';
        syncBtn.disabled = true;
    }
    try {
        const data = { patients, visits, lastUpdate: new Date().toISOString() };
        await fetch(gasUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        localStorage.setItem('last_cloud_sync', new Date().toISOString().split('T')[0]);
        alert('Googleドライブへの同期を完了しました。');
    } catch (error) {
        console.error('Sync Error:', error);
        alert('同期に失敗しました。');
    } finally {
        if (syncBtn) {
            syncBtn.innerHTML = originalText;
            syncBtn.disabled = false;
        }
    }
};

function checkAutoSync() {
    const gasUrl = localStorage.getItem('gas_url');
    if (!gasUrl) return;
    const lastSync = localStorage.getItem('last_cloud_sync');
    const today = new Date().toISOString().split('T')[0];
    if (lastSync !== today) handleCloudSync();
}

function saveData() {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('visits', JSON.stringify(visits));
    localStorage.setItem('staff', JSON.stringify(staff));
    localStorage.setItem('menus', JSON.stringify(menus));
    localStorage.setItem('waitingList', JSON.stringify(waitingList));
    localStorage.setItem('gmbStats', JSON.stringify(gmbStats));
    localStorage.setItem('marketingGoals', JSON.stringify(marketingGoals));
}

// Global state for Analytics
let currentChartPeriod = 'day';
let currentYearRange = 2;

window.setChartPeriod = (period) => {
    currentChartPeriod = period;
    document.querySelectorAll('.analytics-tab').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${period}'`));
    });
    
    // Show/hide year range selector
    const selector = document.getElementById('year-range-selector');
    if (selector) selector.style.display = period === 'year' ? 'block' : 'none';
    
    renderAnalytics();
};

window.setYearRange = (range) => {
    currentYearRange = parseInt(range);
    renderAnalytics();
};

function renderAnalytics() {
    const statsRevenueEl = document.getElementById('stats-revenue');
    const statsSystemRevenueEl = document.getElementById('stats-system-revenue');
    if (!statsRevenueEl) return;
    
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7);
    let totalRevenue = 0;
    let systemRevenue = 0;
    
    visits.forEach(v => {
        if (v.date.startsWith(currentMonth) && v.status === 'completed') {
            const menu = menus.find(m => m.id === v.menuId);
            const price = menu ? menu.price : 5500;
            totalRevenue += price;
            const p = patients.find(p => p.id === v.patientId);
            if (p && (p.lastFollowUp === v.date || p.lastReviewRequest === v.date)) {
                systemRevenue += price;
            }
        }
    });

    statsRevenueEl.textContent = `¥${totalRevenue.toLocaleString()}`;
    statsSystemRevenueEl.textContent = `¥${systemRevenue.toLocaleString()}`;
    const roi = totalRevenue > 0 ? Math.round((systemRevenue / totalRevenue) * 100) : 0;
    const roiEl = document.getElementById('roi-percentage');
    if (roiEl) roiEl.textContent = `${roi}%`;
    
    // Management Insights logic
    calculateManagementInsights();
    
    renderRevenueChart();
}

function calculateManagementInsights() {
    const vipCountEl = document.getElementById('vip-count');
    const dormantCountEl = document.getElementById('dormant-count');
    const cancelRiskCountEl = document.getElementById('cancel-risk-count');
    if (!vipCountEl || !dormantCountEl || !cancelRiskCountEl) return;

    // Calculate LTV for each patient
    const patientLtv = patients.map(p => {
        const ltv = visits
            .filter(v => v.patientId === p.id && v.status === 'completed')
            .reduce((sum, v) => sum + (menus.find(m => m.id === v.menuId)?.price || 5500), 0);
        return { id: p.id, ltv };
    }).sort((a, b) => b.ltv - a.ltv);

    const vipThreshold = Math.ceil(patients.length * 0.2);
    const vipCount = patientLtv.slice(0, vipThreshold).filter(p => p.ltv > 0).length;
    vipCountEl.textContent = vipCount;

    // Calculate Dormant Patients (No visit in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    const dormantCount = patients.filter(p => {
        const patientVisits = visits.filter(v => v.patientId === p.id && v.status === 'completed');
        if (patientVisits.length === 0) return false;
        const lastVisitDate = patientVisits.sort((a, b) => b.date.localeCompare(a.date))[0].date;
        return lastVisitDate < thirtyDaysAgoStr;
    }).length;
    dormantCountEl.textContent = dormantCount;

    // Calculate Cancellation Risk (3 consecutive cancellations)
    const cancelRiskCount = patients.filter(p => isConsecutiveCanceller(p.id)).length;
    cancelRiskCountEl.textContent = cancelRiskCount;
}

function isConsecutiveCanceller(pId) {
    const pVisits = visits
        .filter(v => v.patientId === pId)
        .sort((a, b) => b.date.localeCompare(a.date));
    
    if (pVisits.length < 3) return false;
    
    // Check top 3 visits
    return pVisits.slice(0, 3).every(v => v.status === 'cancelled');
}

// Global functions for insight clicks
// Insight Click Handlers
window.showCancelRiskList = () => {
    window.setTab('patients');
    const searchInput = document.getElementById('patient-search');
    if (searchInput) {
        searchInput.value = "予約制限候補";
        window.handlePatientSearch("予約制限候補");
    }
};



window.showVipList = () => {
    window.setTab('patients');
    const searchInput = document.getElementById('patient-search');
    if (searchInput) {
        searchInput.value = "VIP顧客";
        window.handlePatientSearch("VIP顧客");
    }
};

window.showDormantList = () => {
    window.setTab('patients');
    const searchInput = document.getElementById('patient-search');
    if (searchInput) {
        searchInput.value = "休眠リスク";
        window.handlePatientSearch("休眠リスク");
    }
};

window.showCancelRiskList = () => {
    window.setTab('patients');
    const searchInput = document.getElementById('patient-search');
    if (searchInput) {
        searchInput.value = "予約制限候補";
        window.handlePatientSearch("予約制限候補");
    }
};

// Visual Proof (Before/After) Logic
let currentProofPatientId = null;
let selectedSlot = 'before';
let visualProofPhotos = JSON.parse(localStorage.getItem('chiropractic_photos')) || [];

window.openVisualProofModal = (pId) => {
    currentProofPatientId = pId;
    const p = patients.find(x => x.id === pId);
    if (!p) return;
    
    document.getElementById('proof-patient-name').textContent = p.name;
    document.getElementById('before-image-container').innerHTML = '<p class="placeholder-text">写真を選択してください</p>';
    document.getElementById('after-image-container').innerHTML = '<p class="placeholder-text">写真を選択してください</p>';
    
    renderPhotoHistory();
    document.getElementById('visual-proof-modal').classList.add('active');
};

window.handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (!files.length) return;
    
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const photoData = {
                id: Date.now() + Math.random(),
                patientId: currentProofPatientId,
                data: e.target.result,
                date: new Date().toISOString().split('T')[0]
            };
            visualProofPhotos.push(photoData);
            savePhotoData();
            renderPhotoHistory();
        };
        reader.readAsDataURL(file);
    }
};

function savePhotoData() {
    try {
        localStorage.setItem('chiropractic_photos', JSON.stringify(visualProofPhotos));
    } catch (e) {
        alert("画像データの保存容量（ブラウザ制限）に達しました。古い画像を削除するか、クラウド同期を検討してください。");
    }
}

function renderPhotoHistory() {
    const listEl = document.getElementById('photo-history-list');
    const pPhotos = visualProofPhotos.filter(ph => ph.patientId === currentProofPatientId);
    
    listEl.innerHTML = pPhotos.map(ph => `
        <div class="photo-item" onclick="selectPhotoForSlot('${ph.id}')">
            <img src="${ph.data}" alt="Photo">
            <div style="position:absolute; bottom:0; width:100%; background:rgba(0,0,0,0.5); color:white; font-size:9px; padding:2px; text-align:center;">
                ${ph.date}
            </div>
            <button onclick="event.stopPropagation(); deletePhoto('${ph.id}')" style="position:absolute; top:2px; right:2px; background:rgba(239, 68, 68, 0.8); border:none; color:white; border-radius:50%; width:18px; height:18px; font-size:10px; cursor:pointer;">&times;</button>
        </div>
    `).reverse().join('');
}

window.selectPhotoForSlot = (photoId) => {
    const ph = visualProofPhotos.find(p => p.id == photoId);
    if (!ph) return;
    
    const containerId = selectedSlot === 'before' ? 'before-image-container' : 'after-image-container';
    document.getElementById(containerId).innerHTML = `<img src="${ph.data}" style="max-width:100%; max-height:100%; object-fit:contain;">`;
    
    // Toggle slot for next pick
    selectedSlot = selectedSlot === 'before' ? 'after' : 'before';
    updateSlotUI();
};

window.selectSlot = (slot) => {
    selectedSlot = slot;
    updateSlotUI();
};

function updateSlotUI() {
    document.getElementById('before-slot').classList.toggle('active', selectedSlot === 'before');
    document.getElementById('after-slot').classList.toggle('active', selectedSlot === 'after');
}

window.togglePosturalGrid = () => {
    const show = document.getElementById('toggle-grid').checked;
    document.getElementById('global-grid').style.display = show ? 'block' : 'none';
};

window.setComparisonMode = (mode) => {
    const area = document.getElementById('comparison-view-area');
    const tabs = document.querySelectorAll('.comp-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    if (mode === 'overlay') {
        area.style.flexDirection = 'column';
        area.style.gap = '0';
        document.getElementById('after-slot').style.position = 'absolute';
        document.getElementById('after-slot').style.top = '0';
        document.getElementById('after-slot').style.left = '0';
        document.getElementById('after-slot').style.width = '100%';
        document.getElementById('after-slot').style.height = '100%';
        document.getElementById('after-slot').style.opacity = '0.5';
        document.getElementById('after-slot').style.zIndex = '5';
    } else {
        area.style.flexDirection = 'row';
        area.style.gap = '8px';
        document.getElementById('after-slot').style.position = 'relative';
        document.getElementById('after-slot').style.opacity = '1';
        document.getElementById('after-slot').style.width = 'auto';
        document.getElementById('after-slot').style.height = 'auto';
    }
};

window.deletePhoto = (photoId) => {
    if (confirm("この写真を削除しますか？")) {
        visualProofPhotos = visualProofPhotos.filter(p => p.id != photoId);
        savePhotoData();
        renderPhotoHistory();
    }
};

window.generateSharedImage = () => {
    alert("このデモ版ではLINE用の合成画像はシミュレーションのみ可能です。\n実機ではHTML5 Canvasを使用してBefore/Afterを1枚の画像に統合し、LINEアプリへ自動転送する機能を構築します。");
};

window.handleResetCancellations = (pId) => {
    const p = patients.find(x => x.id === pId);
    if (!p) return;
    
    if (confirm(`${p.name}様のキャンセル記録をリセットし、予約制限を解除しますか？\n（直接お話しして来院意思が確認できた場合などに使用してください）`)) {
        const pVisits = visits
            .filter(v => v.patientId === pId && v.status === 'cancelled')
            .sort((a, b) => b.date.localeCompare(a.date));
        
        if (pVisits.length > 0) {
            pVisits[0].status = 'completed'; // Break the chain
            pVisits[0].symptoms += " (制限解除: 意思確認済み)";
        }
        
        saveData();
        refreshAll();
        alert("制限を解除しました。");
    }
};


function renderRevenueChart() {
    const chartContainer = document.getElementById('revenue-chart');
    const yAxisContainer = document.getElementById('y-axis-labels');
    const legendContainer = document.getElementById('chart-legend');
    if (!chartContainer || !yAxisContainer) return;

    const today = new Date();
    // Colors for different years (modern palette)
    const yearColors = ["var(--accent-blue)", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#6366f1"];
    
    let dataset = []; // Array of { label, values: [ { year, val } ] }
    let title = "";

    if (currentChartPeriod === 'day') {
        const monthStr = today.toISOString().slice(0, 7);
        const [year, month] = monthStr.split('-').map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();
        if (legendContainer) legendContainer.style.display = 'none';
        
        const dayData = new Array(daysInMonth).fill(0);
        visits.forEach(v => {
            if (v.date.startsWith(monthStr) && v.status === 'completed') {
                const day = parseInt(v.date.split('-')[2]);
                const price = menus.find(m => m.id === v.menuId)?.price || 5500;
                dayData[day - 1] += price;
            }
        });
        
        dataset = dayData.map((val, i) => ({
            label: i + 1,
            bars: [{ val, color: yearColors[0], year: year }]
        }));
    } else if (currentChartPeriod === 'month') {
        if (legendContainer) legendContainer.style.display = 'none';
        const currentYear = today.getFullYear();
        const monthData = new Array(12).fill(0);
        visits.forEach(v => {
            const [vYear, vMonth] = v.date.split('-').map(Number);
            if (vYear === currentYear && v.status === 'completed') {
                const price = menus.find(m => m.id === v.menuId)?.price || 5500;
                monthData[vMonth - 1] += price;
            }
        });
        
        dataset = monthData.map((val, i) => ({
            label: (i + 1) + "月",
            bars: [{ val, color: yearColors[0], year: currentYear }]
        }));
    } else {
        // YoY Comparison Mode
        const startYear = today.getFullYear(); 
        const endYear = startYear + currentYearRange - 1;
        const years = [];
        for (let y = startYear; y <= endYear; y++) years.push(y);
        
        if (legendContainer) {
            legendContainer.style.display = 'flex';
            legendContainer.innerHTML = years.map((y, i) => `
                <div style="display:flex; align-items:center; gap:6px;">
                    <div style="width:12px; height:12px; border-radius:3px; background:${yearColors[i % yearColors.length]};"></div>
                    <span>${y}年</span>
                </div>
            `).join('');
        }

        dataset = Array.from({length: 12}, (_, mIdx) => ({
            label: (mIdx + 1) + "月",
            bars: years.map((year, yIdx) => {
                let total = 0;
                visits.forEach(v => {
                    const [vYear, vMonth] = v.date.split('-').map(Number);
                    if (vYear === year && vMonth === (mIdx + 1) && v.status === 'completed') {
                        total += (menus.find(m => m.id === v.menuId)?.price || 5500);
                    }
                });
                return { val: total, color: yearColors[yIdx % yearColors.length], year: year };
            })
        }));
    }

    // Dynamic Y-Axis scale
    const allValues = dataset.flatMap(d => d.bars.map(b => b.val));
    const maxVal = Math.max(...allValues, 10000); 
    
    let step;
    let numSteps = 10;
    if (maxVal <= 50000) { step = 10000; numSteps = 5; }
    else if (maxVal <= 100000) { step = 20000; numSteps = 5; }
    else if (maxVal <= 500000) { step = 50000; numSteps = 10; }
    else { step = 100000; numSteps = 10; }

    const finalMax = Math.ceil(maxVal * 1.2 / step) * step;

    // Update Y-Axis UI
    let yLabelsHtml = "";
    for (let i = 0; i <= numSteps; i++) {
        const val = Math.round(i * (finalMax / numSteps));
        let labelText;
        if (val === 0) labelText = "0";
        else if (val < 10000) labelText = (val / 1000).toFixed(1) + "k";
        else if (val < 1000000) labelText = (val / 10000) + "万";
        else labelText = (val / 1000000).toFixed(1) + "M";
        yLabelsHtml += `<span>${labelText}</span>`;
    }
    yAxisContainer.innerHTML = yLabelsHtml;

    // Render Bars
    chartContainer.innerHTML = dataset.map(d => {
        const barsHtml = d.bars.map(b => {
            const height = (b.val / finalMax) * 100;
            return `
                <div class="bar-body" style="height: ${height}%; background: ${b.color};" title="${b.year}年: ¥${b.val.toLocaleString()}">
                    <div class="bar-total">¥${b.val.toLocaleString()}</div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="bar-group">
                <div class="bar-container">${barsHtml}</div>
                <div class="bar-label">${d.label}</div>
            </div>
        `;
    }).join('');
}

function renderReviewFollowUp() {
    if (!reviewTbody) return;
    const today = new Date().toISOString().split('T')[0];
    const targetPatients = patients.filter(p => {
        const visitToday = visits.find(v => v.patientId === p.id && v.date === today);
        return (visitToday && p.lastReviewRequest !== today);
    });
    reviewCountEl.textContent = `${targetPatients.length}件`;
    if (targetPatients.length === 0) {
        reviewTbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-light); padding:32px;">対象の患者はいません</td></tr>';
        return;
    }
    reviewTbody.innerHTML = targetPatients.map(p => {
        const visitToday = visits.find(v => v.patientId === p.id && v.date === today);
        const sName = staff.find(s => s.id === visitToday.staffId)?.name || '-';
        const mName = menus.find(m => m.id === visitToday.menuId)?.name || '-';
        return `<tr><td><strong>${p.name}</strong></td><td>${sName}</td><td>${mName}</td><td><button class="btn btn-primary" onclick="handleReviewFollowUp(${p.id})"><i class="fab fa-line"></i> 口コミ依頼</button></td></tr>`;
    }).join('');
}

function renderMarketing() {
    if (!marketingHistoryTbody) return;
    
    if (gmbStats.length === 0) {
        marketingHistoryTbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-light); padding:24px;">統計データはまだありません</td></tr>';
        return;
    }

    const sortedStats = [...gmbStats].sort((a, b) => b.date.localeCompare(a.date));
    marketingHistoryTbody.innerHTML = sortedStats.map(s => {
        const cvr = s.searches > 0 ? ((s.calls / s.searches) * 100).toFixed(1) : '0';
        return `
            <tr>
                <td><strong>${s.date}</strong></td>
                <td>${s.searches.toLocaleString()}</td>
                <td>${s.routes.toLocaleString()}</td>
                <td>${s.calls.toLocaleString()}</td>
                <td>${s.reviews.toLocaleString()}</td>
                <td><span class="badge badge-active">${cvr}%</span></td>
            </tr>
        `;
    }).join('');
}

function setupMarketingHandlers() {
    if (!marketingForm) return;

    const monthInput = document.getElementById('gmb-month');
    const searchesInput = document.getElementById('gmb-searches');
    const routesInput = document.getElementById('gmb-routes');
    const callsInput = document.getElementById('gmb-calls');
    const reviewsInput = document.getElementById('gmb-reviews');

    // Default to current month
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    monthInput.value = currentMonth;

    // Load data when month changes
    const loadMonthData = () => {
        const selectedMonth = monthInput.value;
        const stats = gmbStats.find(s => s.date === selectedMonth);
        if (stats) {
            searchesInput.value = stats.searches;
            routesInput.value = stats.routes;
            callsInput.value = stats.calls;
            reviewsInput.value = stats.reviews;
        } else {
            searchesInput.value = '';
            routesInput.value = '';
            callsInput.value = '';
            reviewsInput.value = '';
        }
    };

    monthInput.addEventListener('change', loadMonthData);
    loadMonthData(); // Initial load

    marketingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const month = monthInput.value;
        const searches = parseInt(searchesInput.value) || 0;
        const routes = parseInt(routesInput.value) || 0;
        const calls = parseInt(callsInput.value) || 0;
        const reviews = parseInt(reviewsInput.value) || 0;
        
        const stats = { date: month, searches, routes, calls, reviews };
        const existingIdx = gmbStats.findIndex(s => s.date === month);
        
        if (existingIdx !== -1) {
            gmbStats[existingIdx] = stats;
        } else {
            gmbStats.push(stats);
        }
        
        saveData();
        alert(`${month} の統計データを保存しました。`);
        refreshAll();
    });
}

window.handleUpdateVisitStatus = (vId, newStatus) => {
    const v = visits.find(x => x.id === vId);
    if (!v) return;
    v.status = newStatus;
    const patient = patients.find(p => p.id === v.patientId);
    if (patient) {
        patient.visitCount = visits.filter(x => x.patientId === v.patientId && x.status === 'completed').length;
    }
    saveData();
    refreshAll();
};
