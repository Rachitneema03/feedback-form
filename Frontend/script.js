// In-memory data storage
let usersData = [], currentUser = null, feedbackData = [];

// 20 College-Oriented Feedback Form Types
const feedbackForms = [
    { id: 1, type: 'course', icon: 'bi-book', title: 'College Course Review', description: 'Share your feedback on course content, structure, and learning outcomes' },
    { id: 2, type: 'course', icon: 'bi-journal-text', title: 'Curriculum Review', description: 'Evaluate the curriculum design and course progression' },
    { id: 3, type: 'course', icon: 'bi-mortarboard', title: 'Academic Program Review', description: 'Review your academic program and specialization' },
    { id: 4, type: 'course', icon: 'bi-clipboard-check', title: 'Assignment Review', description: 'Feedback on assignments, projects, and assessments' },
    { id: 5, type: 'course', icon: 'bi-file-earmark-text', title: 'Study Material Review', description: 'Review textbooks, resources, and study materials' },
    { id: 6, type: 'event', icon: 'bi-calendar-event', title: 'College Event Review', description: 'Share feedback on college-organized events and activities' },
    { id: 7, type: 'event', icon: 'bi-trophy', title: 'Sports Event Review', description: 'Review sports competitions and athletic events' },
    { id: 8, type: 'event', icon: 'bi-music-note-beamed', title: 'Cultural Fest Review', description: 'Feedback on cultural festivals and celebrations' },
    { id: 9, type: 'event', icon: 'bi-mic', title: 'Seminar & Workshop Review', description: 'Review seminars, workshops, and guest lectures' },
    { id: 10, type: 'event', icon: 'bi-award', title: 'Convocation Review', description: 'Feedback on graduation ceremonies and convocations' },
    { id: 11, type: 'management', icon: 'bi-building', title: 'College Management Review', description: 'Review administrative services and management efficiency' },
    { id: 12, type: 'management', icon: 'bi-people-fill', title: 'Student Services Review', description: 'Feedback on student support services and facilities' },
    { id: 13, type: 'management', icon: 'bi-shield-check', title: 'Campus Security Review', description: 'Review campus safety and security measures' },
    { id: 14, type: 'management', icon: 'bi-cash-stack', title: 'Fee Structure Review', description: 'Feedback on fee structure and payment processes' },
    { id: 15, type: 'management', icon: 'bi-file-earmark-medical', title: 'Health Services Review', description: 'Review medical facilities and health services' },
    { id: 16, type: 'faculty', icon: 'bi-person-badge', title: 'Faculty Review', description: 'Share feedback on teaching faculty and professors' },
    { id: 17, type: 'faculty', icon: 'bi-chat-left-text', title: 'Teaching Methods Review', description: 'Review teaching methodologies and classroom experience' },
    { id: 18, type: 'faculty', icon: 'bi-clock-history', title: 'Office Hours Review', description: 'Feedback on faculty availability and support' },
    { id: 19, type: 'facility', icon: 'bi-building', title: 'Infrastructure Review', description: 'Review college buildings, classrooms, and facilities' },
    { id: 20, type: 'facility', icon: 'bi-bookmark-star', title: 'Library Review', description: 'Feedback on library resources, services, and environment' }
];

// Modal management
const modals = {
    'feedback-modal': { open: openFeedbackModal, close: closeModal },
    'profile-modal': { open: openProfileModal, close: closeProfileModal },
    'settings-modal': { open: openSettingsModal, close: closeSettingsModal },
    'appearance-modal': { open: openAppearanceModal, close: closeAppearanceModal },
    'delete-account-modal': { open: openDeleteAccountModal, close: closeDeleteAccountModal }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = sessionStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    initializeApp();
    setupThemeHandlers();
    setupDeleteAccountHandler();
});

function initializeApp() {
    showLandingPage();
    if (currentUser) showDashboardPage();
}

// Page Navigation
function showLandingPage() {
    hideAllPages();
    document.getElementById('landing-page').classList.add('active');
}

function showAuthPage() {
    hideAllPages();
    const form = document.getElementById('auth-form');
    form.reset();
    document.getElementById('name-field-container').style.display = 'none';
    setAuthMode('login');
    document.getElementById('auth-page').classList.add('active');
}

function showDashboardPage() {
    if (!currentUser) return showAuthPage();
    hideAllPages();
    document.getElementById('dashboard-page').classList.add('active');
    updateDashboard();
    renderFeedbackForms();
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
}

// Authentication
let isLoginMode = true;

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    setAuthMode(isLoginMode ? 'login' : 'signup');
}

function setAuthMode(mode) {
    isLoginMode = mode === 'login';
    const config = mode === 'login' 
        ? { nameDisplay: 'none', title: 'Welcome Back', subtitle: 'Sign in to your account', btnText: '<i class="bi bi-box-arrow-in-right"></i> Sign In', toggleText: "Don't have an account?", toggleLink: 'Sign Up' }
        : { nameDisplay: 'block', title: 'Create Account', subtitle: 'Sign up to get started', btnText: '<i class="bi bi-person-plus"></i> Sign Up', toggleText: 'Already have an account?', toggleLink: 'Sign In' };
    
    document.getElementById('name-field-container').style.display = config.nameDisplay;
    document.getElementById('auth-title').textContent = config.title;
    document.querySelector('.auth-subtitle').textContent = config.subtitle;
    document.getElementById('auth-submit-btn').innerHTML = config.btnText;
    document.getElementById('toggle-text').textContent = config.toggleText;
    document.getElementById('toggle-link').textContent = config.toggleLink;
    document.getElementById('auth-form').reset();
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value.trim();
    
    if (!email || !password) return showNotification('Please fill in all required fields.', 'error');
    if (!isLoginMode && !name) return showNotification('Please enter your name.', 'error');
    if (password.length < 6) return showNotification('Password must be at least 6 characters long.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showNotification('Please enter a valid email address.', 'error');
    
    if (isLoginMode) {
        const user = usersData.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            showNotification('Welcome back!', 'success');
            setTimeout(() => showDashboardPage(), 500);
        } else {
            showNotification('Invalid email or password.', 'error');
        }
    } else {
        if (usersData.find(u => u.email === email)) {
            showNotification('An account with this email already exists. Please sign in instead.', 'error');
            setAuthMode('login');
            return;
        }
        const newUser = { id: Date.now().toString(), name, email, password, memberSince: new Date().toISOString(), feedbackCount: 0 };
        usersData.push(newUser);
        currentUser = newUser;
        if (!feedbackData.find(f => f.userId === newUser.id)) {
            feedbackData.push({ userId: newUser.id, feedbacks: [] });
        }
        showNotification('Account created successfully!', 'success');
        setTimeout(() => showDashboardPage(), 500);
    }
}

function handleGoogleLogin() {
    const mockName = 'Google User ' + Math.floor(Math.random() * 1000);
    const mockEmail = 'user' + Date.now() + '@gmail.com';
    let user = usersData.find(u => u.email.includes('@gmail.com'));
    
    if (!user) {
        user = { id: Date.now().toString(), name: mockName, email: mockEmail, password: '', memberSince: new Date().toISOString(), feedbackCount: 0 };
        usersData.push(user);
        feedbackData.push({ userId: user.id, feedbacks: [] });
    }
    currentUser = user;
    showNotification('Signed in with Google!', 'success');
    setTimeout(() => showDashboardPage(), 500);
}

function handleLogout() {
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal?.classList.contains('active')) closeSettingsModal();
    currentUser = null;
    showNotification('Logged out successfully', 'success');
    setTimeout(() => showLandingPage(), 500);
}

// Dashboard
function updateDashboard() {
    if (!currentUser) return;
    updateFeedbackHistory();
}

function renderFeedbackForms() {
    const gridContainer = document.getElementById('feedback-forms-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = feedbackForms.map(form => 
        `<div class="feedback-form-card" onclick="openFeedbackModal(${form.id})">
            <span class="feedback-form-card-badge">${form.type}</span>
            <i class="bi ${form.icon} feedback-form-card-icon"></i>
            <h3 class="feedback-form-card-title">${form.title}</h3>
            <p class="feedback-form-card-description">${form.description}</p>
        </div>`
    ).join('');
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => modal.style.opacity = '1', 10);
    }
}

function closeModalById(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function openFeedbackModal(formId) {
    if (!currentUser) return showAuthPage();
    const form = feedbackForms.find(f => f.id === formId);
    if (!form) return;
    
    document.getElementById('modal-title-text').textContent = form.title;
    document.getElementById('modal-icon').className = `bi ${form.icon}`;
    document.getElementById('feedback-form-id').value = formId;
    document.getElementById('feedback-form-type').value = form.type;
    document.getElementById('modal-form-content').innerHTML = generateFormContent(form);
    openModal('feedback-modal');
}

function closeModal() {
    closeModalById('feedback-modal');
    document.getElementById('feedback-form').reset();
}

const formTemplates = {
    course: [
        { label: 'How would you rate the course content quality?', icon: 'bi-check-circle', name: 'contentQuality', type: 'select' },
        { label: 'What did you find most valuable in this course?', icon: 'bi-question-circle', name: 'valuableAspects', type: 'textarea', placeholder: 'Share what you found most valuable...' },
        { label: 'What improvements would you suggest?', icon: 'bi-exclamation-circle', name: 'improvements', type: 'textarea', placeholder: 'Suggest improvements for the course...' }
    ],
    event: [
        { label: 'How well was the event organized?', icon: 'bi-calendar-event', name: 'organization', type: 'select' },
        { label: 'How engaging was the event?', icon: 'bi-people', name: 'engagement', type: 'select', options: ['very-engaging', 'engaging', 'moderate', 'not-engaging'] },
        { label: 'Your overall experience', icon: 'bi-chat-left-text', name: 'experience', type: 'textarea', placeholder: 'Share your experience at the event...' }
    ],
    management: [
        { label: 'How efficient are the administrative services?', icon: 'bi-speedometer2', name: 'efficiency', type: 'select' },
        { label: 'What services do you appreciate most?', icon: 'bi-hand-thumbs-up', name: 'appreciatedServices', type: 'textarea', placeholder: 'Share services you appreciate...' },
        { label: 'Suggestions for improvement', icon: 'bi-lightbulb', name: 'suggestions', type: 'textarea', placeholder: 'Your suggestions for better management...' }
    ],
    faculty: [
        { label: 'How effective is the teaching method?', icon: 'bi-book', name: 'teachingEffectiveness', type: 'select' },
        { label: 'How approachable and supportive is the faculty?', icon: 'bi-chat-dots', name: 'approachability', type: 'select', options: ['very-approachable', 'approachable', 'moderate', 'not-approachable'] },
        { label: 'Additional comments about faculty', icon: 'bi-pencil', name: 'comments', type: 'textarea', placeholder: 'Your feedback on faculty...' }
    ],
    facility: [
        { label: 'How would you rate the facility quality?', icon: 'bi-building', name: 'facilityQuality', type: 'select' },
        { label: 'What facilities do you find most useful?', icon: 'bi-check-circle', name: 'usefulFacilities', type: 'textarea', placeholder: 'Share facilities you find useful...' },
        { label: 'What maintenance or improvements are needed?', icon: 'bi-tools', name: 'maintenance', type: 'textarea', placeholder: 'Suggest maintenance or improvements...' }
    ]
};

function generateFormContent(form) {
    const selectOptions = ['excellent', 'good', 'average', 'poor'];
    const template = formTemplates[form.type] || [];
    
    let content = `<div class="form-group">
        <label><i class="bi bi-star"></i> Overall Rating</label>
        <div class="star-rating" id="modal-star-rating">
            ${Array.from({ length: 5 }, (_, i) => `<span class="star" data-rating="${i + 1}">★</span>`).join('')}
        </div>
        <input type="hidden" id="modal-rating-value" name="rating" value="0" required>
    </div>`;
    
    template.forEach(field => {
        if (field.type === 'select') {
            const options = field.options || selectOptions;
            content += `<div class="form-group">
                <label><i class="bi ${field.icon}"></i> ${field.label}</label>
                <select name="${field.name}" required>
                    <option value="">Select...</option>
                    ${options.map(opt => `<option value="${opt}">${opt.charAt(0).toUpperCase() + opt.slice(1).replace(/-/g, ' ')}</option>`).join('')}
                </select>
            </div>`;
        } else {
            content += `<div class="form-group">
                <label><i class="bi ${field.icon}"></i> ${field.label}</label>
                <textarea name="${field.name}" placeholder="${field.placeholder || ''}" required></textarea>
            </div>`;
        }
    });
    
    content += `<div class="form-group">
        <label><i class="bi bi-chat-left-dots"></i> Additional Feedback (Optional)</label>
        <textarea name="additional" placeholder="Any additional thoughts..."></textarea>
    </div>`;
    
    setTimeout(setupModalStarRating, 100);
    return content;
}

function setupModalStarRating() {
    const container = document.getElementById('modal-star-rating');
    if (!container) return;
    const stars = container.querySelectorAll('.star');
    const input = document.getElementById('modal-rating-value');
    
    stars.forEach((star, i) => {
        star.addEventListener('click', () => {
            const rating = i + 1;
            setModalStarRating(rating);
            input.value = rating;
        });
        star.addEventListener('mouseenter', () => highlightModalStars(i + 1));
    });
    container.addEventListener('mouseleave', () => highlightModalStars(parseInt(input.value) || 0));
}

function setModalStarRating(rating) {
    document.querySelectorAll('#modal-star-rating .star').forEach((star, i) => {
        star.classList.toggle('active', i < rating);
    });
    document.getElementById('modal-rating-value').value = rating;
}

function highlightModalStars(rating) {
    document.querySelectorAll('#modal-star-rating .star').forEach((star, i) => {
        star.classList.toggle('active', i < rating);
    });
}

function handleFeedbackSubmit(event) {
    event.preventDefault();
    if (!currentUser) return showAuthPage();
    
    const formData = new FormData(event.target);
    const formId = parseInt(formData.get('formId'));
    const rating = parseInt(formData.get('rating'));
    
    if (rating === 0) return showNotification('Please select a rating.', 'error');
    
    const form = feedbackForms.find(f => f.id === formId);
    const feedbackText = [`Form: ${form.title}`, `Type: ${form.type}`, `Rating: ${rating}/5`];
    
    for (const [key, value] of formData.entries()) {
        if (!['formId', 'formType', 'rating'].includes(key) && value.trim()) {
            feedbackText.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
        }
    }
    
    let userFeedback = feedbackData.find(f => f.userId === currentUser.id);
    if (!userFeedback) {
        userFeedback = { userId: currentUser.id, feedbacks: [] };
        feedbackData.push(userFeedback);
    }
    
    userFeedback.feedbacks.push({
        id: Date.now().toString(),
        formId,
        formType: form.type,
        formTitle: form.title,
        rating,
        text: feedbackText.join('\n'),
        date: new Date().toISOString()
    });
    
    currentUser.feedbackCount = userFeedback.feedbacks.length;
    updateDashboard();
    closeModal();
    showNotification('Feedback submitted successfully!', 'success');
}

function updateFeedbackHistory() {
    const container = document.getElementById('feedback-history');
    const userFeedback = feedbackData.find(f => f.userId === currentUser.id);
    
    if (!userFeedback || userFeedback.feedbacks.length === 0) {
        container.innerHTML = `<p class="empty-state"><i class="bi bi-inbox"></i> No feedback submitted yet. Be the first to share your thoughts!</p>`;
        return;
    }
    
    const sorted = [...userFeedback.feedbacks].sort((a, b) => new Date(b.date) - new Date(a.date));
    container.innerHTML = sorted.map(f => {
        const date = new Date(f.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `<div class="feedback-item">
            <div class="feedback-item-header">
                <div>
                    <span class="feedback-form-type">${f.formType}</span>
                    <div class="feedback-rating-display">
                        ${Array.from({ length: 5 }, (_, i) => `<span class="star ${i < f.rating ? 'active' : ''}">★</span>`).join('')}
                    </div>
                </div>
                <span class="feedback-date"><i class="bi bi-clock"></i> ${date}</span>
            </div>
            <h4 style="margin-bottom: 0.5rem; color: var(--text-primary);">${f.formTitle}</h4>
            <div class="feedback-text">${escapeHtml(f.text)}</div>
        </div>`;
    }).join('');
}

// Profile Modal
function openProfileModal() {
    if (!currentUser) return showAuthPage();
    const userFeedback = feedbackData.find(f => f.userId === currentUser.id);
    const count = userFeedback ? userFeedback.feedbacks.length : 0;
    const memberDate = new Date(currentUser.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-feedback-count').textContent = count;
    document.getElementById('profile-member-since').textContent = memberDate;
    openModal('profile-modal');
}

function closeProfileModal() {
    closeModalById('profile-modal');
}

// Settings Modal
function openSettingsModal() {
    if (!currentUser) return showAuthPage();
    openModal('settings-modal');
}

function closeSettingsModal() {
    closeModalById('settings-modal');
}

// Appearance Modal
function openAppearanceModal() {
    closeSettingsModal();
    const savedTheme = sessionStorage.getItem('theme') || 'light';
    document.querySelectorAll('.appearance-preview').forEach(p => {
        p.classList.toggle('active', p.dataset.theme === savedTheme);
    });
    openModal('appearance-modal');
}

function closeAppearanceModal() {
    closeModalById('appearance-modal');
}

function setupThemeHandlers() {
    document.querySelectorAll('.appearance-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            const theme = this.dataset.theme;
            applyTheme(theme);
            document.querySelectorAll('.appearance-preview').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            setTimeout(closeAppearanceModal, 500);
        });
    });
}

function applyTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    sessionStorage.setItem('theme', theme);
    showNotification(`${theme === 'dark' ? 'Dark' : 'Light'} theme applied!`, 'success');
    document.querySelectorAll('.appearance-preview').forEach(p => {
        p.classList.toggle('active', p.dataset.theme === theme);
    });
}

// Delete Account Modal
function openDeleteAccountModal() {
    closeSettingsModal();
    const checkbox = document.getElementById('confirm-delete');
    const btn = document.getElementById('delete-account-btn');
    checkbox.checked = false;
    btn.disabled = true;
    openModal('delete-account-modal');
}

function closeDeleteAccountModal() {
    const checkbox = document.getElementById('confirm-delete');
    const btn = document.getElementById('delete-account-btn');
    checkbox.checked = false;
    btn.disabled = true;
    closeModalById('delete-account-modal');
}

function setupDeleteAccountHandler() {
    const checkbox = document.getElementById('confirm-delete');
    const btn = document.getElementById('delete-account-btn');
    if (checkbox && btn) {
        checkbox.addEventListener('change', () => btn.disabled = !checkbox.checked);
    }
}

function handleDeleteAccount() {
    if (!currentUser) return showAuthPage();
    const checkbox = document.getElementById('confirm-delete');
    if (!checkbox.checked) return showNotification('Please confirm that you understand this action is permanent.', 'error');
    
    usersData = usersData.filter(u => u.id !== currentUser.id);
    feedbackData = feedbackData.filter(f => f.userId !== currentUser.id);
    currentUser = null;
    closeDeleteAccountModal();
    showNotification('Account deleted successfully', 'success');
    setTimeout(showLandingPage, 1000);
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToAbout() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; background-color: ${type === 'success' ? '#28a745' : '#dc3545'}; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 3000; animation: slideInRight 0.3s ease-out; display: flex; align-items: center; gap: 0.5rem;`;
    notification.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('click', e => {
    const modalId = Object.keys(modals).find(id => e.target.id === id);
    if (modalId) modals[modalId].close();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const activeModal = Object.keys(modals).find(id => document.getElementById(id)?.classList.contains('active'));
        if (activeModal) modals[activeModal].close();
    }
});

// CSS animations
const style = document.createElement('style');
style.textContent = `@keyframes slideInRight{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}@keyframes slideOutRight{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(100%)}}`;
document.head.appendChild(style);
