// Import CSS
import "./styles.css";
import SAMPLE_DATA from "./sample.json";

class CharacterGenerator {
  constructor() {
    this.properties = [];
    this.results = [];
    this.loadFromLocalStorage(); // Load saved data on startup
    this.initEventListeners();
    this.applyLanguage(); // Apply language on startup
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
    };

    this.properties.push(property);
    this.renderProperty(property);
    propertyNameInput.value = "";
    this.saveToLocalStorage(); // Auto-save after adding property
  }

  renderProperty(property) {
    const propertyList = document.getElementById("propertyList");

    const propertyElement = document.createElement("div");
    propertyElement.className = "property-item";
    propertyElement.id = property.id;
    propertyElement.innerHTML = `
      <div class="property-header">
        <h3>${property.name}</h3>
        <div class="property-controls">
          <button class="toggle-property-btn">▼</button>
          <button class="remove-btn" data-property-id="${property.id}">🗑️</button>
        </div>
      </div>
      <div class="property-content">
        <div class="property-options" id="options-${property.id}"></div>
        <div class="add-option">
          <input type="text" id="newOption-${property.id}" placeholder="新選項" data-i18n-placeholder="add-option-placeholder" />
          <button class="add-option-btn" data-property-id="${property.id}">+</button>
        </div>
        <div class="property-settings">
          <label for="optionsCount-${property.id}" data-i18n="options-count-label">選項數量:</label>
          <input type="number" id="optionsCount-${property.id}" class="options-count-input" min="1" value="${property.optionsToGenerate}" data-property-id="${property.id}" />
        </div>
      </div>
    `;

    propertyList.appendChild(propertyElement);

    // Add event listeners for the new elements
    const removeBtn = propertyElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => this.removeProperty(property.id));

    const addOptionBtn = propertyElement.querySelector('.add-option-btn');
    addOptionBtn.addEventListener('click', () => this.addOption(property.id));

    // Add Enter key support for new option input
    const newOptionInput = propertyElement.querySelector(`#newOption-${property.id}`);
    newOptionInput.addEventListener('keypress', (e) => {
      if (e.key === "Enter") {
        this.addOption(property.id);
      }
    });

    const optionsCountInput = propertyElement.querySelector('.options-count-input');
    optionsCountInput.addEventListener('change', (e) => this.updateOptionsToGenerate(property.id, e.target.value));

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

    // Apply translations to the newly created elements
    this.applyLanguage();
  }

  removeProperty(propertyId) {
    this.properties = this.properties.filter((p) => p.id !== propertyId);
    document.getElementById(propertyId).remove();
    this.saveToLocalStorage(); // Auto-save after removing property
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
    const removeBtn = optionElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => this.removeOption(property.id, option.id));

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
    if (this.properties.length === 0) {
      alert(
        "Please add at least one property with options before generating ideas."
      );
      return;
    }

    // Check if all properties have at least one option
    const propertiesWithoutOptions = this.properties.filter(
      (p) => p.options.length === 0
    );
    if (propertiesWithoutOptions.length > 0) {
      alert(
        `The following properties need at least one option: ${propertiesWithoutOptions
          .map((p) => p.name)
          .join(", ")}`
      );
      return;
    }

    const numIdeas = parseInt(document.getElementById("generationCount").value);
    this.results = [];

    for (let i = 0; i < numIdeas; i++) {
      const character = {};
      this.properties.forEach((property) => {
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

  importPropertiesFromJsonText(jsonText) {
    try {
      const importedProperties = JSON.parse(jsonText);

      // Validate the imported data
      if (!Array.isArray(importedProperties)) {
        throw new Error(this.getTranslation("json-must-be-array"));
      }

      // Validate each property
      importedProperties.forEach((property, index) => {
        if (
          !property.id ||
          !property.name ||
          !Array.isArray(property.options)
        ) {
          throw new Error(
            `Property at index ${index} is missing required fields (id, name, options)`
          );
        }

        // Validate options
        property.options.forEach((option, optionIndex) => {
          if (!option.id || !option.text) {
            throw new Error(
              `Option at index ${optionIndex} in property "${property.name}" is missing required fields (id, text)`
            );
          }
        });

        // Set default optionsToGenerate if not present
        if (!property.optionsToGenerate) {
          property.optionsToGenerate = 1;
        }
      });

      // Clear existing properties
      this.properties = [];
      document.getElementById("propertyList").innerHTML = "";

      // Import new properties
      this.properties = importedProperties;

      // Render all imported properties
      this.properties.forEach((property) => {
        this.renderProperty(property);
      });

      this.saveToLocalStorage(); // Save imported data
      alert(
        this.getTranslation("import-success").replace(
          "{count}",
          importedProperties.length
        )
      );
    } catch (error) {
      alert(
        this.getTranslation("import-error").replace("{error}", error.message)
      );
      console.error("JSON import error:", error);
    }
  }

  importPropertiesFromJson(jsonFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.importPropertiesFromJsonText(e.target.result);
    };
    reader.readAsText(jsonFile);
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

    // Load sample data from constant
    this.properties = JSON.parse(JSON.stringify(SAMPLE_DATA)); // Deep copy to avoid reference issues

    // Render all sample properties
    this.properties.forEach((property) => {
      this.renderProperty(property);
    });

    this.saveToLocalStorage();
    const message = this.getTranslation("sample-load-success").replace(
      "{count}",
      SAMPLE_DATA.length
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
