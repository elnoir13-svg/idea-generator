// 硬編碼的範例資料常量
const SAMPLE_DATA = [
  {
    id: "property-race",
    name: "種族",
    optionsToGenerate: 1,
    options: [
      { id: "option-race-1", text: "人類" },
      { id: "option-race-2", text: "精靈" },
      { id: "option-race-3", text: "獸人" },
      { id: "option-race-4", text: "龍人" },
      { id: "option-race-5", text: "半獸人" },
      { id: "option-race-6", text: "吸血鬼" },
      { id: "option-race-7", text: "天使" },
      { id: "option-race-8", text: "惡魔" },
      { id: "option-race-9", text: "矮人" },
      { id: "option-race-10", text: "狐人" },
      { id: "option-race-11", text: "海妖" },
      { id: "option-race-12", text: "半精靈" },
      { id: "option-race-13", text: "半龍人" },
      { id: "option-race-14", text: "機械族" },
      { id: "option-race-15", text: "樹精" },
      { id: "option-race-16", text: "影族" },
      { id: "option-race-17", text: "巨人" },
      { id: "option-race-18", text: "妖精" },
      { id: "option-race-19", text: "蛇人" },
      { id: "option-race-20", text: "蜥蜴人" },
    ],
  },
  {
    id: "property-bodytype",
    name: "體型",
    optionsToGenerate: 1,
    options: [
      { id: "option-bodytype-1", text: "高挑纖細" },
      { id: "option-bodytype-2", text: "嬌小可愛" },
      { id: "option-bodytype-3", text: "壯碩結實" },
      { id: "option-bodytype-4", text: "苗條優雅" },
      { id: "option-bodytype-5", text: "中等勻稱" },
      { id: "option-bodytype-6", text: "矮小健壯" },
      { id: "option-bodytype-7", text: "曲線玲瓏" },
      { id: "option-bodytype-8", text: "骨架纖細" },
      { id: "option-bodytype-9", text: "厚實寬肩" },
      { id: "option-bodytype-10", text: "修長運動型" },
      { id: "option-bodytype-11", text: "勻稱健美" },
      { id: "option-bodytype-12", text: "瘦長靈巧" },
      { id: "option-bodytype-13", text: "強壯魁梧" },
      { id: "option-bodytype-14", text: "纖瘦敏捷" },
      { id: "option-bodytype-15", text: "圓潤可親" },
      { id: "option-bodytype-16", text: "緊實結實" },
      { id: "option-bodytype-17", text: "柔韌細長" },
      { id: "option-bodytype-18", text: "輕盈飄逸" },
      { id: "option-bodytype-19", text: "穩重厚實" },
      { id: "option-bodytype-20", text: "靈巧嬌小" },
    ],
  },
  {
    id: "property-hairstyle",
    name: "髮型",
    optionsToGenerate: 1,
    options: [
      { id: "option-hairstyle-1", text: "長直髮" },
      { id: "option-hairstyle-2", text: "短捲髮" },
      { id: "option-hairstyle-3", text: "馬尾" },
      { id: "option-hairstyle-4", text: "雙馬尾" },
      { id: "option-hairstyle-5", text: "編辮長髮" },
      { id: "option-hairstyle-6", text: "波浪長髮" },
      { id: "option-hairstyle-7", text: "高丸子頭" },
      { id: "option-hairstyle-8", text: "側分短髮" },
      { id: "option-hairstyle-9", text: "中長層次" },
      { id: "option-hairstyle-10", text: "平齊短髮" },
      { id: "option-hairstyle-11", text: "不對稱短髮" },
      { id: "option-hairstyle-12", text: "鬢角編辮" },
      { id: "option-hairstyle-13", text: "高馬尾" },
      { id: "option-hairstyle-14", text: "低馬尾" },
      { id: "option-hairstyle-15", text: "髮尾外翻" },
      { id: "option-hairstyle-16", text: "齊瀏海長髮" },
      { id: "option-hairstyle-17", text: "中分長髮" },
      { id: "option-hairstyle-18", text: "玉米鬚捲" },
      { id: "option-hairstyle-19", text: "半束長髮" },
      { id: "option-hairstyle-20", text: "鮑伯頭" },
    ],
  },
  {
    id: "property-hairstyle2",
    name: "髮型(二）",
    optionsToGenerate: 1,
    options: [
      { id: "option-hairstyle2-1", text: "挑染髮絲" },
      { id: "option-hairstyle2-2", text: "髮夾點綴" },
      { id: "option-hairstyle2-3", text: "髮帶束髮" },
      { id: "option-hairstyle2-4", text: "皇冠頭飾" },
      { id: "option-hairstyle2-5", text: "頭紗覆頂" },
      { id: "option-hairstyle2-6", text: "髮簪固定" },
      { id: "option-hairstyle2-7", text: "羽毛裝飾" },
      { id: "option-hairstyle2-8", text: "絲帶蝴蝶結" },
      { id: "option-hairstyle2-9", text: "金屬髮圈" },
      { id: "option-hairstyle2-10", text: "珍珠髮鏈" },
      { id: "option-hairstyle2-11", text: "皮質頭箍" },
      { id: "option-hairstyle2-12", text: "花環冠" },
      { id: "option-hairstyle2-13", text: "鏈條髮飾" },
      { id: "option-hairstyle2-14", text: "布藝大蝴蝶結" },
      { id: "option-hairstyle2-15", text: "水晶髮釵" },
      { id: "option-hairstyle2-16", text: "彩色髮束" },
      { id: "option-hairstyle2-17", text: "髮箍" },
      { id: "option-hairstyle2-18", text: "迷你禮帽" },
      { id: "option-hairstyle2-19", text: "風鈴髮飾" },
      { id: "option-hairstyle2-20", text: "角飾綁帶" },
    ],
  },
  {
    id: "property-personality",
    name: "性格",
    optionsToGenerate: 1,
    options: [
      { id: "option-personality-1", text: "開朗活潑" },
      { id: "option-personality-2", text: "沉著冷靜" },
      { id: "option-personality-3", text: "傲嬌嘴硬" },
      { id: "option-personality-4", text: "內向害羞" },
      { id: "option-personality-5", text: "冷酷無情" },
      { id: "option-personality-6", text: "樂觀單純" },
      { id: "option-personality-7", text: "狡猾多謀" },
      { id: "option-personality-8", text: "溫柔體貼" },
      { id: "option-personality-9", text: "正直堅毅" },
      { id: "option-personality-10", text: "圓滑世故" },
      { id: "option-personality-11", text: "古靈精怪" },
      { id: "option-personality-12", text: "勇敢衝動" },
      { id: "option-personality-13", text: "寡言審慎" },
      { id: "option-personality-14", text: "風趣幽默" },
      { id: "option-personality-15", text: "悲天憫人" },
      { id: "option-personality-16", text: "充滿好奇" },
      { id: "option-personality-17", text: "重情重義" },
      { id: "option-personality-18", text: "理性克制" },
      { id: "option-personality-19", text: "自信張揚" },
      { id: "option-personality-20", text: "任性叛逆" },
    ],
  },
  {
    id: "property-clothing",
    name: "衣服",
    optionsToGenerate: 1,
    options: [
      { id: "option-clothing-1", text: "鎧甲戰裝" },
      { id: "option-clothing-2", text: "和服" },
      { id: "option-clothing-3", text: "學院制服" },
      { id: "option-clothing-4", text: "皮革鎧甲" },
      { id: "option-clothing-5", text: "魔法長袍" },
      { id: "option-clothing-6", text: "輕便旅行服" },
      { id: "option-clothing-7", text: "貴族禮服" },
      { id: "option-clothing-8", text: "忍者裝束" },
      { id: "option-clothing-9", text: "牧師法衣" },
      { id: "option-clothing-10", text: "獵人裝" },
      { id: "option-clothing-11", text: "商旅披風" },
      { id: "option-clothing-12", text: "海盜服" },
      { id: "option-clothing-13", text: "工匠圍裙" },
      { id: "option-clothing-14", text: "吟遊詩人服" },
      { id: "option-clothing-15", text: "砂漠長袍" },
      { id: "option-clothing-16", text: "北境毛皮裝" },
      { id: "option-clothing-17", text: "都市便服" },
      { id: "option-clothing-18", text: "儀式祭袍" },
      { id: "option-clothing-19", text: "騎士禮裝" },
      { id: "option-clothing-20", text: "皇家近衛服" },
    ],
  },
  {
    id: "property-maincolor",
    name: "主色",
    optionsToGenerate: 1,
    options: [
      { id: "option-maincolor-1", text: "紅色" },
      { id: "option-maincolor-2", text: "藍色" },
      { id: "option-maincolor-3", text: "黑色" },
      { id: "option-maincolor-4", text: "白色" },
      { id: "option-maincolor-5", text: "金色" },
      { id: "option-maincolor-6", text: "銀色" },
      { id: "option-maincolor-7", text: "綠色" },
      { id: "option-maincolor-8", text: "紫色" },
      { id: "option-maincolor-9", text: "橙色" },
      { id: "option-maincolor-10", text: "青色" },
      { id: "option-maincolor-11", text: "靛色" },
      { id: "option-maincolor-12", text: "品紅" },
      { id: "option-maincolor-13", text: "棕色" },
      { id: "option-maincolor-14", text: "灰色" },
      { id: "option-maincolor-15", text: "米色" },
      { id: "option-maincolor-16", text: "青綠" },
      { id: "option-maincolor-17", text: "赭色" },
      { id: "option-maincolor-18", text: "玫瑰紅" },
      { id: "option-maincolor-19", text: "淺藍" },
      { id: "option-maincolor-20", text: "深綠" },
    ],
  },
  {
    id: "property-accessory",
    name: "配件",
    optionsToGenerate: 1,
    options: [
      { id: "option-accessory-1", text: "耳環" },
      { id: "option-accessory-2", text: "披風" },
      { id: "option-accessory-3", text: "項鍊" },
      { id: "option-accessory-4", text: "護腕" },
      { id: "option-accessory-5", text: "腰帶" },
      { id: "option-accessory-6", text: "戒指" },
      { id: "option-accessory-7", text: "胸針" },
      { id: "option-accessory-8", text: "眼罩" },
      { id: "option-accessory-9", text: "鍊墜" },
      { id: "option-accessory-10", text: "肩章" },
      { id: "option-accessory-11", text: "腰包" },
      { id: "option-accessory-12", text: "頭巾" },
      { id: "option-accessory-13", text: "手套" },
      { id: "option-accessory-14", text: "腳鍊" },
      { id: "option-accessory-15", text: "髮網" },
      { id: "option-accessory-16", text: "腰間小包" },
      { id: "option-accessory-17", text: "懷錶" },
      { id: "option-accessory-18", text: "玉佩" },
      { id: "option-accessory-19", text: "臂環" },
      { id: "option-accessory-20", text: "懷錶鍊" },
    ],
  },
  {
    id: "property-weapon",
    name: "武器",
    optionsToGenerate: 1,
    options: [
      { id: "option-weapon-1", text: "長劍" },
      { id: "option-weapon-2", text: "弓箭" },
      { id: "option-weapon-3", text: "法杖" },
      { id: "option-weapon-4", text: "雙刀" },
      { id: "option-weapon-5", text: "長槍" },
      { id: "option-weapon-6", text: "飛刀" },
      { id: "option-weapon-7", text: "巨斧" },
      { id: "option-weapon-8", text: "連弩" },
      { id: "option-weapon-9", text: "戟" },
      { id: "option-weapon-10", text: "匕首" },
      { id: "option-weapon-11", text: "戰錘" },
      { id: "option-weapon-12", text: "鐮刀" },
      { id: "option-weapon-13", text: "長鞭" },
      { id: "option-weapon-14", text: "盾牌" },
      { id: "option-weapon-15", text: "流星錘" },
      { id: "option-weapon-16", text: "刺劍" },
      { id: "option-weapon-17", text: "斧槍" },
      { id: "option-weapon-18", text: "手里劍" },
      { id: "option-weapon-19", text: "魔導書" },
      { id: "option-weapon-20", text: "重弩" },
    ],
  },
  {
    id: "property-element",
    name: "屬性",
    optionsToGenerate: 1,
    options: [
      { id: "option-element-1", text: "火" },
      { id: "option-element-2", text: "水" },
      { id: "option-element-3", text: "風" },
      { id: "option-element-4", text: "土" },
      { id: "option-element-5", text: "光" },
      { id: "option-element-6", text: "暗" },
      { id: "option-element-7", text: "冰" },
      { id: "option-element-8", text: "雷" },
      { id: "option-element-9", text: "木" },
      { id: "option-element-10", text: "金" },
      { id: "option-element-11", text: "影" },
      { id: "option-element-12", text: "聖" },
      { id: "option-element-13", text: "毒" },
      { id: "option-element-14", text: "霧" },
      { id: "option-element-15", text: "砂" },
      { id: "option-element-16", text: "岩" },
      { id: "option-element-17", text: "時" },
      { id: "option-element-18", text: "空" },
      { id: "option-element-19", text: "幻" },
      { id: "option-element-20", text: "音" },
    ],
  },
  {
    id: "property-other1",
    name: "其他",
    optionsToGenerate: 1,
    options: [
      { id: "option-other1-1", text: "面具" },
      { id: "option-other1-2", text: "口琴" },
      { id: "option-other1-3", text: "古書" },
      { id: "option-other1-4", text: "懷錶" },
      { id: "option-other1-5", text: "掛飾瓶" },
      { id: "option-other1-6", text: "羽毛筆" },
      { id: "option-other1-7", text: "酒壺" },
      { id: "option-other1-8", text: "卷軸" },
      { id: "option-other1-9", text: "魔藥瓶" },
      { id: "option-other1-10", text: "記事本" },
      { id: "option-other1-11", text: "折扇" },
      { id: "option-other1-12", text: "香囊" },
      { id: "option-other1-13", text: "祈禱珠" },
      { id: "option-other1-14", text: "護身鈴" },
      { id: "option-other1-15", text: "火漆印" },
      { id: "option-other1-16", text: "旅者日誌" },
      { id: "option-other1-17", text: "小提燈" },
      { id: "option-other1-18", text: "乾肉袋" },
      { id: "option-other1-19", text: "石板片" },
      { id: "option-other1-20", text: "信物徽章" },
    ],
  },
  {
    id: "property-other2",
    name: "其他（二）",
    optionsToGenerate: 1,
    options: [
      { id: "option-other2-1", text: "魔法石" },
      { id: "option-other2-2", text: "護符" },
      { id: "option-other2-3", text: "羅盤" },
      { id: "option-other2-4", text: "水晶球" },
      { id: "option-other2-5", text: "符紙" },
      { id: "option-other2-6", text: "地圖" },
      { id: "option-other2-7", text: "樂器" },
      { id: "option-other2-8", text: "望遠鏡" },
      { id: "option-other2-9", text: "鑰匙串" },
      { id: "option-other2-10", text: "傳送玉牌" },
      { id: "option-other2-11", text: "解毒藥" },
      { id: "option-other2-12", text: "隱形粉" },
      { id: "option-other2-13", text: "時砂沙漏" },
      { id: "option-other2-14", text: "破咒戒" },
      { id: "option-other2-15", text: "風向儀" },
      { id: "option-other2-16", text: "能量核心" },
      { id: "option-other2-17", text: "千里傳書" },
      { id: "option-other2-18", text: "捕夢網" },
      { id: "option-other2-19", text: "祝聖瓶" },
      { id: "option-other2-20", text: "靈魂燈" },
    ],
  },
  {
    id: "property-other3",
    name: "其他（三）",
    optionsToGenerate: 1,
    options: [
      { id: "option-other3-1", text: "小動物夥伴" },
      { id: "option-other3-2", text: "坐騎" },
      { id: "option-other3-3", text: "隱形斗篷" },
      { id: "option-other3-4", text: "家傳戒指" },
      { id: "option-other3-5", text: "羽翼" },
      { id: "option-other3-6", text: "龍鱗護肩" },
      { id: "option-other3-7", text: "魔法戒指" },
      { id: "option-other3-8", text: "幸運硬幣" },
      { id: "option-other3-9", text: "魔導義眼" },
      { id: "option-other3-10", text: "懸浮滑板" },
      { id: "option-other3-11", text: "機械手臂" },
      { id: "option-other3-12", text: "元素護符" },
      { id: "option-other3-13", text: "暗影斗篷" },
      { id: "option-other3-14", text: "聖徽" },
      { id: "option-other3-15", text: "星圖盤" },
      { id: "option-other3-16", text: "便攜鍊金台" },
      { id: "option-other3-17", text: "虛空口袋" },
      { id: "option-other3-18", text: "變形披巾" },
      { id: "option-other3-19", text: "召喚印記" },
      { id: "option-other3-20", text: "防爆護符" },
    ],
  },
];

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
          <button onclick="generator.removeProperty('${property.id}')" class="remove-btn">🗑️</button>
        </div>
      </div>
      <div class="property-content">
        <div class="property-options" id="options-${property.id}"></div>
        <div class="add-option">
          <input type="text" id="newOption-${property.id}" placeholder="新選項" data-i18n-placeholder="add-option-placeholder" />
          <button onclick="generator.addOption('${property.id}')" class="add-option-btn">+</button>
        </div>
        <div class="property-settings">
          <label for="optionsCount-${property.id}" data-i18n="options-count-label">選項數量:</label>
          <input type="number" id="optionsCount-${property.id}" class="options-count-input" min="1" value="${property.optionsToGenerate}" onchange="generator.updateOptionsToGenerate('${property.id}', this.value)" />
        </div>
      </div>
    `;

    propertyList.appendChild(propertyElement);

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
    const optionInput = document.getElementById(`new-option-${propertyId}`);
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
      <button onclick="generator.removeOption('${property.id}', '${option.id}')" class="remove-btn">❌</button>
    `;

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
