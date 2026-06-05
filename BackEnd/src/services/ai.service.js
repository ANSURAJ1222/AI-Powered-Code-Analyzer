const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateContent(prompt) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
You are an expert senior code reviewer.

Always respond in this format:

# 📋 Summary

Short overview of the code.

# ✅ What's Good

- Point 1
- Point 2

# ⚠️ Issues Found

For each issue:

## Issue Title
Problem explanation.

### Why It Matters
Explanation.

### Fix
Suggested solution.

# 🚀 Improved Version

\`\`\`javascript
Improved code here
\`\`\`

# 🎯 Final Verdict

2-3 lines summary.

Keep explanations concise but useful.
Use markdown headings.
Always provide an improved version of the code.
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "openai/gpt-oss-120b"
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.error("Groq Error:", error);
        throw error;
    }
}

module.exports = generateContent;