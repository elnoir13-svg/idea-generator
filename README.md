# 角色構思產生器

一個基於網頁的工具，用於為創意專案、遊戲、寫作等生成隨機角色構思。

## 功能特色

- 創建自定義角色屬性（種族、髮型、武器等）
- 為每個屬性添加多個選項
- 指定從每個屬性中選擇多少個選項
- 一次生成多個角色構思
- 以 JSON 格式匯入/匯出角色屬性
- 深色/淺色主題支援
- 多語言支援（英文/繁體中文）
- 可摺疊的區段和屬性項目
- 將生成的構思儲存為文字檔案

## 使用方法

1. 輸入屬性名稱（例如：「種族」、「髮型」、「武器」）並點擊「新增屬性」來添加屬性
2. 為每個屬性添加選項（例如，種族：「人類」、「精靈」、「獸人」）
3. 設定每個屬性要選擇的選項數量（例如，選擇 2 種髮型）
4. 設定要生成的角色數量
5. 點擊「生成構思」來創建隨機角色組合
6. 使用「儲存結果」按鈕將您的構思下載為文字檔案
7. 使用「顯示 JSON」來匯出您的屬性，或使用「貼上 JSON」來匯入現有配置

## JSON 範例

您可以使用 JSON 格式匯入/匯出角色屬性。這裡有一個範例結構，您也可以參考我們的 [sample.json](./sample.json) 檔案：

```json
[
  {
    "id": "property-race-1234567890",
    "name": "種族",
    "options": [
      {
        "id": "option-human-1234567891",
        "text": "人類"
      },
      {
        "id": "option-elf-1234567892",
        "text": "精靈"
      },
      {
        "id": "option-dwarf-1234567893",
        "text": "矮人"
      },
      {
        "id": "option-orc-1234567894",
        "text": "獸人"
      }
    ],
    "optionsToGenerate": 1
  },
  {
    "id": "property-class-1234567895",
    "name": "職業",
    "options": [
      {
        "id": "option-warrior-1234567896",
        "text": "戰士"
      },
      {
        "id": "option-mage-1234567897",
        "text": "法師"
      },
      {
        "id": "option-rogue-1234567898",
        "text": "盜賊"
      },
      {
        "id": "option-cleric-1234567899",
        "text": "牧師"
      }
    ],
    "optionsToGenerate": 1
  },
  {
    "id": "property-weapon-1234567900",
    "name": "武器",
    "options": [
      {
        "id": "option-sword-1234567901",
        "text": "劍"
      },
      {
        "id": "option-bow-1234567902",
        "text": "弓"
      },
      {
        "id": "option-staff-1234567903",
        "text": "法杖"
      },
      {
        "id": "option-dagger-1234567904",
        "text": "匕首"
      }
    ],
    "optionsToGenerate": 2
  }
]
```

## 使用技術

- HTML5
- CSS3（使用 CSS 變數進行主題設定）
- JavaScript (ES6+)
- Webpack（用於建置和開發）
- 本地儲存用於資料持久化

## 開發設定

### 先決條件
- Node.js (版本 14 或更高)
- npm 或 yarn

### 安裝
1. 複製儲存庫：
   ```bash
   git clone <repository-url>
   cd idea-generator
   ```

2. 安裝相依套件：
   ```bash
   npm install
   ```

### 開發指令

- **開發模式**（含熱重載）：
  ```bash
  npm run serve
  ```
  這會啟動開發伺服器並在瀏覽器中開啟應用程式。

- **建置開發版本**：
  ```bash
  npm run dev
  ```

- **建置生產版本**：
  ```bash
  npm run build
  ```

- **監視模式**（自動重新建置）：
  ```bash
  npm run watch
  ```

- **清理建置檔案**：
  ```bash
  npm run clean
  ```

### 專案結構

## 部署

此專案設計為可輕鬆部署在 GitHub Pages 上：

1. Fork 或複製此儲存庫
2. 在您的儲存庫設定中啟用 GitHub Pages
3. 選擇主分支作為來源

## 本地開發

要在本地執行此專案：

### 選項 1：直接開啟檔案
1. 複製儲存庫
2. 直接在瀏覽器中開啟 `index.html` 檔案

### 選項 2：使用本地伺服器（推薦）
為了獲得更好的開發體驗並避免潛在的 CORS 問題：

1. 複製儲存庫
2. 如果尚未安裝，請安裝 Node.js
3. 安裝簡單的 HTTP 伺服器：
   ```bash
   npm install -g http-server
   ```
4. 導航到專案目錄並啟動伺服器：
   ```bash
   cd idea-generator
   http-server
   ```
5. 開啟瀏覽器並前往 `http://localhost:8080`

### 其他本地伺服器選項
- **使用 Python 3**：`python -m http.server 8000`
- **使用 Python 2**：`python -m SimpleHTTPServer 8000`
- **使用 PHP**：`php -S localhost:8000`
- **使用 Live Server（VS Code 擴充功能）**：安裝 Live Server 擴充功能，右鍵點擊 `index.html` → 「使用 Live Server 開啟」

## 授權條款

MIT 授權條款

## 貢獻

歡迎貢獻！請隨時提交 pull request 或開啟 issue。