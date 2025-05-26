export interface Env {
  // If you set another name in the Wrangler config file as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: Ai;
}

interface InputForm {
  brand_type: string;
  product_focus: string;
  audience: string;
  vibe: string;
  goal: string;
  extra_keywords: string;
  prompt_type: 'brand_description' | 'content_signal_topics' | 'content_signal_keywords';
  description: string;
}

export default {
  async fetch(request, env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': `*`,
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }


    if (request.method !== 'POST') {
      return new Response('Please send a POST request', { status: 405, headers: corsHeaders });
    }
    const body: InputForm = await request.json();

    const { brand_type, product_focus, audience, vibe, goal, extra_keywords, prompt_type, description } = body;

    if (prompt_type === 'brand_description') {
      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        prompt: `
      I am building an influencer search engine. A brand has filled out the following structured information:
        Brand type: ${brand_type}
        Product focus: ${product_focus}
        Ideal audience: ${audience}
        Brand vibe: ${vibe}
        Marketing goal: ${goal}
        Extra tags or keywords: ${extra_keywords}
      Based on this, write a clear, natural description of this brand in 2–4 sentences. Focus on their identity, what kind of content they align with, and what kind of creators might match their vision. Use it as context for finding the right influencers.
      `
      });
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if(prompt_type === 'content_signal_topics') {
       const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        prompt: `I am building an influencer search engine. A brand has described itself as:

        "${description}"

        Based on this, suggest the types of Instagram influencers who would be a good fit — not based on exact brand type, but based on the kind of content they post.

        Please return the response in structured JSON format with the following keys:

        {
          "lifestyle_topics": [ "..." ],
          "relevant_hashtags": [ "..." ],
        }
        Definitions:

          lifestyle_topics: The everyday lifestyle themes their content reflects.
          relevant_hashtags: Instagram hashtags to search for.
        `
      });
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if(prompt_type === 'content_signal_keywords') {
      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        prompt: `I am building an influencer search engine. A brand has described itself as:

        "${description}"

        Based on this, suggest the types of Instagram influencers who would be a good fit — not based on exact brand type, but based on the kind of content they post.

        Please return the response in structured JSON format with the following keys:

        {
          "creator_profiles": [ "..." ],
          "search_keywords": [ "..." ]
        }
        Definitions:

          creator_profiles: Types of people they are (e.g., working women, students).
          search_keywords: Natural-language phrases or post topics to search with.
        `
      });
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response('Please add valid type with post request', { status: 405, headers: corsHeaders });
  },
} satisfies ExportedHandler<Env>;