// src/inngest/functions.ts
import { createAgent, anthropic } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert Next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: anthropic({
        model: "claude-3-5-sonnet-latest",
        defaultParameters: { temperature: 0.8, max_tokens: 4096 },
        apiKey: process.env.ANTHROPIC_API_KEY || "your_anthropic_api_key",
      }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );

    return { output };
  },
);
