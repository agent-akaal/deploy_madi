// lib/getDynamicOptions.ts
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface DynamicOptionsParams {
  [key: string]: any;
}

export async function getDynamicOptions(
  optionType: string,
  subject: string,
  params: DynamicOptionsParams = {}
): Promise<string[]> {
  // Construct the path to the YAML prompt file (e.g., config/prompts/interests.yaml)
  const promptFile = path.join(process.cwd(), "config", "prompts", `${optionType}.yaml`);
  let promptConfig: any;
  try {
    const fileContents = fs.readFileSync(promptFile, "utf8");
    promptConfig = yaml.load(fileContents);
  } catch (error) {
    console.error("Error loading prompt file:", error);
    return [];
  }

  let prompt: string = promptConfig.prompt || "";

  // Format the prompt based on the option type and context.
  if (optionType === "interests") {
    prompt = prompt
      .replace("{subject}", subject)
      .replace("{level}", params.level || "Beginner");
  } else if (optionType === "outcomes") {
    prompt = prompt
      .replace("{subject}", subject)
      .replace("{level}", params.level || "Beginner")
      .replace(
        "{interests}",
        Array.isArray(params.interests) ? params.interests.join(", ") : (params.interests || "")
      )
      .replace("{time}", params.time || "");
  } else if (optionType === "challenges") {
    prompt = prompt
      .replace("{subject}", subject)
      .replace("{level}", params.level || "Beginner")
      .replace(
        "{interests}",
        Array.isArray(params.interests) ? params.interests.join(", ") : (params.interests || "")
      )
      .replace("{time}", params.time || "")
      .replace("{goal}", params.goal || "");
  }

  try {
    // Determine if we're on the client or server
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer 
      ? (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
      : '';

    // Use absolute URL when running server-side
    const response = await fetch(`${baseUrl}/api/ollama`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        subject,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get response: ${response.status}`);
    }

    const data = await response.json();
    return data.options || [];
  } catch (error) {
    console.error("Error in getDynamicOptions:", error);
    return [
      "Default Option 1",
      "Default Option 2",
      "Default Option 3",
      "Default Option 4",
    ];
  }
}
