// Content Flow App - Main JavaScript
class ContentFlowApp {
    constructor() {
        this.content = this.loadContent();
        this.currentDate = new Date();
        this.currentView = 'week';
        this.activeFilters = ['All'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCalendar();
        this.renderUpcomingContent();
        this.updateDateDisplay();
        this.setupPlatformSelection();
        this.setupCharacterCounters();
        
        // Additional setup for enhanced functionality
        this.setupEnhancedFeatures();
    }

    setupEnhancedFeatures() {
        // Setup notification button
        const notificationBtn = document.querySelector('.w-8.h-8.flex.items-center.justify-center.rounded-full.bg-gray-100');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showToast('Notifications coming soon!', 'info');
            });
        }

        // Setup profile button
        const profileBtn = document.querySelector('.w-8.h-8.bg-gray-300.rounded-full');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                this.showToast('Profile settings coming soon!', 'info');
            });
        }

        // Setup all navigation buttons with proper selectors
        this.setupNavigationButtons();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Setup additional interactive elements
        this.setupAdditionalInteractions();
    }

    setupNavigationButtons() {
        // Previous/Next week buttons
        const prevBtn = document.querySelector('button:has(.ri-arrow-left-s-line)');
        const nextBtn = document.querySelector('button:has(.ri-arrow-right-s-line)');
        const todayBtn = document.querySelector('button:has(.ri-calendar-line)');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.navigatePrevious();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.navigateNext();
            });
        }

        if (todayBtn) {
            todayBtn.addEventListener('click', () => {
                this.jumpToToday();
            });
        }
    }

    navigatePrevious() {
        switch(this.currentView) {
            case 'week':
                this.currentDate.setDate(this.currentDate.getDate() - 7);
                break;
            case 'month':
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                break;
            case 'day':
                this.currentDate.setDate(this.currentDate.getDate() - 1);
                break;
        }
        this.switchView(this.currentView);
    }

    navigateNext() {
        switch(this.currentView) {
            case 'week':
                this.currentDate.setDate(this.currentDate.getDate() + 7);
                break;
            case 'month':
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                break;
            case 'day':
                this.currentDate.setDate(this.currentDate.getDate() + 1);
                break;
        }
        this.switchView(this.currentView);
    }

    jumpToToday() {
        this.currentDate = new Date();
        this.switchView(this.currentView);
        this.showToast('Jumped to today', 'info');
    }

    // Data Management
    loadContent() {
        const saved = localStorage.getItem('contentFlowData');
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getDefaultContent();
    }

    saveContent() {
        localStorage.setItem('contentFlowData', JSON.stringify(this.content));
    }

    getDefaultContent() {
        return [
            {
                id: '1',
                title: 'Summer Collection Reveal',
                platform: 'Instagram',
                type: 'Post',
                date: '2025-06-24',
                time: '15:00',
                status: 'Scheduled',
                description: 'Showcasing our new summer collection with vibrant colors and fresh designs.',
                color: 'blue'
            },
            {
                id: '2',
                title: 'Behind the Scenes Tour',
                platform: 'TikTok',
                type: 'Video',
                date: '2025-06-25',
                time: '10:00',
                status: 'Draft',
                description: 'Take a behind-the-scenes look at our photo shoot process.',
                color: 'purple'
            },
            {
                id: '3',
                title: 'Product Review: Summer Edition',
                platform: 'YouTube',
                type: 'Video',
                date: '2025-06-30',
                time: '14:00',
                status: 'Ready',
                description: 'Comprehensive review of our summer product line.',
                color: 'red'
            },
            {
                id: '4',
                title: '10 Summer Trends for 2025',
                platform: 'Blog',
                type: 'Article',
                date: '2025-07-02',
                time: '09:00',
                status: 'Draft',
                description: 'Explore the top 10 summer fashion trends for 2025.',
                color: 'green'
            },
            {
                id: '5',
                title: 'Instagram Story',
                platform: 'Instagram',
                type: 'Story',
                date: '2025-06-28',
                time: '12:00',
                status: 'Scheduled',
                description: 'Daily story update with product highlights.',
                color: 'blue'
            },
            {
                id: '6',
                title: 'Twitter Post',
                platform: 'Twitter',
                type: 'Post',
                date: '2025-06-28',
                time: '16:00',
                status: 'Scheduled',
                description: 'Engaging tweet about our latest collection.',
                color: 'cyan'
            },
            {
                id: '7',
                title: 'Newsletter',
                platform: 'Newsletter',
                type: 'Email',
                date: '2025-06-29',
                time: '08:00',
                status: 'Scheduled',
                description: 'Weekly newsletter with exclusive content and offers.',
                color: 'primary'
            },
            {
                id: '8',
                title: 'YouTube Video',
                platform: 'YouTube',
                type: 'Video',
                date: '2025-06-30',
                time: '18:00',
                status: 'Draft',
                description: 'Main YouTube video for the week.',
                color: 'red'
            }
        ];
    }

    // Content Management
    addContent(contentData) {
        const newContent = {
            id: Date.now().toString(),
            ...contentData,
            status: 'Draft'
        };
        this.content.push(newContent);
        this.saveContent();
        this.renderCalendar();
        this.renderUpcomingContent();
        this.showToast('Content created successfully!', 'success');
    }

    updateContent(id, updates) {
        const index = this.content.findIndex(item => item.id === id);
        if (index !== -1) {
            this.content[index] = { ...this.content[index], ...updates };
            this.saveContent();
            this.renderCalendar();
            this.renderUpcomingContent();
            this.showToast('Content updated successfully!', 'success');
        }
    }

    deleteContent(id) {
        this.content = this.content.filter(item => item.id !== id);
        this.saveContent();
        this.renderCalendar();
        this.renderUpcomingContent();
        this.showToast('Content deleted successfully!', 'success');
    }

    // Calendar Rendering
    renderCalendar() {
        let calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) {
            // Fallback selector
            calendarGrid = document.querySelector('.grid.grid-cols-7.gap-1.max-w-4xl.mx-auto');
        }
        if (!calendarGrid) {
            console.error('Calendar grid not found!');
            return;
        }

        const weekStart = this.getWeekStart(this.currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        let html = '';
        
        // Previous week days
        for (let i = 0; i < this.getDayOfWeek(weekStart); i++) {
            const prevDate = new Date(weekStart);
            prevDate.setDate(prevDate.getDate() - (this.getDayOfWeek(weekStart) - i));
            html += this.renderCalendarCell(prevDate, true);
        }

        // Current week days
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(weekStart);
            currentDate.setDate(currentDate.getDate() + i);
            html += this.renderCalendarCell(currentDate, false);
        }

        // Next week days
        const remainingDays = 14 - this.getDayOfWeek(weekStart) - 7;
        for (let i = 0; i < remainingDays; i++) {
            const nextDate = new Date(weekEnd);
            nextDate.setDate(nextDate.getDate() + i + 1);
            html += this.renderCalendarCell(nextDate, true);
        }

        calendarGrid.innerHTML = html;
        this.setupCalendarEventListeners();
    }

    renderCalendarCell(date, isOtherMonth) {
        const dateStr = date.toISOString().split('T')[0];
        const dayNumber = date.getDate();
        const isToday = this.isToday(date);
        const dayContent = this.getContentForDate(dateStr);
        const filteredContent = this.filterContent(dayContent);

        let cellClass = 'calendar-cell h-24 rounded p-1 relative cursor-pointer';
        let dateClass = 'text-xs';
        let contentHtml = '';

        if (isOtherMonth) {
            cellClass += ' bg-gray-50';
            dateClass += ' text-gray-400';
        } else if (isToday) {
            cellClass += ' bg-primary bg-opacity-5 border border-primary shadow-sm';
            dateClass += ' font-medium text-primary';
            contentHtml += '<div class="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>';
        } else {
            cellClass += ' bg-white shadow-sm';
            dateClass += ' font-medium';
        }

        if (filteredContent.length > 0) {
            contentHtml += '<div class="mt-1 space-y-1">';
            filteredContent.slice(0, 3).forEach(item => {
                const bgColor = this.getPlatformColor(item.platform);
                contentHtml += `
                    <div class="${bgColor} rounded p-1 text-xs flex items-center">
                        <span class="platform-indicator ${this.getPlatformIndicatorColor(item.platform)} mr-1"></span>
                        <span class="truncate">${item.title}</span>
                    </div>
                `;
            });
            if (filteredContent.length > 3) {
                contentHtml += `<div class="text-xs text-gray-500 text-center">+${filteredContent.length - 3} more</div>`;
            }
            contentHtml += '</div>';
        }

        return `
            <div class="${cellClass}" data-date="${dateStr}" style="cursor: pointer;">
                <span class="${dateClass}">${dayNumber}</span>
                ${contentHtml}
            </div>
        `;
    }

    // Content Rendering
    renderUpcomingContent() {
        let container = document.getElementById('upcomingContent');
        if (!container) {
            // Fallback selector
            container = document.querySelector('.space-y-3.px-2');
        }
        if (!container) {
            console.error('Upcoming content container not found!');
            return;
        }

        const upcomingContent = this.getUpcomingContent();
        const filteredContent = this.filterContent(upcomingContent);

        container.innerHTML = filteredContent.map(item => this.renderContentCard(item)).join('');
        this.setupContentCardEventListeners();
    }

    renderContentCard(item) {
        const platformIcon = this.getPlatformIcon(item.platform);
        const platformColor = this.getPlatformColor(item.platform);
        const statusColor = this.getStatusColor(item.status);
        const formattedDate = this.formatContentDate(item.date, item.time);

        return `
            <div class="bg-white shadow-sm rounded-lg p-3 cursor-pointer" data-content-id="${item.id}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <div class="w-10 h-10 flex items-center justify-center ${platformColor} rounded-lg">
                            <i class="${platformIcon} ri-lg ${this.getPlatformTextColor(item.platform)}"></i>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium">${item.title}</h4>
                            <p class="text-xs text-gray-500">${item.platform} • ${formattedDate}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-medium px-2 py-1 ${statusColor} rounded-full">${item.status}</span>
                        <button class="content-edit-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100">
                            <i class="ri-edit-line text-xs text-gray-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Utility Functions
    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }

    getDayOfWeek(date) {
        const day = date.getDay();
        return day === 0 ? 6 : day - 1; // Monday = 0, Sunday = 6
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    getContentForDate(dateStr) {
        return this.content.filter(item => item.date === dateStr);
    }

    getUpcomingContent() {
        const today = new Date().toISOString().split('T')[0];
        return this.content
            .filter(item => item.date >= today)
            .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
    }

    filterContent(content) {
        if (this.activeFilters.includes('All')) {
            return content;
        }
        return content.filter(item => this.activeFilters.includes(item.platform));
    }

    // Color and Icon Helpers
    getPlatformColor(platform) {
        const colors = {
            'Instagram': 'bg-blue-100',
            'Twitter': 'bg-cyan-100',
            'YouTube': 'bg-red-100',
            'TikTok': 'bg-purple-100',
            'Blog': 'bg-green-100',
            'Newsletter': 'bg-primary bg-opacity-10'
        };
        return colors[platform] || 'bg-gray-100';
    }

    getPlatformIndicatorColor(platform) {
        const colors = {
            'Instagram': 'bg-blue-500',
            'Twitter': 'bg-cyan-500',
            'YouTube': 'bg-red-500',
            'TikTok': 'bg-purple-500',
            'Blog': 'bg-green-500',
            'Newsletter': 'bg-primary'
        };
        return colors[platform] || 'bg-gray-500';
    }

    getPlatformTextColor(platform) {
        const colors = {
            'Instagram': 'text-blue-600',
            'Twitter': 'text-cyan-600',
            'YouTube': 'text-red-600',
            'TikTok': 'text-purple-600',
            'Blog': 'text-green-600',
            'Newsletter': 'text-primary'
        };
        return colors[platform] || 'text-gray-600';
    }

    getPlatformIcon(platform) {
        const icons = {
            'Instagram': 'ri-instagram-line',
            'Twitter': 'ri-twitter-line',
            'YouTube': 'ri-youtube-line',
            'TikTok': 'ri-tiktok-line',
            'Blog': 'ri-article-line',
            'Newsletter': 'ri-mail-line'
        };
        return icons[platform] || 'ri-file-line';
    }

    getStatusColor(status) {
        const colors = {
            'Scheduled': 'bg-yellow-100 text-yellow-700',
            'Draft': 'bg-blue-100 text-blue-700',
            'Ready': 'bg-green-100 text-green-700',
            'Published': 'bg-gray-100 text-gray-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    }

    formatContentDate(date, time) {
        const contentDate = new Date(date + 'T' + time);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (contentDate.toDateString() === today.toDateString()) {
            return `Today, ${time}`;
        } else if (contentDate.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${time}`;
        } else {
            return `${contentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${time}`;
        }
    }

    updateDateDisplay() {
        const weekStart = this.getWeekStart(this.currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const dateDisplay = document.getElementById('dateDisplay');
        if (dateDisplay) {
            dateDisplay.textContent = `${weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
        }
    }

    // Event Listeners
    setupEventListeners() {
        this.setupViewToggle();
        this.setupFilterChips();
        this.setupDateNavigation();
        this.setupModal();
        this.setupBottomNavigation();
    }

    setupViewToggle() {
        const viewButtons = document.querySelectorAll('.view-toggle-button');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                viewButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentView = button.textContent.toLowerCase();
                
                // Actually implement view switching
                this.switchView(this.currentView);
            });
        });
    }

    switchView(viewType) {
        switch(viewType) {
            case 'week':
                this.renderWeekView();
                break;
            case 'month':
                this.renderMonthView();
                break;
            case 'day':
                this.renderDayView();
                break;
            default:
                this.renderWeekView();
        }
    }

    renderWeekView() {
        // Current implementation is already week view
        this.renderCalendar();
        this.updateDateDisplay();
        this.showToast('Week view active', 'info');
    }

    renderMonthView() {
        let calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const monthStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const monthEnd = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - this.getDayOfWeek(monthStart));

        let html = '';
        
        // Generate 6 weeks (42 days) for month view
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + (week * 7) + day);
                
                const isCurrentMonth = currentDate.getMonth() === this.currentDate.getMonth();
                html += this.renderCalendarCell(currentDate, !isCurrentMonth);
            }
        }

        calendarGrid.innerHTML = html;
        this.setupCalendarEventListeners();
        this.updateMonthDisplay();
    }

    renderDayView() {
        let calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const currentDate = this.currentDate;
        const dayContent = this.getContentForDate(currentDate.toISOString().split('T')[0]);
        const filteredContent = this.filterContent(dayContent);

        let html = `
            <div class="col-span-7">
                <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 class="text-lg font-semibold mb-4">${currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    <div class="space-y-3">
        `;

        if (filteredContent.length > 0) {
            filteredContent.forEach(item => {
                html += this.renderContentCard(item);
            });
        } else {
            html += `
                <div class="text-center py-8 text-gray-500">
                    <i class="ri-calendar-line text-4xl mb-2"></i>
                    <p>No content scheduled for this day</p>
                    <button class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90" onclick="window.contentFlowApp.openEnhancedModalWithDate('${currentDate.toISOString().split('T')[0]}')">
                        Create Content
                    </button>
                </div>
            `;
        }

        html += `
                    </div>
                </div>
            </div>
        `;

        calendarGrid.innerHTML = html;
    }

    updateMonthDisplay() {
        const dateDisplay = document.getElementById('dateDisplay');
        if (dateDisplay) {
            const monthName = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            dateDisplay.textContent = monthName;
        }
    }

    setupFilterChips() {
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const platform = chip.textContent.trim();
                
                if (platform === 'All') {
                    this.activeFilters = ['All'];
                    filterChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                } else {
                    const allChip = Array.from(filterChips).find(c => c.textContent.trim() === 'All');
                    allChip.classList.remove('active');
                    this.activeFilters = this.activeFilters.filter(f => f !== 'All');

                    if (this.activeFilters.includes(platform)) {
                        this.activeFilters = this.activeFilters.filter(f => f !== platform);
                        chip.classList.remove('active');
                    } else {
                        this.activeFilters.push(platform);
                        chip.classList.add('active');
                    }

                    if (this.activeFilters.length === 0) {
                        this.activeFilters = ['All'];
                        allChip.classList.add('active');
                    }
                }

                this.renderCalendar();
                this.renderUpcomingContent();
            });
        });
    }

    setupDateNavigation() {
        const prevBtn = document.querySelector('button:has(.ri-arrow-left-s-line)');
        const nextBtn = document.querySelector('button:has(.ri-arrow-right-s-line)');
        const todayBtn = document.querySelector('button:has(.ri-calendar-line)');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setDate(this.currentDate.getDate() - 7);
                this.renderCalendar();
                this.updateDateDisplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setDate(this.currentDate.getDate() + 7);
                this.renderCalendar();
                this.updateDateDisplay();
            });
        }

        if (todayBtn) {
            todayBtn.addEventListener('click', () => {
                this.currentDate = new Date();
                this.renderCalendar();
                this.updateDateDisplay();
                this.showToast('Jumped to today', 'info');
            });
        }
    }

    setupCalendarEventListeners() {
        const calendarCells = document.querySelectorAll('.calendar-cell');
        calendarCells.forEach(cell => {
            cell.addEventListener('click', () => {
                const date = cell.dataset.date;
                if (date && !cell.classList.contains('bg-gray-50')) {
                    // Add visual feedback
                    cell.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        cell.style.transform = 'scale(1)';
                    }, 150);
                    
                    const content = this.getContentForDate(date);
                    if (content.length > 0) {
                        this.showContentDetails(content, date);
                    } else {
                        // Show option to create content for this date
                        this.showCreateContentForDate(date);
                    }
                }
            });
            
            // Add hover effects
            cell.addEventListener('mouseenter', () => {
                if (!cell.classList.contains('bg-gray-50')) {
                    cell.style.transform = 'scale(1.02)';
                    cell.style.transition = 'transform 0.2s ease';
                }
            });
            
            cell.addEventListener('mouseleave', () => {
                if (!cell.classList.contains('bg-gray-50')) {
                    cell.style.transform = 'scale(1)';
                }
            });
        });
    }

    setupContentCardEventListeners() {
        const contentCards = document.querySelectorAll('[data-content-id]');
        contentCards.forEach(card => {
            const editBtn = card.querySelector('.content-edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const contentId = card.dataset.contentId;
                    const content = this.content.find(item => item.id === contentId);
                    if (content) {
                        this.openEditModal(content);
                    }
                });
            }

            card.addEventListener('click', () => {
                const contentId = card.dataset.contentId;
                const content = this.content.find(item => item.id === contentId);
                if (content) {
                    this.showContentDetails([content], content.date);
                }
            });
        });
    }

    setupModal() {
        const fabButton = document.querySelector('.fab-button');
        const enhancedModal = document.getElementById('enhancedContentModal');
        const closeEnhancedModalBtn = document.getElementById('closeEnhancedModalBtn');
        const createEnhancedBtn = document.getElementById('createEnhancedContentBtn');
        const saveDraftBtn = document.getElementById('saveAsDraftBtn');

        if (fabButton && enhancedModal) {
            fabButton.addEventListener('click', () => {
                this.openEnhancedModal();
            });
        }

        if (closeEnhancedModalBtn && enhancedModal) {
            closeEnhancedModalBtn.addEventListener('click', () => {
                this.closeEnhancedModal();
            });

            enhancedModal.addEventListener('click', (e) => {
                if (e.target === enhancedModal) {
                    this.closeEnhancedModal();
                }
            });
        }

        if (createEnhancedBtn) {
            createEnhancedBtn.addEventListener('click', () => {
                this.handleEnhancedContentCreation();
            });
        }

        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => {
                this.handleSaveAsDraft();
            });
        }
    }

    setupPlatformSelection() {
        const platformOptions = document.querySelectorAll('.platform-option');
        platformOptions.forEach(option => {
            option.addEventListener('click', () => {
                platformOptions.forEach(opt => opt.classList.remove('border-primary', 'bg-primary/5'));
                option.classList.add('border-primary', 'bg-primary/5');
            });
        });
    }

    setupCharacterCounters() {
        const titleInput = document.getElementById('enhancedContentTitle');
        const descInput = document.getElementById('enhancedContentDescription');

        if (titleInput) {
            titleInput.addEventListener('input', () => {
                const count = titleInput.value.length;
                document.getElementById('titleCharCount').textContent = count;
            });
        }

        if (descInput) {
            descInput.addEventListener('input', () => {
                const count = descInput.value.length;
                document.getElementById('descCharCount').textContent = count;
            });
        }
    }

    setupBottomNavigation() {
        const navItems = document.querySelectorAll('nav a');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navItems.forEach(nav => {
                    nav.classList.remove('text-primary');
                    nav.classList.add('text-gray-500');
                });
                item.classList.remove('text-gray-500');
                item.classList.add('text-primary');
                
                const section = item.querySelector('span').textContent;
                this.showToast(`${section} section coming soon!`, 'info');
            });
        });
    }

    // Modal Functions
    openEnhancedModal() {
        const modal = document.getElementById('enhancedContentModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.populateEnhancedModalWithDefaults();
        }
    }

    openCreateModal() {
        const modal = document.getElementById('createContentModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.populateModalWithDefaults();
        }
    }

    openEditModal(content) {
        const modal = document.getElementById('createContentModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.populateModalWithContent(content);
        }
    }

    closeEnhancedModal() {
        const modal = document.getElementById('enhancedContentModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            this.clearEnhancedModalForm();
        }
    }

    closeModal() {
        const modal = document.getElementById('createContentModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            this.clearModalForm();
        }
    }

    populateEnhancedModalWithDefaults() {
        const titleInput = document.getElementById('enhancedContentTitle');
        const dateInput = document.getElementById('enhancedContentDate');
        const timeInput = document.getElementById('enhancedContentTime');
        const descInput = document.getElementById('enhancedContentDescription');

        if (titleInput) titleInput.value = '';
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        if (timeInput) timeInput.value = '12:00';
        if (descInput) descInput.value = '';

        // Reset character counters
        document.getElementById('titleCharCount').textContent = '0';
        document.getElementById('descCharCount').textContent = '0';

        // Set default platform
        this.selectPlatform('Instagram');
    }

    selectPlatform(platform) {
        const platformOptions = document.querySelectorAll('.platform-option');
        platformOptions.forEach(option => {
            option.classList.remove('border-primary', 'bg-primary/5');
            if (option.dataset.platform === platform) {
                option.classList.add('border-primary', 'bg-primary/5');
            }
        });
    }

    populateModalWithDefaults() {
        const titleInput = document.getElementById('contentTitle');
        const dateInput = document.getElementById('contentDate');
        const timeInput = document.getElementById('contentTime');
        const descInput = document.getElementById('contentDescription');

        if (titleInput) titleInput.value = '';
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        if (timeInput) timeInput.value = '12:00';
        if (descInput) descInput.value = '';
    }

    populateModalWithContent(content) {
        const titleInput = document.getElementById('contentTitle');
        const dateInput = document.getElementById('contentDate');
        const timeInput = document.getElementById('contentTime');
        const descInput = document.getElementById('contentDescription');

        if (titleInput) titleInput.value = content.title;
        if (dateInput) dateInput.value = content.date;
        if (timeInput) timeInput.value = content.time;
        if (descInput) descInput.value = content.description;

        // Store the content ID for editing
        const modal = document.getElementById('createContentModal');
        modal.dataset.editId = content.id;
    }

    clearModalForm() {
        const titleInput = document.getElementById('contentTitle');
        const dateInput = document.getElementById('contentDate');
        const timeInput = document.getElementById('contentTime');
        const descInput = document.getElementById('contentDescription');
        const modal = document.getElementById('createContentModal');

        if (titleInput) titleInput.value = '';
        if (dateInput) dateInput.value = '';
        if (timeInput) timeInput.value = '';
        if (descInput) descInput.value = '';
        if (modal) delete modal.dataset.editId;
    }

    handleEnhancedContentCreation() {
        const title = document.getElementById('enhancedContentTitle')?.value.trim();
        const date = document.getElementById('enhancedContentDate')?.value;
        const time = document.getElementById('enhancedContentTime')?.value;
        const description = document.getElementById('enhancedContentDescription')?.value.trim();
        const contentType = document.getElementById('contentTypeSelect')?.value;
        const status = document.getElementById('contentStatusSelect')?.value;
        const selectedPlatform = document.querySelector('.platform-option.border-primary')?.dataset.platform || 'Instagram';

        if (!title || !date || !time) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const contentData = {
            title,
            date,
            time,
            description,
            platform: selectedPlatform,
            type: contentType,
            status,
            color: this.getPlatformColor(selectedPlatform)
        };

        this.addContent(contentData);
        this.closeEnhancedModal();
        this.clearEnhancedModalForm();
    }

    handleSaveAsDraft() {
        const title = document.getElementById('enhancedContentTitle')?.value.trim();
        const date = document.getElementById('enhancedContentDate')?.value;
        const time = document.getElementById('enhancedContentTime')?.value;
        const description = document.getElementById('enhancedContentDescription')?.value.trim();
        const contentType = document.getElementById('contentTypeSelect')?.value;
        const selectedPlatform = document.querySelector('.platform-option.border-primary')?.dataset.platform || 'Instagram';

        const contentData = {
            title: title || 'Untitled Content',
            date: date || new Date().toISOString().split('T')[0],
            time: time || '12:00',
            description: description || '',
            platform: selectedPlatform,
            type: contentType,
            status: 'Draft',
            color: this.getPlatformColor(selectedPlatform)
        };

        this.addContent(contentData);
        this.closeEnhancedModal();
        this.clearEnhancedModalForm();
        this.showToast('Content saved as draft', 'success');
    }

    clearEnhancedModalForm() {
        this.populateEnhancedModalWithDefaults();
    }

    handleContentCreation() {
        const titleInput = document.getElementById('contentTitle');
        const dateInput = document.getElementById('contentDate');
        const timeInput = document.getElementById('contentTime');
        const descInput = document.getElementById('contentDescription');
        const modal = document.getElementById('createContentModal');

        const title = titleInput?.value.trim();
        const date = dateInput?.value;
        const time = timeInput?.value;
        const description = descInput?.value.trim();

        if (!title || !date || !time) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const contentData = {
            title,
            date,
            time,
            description,
            platform: 'Instagram', // Default platform
            type: 'Post', // Default type
            color: 'blue'
        };

        if (modal.dataset.editId) {
            this.updateContent(modal.dataset.editId, contentData);
        } else {
            this.addContent(contentData);
        }

        this.closeModal();
    }

    // Show create content option for empty dates
    showCreateContentForDate(date) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-[340px] mx-auto overflow-hidden">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="font-semibold">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    <button class="close-create-modal w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <i class="ri-close-line ri-lg"></i>
                    </button>
                </div>
                <div class="p-4">
                    <p class="text-gray-600 mb-4">No content scheduled for this date.</p>
                    <div class="flex space-x-3">
                        <button class="create-content-btn flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                            <i class="ri-add-line mr-2"></i>Create Content
                        </button>
                        <button class="cancel-create-btn flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-create-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.cancel-create-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.create-content-btn').addEventListener('click', () => {
            modal.remove();
            this.openEnhancedModalWithDate(date);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Confirm delete content
    confirmDeleteContent(content, parentModal) {
        const confirmModal = document.createElement('div');
        confirmModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        confirmModal.innerHTML = `
            <div class="bg-white rounded-lg w-[300px] mx-auto overflow-hidden">
                <div class="p-4 border-b">
                    <h3 class="font-semibold text-red-600">Delete Content</h3>
                </div>
                <div class="p-4">
                    <p class="text-gray-600 mb-4">Are you sure you want to delete "${content.title}"?</p>
                    <div class="flex space-x-3">
                        <button class="confirm-delete-btn flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                            Delete
                        </button>
                        <button class="cancel-delete-btn flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(confirmModal);

        confirmModal.querySelector('.confirm-delete-btn').addEventListener('click', () => {
            this.deleteContent(content.id);
            confirmModal.remove();
            parentModal.remove();
        });

        confirmModal.querySelector('.cancel-delete-btn').addEventListener('click', () => {
            confirmModal.remove();
        });

        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) {
                confirmModal.remove();
            }
        });
    }

    // Open enhanced modal with pre-filled date
    openEnhancedModalWithDate(date) {
        const modal = document.getElementById('enhancedContentModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Pre-fill the date
            const dateInput = document.getElementById('enhancedContentDate');
            if (dateInput) {
                dateInput.value = date;
            }
            
            this.populateEnhancedModalWithDefaults();
        }
    }

    // Content Details Modal
    showContentDetails(content, date) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-[340px] mx-auto overflow-hidden">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="font-semibold">Content for ${new Date(date).toLocaleDateString()}</h3>
                    <button class="close-details-modal w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <i class="ri-close-line ri-lg"></i>
                    </button>
                </div>
                <div class="p-4 max-h-96 overflow-y-auto">
                    ${content.map(item => this.renderContentDetail(item)).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-details-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Add event listeners for edit and delete buttons
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                return;
            }

            const contentCard = e.target.closest('[data-content-id]');
            if (!contentCard) return;

            const contentId = contentCard.dataset.contentId;
            const content = this.content.find(item => item.id === contentId);

            if (e.target.closest('.edit-content-btn')) {
                e.stopPropagation();
                modal.remove();
                this.openEditModal(content);
            } else if (e.target.closest('.delete-content-btn')) {
                e.stopPropagation();
                this.confirmDeleteContent(content, modal);
            }
        });
    }

    renderContentDetail(item) {
        const platformIcon = this.getPlatformIcon(item.platform);
        const platformColor = this.getPlatformColor(item.platform);
        const statusColor = this.getStatusColor(item.status);

        return `
            <div class="border rounded-lg p-3 mb-3" data-content-id="${item.id}">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 flex items-center justify-center ${platformColor} rounded-lg">
                            <i class="${platformIcon} text-sm ${this.getPlatformTextColor(item.platform)}"></i>
                        </div>
                        <span class="font-medium">${item.title}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-medium px-2 py-1 ${statusColor} rounded-full">${item.status}</span>
                        <button class="edit-content-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100" title="Edit">
                            <i class="ri-edit-line text-xs text-gray-500"></i>
                        </button>
                        <button class="delete-content-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100" title="Delete">
                            <i class="ri-delete-bin-line text-xs text-red-500"></i>
                        </button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mb-2">${item.description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>${item.platform} • ${item.type}</span>
                    <span>${item.time}</span>
                </div>
            </div>
        `;
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-600' : 
                       type === 'error' ? 'bg-red-600' : 'bg-blue-600';
        
        toast.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-lg text-sm z-50`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N: New content
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openEnhancedModal();
            }
            
            // Escape: Close modals
            if (e.key === 'Escape') {
                this.closeEnhancedModal();
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigatePrevious();
            }
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateNext();
            }
            
            // T: Jump to today
            if (e.key === 't' || e.key === 'T') {
                e.preventDefault();
                this.jumpToToday();
            }
        });
    }

    setupAdditionalInteractions() {
        // Add hover effects to all interactive elements
        const interactiveElements = document.querySelectorAll('button, .calendar-cell, [data-content-id], .platform-option, .filter-chip');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!element.classList.contains('calendar-cell')) {
                    element.style.transform = 'scale(1.02)';
                    element.style.transition = 'transform 0.2s ease';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (!element.classList.contains('calendar-cell')) {
                    element.style.transform = 'scale(1)';
                }
            });
        });

        // Add click feedback to all buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Content Flow App initializing...');
    window.contentFlowApp = new ContentFlowApp();
    console.log('Content Flow App initialized successfully');
}); 