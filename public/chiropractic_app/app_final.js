// State
let patients = JSON.parse(localStorage.getItem('patients')) || [
    { id: 1000, name: '山田 太郎', phone: '090-1234-5678', lineUrl: '', visitCount: 4, lastVisit: '2026-03-10' },
    { id: 1001, name: '佐藤 花子', phone: '080-9876-5432', lineUrl: '', visitCount: 2, lastVisit: '2026-02-15' },
    { id: 1002, name: '鈴木 一郎', phone: '070-1111-2222', lineUrl: '', visitCount: 1, lastVisit: '2026-03-13' }
];

let visits = JSON.parse(localStorage.getItem('visits')) || [
    { id: 500, patientId: 1000, patientName: '山田 太郎', date: '2026-03-10', symptoms: '腰痛の緩和' },
    { id: 501, patientId: 1001, patientName: '佐藤 花子', date: '2026-02-15', symptoms: '肩こり' },
    { id: 502, patientId: 1002, patientName: '鈴木 一郎', date: '2026-03-13', symptoms: '膝の痛み' }
];

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

// Forms & Modals
const patientModal = document.getElementById('patient-modal');
const visitModal = document.getElementById('visit-modal');
const patientForm = document.getElementById('patient-form');
const visitForm = document.getElementById('visit-form');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    console.log("---VERIFIED_V1_2--- Initializing App v1.2 FINAL...");
    setupNavigation();
    setupEventListeners();
    refreshAll();
}

function refreshAll() {
    updateDashboard();
    renderPatients();
    renderVisits();
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

// Stats & Dashboard
function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const riskPatients = patients.filter(p => isAtRisk(p.lastVisit));
    
    totalPatientsEl.textContent = patients.length;
    todayVisitsEl.textContent = visits.filter(v => v.date === today).length;
    churnRiskCountEl.textContent = riskPatients.length;

    const todayVisits = visits.filter(v => v.date === today);
    
    // Render Today's Visitors
    if (todayVisits.length === 0) {
        todayVisitorsTbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-light); padding:32px;">本日の来院記録はありません</td></tr>';
    } else {
        todayVisitorsTbody.innerHTML = todayVisits.map(v => {
            const p = patients.find(p => p.id === v.patientId) || { phone: '-', name: v.patientName };
            return `
                <tr>
                    <td><strong>${v.patientName}</strong></td>
                    <td>${p.phone}</td>
                    <td>${v.symptoms}</td>
                    <td>
                        <button class="btn btn-icon" title="LINEで送信" onclick="handleLineSend('${v.patientName}')"><i class="fab fa-line" style="color:#06C755"></i></button>
                        <button class="btn btn-icon" title="電話をかける" onclick="handleCall('${p.phone}')"><i class="fas fa-phone-alt" style="color:#3b82f6"></i></button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    const sortedPatients = [...patients].sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit));
    recentPatientsTbody.innerHTML = sortedPatients.slice(0, 5).map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.phone}</td>
            <td>${p.lastVisit}</td>
            <td><span class="badge ${isAtRisk(p.lastVisit) ? 'badge-risk' : 'badge-active'}">${isAtRisk(p.lastVisit) ? '離脱注意' : '良好'}</span></td>
            <td>
                <button class="btn btn-icon" title="口コミ依頼" onclick="handleReviewRequest('${p.name}')"><i class="fas fa-star" style="color:#f59e0b"></i></button>
                <button class="btn btn-icon" title="LINEで送信" onclick="handleLineSend('${p.name}')"><i class="fab fa-line" style="color:#06C755"></i></button>
                <button class="btn btn-icon" title="電話をかける" onclick="handleCall('${p.phone}')"><i class="fas fa-phone-alt" style="color:#3b82f6"></i></button>
            </td>
        </tr>
    `).join('');
}

function isAtRisk(lastVisit) {
    if (!lastVisit || lastVisit === '-') return true;
    const diff = (new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24);
    return diff > CHURN_DAYS;
}

// Render Lists
function renderPatients() {
    allPatientsTbody.innerHTML = patients.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.phone}</td>
            <td>${p.visitCount}回</td>
            <td>
                <button class="btn btn-icon" title="記録追加" onclick="openVisitModal(${p.id})"><i class="fas fa-notes-medical"></i></button>
                <button class="btn btn-icon" title="編集" onclick="openEditPatientModal(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-icon" title="LINEで送信" onclick="handleLineSend('${p.name}')"><i class="fab fa-line" style="color:#06C755"></i></button>
                <button class="btn btn-icon" title="電話をかける" onclick="handleCall('${p.phone}')"><i class="fas fa-phone-alt" style="color:#3b82f6"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderVisits() {
    const sortedVisits = [...visits].sort((a, b) => new Date(b.date) - new Date(a.date));
    visitHistoryTbody.innerHTML = sortedVisits.map(v => `
        <tr>
            <td>#${v.id}</td>
            <td><strong>${v.patientName}</strong></td>
            <td>${v.date}</td>
            <td>${v.symptoms}</td>
            <td>
                <button class="btn btn-icon" title="編集" onclick="openEditVisitModal(${v.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-icon" title="削除" onclick="handleDeleteVisit(${v.id})"><i class="fas fa-trash-alt" style="color:var(--danger)"></i></button>
            </td>
        </tr>
    `).join('');
}

// Modals
function setupEventListeners() {
    document.getElementById('add-patient-btn').addEventListener('click', () => {
        document.getElementById('patient-modal-title').textContent = '新規患者追加';
        document.getElementById('edit-patient-id').value = '';
        patientForm.reset();
        patientModal.classList.add('active');
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            patientModal.classList.remove('active');
            visitModal.classList.remove('active');
        });
    });

    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('edit-patient-id').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const lineUrl = document.getElementById('line_url').value;

        if (editId) {
            const p = patients.find(x => x.id === parseInt(editId));
            if (p) { p.name = name; p.phone = phone; p.lineUrl = lineUrl; }
        } else {
            patients.push({
                id: patients.length > 0 ? Math.max(...patients.map(x => x.id)) + 1 : 1000,
                name, phone, lineUrl, visitCount: 0, lastVisit: '-'
            });
        }
        completeAction(patientModal, patientForm);
    });

    visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pId = parseInt(document.getElementById('visit-patient-id').value);
        const vId = document.getElementById('edit-visit-id').value;
        const date = document.getElementById('visit-date').value;
        const symptoms = document.getElementById('symptoms').value;
        const patient = patients.find(p => p.id === pId);

        if (vId) {
            const v = visits.find(x => x.id === parseInt(vId));
            if (v) { v.date = date; v.symptoms = symptoms; }
        } else {
            visits.push({
                id: visits.length > 0 ? Math.max(...visits.map(x => x.id)) + 1 : 500,
                patientId: pId, patientName: patient.name, date, symptoms
            });
            patient.visitCount++;
        }
        
        // Update patient's last visit
        const pVisits = visits.filter(v => v.patientId === pId);
        patient.lastVisit = pVisits.sort((a,b) => new Date(b.date) - new Date(a.date))[0].date;

        completeAction(visitModal, visitForm);
    });
}

function completeAction(modal, form) {
    saveData();
    refreshAll();
    modal.classList.remove('active');
    form.reset();
}

// Global Handlers (for onclick attributes)
window.openVisitModal = (pId) => {
    document.getElementById('visit-modal-title').textContent = '来院記録の追加';
    document.getElementById('visit-patient-id').value = pId;
    document.getElementById('edit-visit-id').value = '';
    document.getElementById('visit-date').value = new Date().toISOString().split('T')[0];
    visitForm.reset();
    visitModal.classList.add('active');
};

window.openEditPatientModal = (pId) => {
    const p = patients.find(x => x.id === pId);
    document.getElementById('patient-modal-title').textContent = '患者情報の編集';
    document.getElementById('edit-patient-id').value = p.id;
    document.getElementById('name').value = p.name;
    document.getElementById('phone').value = p.phone;
    document.getElementById('line_url').value = p.lineUrl || '';
    patientModal.classList.add('active');
};

window.openEditVisitModal = (vId) => {
    const v = visits.find(x => x.id === vId);
    document.getElementById('visit-modal-title').textContent = '来院記録の編集';
    document.getElementById('visit-patient-id').value = v.patientId;
    document.getElementById('edit-visit-id').value = v.id;
    document.getElementById('visit-date').value = v.date;
    document.getElementById('symptoms').value = v.symptoms;
    visitModal.classList.add('active');
};

window.handleDeleteVisit = (vId) => {
    if (!confirm('この来院記録を削除しますか？')) return;
    const vIndex = visits.findIndex(x => x.id === vId);
    const visit = visits[vIndex];
    const patient = patients.find(p => p.id === visit.patientId);
    
    visits.splice(vIndex, 1);
    patient.visitCount = Math.max(0, patient.visitCount - 1);
    
    // Recalculate last visit
    const pVisits = visits.filter(v => v.patientId === patient.id);
    patient.lastVisit = pVisits.length > 0 ? pVisits.sort((a,b) => new Date(b.date) - new Date(a.date))[0].date : '-';
    
    saveData();
    refreshAll();
};

window.handleReviewRequest = (name) => {
    console.log("Review request for:", name);
    const msg = `${name}様、本日はご来院ありがとうございました。今後の励みになりますので、ぜひ口コミへのご協力をお願いします！\nhttps://g.page/r/YOUR_ID/review`;
    if (confirm(`コピーしますか？\n\n${msg}`)) {
        navigator.clipboard.writeText(msg).then(() => {
            alert('コピーしました');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('コピーに失敗しました。メッセージ内容：\n\n' + msg);
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

function saveData() {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('visits', JSON.stringify(visits));
}
