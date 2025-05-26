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

function fixJSON(str: string) {
  // Remove trailing commas before ] or }
  str = str.replace(/,\s*([}\]])/g, '$1');

  // Auto-close open braces/brackets
  const stack = [];
  for (const char of str) {
    if (char === '{') stack.push('}');
    else if (char === '[') stack.push(']');
    else if (char === '}' || char === ']') stack.pop();
  }

  while (stack.length) {
    str += stack.pop();
  }

  // Attempt to fix unterminated strings (very basic check)
  const quoteCount = (str.match(/"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    str += '"';
  }

  return str;
}