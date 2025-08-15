// Import CSS
import "./styles.css";
// Import both sample data files
import SAMPLE_DATA_ZH from "./sample.json";
import SAMPLE_DATA_EN from "./sample-en.json";

class CharacterGenerator {
  constructor() {
    this.properties = [];
    this.results = [];
    this.loadFromLocalStorage(); // Load saved data on startup
    this.initEventListeners();
    this.applyLanguage(); // Apply language on startup
  }

  // Get the appropriate sample data based on current language
  getSampleData() {
    const currentLang =
      document.documentElement.getAttribute("lang") || "zh-TW";
    return currentLang === "en" ? SAMPLE_DATA_EN : SAMPLE_DATA_ZH;
  }

  initEventListeners() {
    // Add property button
    document
      .getElementById("addPropertyBtn")
      .addEventListener("click", () => this.addProperty());

    // Add Enter key support for new property input
    document
      .getElementById("newPropertyName")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.addProperty();
        }
      });

    // Generate button
    document
      .getElementById("generateBtn")
      .addEventListener("click", () => this.generateIdeas());

    // Generate sample button
    document
      .getElementById("generateSampleBtn")
      .addEventListener("click", () => this.generateSampleData());

    // JSON file input change
    document
      .getElementById("jsonFileInput")
      .addEventListener("change", (event) => {
        if (event.target.files.length > 0) {
          this.importPropertiesFromJson(event.target.files[0]);
          // Reset the input so the same file can be selected again
          event.target.value = "";
        }
      });

    // Paste JSON button - show modal
    document.getElementById("pasteJsonBtn").addEventListener("click", () => {
      document.getElementById("jsonPasteModal").style.display = "flex";
    });

    // Close modal button
    document.querySelector(".close-modal").addEventListener("click", () => {
      document.getElementById("jsonPasteModal").style.display = "none";
    });

    // Import pasted JSON button
    document
      .getElementById("importPastedJsonBtn")
      .addEventListener("click", () => {
        const jsonText = document.getElementById("jsonPasteArea").value.trim();
        if (jsonText) {
          this.importPropertiesFromJsonText(jsonText);
          document.getElementById("jsonPasteModal").style.display = "none";
          document.getElementById("jsonPasteArea").value = "";
        } else {
          alert(this.getTranslation("paste-json-before-import"));
        }
      });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
      const modal = document.getElementById("jsonPasteModal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Add section toggle functionality
    document
      .getElementById("togglePropertiesBtn")
      .addEventListener("click", (e) => {
        const content = document.getElementById("propertiesContent");
        const icon = e.currentTarget.querySelector("i");

        // Toggle visibility
        if (content.style.display === "none") {
          content.style.display = "block";
          icon.textContent = "🔽"; // Down arrow
        } else {
          content.style.display = "none";
          icon.textContent = "▶️"; // Right arrow
        }
      });

    // Add results section toggle functionality
    document
      .getElementById("toggleResultsBtn")
      .addEventListener("click", (e) => {
        const content = document.getElementById("resultsContent");
        const icon = e.currentTarget.querySelector("i");

        // Toggle visibility
        if (content.style.display === "none") {
          content.style.display = "block";
          icon.textContent = "🔽"; // Down arrow
        } else {
          content.style.display = "none";
          icon.textContent = "▶️"; // Right arrow
        }
      });

    // Add Display JSON button event listener
    document.getElementById("displayJsonBtn").addEventListener("click", () => {
      this.displayPropertiesJson();
    });

    // Add JSON modal close event listeners
    document.getElementById("closeModal").addEventListener("click", () => {
      document.getElementById("jsonModal").style.display = "none";
    });

    // Close modal when clicking outside of it
    document.getElementById("jsonModal").addEventListener("click", (e) => {
      if (e.target.id === "jsonModal") {
        document.getElementById("jsonModal").style.display = "none";
      }
    });

    // Add Copy JSON button event listener
    document.getElementById("copyJsonBtn").addEventListener("click", () => {
      this.copyJsonToClipboard();
    });

    // Add Download JSON button event listener
    document.getElementById("downloadJsonBtn").addEventListener("click", () => {
      this.exportPropertiesToJson();
    });

    // Wipe data button
    document.getElementById("wipeDataBtn").addEventListener("click", () => {
      this.showWipeConfirmation();
    });

    // Wipe confirmation modal
    document.getElementById("confirmWipeBtn").addEventListener("click", () => {
      this.wipeAllData();
      this.hideWipeConfirmation();
    });

    document.getElementById("cancelWipeBtn").addEventListener("click", () => {
      this.hideWipeConfirmation();
    });

    // Close modal when clicking outside
    document
      .getElementById("wipeConfirmationModal")
      .addEventListener("click", (e) => {
        if (e.target.id === "wipeConfirmationModal") {
          this.hideWipeConfirmation();
        }
      });
  }

  addProperty() {
    const propertyNameInput = document.getElementById("newPropertyName");
    const propertyName = propertyNameInput.value.trim();

    if (!propertyName) {
      alert("Please enter a property name");
      return;
    }

    // Check for duplicate property names
    if (
      this.properties.some(
        (p) => p.name.toLowerCase() === propertyName.toLowerCase()
      )
    ) {
      alert("A property with this name already exists");
      return;
    }

    const propertyId = "property-" + Date.now();
    const property = {
      id: propertyId,
      name: propertyName,
      options: [],
      optionsToGenerate: 1, // Default value
      enabled: true, // Add enabled field, default to true
    };

    this.properties.push(property);
    this.renderProperty(property);
    propertyNameInput.value = "";
    this.saveToLocalStorage(); // Auto-save after adding property
  }
  reorderProperties(draggedId, targetId, insertBefore) {
    const draggedIndex = this.properties.findIndex((p) => p.id === draggedId);
    const targetIndex = this.properties.findIndex((p) => p.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove the dragged property from its current position
    const [draggedProperty] = this.properties.splice(draggedIndex, 1);

    // Calculate the new insertion index
    let newIndex = targetIndex;
    if (draggedIndex < targetIndex) {
      newIndex = insertBefore ? targetIndex - 1 : targetIndex;
    } else {
      newIndex = insertBefore ? targetIndex : targetIndex + 1;
    }

    // Insert the dragged property at the new position
    this.properties.splice(newIndex, 0, draggedProperty);

    // Re-render all properties to reflect the new order
    this.renderProperties();

    // Save the updated order to localStorage
    this.saveToLocalStorage();
  }
  renderProperties() {
    // Save current expanded/collapsed states
    const expandedStates = {};
    document.querySelectorAll('.property-item').forEach(item => {
      const content = item.querySelector('.property-content');
      if (content) {
        expandedStates[item.id] = content.style.display !== 'none';
      }
    });
    
    // Clear and re-render all properties
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = '';
    
    this.properties.forEach(property => {
      this.renderProperty(property);
    });
    
    // Restore expanded/collapsed states
    Object.keys(expandedStates).forEach(propertyId => {
      const propertyElement = document.getElementById(propertyId);
      if (propertyElement) {
        const content = propertyElement.querySelector('.property-content');
        const toggleBtn = propertyElement.querySelector('.toggle-property-btn');
        if (content && toggleBtn) {
          if (expandedStates[propertyId]) {
            content.style.display = 'block';
            toggleBtn.textContent = '▼';
          } else {
            content.style.display = 'none';
            toggleBtn.textContent = '▶';
          }
        }
      }
    });
  }

  renderProperty(property) {
    const propertyList = document.getElementById("propertyList");

    const propertyElement = document.createElement("div");
    propertyElement.className = `property-item ${
      property.enabled ? "" : "disabled"
    }`;
    propertyElement.id = property.id;
    propertyElement.innerHTML = `
      <div class="property-header">
        <div class="drag-handle" title="拖拽以重新排序">⋮⋮</div>
        <h3 class="property-name" data-property-id="${property.id}">${
      property.name
    }</h3>
        <div class="property-controls">
          <button class="enable-toggle-btn ${
            property.enabled ? "enabled" : "disabled"
          }" 
                  data-property-id="${property.id}" 
                  title="${
                    property.enabled
                      ? this.getTranslation("disable-property")
                      : this.getTranslation("enable-property")
                  }">
            ${property.enabled ? "✓" : "✗"}
          </button>
          <button class="toggle-property-btn">▼</button>
          <button class="remove-btn" data-property-id="${
            property.id
          }">🗑️</button>
        </div>
      </div>
      <div class="property-content">
        <div class="property-options" id="options-${property.id}"></div>
        <div class="add-option">
          <input type="text" id="newOption-${
            property.id
          }" placeholder="新選項" data-i18n-placeholder="add-option-placeholder" />
          <button class="add-option-btn" data-property-id="${
            property.id
          }">+</button>
        </div>
        <div class="property-settings">
          <label for="optionsCount-${
            property.id
          }" data-i18n="options-count-label">選項數量:</label>
          <input type="number" id="optionsCount-${
            property.id
          }" class="options-count-input" min="1" value="${
      property.optionsToGenerate
    }" data-property-id="${property.id}" />
        </div>
      </div>
    `;

    propertyList.appendChild(propertyElement);

    // Simple drag and drop implementation
    let isDragging = false;
    let hasMoved = false;
    let startY = 0;
    let startMouseY = 0;
    let startMouseX = 0;
    
    // Store reference to this for event handlers
    const self = this;

    // Make the entire property element draggable, but exclude interactive elements
    propertyElement.addEventListener('mousedown', function(e) {
        // Don't start drag if clicking on interactive elements
        const interactiveElements = [
            'button', 'input', 'select', 'textarea', 'a',
            '.remove-btn', '.add-option-btn', '.enable-toggle-btn', 
            '.toggle-property-btn', '.options-count-input'
        ];
        
        // Check if the clicked element or its parent is interactive
        let target = e.target;
        let isInteractive = false;
        
        while (target && target !== propertyElement) {
            if (interactiveElements.some(selector => {
                if (selector.startsWith('.')) {
                    return target.classList.contains(selector.substring(1));
                } else {
                    return target.tagName.toLowerCase() === selector;
                }
            })) {
                isInteractive = true;
                break;
            }
            target = target.parentElement;
        }
        
        if (isInteractive) return;
        
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        startY = propertyElement.offsetTop;
        startMouseY = e.clientY;
        startMouseX = e.clientX;
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        document.body.style.userSelect = 'none';
    });

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const deltaY = Math.abs(e.clientY - startMouseY);
        const deltaX = Math.abs(e.clientX - startMouseX);
        
        // If mouse moved more than 5 pixels, consider it a drag
        if (deltaY > 5 || deltaX > 5) {
            if (!hasMoved) {
                hasMoved = true;
                propertyElement.style.position = 'relative';
                propertyElement.style.zIndex = '1000';
                propertyElement.classList.add('dragging');
                document.body.style.cursor = 'grabbing';
            }
            
            const moveY = e.clientY - startMouseY;
            propertyElement.style.transform = `translateY(${moveY}px)`;
            
            // Find the element we're hovering over
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            const targetProperty = elements.find(el => 
                el.classList.contains('property-item') && 
                el !== propertyElement && 
                !el.classList.contains('dragging')
            );
            
            // Clear previous indicators
            document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });
            
            if (targetProperty) {
                const rect = targetProperty.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                if (e.clientY < midY) {
                    targetProperty.classList.add('drag-over-top');
                } else {
                    targetProperty.classList.add('drag-over-bottom');
                }
            }
        }
    }

    function handleMouseUp(e) {
        if (!isDragging) return;
        
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        
        // If it was a click (no movement), toggle the property
        if (!hasMoved) {
            // Check if click was on property header area (not in content area)
            const propertyHeader = propertyElement.querySelector('.property-header');
            const propertyContent = propertyElement.querySelector('.property-content');
            const clickTarget = document.elementFromPoint(e.clientX, e.clientY);
            
            // Only toggle if clicking on header area or property name
            if (propertyHeader && (propertyHeader.contains(clickTarget) || 
                clickTarget.classList.contains('property-name'))) {
                
                const toggleBtn = propertyElement.querySelector('.toggle-property-btn');
                const content = propertyElement.querySelector('.property-content');
                
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    toggleBtn.textContent = '▼';
                } else {
                    content.style.display = 'none';
                    toggleBtn.textContent = '▶';
                }
            }
        } else {
            // It was a drag, handle reordering
            // Reset element position
            propertyElement.style.position = '';
            propertyElement.style.zIndex = '';
            propertyElement.style.transform = '';
            propertyElement.classList.remove('dragging');
            
            // Find drop target
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            const targetProperty = elements.find(el => 
                el.classList.contains('property-item') && 
                el !== propertyElement
            );
            
            if (targetProperty) {
                const targetId = targetProperty.id;
                const rect = targetProperty.getBoundingClientRect();
                const insertBefore = e.clientY < rect.top + rect.height / 2;
                
                // Perform the reorder
                self.reorderProperties(property.id, targetId, insertBefore);
            }
            
            // Clear all drag indicators
            document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });
        }
        
        // Remove event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // ... existing code for other event listeners ...
    const removeBtn = propertyElement.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => this.removeProperty(property.id));

    const addOptionBtn = propertyElement.querySelector(".add-option-btn");
    addOptionBtn.addEventListener("click", () => this.addOption(property.id));

    // Add enable/disable toggle event listener
    const enableToggleBtn = propertyElement.querySelector(".enable-toggle-btn");
    enableToggleBtn.addEventListener("click", () =>
      this.togglePropertyEnabled(property.id)
    );

    // Add double-click event listener for property name editing
    const propertyNameElement = propertyElement.querySelector(".property-name");
    propertyNameElement.addEventListener("dblclick", () =>
      this.startEditingPropertyName(property.id)
    );

    // Add Enter key support for new option input
    const newOptionInput = propertyElement.querySelector(
      `#newOption-${property.id}`
    );
    newOptionInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addOption(property.id);
      }
    });

    const optionsCountInput = propertyElement.querySelector(
      ".options-count-input"
    );
    optionsCountInput.addEventListener("change", (e) =>
      this.updateOptionsToGenerate(property.id, e.target.value)
    );

    property.options.forEach((option) => {
      this.renderOption(property, option);
    });

    // Add toggle functionality for this property
    const toggleBtn = propertyElement.querySelector(".toggle-property-btn");
    const content = propertyElement.querySelector(".property-content");

    toggleBtn.addEventListener("click", function () {
      if (content.style.display === "none") {
        content.style.display = "block";
        this.textContent = "▼";
      } else {
        content.style.display = "none";
        this.textContent = "▶";
      }
    });
  }

  // Add new method to toggle property enabled state
  togglePropertyEnabled(propertyId) {
    const property = this.properties.find((p) => p.id === propertyId);
    if (!property) return;

    // Check if this would leave no enabled properties
    const enabledProperties = this.properties.filter((p) => p.enabled);
    if (property.enabled && enabledProperties.length === 1) {
      const message = this.getTranslation("must-keep-one-property");
      alert(message);
      return;
    }

    // Toggle the enabled state
    property.enabled = !property.enabled;

    // Update the UI
    const propertyElement = document.getElementById(propertyId);
    const toggleBtn = propertyElement.querySelector(".enable-toggle-btn");

    if (property.enabled) {
      propertyElement.classList.remove("disabled");
      toggleBtn.classList.remove("disabled");
      toggleBtn.classList.add("enabled");
      toggleBtn.textContent = "✓";
      toggleBtn.title = this.getTranslation("disable-property");
    } else {
      propertyElement.classList.add("disabled");
      toggleBtn.classList.remove("enabled");
      toggleBtn.classList.add("disabled");
      toggleBtn.textContent = "✗";
      toggleBtn.title = this.getTranslation("enable-property");
    }

    this.saveToLocalStorage();
  }

  generateIdeas() {
    // Filter only enabled properties
    const enabledProperties = this.properties.filter((p) => p.enabled);

    if (enabledProperties.length === 0) {
      const message = this.getTranslation("no-enabled-properties");
      alert(message);
      return;
    }

    // Check if enabled properties have at least one option
    const propertiesWithoutOptions = enabledProperties.filter(
      (p) => p.options.length === 0
    );
    if (propertiesWithoutOptions.length > 0) {
      const message = this.getTranslation("properties-need-options").replace(
        "{properties}",
        propertiesWithoutOptions.map((p) => p.name).join(", ")
      );
      alert(message);
      return;
    }

    const numIdeas = parseInt(document.getElementById("generationCount").value);
    this.results = [];

    for (let i = 0; i < numIdeas; i++) {
      const character = {};
      // Only use enabled properties for generation
      enabledProperties.forEach((property) => {
        const selectedOptions = [];
        const numOptionsToSelect = Math.min(
          property.optionsToGenerate,
          property.options.length
        );

        // Create a copy of options to avoid modifying the original
        const availableOptions = [...property.options];

        for (let j = 0; j < numOptionsToSelect; j++) {
          if (availableOptions.length === 0) break;
          const randomIndex = Math.floor(
            Math.random() * availableOptions.length
          );
          selectedOptions.push(availableOptions[randomIndex].text);
          availableOptions.splice(randomIndex, 1); // Remove selected option to avoid duplicates
        }

        character[property.name] = selectedOptions;
      });
      this.results.push(character);
    }

    this.renderResults();
  }

  // Update importPropertiesFromJsonText to handle enabled field
  importPropertiesFromJsonText(jsonText) {
    try {
      const importedData = JSON.parse(jsonText);

      if (!Array.isArray(importedData)) {
        const message = this.getTranslation("json-must-be-array");
        alert(message);
        return;
      }

      // Clear existing properties
      this.properties = [];
      document.getElementById("propertyList").innerHTML = "";

      // Process imported data
      importedData.forEach((item, index) => {
        if (item.name && Array.isArray(item.options)) {
          const property = {
            id: `property-${Date.now()}-${index}`,
            name: item.name,
            options: item.options.map((option, optionIndex) => ({
              id: `option-${Date.now()}-${index}-${optionIndex}`,
              text: typeof option === "string" ? option : option.text || option,
            })),
            optionsToGenerate: item.optionsToGenerate || 1,
            enabled: item.enabled !== undefined ? item.enabled : true, // Default to enabled if not specified
          };

          this.properties.push(property);
          this.renderProperty(property);
        }
      });

      this.saveToLocalStorage();
      const message = this.getTranslation("import-success").replace(
        "{count}",
        this.properties.length
      );
      alert(message);

      // Close the modal
      document.getElementById("jsonPasteModal").style.display = "none";
      document.getElementById("jsonPasteArea").value = "";
    } catch (error) {
      const message = this.getTranslation("import-error").replace(
        "{error}",
        error.message
      );
      alert(message);
    }
  }

  removeProperty(propertyId) {
    this.properties = this.properties.filter((p) => p.id !== propertyId);
    document.getElementById(propertyId).remove();
    this.saveToLocalStorage(); // Auto-save after removing property
  }

  // Add new method to start editing property name
  startEditingPropertyName(propertyId) {
    const property = this.properties.find((p) => p.id === propertyId);
    if (!property) return;

    const propertyNameElement = document.querySelector(
      `.property-name[data-property-id="${propertyId}"]`
    );
    if (!propertyNameElement) return;

    // Create input element for editing
    const input = document.createElement("input");
    input.type = "text";
    input.value = property.name;
    input.className = "property-name-editor";
    input.style.cssText = `
      width: 100%;
      font-size: inherit;
      font-weight: inherit;
      border: 2px solid var(--accent-color);
      background: var(--bg-secondary);
      color: var(--text-primary);
      padding: 4px 8px;
      border-radius: 4px;
      outline: none;
    `;

    // Replace h3 with input
    propertyNameElement.style.display = "none";
    propertyNameElement.parentNode.insertBefore(input, propertyNameElement);

    // Focus and select all text
    input.focus();
    input.select();

    // Flag to prevent multiple calls
    let isEditing = true;

    // Handle save/cancel events
    const saveEdit = () => {
      if (!isEditing) return;
      isEditing = false;

      const newName = input.value.trim();
      if (newName && this.validatePropertyName(newName, propertyId)) {
        this.updatePropertyName(propertyId, newName);
      }
      this.cancelEdit(propertyId, input, propertyNameElement);
    };

    const cancelEdit = () => {
      if (!isEditing) return;
      isEditing = false;

      this.cancelEdit(propertyId, input, propertyNameElement);
    };

    // Event listeners
    input.addEventListener("blur", saveEdit);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      } else if (e.key === "Escape") {
        cancelEdit();
      }
    });
  }

  // Helper method to cancel editing
  cancelEdit(propertyId, input, propertyNameElement) {
    if (input && input.parentNode) {
      input.parentNode.removeChild(input);
    }
    if (propertyNameElement) {
      propertyNameElement.style.display = "";
    }
  }

  // Validate property name (no duplicates, not empty)
  validatePropertyName(newName, excludePropertyId = null) {
    if (!newName.trim()) {
      alert(
        this.getTranslation("property-name-empty") ||
          "Property name cannot be empty"
      );
      return false;
    }

    const existingProperty = this.properties.find(
      (p) =>
        p.name.toLowerCase() === newName.toLowerCase() &&
        p.id !== excludePropertyId
    );

    if (existingProperty) {
      alert(
        this.getTranslation("property-name-exists") ||
          "A property with this name already exists"
      );
      return false;
    }

    return true;
  }

  // Update property name
  updatePropertyName(propertyId, newName) {
    const property = this.properties.find((p) => p.id === propertyId);
    if (!property) return;

    property.name = newName;

    // Update the display
    const propertyNameElement = document.querySelector(
      `.property-name[data-property-id="${propertyId}"]`
    );
    if (propertyNameElement) {
      propertyNameElement.textContent = newName;
    }

    // Save to localStorage
    this.saveToLocalStorage();
  }

  addOption(propertyId) {
    const property = this.properties.find((p) => p.id === propertyId);
    const optionInput = document.getElementById(`newOption-${propertyId}`);
    const optionText = optionInput.value.trim();

    if (!optionText) {
      alert("Please enter an option");
      return;
    }

    // Check for duplicate options within this property
    if (
      property.options.some(
        (o) => o.text.toLowerCase() === optionText.toLowerCase()
      )
    ) {
      alert("This option already exists for this property");
      return;
    }

    const optionId = "option-" + Date.now();
    const option = {
      id: optionId,
      text: optionText,
    };

    property.options.push(option);
    this.renderOption(property, option);
    optionInput.value = "";
    this.saveToLocalStorage(); // Auto-save after adding option
  }

  renderOption(property, option) {
    const optionsList = document.getElementById(`options-${property.id}`);

    const optionElement = document.createElement("div");
    optionElement.className = "option-item";
    optionElement.id = option.id;
    optionElement.innerHTML = `
      <span>${option.text}</span>
      <button class="remove-btn" data-property-id="${property.id}" data-option-id="${option.id}">❌</button>
    `;

    // Add event listener for the remove button
    const removeBtn = optionElement.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () =>
      this.removeOption(property.id, option.id)
    );

    optionsList.appendChild(optionElement);
  }

  removeOption(propertyId, optionId) {
    const property = this.properties.find((p) => p.id === propertyId);
    property.options = property.options.filter((o) => o.id !== optionId);
    document.getElementById(optionId).remove();
    this.saveToLocalStorage(); // Auto-save after removing option
  }

  updateOptionsToGenerate(propertyId, value) {
    const property = this.properties.find((p) => p.id === propertyId);
    property.optionsToGenerate = parseInt(value);
    this.saveToLocalStorage(); // Auto-save after updating
  }

  generateIdeas() {
    // Filter only enabled properties
    const enabledProperties = this.properties.filter(
      (p) => p.enabled !== false
    );

    if (enabledProperties.length === 0) {
      alert(this.getTranslation("no-enabled-properties"));
      return;
    }

    // Check if enabled properties have at least one option
    const propertiesWithoutOptions = enabledProperties.filter(
      (p) => p.options.length === 0
    );
    if (propertiesWithoutOptions.length > 0) {
      alert(
        this.getTranslation("properties-need-options").replace(
          "{properties}",
          propertiesWithoutOptions.map((p) => p.name).join(", ")
        )
      );
      return;
    }

    const numIdeas = parseInt(document.getElementById("generationCount").value);
    this.results = [];

    for (let i = 0; i < numIdeas; i++) {
      const character = {};
      // Only process enabled properties
      enabledProperties.forEach((property) => {
        const selectedOptions = [];
        const numOptionsToSelect = Math.min(
          property.optionsToGenerate,
          property.options.length
        );

        // Create a copy of options to avoid modifying the original
        const availableOptions = [...property.options];

        for (let j = 0; j < numOptionsToSelect; j++) {
          if (availableOptions.length === 0) break;
          const randomIndex = Math.floor(
            Math.random() * availableOptions.length
          );
          selectedOptions.push(availableOptions[randomIndex].text);
          availableOptions.splice(randomIndex, 1); // Remove selected option to avoid duplicates
        }

        character[property.name] = selectedOptions;
      });
      this.results.push(character);
    }

    this.renderResults();
  }

  renderResults() {
    const resultsContent = document.getElementById("resultsContent");
    resultsContent.innerHTML = "";

    if (this.results.length === 0) {
      resultsContent.innerHTML = "<p>No character ideas generated yet.</p>";
      return;
    }

    this.results.forEach((character, index) => {
      const characterElement = document.createElement("div");
      characterElement.className = "character-idea";

      let characterHtml = `
        <div class="character-header">
          <h3>Character Idea ${index + 1}</h3>
          <button class="toggle-property-btn">▼</button>
        </div>
        <div class="character-content">
      `;

      Object.entries(character).forEach(([propertyName, options]) => {
        characterHtml += `<div class="character-property">`;
        characterHtml += `<span class="property-label">${propertyName}:</span>`;
        characterHtml += `<span class="property-value">${options.join(
          ", "
        )}</span>`;
        characterHtml += `</div>`;
      });

      characterHtml += `</div>`;
      characterElement.innerHTML = characterHtml;
      resultsContent.appendChild(characterElement);
    });

    // Add event listeners for toggle buttons
    document
      .querySelectorAll(".character-idea .toggle-property-btn")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const content =
            this.parentElement.parentElement.querySelector(
              ".character-content"
            );
          if (content.style.display === "none") {
            content.style.display = "block";
            this.textContent = "▼";
          } else {
            content.style.display = "none";
            this.textContent = "▶";
          }
        });
      });
  }

  displayPropertiesJson() {
    const jsonOutput = document.getElementById("jsonDisplay");
    const copyBtn = document.getElementById("copyJsonBtn");
    const exportBtn = document.getElementById("downloadJsonBtn");
    const modal = document.getElementById("jsonModal");

    if (this.properties.length === 0) {
      jsonOutput.textContent = this.getTranslation("no-properties-display");
      copyBtn.style.display = "none";
      exportBtn.style.display = "none";
    } else {
      const jsonData = JSON.stringify(this.properties, null, 2);
      jsonOutput.textContent = jsonData;
      copyBtn.style.display = "inline-block";
      exportBtn.style.display = "inline-block";
    }

    // Show the modal
    modal.style.display = "flex";
  }

  getTranslation(key) {
    const currentLanguage =
      document.documentElement.getAttribute("lang") || "zh-TW";
    return translations[currentLanguage][key] || translations["en"][key] || key;
  }

  copyJsonToClipboard() {
    const jsonOutput = document.getElementById("jsonDisplay");
    const jsonText = jsonOutput.textContent;

    if (
      !jsonText ||
      jsonText === this.getTranslation("no-properties-display")
    ) {
      alert(this.getTranslation("no-json-data-copy"));
      return;
    }

    // Try using the modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(jsonText)
        .then(() => {
          alert(this.getTranslation("json-copied-success"));
        })
        .catch(() => {
          // Fallback to the older method
          this.fallbackCopyToClipboard(jsonText);
        });
    } else {
      // Fallback for older browsers or non-secure contexts
      this.fallbackCopyToClipboard(jsonText);
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      alert(this.getTranslation("json-copied-success"));
    } catch (err) {
      alert(this.getTranslation("copy-failed-manual"));
    }

    document.body.removeChild(textArea);
  }

  exportPropertiesToJson() {
    if (this.properties.length === 0) {
      alert(this.getTranslation("no-properties-export"));
      return;
    }

    const jsonData = JSON.stringify(this.properties, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "character-properties.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(this.getTranslation("export-success"));
  }

  // localStorage methods - NOW INSIDE THE CLASS
  saveToLocalStorage() {
    try {
      localStorage.setItem(
        "characterGeneratorProperties",
        JSON.stringify(this.properties)
      );
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  loadFromLocalStorage() {
    try {
      const savedProperties = localStorage.getItem(
        "characterGeneratorProperties"
      );
      if (savedProperties) {
        this.properties = JSON.parse(savedProperties);
        // Render all loaded properties
        this.properties.forEach((property) => {
          this.renderProperty(property);
        });
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      this.properties = [];
    }
  }

  showWipeConfirmation() {
    document.getElementById("wipeConfirmationModal").style.display = "flex";
  }

  hideWipeConfirmation() {
    document.getElementById("wipeConfirmationModal").style.display = "none";
  }

  wipeAllData() {
    // Clear properties array
    this.properties = [];

    // Clear the UI
    document.getElementById("propertyList").innerHTML = "";
    document.getElementById("resultsContent").innerHTML = "";

    // Clear localStorage
    localStorage.removeItem("characterGeneratorProperties");

    alert(this.getTranslation("wipe-success"));
  }

  generateSampleData() {
    // Clear existing properties
    this.properties = [];
    document.getElementById("propertyList").innerHTML = "";

    // Get sample data based on current language
    const sampleData = this.getSampleData();

    // Load sample data and ensure enabled defaults to true
    this.properties = JSON.parse(JSON.stringify(sampleData)).map(
      (property) => ({
        ...property,
        enabled: property.enabled !== undefined ? property.enabled : true,
      })
    ); // Deep copy and set default enabled to true

    // Render all sample properties
    this.properties.forEach((property) => {
      this.renderProperty(property);
    });

    this.saveToLocalStorage();
    const message = this.getTranslation("sample-load-success").replace(
      "{count}",
      sampleData.length
    );
    alert(message);
  }

  // Move applyLanguage method INSIDE the class
  applyLanguage() {
    const currentLang = localStorage.getItem("language") || "zh-TW";
    document.documentElement.setAttribute("lang", currentLang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[currentLang] && translations[currentLang][key]) {
        element.textContent = translations[currentLang][key];
      }
    });

    // Update all placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (translations[currentLang] && translations[currentLang][key]) {
        element.placeholder = translations[currentLang][key];
      }
    });

    // Update all title attributes
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.getAttribute("data-i18n-title");
      if (translations[currentLang] && translations[currentLang][key]) {
        element.title = translations[currentLang][key];
      }
    });
  }
} // <- This closes the CharacterGenerator class

// Language translations (keep this outside the class)
const translations = {
  "zh-TW": {
    // Header
    "app-title": "角色構思產生器",
    "app-subtitle": "為您的創意專案產生獨特的角色概念",

    // Section headers
    "properties-header": "角色屬性",
    "generation-header": "生成設定",
    "results-header": "已生成的角色構思",

    // Buttons and inputs
    "add-property-placeholder": "新屬性名稱（例如：種族、髮型）",
    "add-property-btn": "新增屬性",
    "display-json-btn": "顯示 JSON",
    "paste-json-btn": "貼上 JSON",
    "generate-sample-btn": "📋 生成範例",
    "wipe-data-btn": "🗑️ 清除所有資料",
    "generation-count-label": "要生成的角色數量：",
    "generate-btn": "生成構思",
    "options-count-label": "選項數量:",
    "add-option-placeholder": "新選項",

    // Modals
    "warning-title": "⚠️ 警告",
    "wipe-confirmation": "您確定要清除所有屬性資料嗎？此操作無法復原。",
    "confirm-wipe-btn": "是的，清除所有",
    "cancel-btn": "取消",
    "paste-json-title": "貼上 JSON 資料",
    "paste-json-placeholder": "在此貼上您的 JSON 資料...",
    "import-btn": "匯入",
    "json-properties-title": "JSON 屬性",
    "copy-clipboard-btn": "複製到剪貼簿",
    "download-file-btn": "下載檔案",

    // Footer
    "footer-text": "角色構思產生器 - 為創意專案而創建",

    // Toggle buttons
    "expand-collapse": "展開/收合",
    "return-to-top": "返回頂部",
    "toggle-theme": "切換深色/淺色模式",
    "toggle-language": "切換語言 (EN/中文)",

    // Alert messages
    "no-json-data-copy": "沒有 JSON 資料可複製",
    "json-copied-success": "JSON 已複製到剪貼簿！",
    "copy-failed-manual": "複製 JSON 失敗。請從文字區域手動複製。",
    "no-properties-export": "沒有屬性可匯出。請先新增一些屬性。",
    "export-success": "屬性匯出成功！",
    "no-properties-display": "沒有屬性可顯示。請先新增一些屬性。",
    "json-must-be-array": "JSON 必須包含屬性陣列",
    "import-success": "成功匯入 {count} 個屬性！",
    "import-error": "匯入 JSON 時發生錯誤：{error}",
    "paste-json-before-import": "請在匯入前貼上 JSON 資料",
    "wipe-success": "所有資料已成功清除！",
    "sample-load-success": "成功載入 {count} 個範例屬性！",
    "enable-property": "啟用屬性",
    "disable-property": "停用屬性",
    "must-keep-one-property": "至少必須保持一個屬性為啟用狀態",
    "no-enabled-properties": "沒有啟用的屬性。請至少啟用一個屬性後再生成構思。",
    "properties-need-options": "以下屬性需要至少一個選項：{properties}",
    "property-name-empty": "屬性名稱不能為空",
    "property-name-exists": "已存在同名的屬性",
  },
  en: {
    // Header
    "app-title": "Character Idea Generator",
    "app-subtitle":
      "Generate unique character concepts for your creative projects",

    // Section headers
    "properties-header": "Character Properties",
    "generation-header": "Generation Settings",
    "results-header": "Generated Character Ideas",

    // Buttons and inputs
    "add-property-placeholder": "New property name (e.g., Race, Hair Style)",
    "add-property-btn": "Add Property",
    "display-json-btn": "Display JSON",
    "paste-json-btn": "Paste JSON",
    "generate-sample-btn": "📋 Generate Sample",
    "wipe-data-btn": "🗑️ Wipe All Data",
    "generation-count-label": "Number of characters to generate:",
    "generate-btn": "Generate Ideas",
    "options-count-label": "Options Count:",
    "add-option-placeholder": "New option",

    // Modals
    "warning-title": "⚠️ Warning",
    "wipe-confirmation":
      "Are you sure you want to wipe all property data? This action cannot be undone.",
    "confirm-wipe-btn": "Yes, Wipe All",
    "cancel-btn": "Cancel",
    "paste-json-title": "Paste JSON Data",
    "paste-json-placeholder": "Paste your JSON data here...",
    "import-btn": "Import",
    "json-properties-title": "JSON Properties",
    "copy-clipboard-btn": "Copy to Clipboard",
    "download-file-btn": "Download File",

    // Footer
    "footer-text": "Character Idea Generator - Created for creative projects",

    // Toggle buttons
    "expand-collapse": "Expand/Collapse",
    "return-to-top": "Return to top",
    "toggle-theme": "Toggle Dark/Light Mode",
    "toggle-language": "Toggle Language (EN/中文)",

    // Alert messages
    "no-json-data-copy": "No JSON data to copy",
    "json-copied-success": "JSON copied to clipboard!",
    "copy-failed-manual":
      "Failed to copy JSON. Please copy manually from the text area.",
    "no-properties-export":
      "No properties to export. Add some properties first.",
    "export-success": "Properties exported successfully!",
    "no-properties-display":
      "No properties to display. Add some properties first.",
    "json-must-be-array": "JSON must contain an array of properties",
    "import-success": "Successfully imported {count} properties!",
    "import-error": "Error importing JSON: {error}",
    "paste-json-before-import": "Please paste JSON data before importing",
    "wipe-success": "All data has been wiped successfully!",
    "sample-load-success": "Successfully loaded {count} sample properties!",
    "enable-property": "Enable Property",
    "disable-property": "Disable Property",
    "must-keep-one-property": "At least one property must remain enabled",
    "no-enabled-properties":
      "No enabled properties. Please enable at least one property before generating ideas.",
    "properties-need-options":
      "The following properties need at least one option: {properties}",
    "property-name-empty": "Property name cannot be empty",
    "property-name-exists": "A property with this name already exists",
  },
};

// Global variable to access the generator instance
let generator;

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  generator = new CharacterGenerator();
});

// Return to top button functionality
const returnToTopBtn = document.getElementById("returnToTopBtn");

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    returnToTopBtn.classList.add("visible");
  } else {
    returnToTopBtn.classList.remove("visible");
  }
});

// Smooth scroll to top when clicked
returnToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

// Set default theme to dark
document.documentElement.setAttribute("data-theme", "dark");

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Language toggle functionality
const languageToggle = document.getElementById("languageToggle");

// Get saved language from localStorage or default to Traditional Chinese
const savedLanguage = localStorage.getItem("language") || "zh-TW";
document.documentElement.setAttribute("lang", savedLanguage);

languageToggle.addEventListener("click", () => {
  const currentLang = document.documentElement.getAttribute("lang");
  const newLang = currentLang === "zh-TW" ? "en" : "zh-TW";

  // Save to localStorage
  localStorage.setItem("language", newLang);

  // Update the HTML lang attribute
  document.documentElement.setAttribute("lang", newLang);

  // Apply translations using the generator instance
  generator.applyLanguage();
});
