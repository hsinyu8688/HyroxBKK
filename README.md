# HYROX Bangkok Guide v2.1.5 — App Icon Fix

更新內容：
- 沿用你喜歡的 icon.svg 設計
- 產生 iPhone 用 apple-touch-icon.png
- 產生 PWA 用 icon-192.png / icon-512.png
- 更新 index.html
- 更新 manifest.json
- 更新 Service Worker 快取版本

## GitHub 更新
```powershell
git add .
git commit -m "Fix app icon for iPhone PWA"
git push origin main
```

## iPhone 仍顯示舊的 H icon
1. 刪除主畫面舊 App。
2. iPhone 設定 → Safari → 進階 → 網站資料，刪除你的 GitHub Pages 網站資料。
3. 用 Safari 重新打開 GitHub Pages。
4. 分享 → 加入主畫面。
