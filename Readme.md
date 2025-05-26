# 🧠 AI-Powered Influencer Discovery Engine

## What I Built

I built an AI-powered platform that helps **brands discover ideal influencers** by tapping into real-time social media data. Unlike static influencer directories, this tool dynamically finds creators who align with a brand’s **tone, values, target audience**, and **preferred content style**.

The system uses an AI agent to:
- Collect brand intent via a clean, guided interface
- Generate a natural language brief for influencer matching
- Transform that into search signals (hashtags, keywords, captions)
- Crawl Instagram in real time using **Bright Data's MCP**

This lets brands **find relevant, high-performing influencers** based on their current content—not stale bios or outdated databases.

---

## Demo

> GitHub Repo: [github.com/raibove/Fluencr](#)  
> Live Demo: [https://fluencr.pages.dev/](#)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mk737ll5nwuzr614sngj.png)


---

## How I Used Bright Data's Infrastructure

To power the **real-time influencer discovery system**, I used Bright Data’s **MCP (Mobile Cloud Proxy)** and automation tools. Here's how it helped:

### 🔍 Discover – Crawler-Based Search

- Used **Search Engine Crawler API** to scan TikTok, Instagram, and YouTube content based on AI-generated hashtags, keywords, and even video transcript data.
- Dynamically prioritized **posts with high engagement and recency**.

### 🧭 Access – Platform Navigation with JS Rendering

- Platforms like TikTok and Instagram require **login, scrolling, and human behavior simulation**.
- Bright Data’s helped **avoid detection** and ensure reliability.

### 📥 Extract – Scraping Key Data

- Collected structured content:
  - Creator handles, bios, and follower count  
  - Common hashtags and captions  
  - Engagement stats and collaboration links  
  - Video transcripts (when available)  
- Stored this data with **content embeddings** for future AI-based matching.

---

## Performance Improvements

Traditional influencer tools rely on pre-populated databases or partner networks, which are:
- Often outdated
- Miss dynamic trends
- Lack true intent-based matching

By using **real-time social content scraping**, I was able to:
- Surface creators based on **live content behavior**
- Identify micro-influencers aligned with niche values like **sustainability or tech innovation**
- Deliver **10x more relevant results** for brands with very specific audience goals

---

## Tech Stack

| Layer          | Tools Used                             |
|----------------|----------------------------------------|
| Frontend       | React                                   |
| Backend AI     | Cloudflare Worker + GPT-4               |
| Scraping Infra | Bright Data MCP  |

---

## App Flow: From Brand Brief to Influencer Match

1. **Enter Brand Details**  
   → Dropdowns for brand tone, audience, platform, values  

2. **AI Improves Prompt**  
   → GPT-4 generates a structured brand profile:  
   _“Looking for creators who post funny, women-focused, Gen Z content around self-love on Instagram”_  

3. **Generate Search Signals**  
   → AI outputs hashtags, content types, keywords  

4. **Search & Extract**  
   → Bright Data crawls platforms, simulates interaction, and extracts data  

5. **Deliver Matches**  
   → Ranked influencer shortlist with metrics and links

---

## Final Thoughts

This tool blends **AI prompt generation**, **real-time web scraping**, and **content analysis** to solve one of the biggest challenges in influencer marketing: **finding creators who truly align with a brand’s evolving voice and values**.

By using **Bright Data’s infrastructure**, I was able to go beyond APIs and get **dynamic, actionable insights** directly from the platforms that matter.
