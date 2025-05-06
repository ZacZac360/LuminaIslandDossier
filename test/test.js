window.clickLogger = {
    headers: [
      "CharacterName", "Weapon", "Item_Weapon",
      "Item_Head", "Item_Chest", "Item_Arm", "Item_Leg",
      "Augment_Main", "Augment_Sub1", "Tactical_Skill",
      "Team_Kills", "Kills", "Deaths", "Assists",
      "Dmg_Player", "Dmg_Animal"
    ],
    data: [],
    row: [],
    colIndex: 0
  };
  
  document.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
  
    const clicked = e.target;
    const alt = clicked.alt;
    const text = clicked.innerText.replace(/\n/g, "").trim(); // Remove line breaks
  
    let valuesToInsert = [];
  
    // Special case: Team_Kills / K / D / A format
    const tkdaMatch = text.match(/^(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)$/);
    if (tkdaMatch) {
      valuesToInsert = tkdaMatch.slice(1); // [TK, K, D, A]
      console.log(`📊 Parsed TKDA: ${valuesToInsert.join(", ")}`);
    } else {
      // Use alt or text normally
      const value = alt || text || "N/A";
      valuesToInsert = [value];
    }
  
    for (let val of valuesToInsert) {
      const currentCol = window.clickLogger.headers[window.clickLogger.colIndex] || `Col ${window.clickLogger.colIndex + 1}`;
      window.clickLogger.row.push(val);
      console.log(`🖱️ Clicked → [${val}] → Column: ${currentCol}`);
      window.clickLogger.colIndex++;
    }
  
    if (window.clickLogger.colIndex >= window.clickLogger.headers.length) {
      console.warn("📥 Row full. Press ENTER to save it.");
    }
  }, true);
  
  // BACKSPACE to undo the last click
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace') {
      if (window.clickLogger.row.length > 0) {
        const removedValue = window.clickLogger.row.pop();
        window.clickLogger.colIndex--;
        console.log(`⏪ Undo: Removed value [${removedValue}]`);
      } else {
        console.warn("⚠️ No data to undo.");
      }
    }
  
    // ENTER to finalize row
    if (e.key === 'Enter') {
      if (window.clickLogger.row.length > 0) {
        window.clickLogger.data.push(window.clickLogger.row);
        console.log("✅ Row saved:", window.clickLogger.row);
        window.clickLogger.row = [];
        window.clickLogger.colIndex = 0;
      } else {
        console.warn("⚠️ No data to save.");
      }
    }
  });
  
// ✅ Export as CSV for Excel (spaces in headers/values → underscores)
window.exportClickData = function () {
    // Convert headers and values: replace spaces with underscores
    const formatRow = (row) => row.map(cell =>
      `"${cell.replace(/\s+/g, "_").replace(/"/g, '""')}"`
    );
  
    const allRows = [formatRow(window.clickLogger.headers)].concat(
      window.clickLogger.data.map(formatRow)
    );
  
    const csv = allRows.map(r => r.join(",")).join("\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "match_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  
    console.log("📄 Exported match_data.csv with underscores");
  };
  
  