// Content Flow App - Main JavaScript
class ContentFlowApp {
    constructor() {
        this.currentDate = new Date();
        this.currentView = 'week';
        this.activeFilters = ['All'];
        this.content = [];
        this.templates = [];
        this.selectedItems = new Set();
        this.isDragMode = false;
        this.draggedItem = null;
        
        this.init();
    }

    init() {
        this.loadContent();
        this.loadTemplates();
        this.renderCalendar();
        this.renderUpcomingContent();
        this.updateDateDisplay();
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupBulkActions();
        this.setupDataPersistence();
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
            this.content = JSON.parse(saved);
        } else {
            this.content = this.getDefaultContent();
        }
    }

    saveContent() {
        localStorage.setItem('contentFlowData', JSON.stringify(this.content));
    }

    loadTemplates() {
        const savedTemplates = localStorage.getItem('contentFlowTemplates');
        if (savedTemplates) {
            this.templates = JSON.parse(savedTemplates);
        } else {
            this.templates = this.getDefaultTemplates();
        }
    }

    saveTemplates() {
        localStorage.setItem('contentFlowTemplates', JSON.stringify(this.templates));
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

    getDefaultTemplates() {
        return [
            {
                id: '1',
                title: 'Basic Post Template',
                platform: 'All',
                type: 'Post',
                content: {
                    title: 'New Product Launch',
                    description: 'Announcing our latest product line. Stay tuned for more details!',
                    hashtags: '#NewProduct #Launch #Fashion #Trends'
                }
            },
            {
                id: '2',
                title: 'Instagram Story Template',
                platform: 'Instagram',
                type: 'Story',
                content: {
                    title: 'Daily Highlight',
                    description: 'Share a daily highlight from our studio.',
                    hashtags: '#DailyLife #Studio #Fashion #BehindTheScenes'
                }
            },
            {
                id: '3',
                title: 'Twitter Post Template',
                platform: 'Twitter',
                type: 'Post',
                content: {
                    title: 'Weekly Update',
                    description: 'Weekly update on our latest content and upcoming plans.',
                    hashtags: '#WeeklyUpdate #Content #Strategy #SocialMedia'
                }
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
        const isSelected = this.selectedItems.has(item.id);

        return `
            <div class="content-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${isSelected ? 'selected' : ''}" 
                 data-content-id="${item.id}" 
                 draggable="true">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" class="select-checkbox w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" ${isSelected ? 'checked' : ''}>
                        <div class="w-8 h-8 flex items-center justify-center ${platformColor} rounded-lg">
                            <i class="${platformIcon} text-sm ${this.getPlatformTextColor(item.platform)}"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">${item.title}</h4>
                            <p class="text-sm text-gray-500">${item.platform} • ${item.type}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-medium px-2 py-1 ${statusColor} rounded-full">${item.status}</span>
                        <button class="share-content-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100" title="Share" data-content-id="${item.id}">
                            <i class="ri-share-line text-xs text-gray-500"></i>
                        </button>
                        <button class="create-template-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100" title="Save as Template" data-content-id="${item.id}">
                            <i class="ri-save-line text-xs text-gray-500"></i>
                        </button>
                        <button class="edit-content-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100" title="Edit">
                            <i class="ri-edit-line text-xs text-gray-500"></i>
                        </button>
                        <button class="delete-content-btn w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100" title="Delete">
                            <i class="ri-delete-bin-line text-xs text-red-500"></i>
                        </button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mb-3">${item.description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>${this.formatContentDate(item.date, item.time)}</span>
                    <div class="flex space-x-2">
                        <span class="px-2 py-1 bg-gray-100 rounded">${item.platform}</span>
                        <span class="px-2 py-1 bg-gray-100 rounded">${item.type}</span>
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
        this.setupSectionNavigation();
        this.setupFilterChips();
        this.setupDateNavigation();
        this.setupModal();
        this.setupBottomNavigation();
        this.setupExportDropdowns();
        this.setupTemplateSelection();
        this.setupBulkActionUI();
        this.setupDarkMode();
        this.setupNotifications();
        this.setupProfileDropdown();
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

    setupSectionNavigation() {
        const navButtons = document.querySelectorAll('.nav-button');
        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the section from data attribute
                const section = button.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(section) {
        // Hide all sections
        const sections = document.querySelectorAll('.section-content');
        sections.forEach(s => s.classList.add('hidden'));
        
        // Show the selected section
        const targetSection = document.getElementById(`${section}Section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Update navigation button colors
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(btn => {
            if (btn.dataset.section === section) {
                btn.classList.add('text-primary');
                btn.classList.remove('text-gray-500');
            } else {
                btn.classList.remove('text-primary');
                btn.classList.add('text-gray-500');
            }
        });
        
        // Load section-specific content
        this.loadSectionContent(section);
    }

    loadSectionContent(section) {
        switch(section) {
            case 'library':
                this.renderLibraryContent();
                break;
            case 'analytics':
                this.renderAnalyticsContent();
                break;
            case 'settings':
                this.renderSettingsContent();
                break;
            case 'profile':
                this.renderProfileContent();
                break;
            case 'calendar':
                this.renderCalendar();
                this.renderUpcomingContent();
                break;
        }
    }

    renderLibraryContent() {
        const libraryContainer = document.getElementById('libraryContent');
        if (!libraryContainer) return;
        
        // Sample library content
        const libraryItems = [
            { id: 1, title: 'Brand Guidelines', type: 'Document', platform: 'All', date: '2025-01-15' },
            { id: 2, title: 'Product Photos', type: 'Media', platform: 'Instagram', date: '2025-01-10' },
            { id: 3, title: 'Video Templates', type: 'Template', platform: 'TikTok', date: '2025-01-08' },
            { id: 4, title: 'Caption Templates', type: 'Text', platform: 'All', date: '2025-01-05' },
            { id: 5, title: 'Hashtag Sets', type: 'Text', platform: 'Instagram', date: '2025-01-03' },
            { id: 6, title: 'Analytics Reports', type: 'Document', platform: 'All', date: '2025-01-01' }
        ];
        
        libraryContainer.innerHTML = libraryItems.map(item => `
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <i class="ri-folder-line text-gray-500"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900">${item.title}</h4>
                            <p class="text-sm text-gray-500">${item.type} • ${item.platform}</p>
                        </div>
                    </div>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <i class="ri-more-2-fill text-gray-400"></i>
                    </button>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>Added ${new Date(item.date).toLocaleDateString()}</span>
                    <div class="flex space-x-2">
                        <button class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">View</button>
                        <button class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Edit</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAnalyticsContent() {
        const chartsContainer = document.getElementById('analyticsCharts');
        if (!chartsContainer) return;
        
        // Sample analytics charts content
        chartsContainer.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium mb-4">Engagement Over Time</h4>
                    <div class="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <p class="text-gray-500">Chart placeholder - Engagement data</p>
                    </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium mb-4">Platform Performance</h4>
                    <div class="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <p class="text-gray-500">Chart placeholder - Platform comparison</p>
                    </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium mb-4">Content Type Analysis</h4>
                    <div class="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <p class="text-gray-500">Chart placeholder - Content type breakdown</p>
                    </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium mb-4">Audience Growth</h4>
                    <div class="h-48 bg-gray-50 rounded flex items-center justify-center">
                        <p class="text-gray-500">Chart placeholder - Growth metrics</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderSettingsContent() {
        const platformConnections = document.getElementById('platformConnections');
        if (!platformConnections) return;
        
        const platforms = [
            { name: 'Instagram', connected: true, icon: 'ri-instagram-line', color: 'text-pink-500' },
            { name: 'Twitter', connected: true, icon: 'ri-twitter-line', color: 'text-blue-500' },
            { name: 'YouTube', connected: false, icon: 'ri-youtube-line', color: 'text-red-500' },
            { name: 'TikTok', connected: false, icon: 'ri-tiktok-line', color: 'text-purple-500' },
            { name: 'LinkedIn', connected: true, icon: 'ri-linkedin-box-line', color: 'text-blue-600' },
            { name: 'Facebook', connected: false, icon: 'ri-facebook-box-line', color: 'text-blue-700' }
        ];
        
        platformConnections.innerHTML = platforms.map(platform => `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="${platform.icon} ${platform.color} text-lg"></i>
                    <span class="text-sm text-gray-600">${platform.name}</span>
                </div>
                <button class="px-3 py-1 text-xs rounded-full ${platform.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
                    ${platform.connected ? 'Connected' : 'Connect'}
                </button>
            </div>
        `).join('');
    }

    renderProfileContent() {
        // Profile content is already rendered in HTML, just update any dynamic data
        const totalContent = this.content.length;
        const publishedContent = this.content.filter(item => item.status === 'Published').length;
        const draftContent = this.content.filter(item => item.status === 'Draft').length;
        const scheduledContent = this.content.filter(item => item.status === 'Scheduled').length;

        // Update statistics if elements exist
        const totalContentEl = document.querySelector('#profileSection .bg-gray-50:nth-child(1) .text-2xl');
        const publishedEl = document.querySelector('#profileSection .bg-gray-50:nth-child(2) .text-2xl');
        const draftsEl = document.querySelector('#profileSection .bg-gray-50:nth-child(3) .text-2xl');
        const scheduledEl = document.querySelector('#profileSection .bg-gray-50:nth-child(4) .text-2xl');

        if (totalContentEl) totalContentEl.textContent = totalContent;
        if (publishedEl) publishedEl.textContent = publishedContent;
        if (draftsEl) draftsEl.textContent = draftContent;
        if (scheduledEl) scheduledEl.textContent = scheduledContent;
    }

    switchView(viewType) {
        console.log('Switching to view:', viewType);
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
        console.log('Rendering week view');
        // Current implementation is already week view
        this.renderCalendar();
        this.updateDateDisplay();
        this.showToast('Week view active', 'info');
    }

    renderMonthView() {
        console.log('Rendering month view');
        let calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) {
            console.error('Calendar grid not found for month view');
            return;
        }

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
        this.showToast('Month view active', 'info');
    }

    renderDayView() {
        console.log('Rendering day view');
        let calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) {
            console.error('Calendar grid not found for day view');
            return;
        }

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
                    <button class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 create-content-day-btn" data-date="${currentDate.toISOString().split('T')[0]}">
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
        this.updateDayDisplay();
        this.showToast('Day view active', 'info');
    }

    updateMonthDisplay() {
        const dateDisplay = document.getElementById('dateDisplay');
        if (dateDisplay) {
            const monthName = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            dateDisplay.textContent = monthName;
        }
    }

    updateDayDisplay() {
        const dateDisplay = document.getElementById('dateDisplay');
        if (dateDisplay) {
            const dayName = this.currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            dateDisplay.textContent = dayName;
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
        
        // Add event listener for create content day button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('create-content-day-btn')) {
                const date = e.target.dataset.date;
                this.openEnhancedModalWithDate(date);
            }
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

            // Add event listeners for share and create template buttons
            const shareBtn = card.querySelector('.share-content-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const contentId = shareBtn.dataset.contentId;
                    this.shareContent(contentId);
                });
            }

            const createTemplateBtn = card.querySelector('.create-template-btn');
            if (createTemplateBtn) {
                createTemplateBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const contentId = createTemplateBtn.dataset.contentId;
                    this.createTemplateFromContent(contentId);
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

    setupDragAndDrop() {
        let draggedItem = null;
        let currentTarget = null;

        const calendarCells = document.querySelectorAll('.calendar-cell');
        const contentCards = document.querySelectorAll('[data-content-id]');

        calendarCells.forEach(cell => {
            cell.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                currentTarget = null;
                e.dataTransfer.setData('text/plain', e.target.dataset.date);
                e.dataTransfer.effectAllowed = 'move';
                e.target.classList.add('dragging');
            });

            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('calendar-cell') && e.target.dataset.date !== draggedItem.dataset.date) {
                    e.target.classList.add('drag-over');
                }
            });

            cell.addEventListener('dragleave', (e) => {
                if (e.target.classList.contains('drag-over')) {
                    e.target.classList.remove('drag-over');
                }
            });

            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('calendar-cell') && e.target.dataset.date !== draggedItem.dataset.date) {
                    const date = e.target.dataset.date;
                    const content = this.content.find(item => item.date === draggedItem.dataset.date);
                    if (content) {
                        this.updateContent(content.id, { date: date });
                        this.renderCalendar();
                        this.renderUpcomingContent();
                        this.showToast('Content moved successfully!', 'success');
                    }
                }
                if (e.target.classList.contains('drag-over')) {
                    e.target.classList.remove('drag-over');
                }
                draggedItem.classList.remove('dragging');
                draggedItem = null;
            });
        });

        contentCards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                currentTarget = null;
                e.dataTransfer.setData('text/plain', e.target.dataset.contentId);
                e.dataTransfer.effectAllowed = 'move';
                e.target.classList.add('dragging');
            });

            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('calendar-cell')) {
                    e.target.classList.add('drag-over');
                }
            });

            card.addEventListener('dragleave', (e) => {
                if (e.target.classList.contains('drag-over')) {
                    e.target.classList.remove('drag-over');
                }
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('calendar-cell')) {
                    const date = e.target.dataset.date;
                    const content = this.content.find(item => item.id === draggedItem.dataset.contentId);
                    if (content) {
                        this.updateContent(content.id, { date: date });
                        this.renderCalendar();
                        this.renderUpcomingContent();
                        this.showToast('Content moved successfully!', 'success');
                    }
                }
                if (e.target.classList.contains('drag-over')) {
                    e.target.classList.remove('drag-over');
                }
                draggedItem.classList.remove('dragging');
                draggedItem = null;
            });
        });
    }

    setupBulkActions() {
        const bulkActions = document.getElementById('bulkActions');
        const selectAllBtn = document.getElementById('selectAllBtn');
        const deselectAllBtn = document.getElementById('deselectAllBtn');
        const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
        const applyBulkActionBtn = document.getElementById('applyBulkActionBtn');

        if (bulkActions) {
            selectAllBtn.addEventListener('click', () => {
                this.selectAllContent();
            });
            deselectAllBtn.addEventListener('click', () => {
                this.deselectAllContent();
            });
            deleteSelectedBtn.addEventListener('click', () => {
                this.confirmDeleteSelectedContent();
            });
            applyBulkActionBtn.addEventListener('click', () => {
                this.applyBulkAction();
            });
        }
    }

    selectAllContent() {
        const contentCards = document.querySelectorAll('[data-content-id]');
        contentCards.forEach(card => {
            card.classList.add('selected');
            this.selectedItems.add(card.dataset.contentId);
        });
    }

    deselectAllContent() {
        const contentCards = document.querySelectorAll('[data-content-id]');
        contentCards.forEach(card => {
            card.classList.remove('selected');
            this.selectedItems.delete(card.dataset.contentId);
        });
    }

    confirmDeleteSelectedContent() {
        if (this.selectedItems.size === 0) {
            this.showToast('No content selected for deletion.', 'info');
            return;
        }

        const confirmModal = document.createElement('div');
        confirmModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        confirmModal.innerHTML = `
            <div class="bg-white rounded-lg w-[300px] mx-auto overflow-hidden">
                <div class="p-4 border-b">
                    <h3 class="font-semibold text-red-600">Delete Selected Content</h3>
                </div>
                <div class="p-4">
                    <p class="text-gray-600 mb-4">Are you sure you want to delete ${this.selectedItems.size} selected content items?</p>
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
            this.deleteSelectedContent();
            confirmModal.remove();
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

    deleteSelectedContent() {
        const initialSelectedCount = this.selectedItems.size;
        this.content = this.content.filter(item => !this.selectedItems.has(item.id));
        this.saveContent();
        this.renderCalendar();
        this.renderUpcomingContent();
        this.selectedItems.clear();
        this.showToast(`Deleted ${initialSelectedCount} content items.`, 'success');
    }

    applyBulkAction() {
        if (this.selectedItems.size === 0) {
            this.showToast('No content selected for bulk action.', 'info');
            return;
        }

        const action = document.getElementById('bulkActionSelect')?.value;
        if (!action) {
            this.showToast('Please select a bulk action.', 'info');
            return;
        }

        if (action === 'delete') {
            this.confirmDeleteSelectedContent();
        } else {
            this.showToast(`Bulk action "${action}" not yet implemented.`, 'info');
        }
    }

    setupDataPersistence() {
        // Auto-save content every 30 seconds
        setInterval(() => {
            this.saveContent();
            this.saveTemplates();
        }, 30000);
    }

    // Export functionality
    exportToCSV() {
        const headers = ['Title', 'Platform', 'Type', 'Date', 'Time', 'Status', 'Description'];
        const csvContent = [
            headers.join(','),
            ...this.content.map(item => [
                `"${item.title}"`,
                item.platform,
                item.type,
                item.date,
                item.time,
                item.status,
                `"${item.description}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `content-flow-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.showToast('Content exported to CSV successfully!', 'success');
    }

    exportToPDF() {
        // Create a simple PDF-like export using HTML
        const printWindow = window.open('', '_blank');
        const content = this.content.map(item => `
            <div style="border: 1px solid #ccc; margin: 10px 0; padding: 15px; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">${item.title}</h3>
                <p style="margin: 5px 0; color: #666;"><strong>Platform:</strong> ${item.platform}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Type:</strong> ${item.type}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Date:</strong> ${item.date} at ${item.time}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Status:</strong> ${item.status}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Description:</strong> ${item.description}</p>
            </div>
        `).join('');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Content Flow Export</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #6366f1; text-align: center; }
                    .header { text-align: center; margin-bottom: 30px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Content Flow - Content Export</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                ${content}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        this.showToast('Content exported to PDF successfully!', 'success');
    }

    // Template functionality
    applyTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) {
            this.showToast('Template not found!', 'error');
            return;
        }

        const titleInput = document.getElementById('enhancedContentTitle');
        const descriptionInput = document.getElementById('enhancedContentDescription');
        const platformOptions = document.querySelectorAll('.platform-option');
        const contentTypeSelect = document.getElementById('contentTypeSelect');

        if (titleInput) titleInput.value = template.content.title;
        if (descriptionInput) descriptionInput.value = template.content.description;
        if (contentTypeSelect) contentTypeSelect.value = template.type;

        // Select platform
        platformOptions.forEach(option => {
            if (option.dataset.platform === template.platform || template.platform === 'All') {
                option.classList.add('selected');
                option.style.borderColor = '#6366f1';
            } else {
                option.classList.remove('selected');
                option.style.borderColor = '#e5e7eb';
            }
        });

        this.showToast(`Template "${template.title}" applied!`, 'success');
    }

    createTemplateFromContent(contentId) {
        const content = this.content.find(item => item.id === contentId);
        if (!content) {
            this.showToast('Content not found!', 'error');
            return;
        }

        const templateName = prompt('Enter template name:');
        if (!templateName) return;

        const newTemplate = {
            id: Date.now().toString(),
            title: templateName,
            platform: content.platform,
            type: content.type,
            content: {
                title: content.title,
                description: content.description,
                hashtags: content.hashtags || ''
            }
        };

        this.templates.push(newTemplate);
        this.saveTemplates();
        this.showToast(`Template "${templateName}" created successfully!`, 'success');
    }

    // Advanced analytics
    generateAnalyticsReport() {
        const platformStats = {};
        const statusStats = {};
        const typeStats = {};

        this.content.forEach(item => {
            // Platform stats
            platformStats[item.platform] = (platformStats[item.platform] || 0) + 1;
            
            // Status stats
            statusStats[item.status] = (statusStats[item.status] || 0) + 1;
            
            // Type stats
            typeStats[item.type] = (typeStats[item.type] || 0) + 1;
        });

        return {
            totalContent: this.content.length,
            platformStats,
            statusStats,
            typeStats,
            upcomingContent: this.content.filter(item => new Date(item.date) > new Date()).length,
            pastContent: this.content.filter(item => new Date(item.date) < new Date()).length
        };
    }

    // Team collaboration features
    shareContent(contentId) {
        const content = this.content.find(item => item.id === contentId);
        if (!content) {
            this.showToast('Content not found!', 'error');
            return;
        }

        const shareData = {
            title: content.title,
            text: `Check out this content: ${content.title}`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(JSON.stringify(content, null, 2));
            this.showToast('Content data copied to clipboard!', 'success');
        }
    }

    // Advanced settings
    setTheme(theme) {
        console.log('Setting theme to:', theme);
        
        // Remove existing theme classes
        document.documentElement.classList.remove('dark');
        
        switch (theme) {
            case 'system':
                localStorage.removeItem('darkMode');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemPrefersDark) {
                    document.documentElement.classList.add('dark');
                }
                this.showToast('Theme set to system preference', 'success');
                break;
                
            case 'dark':
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
                this.showToast('Dark theme enabled', 'success');
                break;
                
            case 'light':
                localStorage.setItem('darkMode', 'false');
                this.showToast('Light theme enabled', 'success');
                break;
        }
        
        // Update the theme selector
        this.updateThemeSelector();
    }
    
    toggleDarkMode() {
        console.log('Toggle dark mode called');
        console.log('Before toggle - HTML classes:', document.documentElement.className);
        
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        
        console.log('After toggle - HTML classes:', document.documentElement.className);
        console.log('Is dark mode:', isDark);
        
        localStorage.setItem('darkMode', isDark);
        
        // Update the settings dark mode toggle
        this.updateSettingsDarkModeToggle();
        
        this.showToast(`Dark mode ${isDark ? 'enabled' : 'disabled'}!`, 'success');
    }

    toggleAutoSave() {
        const autoSave = localStorage.getItem('autoSave') === 'true';
        localStorage.setItem('autoSave', !autoSave);
        this.showToast(`Auto-save ${!autoSave ? 'enabled' : 'disabled'}!`, 'success');
    }

    // Export dropdown functionality
    setupExportDropdowns() {
        const exportBtn = document.getElementById('exportDropdownBtn');
        const exportDropdown = document.getElementById('exportDropdown');
        const templatesBtn = document.getElementById('templatesDropdownBtn');
        const templatesDropdown = document.getElementById('templatesDropdown');

        if (exportBtn && exportDropdown) {
            exportBtn.addEventListener('click', () => {
                exportDropdown.classList.toggle('hidden');
                templatesDropdown.classList.add('hidden');
            });
        }

        if (templatesBtn && templatesDropdown) {
            templatesBtn.addEventListener('click', () => {
                templatesDropdown.classList.toggle('hidden');
                exportDropdown.classList.add('hidden');
                this.populateTemplatesDropdown();
            });
        }

        // Add event listeners for export buttons
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener('click', () => {
                this.exportToCSV();
                exportDropdown.classList.add('hidden');
            });
        }

        const exportPdfBtn = document.getElementById('exportPdfBtn');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
                this.exportToPDF();
                exportDropdown.classList.add('hidden');
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#exportDropdownBtn') && !e.target.closest('#exportDropdown')) {
                exportDropdown?.classList.add('hidden');
            }
            if (!e.target.closest('#templatesDropdownBtn') && !e.target.closest('#templatesDropdown')) {
                templatesDropdown?.classList.add('hidden');
            }
        });
    }

    populateTemplatesDropdown() {
        const templatesList = document.getElementById('templatesList');
        const templateSelect = document.getElementById('templateSelect');
        
        if (templatesList) {
            templatesList.innerHTML = this.templates.map(template => `
                <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between template-btn" data-template-id="${template.id}">
                    <div>
                        <div class="font-medium">${template.title}</div>
                        <div class="text-xs text-gray-500">${template.platform} • ${template.type}</div>
                    </div>
                    <i class="ri-arrow-right-s-line text-gray-400"></i>
                </button>
            `).join('');
            
            // Add event listeners to template buttons
            const templateButtons = templatesList.querySelectorAll('.template-btn');
            templateButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const templateId = button.dataset.templateId;
                    this.applyTemplate(templateId);
                });
            });
        }

        if (templateSelect) {
            const currentValue = templateSelect.value;
            templateSelect.innerHTML = '<option value="">Choose a template...</option>' + 
                this.templates.map(template => 
                    `<option value="${template.id}">${template.title} (${template.platform})</option>`
                ).join('');
            templateSelect.value = currentValue;
        }
    }

    setupTemplateSelection() {
        const applyTemplateBtn = document.getElementById('applyTemplateBtn');
        const saveAsTemplateBtn = document.getElementById('saveAsTemplateBtn');
        const templateSelect = document.getElementById('templateSelect');

        if (applyTemplateBtn) {
            applyTemplateBtn.addEventListener('click', () => {
                const selectedTemplate = templateSelect?.value;
                if (selectedTemplate) {
                    this.applyTemplate(selectedTemplate);
                } else {
                    this.showToast('Please select a template first.', 'info');
                }
            });
        }

        if (saveAsTemplateBtn) {
            saveAsTemplateBtn.addEventListener('click', () => {
                const title = document.getElementById('enhancedContentTitle')?.value;
                const description = document.getElementById('enhancedContentDescription')?.value;
                const platform = document.querySelector('.platform-option.selected')?.dataset.platform;
                const type = document.getElementById('contentTypeSelect')?.value;

                if (!title || !description || !platform || !type) {
                    this.showToast('Please fill in all required fields before saving as template.', 'info');
                    return;
                }

                const templateName = prompt('Enter template name:');
                if (!templateName) return;

                const newTemplate = {
                    id: Date.now().toString(),
                    title: templateName,
                    platform: platform,
                    type: type,
                    content: {
                        title: title,
                        description: description,
                        hashtags: ''
                    }
                };

                this.templates.push(newTemplate);
                this.saveTemplates();
                this.populateTemplatesDropdown();
                this.showToast(`Template "${templateName}" created successfully!`, 'success');
            });
        }
    }

    setupBulkActionUI() {
        // Add click handlers to content cards for selection
        document.addEventListener('click', (e) => {
            const contentCard = e.target.closest('[data-content-id]');
            if (contentCard && e.target.closest('.select-checkbox')) {
                const contentId = contentCard.dataset.contentId;
                if (this.selectedItems.has(contentId)) {
                    this.selectedItems.delete(contentId);
                    contentCard.classList.remove('selected');
                } else {
                    this.selectedItems.add(contentId);
                    contentCard.classList.add('selected');
                }
                this.updateBulkActionUI();
            }
        });
    }

    updateBulkActionUI() {
        const bulkActions = document.getElementById('bulkActions');
        const selectedCount = document.getElementById('selectedCount');
        
        if (bulkActions && selectedCount) {
            if (this.selectedItems.size > 0) {
                bulkActions.classList.remove('hidden');
                selectedCount.textContent = this.selectedItems.size;
            } else {
                bulkActions.classList.add('hidden');
            }
        }
    }

    setupDarkMode() {
        console.log('Setting up dark mode');
        
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        console.log('Saved dark mode:', savedDarkMode);
        
        // If no saved preference, use system preference
        if (savedDarkMode === null) {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log('System prefers dark:', systemPrefersDark);
            
            if (systemPrefersDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
                console.log('Applied system dark mode preference');
            } else {
                localStorage.setItem('darkMode', 'false');
                console.log('Applied system light mode preference');
            }
        } else if (savedDarkMode === 'true') {
            document.documentElement.classList.add('dark');
            console.log('Added dark class to HTML element');
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('darkMode', 'true');
                    console.log('System switched to dark mode');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('darkMode', 'false');
                    console.log('System switched to light mode');
                }
                this.updateThemeSelector();
            }
        });

        // Add event listener for theme selector
        const themeSelect = document.getElementById('themeSelect');
        console.log('Theme select found:', !!themeSelect);
        
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                console.log('Theme changed to:', e.target.value);
                this.setTheme(e.target.value);
            });
        }

        // Update theme selector state on page load
        this.updateThemeSelector();
        
        // Setup settings toggles
        this.setupSettingsToggles();
    }

    setupSettingsToggles() {
        // Email Notifications Toggle
        const emailToggle = document.getElementById('emailNotificationsToggle');
        const emailSlider = document.getElementById('emailNotificationsSlider');
        
        if (emailToggle && emailSlider) {
            // Load saved state
            const emailEnabled = localStorage.getItem('emailNotifications') !== 'false';
            this.updateToggleState(emailToggle, emailSlider, emailEnabled);
            
            emailToggle.addEventListener('click', () => {
                const newState = !this.isToggleEnabled(emailToggle);
                this.updateToggleState(emailToggle, emailSlider, newState);
                localStorage.setItem('emailNotifications', newState);
                this.showToast(`Email notifications ${newState ? 'enabled' : 'disabled'}`, 'success');
            });
        }
        
        // Push Notifications Toggle
        const pushToggle = document.getElementById('pushNotificationsToggle');
        const pushSlider = document.getElementById('pushNotificationsSlider');
        
        if (pushToggle && pushSlider) {
            // Load saved state
            const pushEnabled = localStorage.getItem('pushNotifications') === 'true';
            this.updateToggleState(pushToggle, pushSlider, pushEnabled);
            
            pushToggle.addEventListener('click', () => {
                const newState = !this.isToggleEnabled(pushToggle);
                this.updateToggleState(pushToggle, pushSlider, newState);
                localStorage.setItem('pushNotifications', newState);
                this.showToast(`Push notifications ${newState ? 'enabled' : 'disabled'}`, 'success');
            });
        }
        
        // Auto-save Drafts Toggle
        const autoSaveToggle = document.getElementById('autoSaveToggle');
        const autoSaveSlider = document.getElementById('autoSaveSlider');
        
        if (autoSaveToggle && autoSaveSlider) {
            // Load saved state
            const autoSaveEnabled = localStorage.getItem('autoSave') !== 'false';
            this.updateToggleState(autoSaveToggle, autoSaveSlider, autoSaveEnabled);
            
            autoSaveToggle.addEventListener('click', () => {
                const newState = !this.isToggleEnabled(autoSaveToggle);
                this.updateToggleState(autoSaveToggle, autoSaveSlider, newState);
                localStorage.setItem('autoSave', newState);
                this.showToast(`Auto-save ${newState ? 'enabled' : 'disabled'}`, 'success');
            });
        }
    }
    
    isToggleEnabled(toggle) {
        return toggle.classList.contains('bg-primary');
    }
    
    updateToggleState(toggle, slider, enabled) {
        if (enabled) {
            toggle.classList.remove('bg-gray-300');
            toggle.classList.add('bg-primary');
            slider.classList.remove('left-0.5');
            slider.classList.add('right-0.5');
        } else {
            toggle.classList.remove('bg-primary');
            toggle.classList.add('bg-gray-300');
            slider.classList.remove('right-0.5');
            slider.classList.add('left-0.5');
        }
    }
    
    updateThemeSelector() {
        const themeSelect = document.getElementById('themeSelect');
        
        if (themeSelect) {
            const savedDarkMode = localStorage.getItem('darkMode');
            const isDark = document.documentElement.classList.contains('dark');
            
            if (savedDarkMode === null) {
                // System preference
                themeSelect.value = 'system';
            } else if (savedDarkMode === 'true') {
                themeSelect.value = 'dark';
            } else {
                themeSelect.value = 'light';
            }
        }
    }
    
    updateSettingsDarkModeToggle() {
        const settingsDarkModeToggle = document.getElementById('settingsDarkModeToggle');
        const settingsDarkModeSlider = document.getElementById('settingsDarkModeSlider');
        
        if (settingsDarkModeToggle && settingsDarkModeSlider) {
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                settingsDarkModeToggle.classList.remove('bg-gray-300');
                settingsDarkModeToggle.classList.add('bg-primary');
                settingsDarkModeSlider.classList.remove('left-0.5');
                settingsDarkModeSlider.classList.add('right-0.5');
            } else {
                settingsDarkModeToggle.classList.remove('bg-primary');
                settingsDarkModeToggle.classList.add('bg-gray-300');
                settingsDarkModeSlider.classList.remove('right-0.5');
                settingsDarkModeSlider.classList.add('left-0.5');
            }
        }
    }

    setupNotifications() {
        const notificationsBtn = document.getElementById('notificationsBtn');
        const notificationsDropdown = document.getElementById('notificationsDropdown');
        const markAllReadBtn = document.getElementById('markAllReadBtn');

        if (notificationsBtn && notificationsDropdown) {
            notificationsBtn.addEventListener('click', () => {
                notificationsDropdown.classList.toggle('hidden');
                this.populateNotifications();
            });
        }

        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.markAllNotificationsAsRead();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#notificationsBtn') && !e.target.closest('#notificationsDropdown')) {
                notificationsDropdown?.classList.add('hidden');
            }
        });

        // Initialize notifications
        this.initializeNotifications();
    }

    setupProfileDropdown() {
        const profileButton = document.getElementById('profileBtn');
        const profileDropdown = document.getElementById('profileDropdown');
        
        if (profileButton && profileDropdown) {
            profileButton.addEventListener('click', () => {
                profileDropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                    profileDropdown.classList.add('hidden');
                }
            });
        }
        
        // Add event listeners for profile dropdown buttons
        const profileSettingsBtn = document.getElementById('profileSettingsBtn');
        if (profileSettingsBtn) {
            profileSettingsBtn.addEventListener('click', () => {
                this.openProfileSettings();
            });
        }
        
        const accountSettingsBtn = document.getElementById('accountSettingsBtn');
        if (accountSettingsBtn) {
            accountSettingsBtn.addEventListener('click', () => {
                this.openAccountSettings();
            });
        }
        
        const helpCenterBtn = document.getElementById('helpCenterBtn');
        if (helpCenterBtn) {
            helpCenterBtn.addEventListener('click', () => {
                this.openHelpCenter();
            });
        }
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
    }

    initializeNotifications() {
        // Sample notifications data
        this.notifications = [
            {
                id: 1,
                type: 'content',
                title: 'Content Published',
                message: 'Your Instagram post "Summer Collection" has been published successfully.',
                time: '2 minutes ago',
                read: false,
                icon: 'ri-instagram-line',
                color: 'text-pink-500'
            },
            {
                id: 2,
                type: 'reminder',
                title: 'Content Due Soon',
                message: 'You have 3 pieces of content scheduled for tomorrow.',
                time: '1 hour ago',
                read: false,
                icon: 'ri-time-line',
                color: 'text-orange-500'
            },
            {
                id: 3,
                type: 'analytics',
                title: 'Weekly Report',
                message: 'Your weekly performance report is ready to view.',
                time: '3 hours ago',
                read: true,
                icon: 'ri-bar-chart-line',
                color: 'text-blue-500'
            },
            {
                id: 4,
                type: 'system',
                title: 'System Update',
                message: 'New features have been added to Content Flow.',
                time: '1 day ago',
                read: true,
                icon: 'ri-notification-line',
                color: 'text-gray-500'
            }
        ];

        this.updateNotificationBadge();
    }

    populateNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;

        if (this.notifications.length === 0) {
            notificationsList.innerHTML = `
                <div class="p-4 text-center text-gray-500">
                    <i class="ri-notification-off-line text-2xl mb-2"></i>
                    <p>No notifications</p>
                </div>
            `;
            return;
        }

        notificationsList.innerHTML = this.notifications.map(notification => `
            <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer notification-item ${!notification.read ? 'bg-blue-50' : ''}" data-notification-id="${notification.id}">
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 flex items-center justify-center ${notification.color} bg-gray-100 rounded-full">
                        <i class="${notification.icon} text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <h5 class="text-sm font-medium text-gray-900">${notification.title}</h5>
                            <span class="text-xs text-gray-500">${notification.time}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${notification.message}</p>
                        ${!notification.read ? '<div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to notification items
        const notificationItems = notificationsList.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', () => {
                const notificationId = parseInt(item.dataset.notificationId);
                this.handleNotificationClick(notificationId);
            });
        });
    }

    handleNotificationClick(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.updateNotificationBadge();
            this.populateNotifications();
        }

        // Handle different notification types
        switch (notification.type) {
            case 'content':
                this.showToast('Content management feature opened', 'success');
                break;
            case 'reminder':
                this.showToast('Reminder feature opened', 'info');
                break;
            case 'analytics':
                this.switchSection('analytics');
                this.showToast('Analytics section opened', 'success');
                break;
            case 'system':
                this.showToast('System information displayed', 'info');
                break;
        }
    }

    markAllNotificationsAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.updateNotificationBadge();
        this.populateNotifications();
        this.showToast('All notifications marked as read', 'success');
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        const unreadCount = this.notifications.filter(n => !n.read).length;
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    // Profile and account management methods
    openProfileSettings() {
        // Close profile dropdown
        const profileDropdown = document.getElementById('profileDropdown');
        if (profileDropdown) {
            profileDropdown.classList.add('hidden');
        }

        // Navigate to profile section
        this.switchSection('profile');
        this.showToast('Profile page opened', 'success');
    }

    openAccountSettings() {
        this.switchSection('settings');
        this.showToast('Account settings opened', 'success');
    }

    openHelpCenter() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-[600px] mx-auto overflow-hidden max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="font-semibold text-lg">Help & Support</h3>
                    <button class="close-help-modal w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="space-y-4">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium mb-2">Getting Started</h4>
                            <p class="text-sm text-gray-600">Learn how to create your first content and schedule it for publication.</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium mb-2">Content Templates</h4>
                            <p class="text-sm text-gray-600">Use pre-built templates to speed up your content creation process.</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium mb-2">Analytics</h4>
                            <p class="text-sm text-gray-600">Track your content performance and engagement metrics.</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium mb-2">Export Data</h4>
                            <p class="text-sm text-gray-600">Export your content data to CSV or PDF formats.</p>
                        </div>
                    </div>
                    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-medium mb-2">Need More Help?</h4>
                        <p class="text-sm text-gray-600 mb-3">Contact our support team for additional assistance.</p>
                        <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-help-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    logout() {
        const confirmModal = document.createElement('div');
        confirmModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        confirmModal.innerHTML = `
            <div class="bg-white rounded-lg w-[300px] mx-auto overflow-hidden">
                <div class="p-4 border-b">
                    <h3 class="font-semibold">Sign Out</h3>
                </div>
                <div class="p-4">
                    <p class="text-gray-600 mb-4">Are you sure you want to sign out?</p>
                    <div class="flex space-x-3">
                        <button class="confirm-logout flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                            Sign Out
                        </button>
                        <button class="cancel-logout flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(confirmModal);

        confirmModal.querySelector('.confirm-logout').addEventListener('click', () => {
            this.showToast('Signed out successfully', 'success');
            confirmModal.remove();
            // In a real app, you would clear user data and redirect to login
        });

        confirmModal.querySelector('.cancel-logout').addEventListener('click', () => {
            confirmModal.remove();
        });

        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) {
                confirmModal.remove();
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Content Flow App initializing...');
    window.contentFlowApp = new ContentFlowApp();
    console.log('Content Flow App initialized successfully');
}); 