# "Readability Extractor"

> Strip ads, navigation, and sidebars from any article URL or HTML. Use when agents need clean reading content for LLM context, article summarization, or RAG pipelines. Returns title, clean text, excerpt, and word count.

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)
[![Claw0x](https://img.shields.io/badge/Powered%20by-Claw0x-orange)](https://claw0x.com)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-green)](https://openclaw.org)

## What is This?

This is a native skill for **OpenClaw** and other AI agents. Skills are modular capabilities that agents can install and use instantly - no complex API setup, no managing multiple provider keys.

Built for OpenClaw, compatible with Claude, GPT-4, and other agent frameworks.

## Installation

### For OpenClaw Users

Simply tell your agent:

```
Install the ""Readability Extractor"" skill from Claw0x
```

Or use this connection prompt:

```
Add skill: readability-extractor
Platform: Claw0x
Get your API key at: https://claw0x.com
```

### For Other Agents (Claude, GPT-4, etc.)

1. Get your free API key at [claw0x.com](https://claw0x.com) (no credit card required)
2. Add to your agent's configuration:
   - Skill name: `readability-extractor`
   - Endpoint: `https://claw0x.com/v1/call`
   - Auth: Bearer token with your Claw0x API key

### Via CLI

```bash
npx @claw0x/cli add readability-extractor
```

---


# Readability Extractor

Extract clean, readable content from any webpage or HTML. Strips ads, navigation, sidebars, scripts, and noise. Finds the main article content using heuristic scoring (article/main tags).

## Use Cases

- LLM context preparation (clean text for prompts)
- Article summarization preprocessing
- RAG pipeline content extraction
- Content archiving (strip noise, keep substance)

## Prerequisites

1. **Sign up at [claw0x.com](https://claw0x.com)**
2. **Create API key** in Dashboard

## Pricing

**FREE.** No charge per call.

- Requires Claw0x API key for authentication
- No usage charges (price_per_call = 0)
- Unlimited calls

## Example

**Input**:
```json
{ "url": "https://example.com/blog/article" }
```

**Output**:
```json
{
  "title": "Article Title",
  "content": "Clean article text without ads or navigation...",
  "excerpt": "Clean article text without ads...",
  "wordCount": 450,
  "source": "https://example.com/blog/article"
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Missing url/html, or URL fetch failed |
| 401 | Missing or invalid API key |
| 500 | Extraction failed (not billed) |

## About Claw0x

[Claw0x](https://claw0x.com) is the native skills layer for AI agents.

**GitHub**: [github.com/kennyzir/readability-extractor](https://github.com/kennyzir/readability-extractor)


---

## About Claw0x

Claw0x is the native skills layer for AI agents - not just another API marketplace.

**Why Claw0x?**
- **One key, all skills** - Single API key for 50+ production-ready skills
- **Pay only for success** - Failed calls (4xx/5xx) are never charged
- **Built for OpenClaw** - Native integration with the OpenClaw agent framework
- **Zero config** - No upstream API keys to manage, we handle all third-party auth

**For Developers:**
- [Browse all skills](https://claw0x.com/skills)
- [Sell your own skills](https://claw0x.com/docs/sell)
- [API Documentation](https://claw0x.com/docs/api-reference)
- [OpenClaw Integration Guide](https://claw0x.com/docs/openclaw)

## Links

- [Claw0x Platform](https://claw0x.com)
- [OpenClaw Framework](https://openclaw.org)
- [Skill Documentation](https://claw0x.com/skills/readability-extractor)
