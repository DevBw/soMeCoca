// Advanced Features for Content Flow App
class ContentFlowAdvancedFeatures {
    constructor() {
        this.templates = this.loadTemplates();
        this.searchQuery = '';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupTemplates();
        this.setupAdvancedSearch();
        this.setupKeyboardShortcuts();
        this.setupExportImport();
        this.setupAnalytics();
        this.loadTemplates();
    }

    // Drag & Drop Calendar
    setupDragAndDrop() {
        // Wait for the app to be fully initialized
        setTimeout(() => {
            this.makeContentDraggable();
        }, 100);
    }

    makeContentDraggable() {
        const contentCards = document.querySelectorAll('[data-content-id]');
        contentCards.forEach(card => {
            card.draggable = true;
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', card.dataset.contentId);
                card.classList.add('opacity-50');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('opacity-50');
            });
        });

        const calendarCells = document.querySelectorAll('.calendar-cell');
        calendarCells.forEach(cell => {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                cell.classList.add('bg-blue-50', 'border-2', 'border-blue-300');
            });
            
            cell.addEventListener('dragleave', () => {
                cell.classList.remove('bg-blue-50', 'border-2', 'border-blue-300');
            });
            
            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                cell.classList.remove('bg-blue-50', 'border-2', 'border-blue-300');
                
                const contentId = e.dataTransfer.getData('text/plain');
                const newDate = cell.dataset.date;
                
                if (contentId && newDate) {
                    this.moveContentToDate(contentId, newDate);
                }
            });
        });
    }

    moveContentToDate(contentId, newDate) {
        if (window.contentFlowApp) {
            window.contentFlowApp.updateContent(contentId, { date: newDate });
            this.showToast('Content moved successfully', 'success');
        }
    }

    // Content Templates
    setupTemplates() {
        this.addTemplateButton();
    }

    addTemplateButton() {
        const modal = document.getElementById('enhancedContentModal');
        if (modal) {
            const templateButton = document.createElement('button');
            templateButton.className = 'absolute top-4 right-16 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer';
            templateButton.innerHTML = '<i class="ri-file-copy-line ri-lg"></i>';
            templateButton.title = 'Load Template';
            templateButton.addEventListener('click', () => this.showTemplateModal());
            
            const header = modal.querySelector('.flex.justify-between');
            if (header) {
                header.appendChild(templateButton);
            }
        }
    }

    showTemplateModal() {
        const templateModal = document.createElement('div');
        templateModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center';
        templateModal.innerHTML = `
            <div class="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="font-semibold text-lg">Content Templates</h3>
                    <button class="close-template-modal w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <i class="ri-close-line ri-lg"></i>
                    </button>
                </div>
                <div class="p-4">
                    <div class="grid grid-cols-2 gap-4">
                        ${this.templates.map(template => `
                            <div class="template-card border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors" data-template-id="${template.id}">
                                <div class="flex items-center space-x-2 mb-2">
                                    <i class="${this.getPlatformIcon(template.platform)} text-lg"></i>
                                    <span class="font-medium">${template.name}</span>
                                </div>
                                <p class="text-sm text-gray-600 mb-2">${template.description}</p>
                                <div class="flex items-center space-x-1">
                                    <span class="text-xs bg-gray-100 px-2 py-1 rounded">${template.platform}</span>
                                    <span class="text-xs bg-gray-100 px-2 py-1 rounded">${template.type}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(templateModal);

        templateModal.querySelector('.close-template-modal').addEventListener('click', () => {
            templateModal.remove();
        });

        templateModal.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.dataset.templateId;
                this.loadTemplate(templateId);
                templateModal.remove();
            });
        });

        templateModal.addEventListener('click', (e) => {
            if (e.target === templateModal) {
                templateModal.remove();
            }
        });
    }

    loadTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) return;

        document.getElementById('enhancedContentTitle').value = template.title;
        document.getElementById('enhancedContentDescription').value = template.description;
        document.getElementById('contentTypeSelect').value = template.type;
        document.getElementById('contentStatusSelect').value = 'Draft';

        this.selectPlatform(template.platform);

        document.getElementById('titleCharCount').textContent = template.title.length;
        document.getElementById('descCharCount').textContent = template.description.length;

        this.showToast(`Template "${template.name}" loaded`, 'success');
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

    // Advanced Search
    setupAdvancedSearch() {
        this.addSearchBar();
    }

    addSearchBar() {
        const header = document.querySelector('header');
        if (header) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'px-4 py-2 border-b border-gray-100 bg-white';
            searchContainer.innerHTML = `
                <div class="relative">
                    <input 
                        id="advancedSearch" 
                        type="text" 
                        placeholder="Search content, tags, or descriptions..." 
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                    <i class="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <button id="clearSearch" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hidden">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            `;
            
            // Insert after the filters section
            const filtersSection = header.querySelector('.flex.items-center.space-x-2.overflow-x-auto');
            if (filtersSection) {
                filtersSection.parentNode.insertBefore(searchContainer, filtersSection.nextSibling);
            } else {
                // Fallback to inserting after the first div
                const firstDiv = header.querySelector('div');
                if (firstDiv) {
                    firstDiv.parentNode.insertBefore(searchContainer, firstDiv.nextSibling);
                }
            }
            
            const searchInput = document.getElementById('advancedSearch');
            const clearBtn = document.getElementById('clearSearch');
            
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.performAdvancedSearch(e.target.value);
                    clearBtn.classList.toggle('hidden', !e.target.value);
                });
            }
            
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    this.clearSearch();
                    clearBtn.classList.add('hidden');
                });
            }
        }
    }

    performAdvancedSearch(query) {
        this.searchQuery = query.toLowerCase();
        
        if (!query.trim()) {
            this.clearSearch();
            return;
        }

        const content = window.contentFlowApp?.content || [];
        const filtered = content.filter(item => 
            item.title.toLowerCase().includes(this.searchQuery) ||
            item.description.toLowerCase().includes(this.searchQuery) ||
            item.platform.toLowerCase().includes(this.searchQuery) ||
            item.type.toLowerCase().includes(this.searchQuery)
        );

        this.highlightSearchResults(filtered);
        this.updateSearchResultsCount(filtered.length);
    }

    highlightSearchResults(results) {
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.classList.remove('search-highlight', 'bg-yellow-200');
        });

        results.forEach(item => {
            const contentCard = document.querySelector(`[data-content-id="${item.id}"]`);
            if (contentCard) {
                contentCard.classList.add('search-highlight', 'bg-yellow-200');
            }
        });
    }

    clearSearch() {
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.classList.remove('search-highlight', 'bg-yellow-200');
        });
        this.updateSearchResultsCount(null);
    }

    updateSearchResultsCount(count) {
        let countElement = document.getElementById('searchResultsCount');
        if (!countElement) {
            countElement = document.createElement('div');
            countElement.id = 'searchResultsCount';
            countElement.className = 'text-xs text-gray-500 px-4 py-1';
            const searchContainer = document.querySelector('#advancedSearch').parentNode.parentNode;
            searchContainer.appendChild(countElement);
        }
        
        if (count !== null) {
            countElement.textContent = `${count} result${count !== 1 ? 's' : ''} found`;
        } else {
            countElement.textContent = '';
        }
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openNewContentModal();
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }
            
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleDarkMode();
            }
            
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    // Export & Import
    setupExportImport() {
        this.addExportImportButtons();
    }

    addExportImportButtons() {
        const header = document.querySelector('header .flex.items-center.space-x-4');
        if (header) {
            const exportBtn = document.createElement('button');
            exportBtn.className = 'w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer';
            exportBtn.innerHTML = '<i class="ri-download-line ri-lg"></i>';
            exportBtn.title = 'Export Data';
            exportBtn.addEventListener('click', () => this.exportData());
            
            const importBtn = document.createElement('button');
            importBtn.className = 'w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer';
            importBtn.innerHTML = '<i class="ri-upload-line ri-lg"></i>';
            importBtn.title = 'Import Data';
            importBtn.addEventListener('click', () => this.importData());
            
            header.appendChild(exportBtn);
            header.appendChild(importBtn);
        }
    }

    exportData() {
        const data = {
            content: window.contentFlowApp?.content || [],
            templates: this.templates,
            settings: {
                darkMode: this.isDarkMode,
                searchQuery: this.searchQuery
            },
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `content-flow-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('Data exported successfully', 'success');
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        this.processImportedData(data);
                    } catch (error) {
                        this.showToast('Invalid file format', 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    }

    processImportedData(data) {
        if (data.content && Array.isArray(data.content)) {
            if (window.contentFlowApp) {
                window.contentFlowApp.content = data.content;
                window.contentFlowApp.saveContent();
                window.contentFlowApp.renderCalendar();
                window.contentFlowApp.renderUpcomingContent();
            }
        }
        
        if (data.settings) {
            if (data.settings.darkMode !== undefined) {
                this.isDarkMode = data.settings.darkMode;
                localStorage.setItem('darkMode', this.isDarkMode.toString());
                this.applyDarkMode();
            }
        }
        
        this.showToast('Data imported successfully', 'success');
    }

    // Analytics
    setupAnalytics() {
        this.addAnalyticsButton();
    }

    addAnalyticsButton() {
        const nav = document.querySelector('nav');
        if (nav) {
            const analyticsBtn = nav.querySelector('a[href="#"]:has(.ri-bar-chart-line)');
            if (analyticsBtn) {
                analyticsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showAnalyticsModal();
                });
            }
        }
    }

    showAnalyticsModal() {
        const content = window.contentFlowApp?.content || [];
        const analytics = this.calculateAnalytics(content);
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="font-semibold text-lg">Content Analytics</h3>
                    <button class="close-analytics-modal w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <i class="ri-close-line ri-lg"></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-medium text-blue-800">Total Content</h4>
                            <p class="text-2xl font-bold text-blue-600">${analytics.totalContent}</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-medium text-green-800">Scheduled</h4>
                            <p class="text-2xl font-bold text-green-600">${analytics.scheduled}</p>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <h4 class="font-medium text-yellow-800">Drafts</h4>
                            <p class="text-2xl font-bold text-yellow-600">${analytics.drafts}</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <h4 class="font-medium text-purple-800">Ready</h4>
                            <p class="text-2xl font-bold text-purple-600">${analytics.ready}</p>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="font-medium mb-3">Platform Distribution</h4>
                        <div class="space-y-2">
                            ${Object.entries(analytics.platformDistribution).map(([platform, count]) => `
                                <div class="flex justify-between items-center">
                                    <span class="flex items-center space-x-2">
                                        <i class="${this.getPlatformIcon(platform)}"></i>
                                        <span>${platform}</span>
                                    </span>
                                    <span class="font-medium">${count}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-medium mb-3">Upcoming Content (Next 7 Days)</h4>
                        <div class="space-y-2">
                            ${analytics.upcomingContent.map(item => `
                                <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span>${item.title}</span>
                                    <span class="text-sm text-gray-600">${item.date}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-analytics-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    calculateAnalytics(content) {
        const totalContent = content.length;
        const scheduled = content.filter(item => item.status === 'Scheduled').length;
        const drafts = content.filter(item => item.status === 'Draft').length;
        const ready = content.filter(item => item.status === 'Ready').length;

        const platformDistribution = {};
        content.forEach(item => {
            platformDistribution[item.platform] = (platformDistribution[item.platform] || 0) + 1;
        });

        const upcomingContent = content
            .filter(item => {
                const itemDate = new Date(item.date);
                const today = new Date();
                const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                return itemDate >= today && itemDate <= nextWeek;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        return {
            totalContent,
            scheduled,
            drafts,
            ready,
            platformDistribution,
            upcomingContent
        };
    }

    // Utility Methods
    openNewContentModal() {
        if (window.contentFlowApp) {
            window.contentFlowApp.openEnhancedModal();
        }
    }

    focusSearch() {
        const searchInput = document.getElementById('advancedSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.fixed.inset-0.bg-black.bg-opacity-50');
        modals.forEach(modal => {
            if (modal.classList.contains('flex')) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }

    showToast(message, type = 'info') {
        if (window.contentFlowApp) {
            window.contentFlowApp.showToast(message, type);
        } else {
            const toast = document.createElement('div');
            const bgColor = type === 'success' ? 'bg-green-600' : 
                           type === 'error' ? 'bg-red-600' : 'bg-blue-600';
            
            toast.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-lg text-sm z-50`;
            toast.textContent = message;

            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
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

    loadTemplates() {
        return [
            {
                id: '1',
                name: 'Product Launch',
                platform: 'Instagram',
                type: 'Post',
                title: '🚀 New Product Launch!',
                description: 'We\'re excited to announce our latest product! Stay tuned for more details and exclusive offers.'
            },
            {
                id: '2',
                name: 'Behind the Scenes',
                platform: 'TikTok',
                type: 'Video',
                title: 'Behind the Scenes: Making Magic Happen',
                description: 'Take a peek behind the curtain and see how we create amazing content for you!'
            },
            {
                id: '3',
                name: 'Weekly Newsletter',
                platform: 'Newsletter',
                type: 'Email',
                title: 'This Week\'s Highlights',
                description: 'Here\'s what happened this week and what\'s coming up next!'
            },
            {
                id: '4',
                name: 'Tutorial',
                platform: 'YouTube',
                type: 'Video',
                title: 'How to Master This Skill',
                description: 'Learn the secrets and techniques that will help you succeed in this area.'
            },
            {
                id: '5',
                name: 'Industry News',
                platform: 'Blog',
                type: 'Article',
                title: 'The Latest Trends in Our Industry',
                description: 'Discover what\'s new and what\'s next in our rapidly evolving industry.'
            },
            {
                id: '6',
                name: 'Engagement Post',
                platform: 'Twitter',
                type: 'Tweet',
                title: 'What\'s your favorite feature?',
                description: 'We want to hear from you! Share your thoughts in the comments below.'
            }
        ];
    }
}

// Initialize advanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentFlowAdvanced = new ContentFlowAdvancedFeatures();
});
