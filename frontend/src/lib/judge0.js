// Judge0 CE code execution wrapper.

const JUDGE0_API = import.meta.env?.VITE_JUDGE0_API_URL || "https://ce.judge0.com";
const POLL_INTERVAL_MS = 1000;
const MAX_POLL_ATTEMPTS = 15;

const LANGUAGE_CONFIG = {
  javascript: { languageId: 63 },
  python: { languageId: 71 },
  java: { languageId: 62 },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_CONFIG[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const submitResponse = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageConfig.languageId,
      }),
    });

    const submitData = await parseJsonResponse(submitResponse);

    if (!submitResponse.ok) {
      return {
        success: false,
        error: getApiError(submitData, submitResponse.status),
      };
    }

    if (!submitData.token) {
      return {
        success: false,
        error: "Code execution service did not return a submission token.",
      };
    }

    const result = await waitForSubmission(submitData.token);
    return formatExecutionResult(result);
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

async function waitForSubmission(token) {
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
    const response = await fetch(
      `${JUDGE0_API}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,compile_output,message,status`,
    );
    const data = await parseJsonResponse(response);

    if (!response.ok) {
      throw new Error(getApiError(data, response.status));
    }

    const statusId = data.status?.id;
    if (statusId !== 1 && statusId !== 2) {
      return data;
    }

    await delay(POLL_INTERVAL_MS);
  }

  throw new Error("Code execution timed out. Please try again.");
}

function formatExecutionResult(data) {
  const output = data.stdout || "";
  const compileOutput = data.compile_output || "";
  const stderr = data.stderr || "";
  const message = data.message || "";
  const status = data.status?.description || "Unknown error";

  if (compileOutput || stderr || message || data.status?.id !== 3) {
    return {
      success: false,
      output,
      error: compileOutput || stderr || message || status,
    };
  }

  return {
    success: true,
    output: output || "No output",
  };
}

async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
}

function getApiError(data, status) {
  if (typeof data.error === "string") {
    return data.error;
  }

  const validationError = Object.entries(data)
    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
    .join("\n");

  return validationError || `HTTP error! status: ${status}`;
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
