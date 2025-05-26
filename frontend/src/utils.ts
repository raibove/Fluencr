export function extractAndFixJSON(text: string) {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);

if (jsonMatch && jsonMatch[1]) {
  try {
    const jsonData = JSON.parse(jsonMatch[1]);
    return jsonData
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
} else {
  console.error("No JSON found in the response.");
}

return null;
}
