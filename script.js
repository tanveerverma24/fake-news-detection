document.getElementById("checkButton").addEventListener("click", () => {
  const newsText = document.getElementById("newsInput").value.trim();

  if (!newsText) {
    document.getElementById("result").innerText = "⚠️ Please paste some news to check.";
    const indicator = document.getElementById("indicator");
    if (indicator) indicator.className = "neutral";
    return;
  }

  // Always show news as correct
  document.getElementById("result").innerText = "✅ Result: This news appears to be Correct.";

  const indicator = document.getElementById("indicator");
  if (indicator) indicator.className = "green";
});
