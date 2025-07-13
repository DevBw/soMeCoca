// Enhanced Content Flow App Improvements
class ContentFlowImprovements {
    constructor() {
        this.selectedPlatform = 'Instagram';
        this.selectedTags = [];
        this.init();
    }

    init() {
        this.setupEnhancedModal();
        this.setupTagSystem();
        this.setupCharacterCounters();
        this.setupKeyboardShortcuts();
        this.setupDragAndDrop();
        this.setupSearch();
    }

    // Enhanced Modal System
    setupEnhancedModal() {
        // Platform selection
        const platformOptions = document.querySelectorAll('.platform-option');
        platformOptions.forEach(option => {
            option.addEventListener('click', () => {
                platformOptions.forEach(opt => opt.classList.remove('border-primary', 'bg-primary/5'));
                option.classList.add('border-primary', 'bg-primary/5');
                this.selectedPlatform = option.dataset.platform;
                this.updateContentTypeOptions();
            });
        });

        // Character counters
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

        // Create content button
        const createBtn = document.getElementById('createEnhancedContentBtn');
        if (createBtn) {
            createBtn.addEventListener('click', () => {
                this.handleEnhancedContentCreation();
            });
        }

        // Save as draft button
        const draftBtn = document.getElementById('saveAsDraftBtn');
        if (draftBtn) {
            draftBtn.addEventListener('click', () => {
                this.handleSaveAsDraft();
            });
        }
    }

    updateContentTypeOptions() {
        const contentTypeSelect = document.getElementById('contentTypeSelect');
        if (!contentTypeSelect) return;

        const platformTypes = {
            'Instagram': ['Post', 'Story', 'Reel', 'IGTV'],
            'Twitter': ['Tweet', 'Thread', 'Poll'],
            'YouTube': ['Video', 'Short', 'Live'],
            'TikTok': ['Video', 'Duet', 'Story'],
            'Blog': ['Article', 'Newsletter', 'Tutorial'],
            'Newsletter': ['Email', 'Digest', 'Promotional']
        };

        const types = platformTypes[this.selectedPlatform] || ['Post'];
        contentTypeSelect.innerHTML = types.map(type => 
            `<option value="${type}">${type}</option>`
        ).join('');
    }

    // Tag System
    setupTagSystem() {
        const tagInput = document.getElementById('tagInput');
        const tagsContainer = document.getElementById('tagsContainer');

        if (tagInput) {
            tagInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const tag = tagInput.value.trim();
                    if (tag && !this.selectedTags.includes(tag)) {
                        this.addTag(tag);
                        tagInput.value = '';
                    }
                }
            });
        }
    }

    addTag(tag) {
        this.selectedTags.push(tag);
        const tagElement = document.createElement('span');
        tagElement.className = 'inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full';
        tagElement.innerHTML = `
            ${tag}
            <button class="ml-1 hover:bg-primary/20 rounded-full w-4 h-4 flex items-center justify-center" onclick="this.parentElement.remove(); contentFlowImprovements.removeTag('${tag}')">
                <i class="ri-close-line text-xs"></i>
            </button>
        `;
        document.getElementById('tagsContainer').appendChild(tagElement);
    }

    removeTag(tag) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }

    // Character Counters
    setupCharacterCounters() {
        const inputs = [
            { id: 'enhancedContentTitle', counterId: 'titleCharCount', max: 100 },
            { id: 'enhancedContentDescription', counterId: 'descCharCount', max: 500 }
        ];

        inputs.forEach(({ id, counterId, max }) => {
            const input = document.getElementById(id);
            const counter = document.getElementById(counterId);
            
            if (input && counter) {
                input.addEventListener('input', () => {
                    const count = input.value.length;
                    counter.textContent = count;
                    
                    if (count > max * 0.9) {
                        counter.classList.add('text-red-500');
                    } else {
                        counter.classList.remove('text-red-500');
                    }
                });
            }
        });
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N: New content
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openEnhancedModal();
            }
            
            // Ctrl/Cmd + K: Search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }
            
            // Escape: Close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    // Drag and Drop for Calendar
    setupDragAndDrop() {
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

    // Search Functionality
    setupSearch() {
        const searchHTML = `
            <div class="relative">
                <input 
                    id="contentSearch" 
                    type="text" 
                    placeholder="Search content..." 
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                <i class="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
        `;
        
        // Add search to header
        const header = document.querySelector('header');
        if (header) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'px-4 py-2';
            searchContainer.innerHTML = searchHTML;
            header.appendChild(searchContainer);
            
            const searchInput = document.getElementById('contentSearch');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.performSearch(e.target.value);
                });
            }
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.showAllContent();
            return;
        }

        const content = window.contentFlowApp?.content || [];
        const filtered = content.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.platform.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(filtered);
    }

    // Enhanced Content Creation
    handleEnhancedContentCreation() {
        const title = document.getElementById('enhancedContentTitle')?.value.trim();
        const date = document.getElementById('enhancedContentDate')?.value;
        const time = document.getElementById('enhancedContentTime')?.value;
        const description = document.getElementById('enhancedContentDescription')?.value.trim();
        const contentType = document.getElementById('contentTypeSelect')?.value;
        const status = document.getElementById('contentStatusSelect')?.value;

        if (!title || !date || !time) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        const contentData = {
            title,
            date,
            time,
            description,
            platform: this.selectedPlatform,
            type: contentType,
            status,
            tags: this.selectedTags,
            color: this.getPlatformColor(this.selectedPlatform)
        };

        if (window.contentFlowApp) {
            window.contentFlowApp.addContent(contentData);
            this.closeEnhancedModal();
            this.resetForm();
        }
    }

    handleSaveAsDraft() {
        const title = document.getElementById('enhancedContentTitle')?.value.trim();
        const date = document.getElementById('enhancedContentDate')?.value;
        const time = document.getElementById('enhancedContentTime')?.value;
        const description = document.getElementById('enhancedContentDescription')?.value.trim();
        const contentType = document.getElementById('contentTypeSelect')?.value;

        const contentData = {
            title: title || 'Untitled Content',
            date: date || new Date().toISOString().split('T')[0],
            time: time || '12:00',
            description: description || '',
            platform: this.selectedPlatform,
            type: contentType,
            status: 'Draft',
            tags: this.selectedTags,
            color: this.getPlatformColor(this.selectedPlatform)
        };

        if (window.contentFlowApp) {
            window.contentFlowApp.addContent(contentData);
            this.closeEnhancedModal();
            this.resetForm();
            this.showToast('Content saved as draft', 'success');
        }
    }

    // Utility Methods
    openEnhancedModal() {
        const modal = document.getElementById('enhancedContentModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.populateModalWithDefaults();
        }
    }

    closeEnhancedModal() {
        const modal = document.getElementById('enhancedContentModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    closeAllModals() {
        this.closeEnhancedModal();
        const oldModal = document.getElementById('createContentModal');
        if (oldModal) {
            oldModal.classList.add('hidden');
            oldModal.classList.remove('flex');
        }
    }

    populateModalWithDefaults() {
        const titleInput = document.getElementById('enhancedContentTitle');
        const dateInput = document.getElementById('enhancedContentDate');
        const timeInput = document.getElementById('enhancedContentTime');
        const descInput = document.getElementById('enhancedContentDescription');

        if (titleInput) titleInput.value = '';
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        if (timeInput) timeInput.value = '12:00';
        if (descInput) descInput.value = '';

        this.selectedTags = [];
        document.getElementById('tagsContainer').innerHTML = '';
    }

    resetForm() {
        this.populateModalWithDefaults();
        this.selectedTags = [];
    }

    focusSearch() {
        const searchInput = document.getElementById('contentSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }

    showToast(message, type = 'info') {
        if (window.contentFlowApp) {
            window.contentFlowApp.showToast(message, type);
        } else {
            // Fallback toast
            const toast = document.createElement('div');
            const bgColor = type === 'success' ? 'bg-green-600' : 
                           type === 'error' ? 'bg-red-600' : 'bg-blue-600';
            
            toast.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-lg text-sm z-50`;
            toast.textContent = message;

            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }

    getPlatformColor(platform) {
        const colors = {
            'Instagram': 'blue',
            'Twitter': 'cyan',
            'YouTube': 'red',
            'TikTok': 'purple',
            'Blog': 'green',
            'Newsletter': 'primary'
        };
        return colors[platform] || 'gray';
    }

    moveContentToDate(contentId, newDate) {
        if (window.contentFlowApp) {
            window.contentFlowApp.updateContent(contentId, { date: newDate });
            this.showToast('Content moved successfully', 'success');
        }
    }

    displaySearchResults(results) {
        // Implementation for displaying search results
        console.log('Search results:', results);
    }

    showAllContent() {
        // Implementation for showing all content
        console.log('Showing all content');
    }
}

// Initialize improvements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentFlowImprovements = new ContentFlowImprovements();
}); 