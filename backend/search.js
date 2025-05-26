import { mcpClient } from "./mcp_client.js";

const INSTA_TOOLS = ['web_data_instagram_reels', 'web_data_instagram_comments', 'web_data_instagram_posts', 'web_data_instagram_profiles', '']

const classifyInstagramLinks = (links) => {
    const uniqueLinks = [...new Set(links)];

    return uniqueLinks.map(url => {
        const decodedUrl = decodeURIComponent(url);
        const link = decodedUrl.split('?')[0];
        const parts = link.replace('https://www.instagram.com/', '').split('/').filter(Boolean);

        // Edge cases for base paths
        const base = parts[0];
        const second = parts[1];

        // If direct /p/, /reel/, /stories/
        if (base === 'p') {
            return { type: 'post', link };
        } else if (base === 'reel') {
            return { type: 'reel', link };
        } else if (base === 'stories') {
            return { type: 'story', link };
        }

        // If username then /p/, /reel/, etc., normalize to profile
        if (base && !['p', 'reel', 'stories'].includes(base)) {
            return {
                type: 'profile',
                link: `https://www.instagram.com/${base}/`
            };
        }

        return { type: 'profile', link };
    });
};

const getAllInstagramProfiles = async (instaLinks, client) => {
    const classifiedInstaLinks = classifyInstagramLinks(instaLinks);
    let instagramProfiles = classifiedInstaLinks.filter(link => link.type === 'profile').map(profile=> profile.link);
    const instagramReels = classifiedInstaLinks.filter(link => link.type === 'reel');
    const instagramPosts = classifiedInstaLinks.filter(link => link.type === 'post');

    const profilesFromReels = await getProfileFromReels(instagramReels, client);    
    instagramProfiles = [...instagramProfiles, ...profilesFromReels];
    const profiles = [...new Set(instagramProfiles)];
    return profiles;

}

const getProfileFromReels = async (instagramReels, client) => {
    const toolName = INSTA_TOOLS[0]
    let arr = []
   
    for (let i = 0; i < instagramReels.length; i++) {
         try{
        const resp = await client.callTool({
            name: toolName,
            arguments: {
                url: instagramReels[i].link,
            },
        });

        if(resp && resp.content && resp.content[0].text){
            const data = JSON.parse(resp.content[0].text)
            if(data.length>0 && data[0].user_posted){
                arr.push(`https://www.instagram.com/${data[0].user_posted}`)
            }
        }
        }catch(e){
            console.log('error', e)
        }
    }

    return arr;
}

export const searchProfiles = async (keyword) => {
    try {
        const date = new Date();
        const instaQuery = `site:instagram.com ${keyword}`;
        const client = await mcpClient();
        const toolName = INSTA_TOOLS[3]
        // const { tools } = await client.listTools();
        // const searchEngineTool = tools.find((tool) => tool.name === INSTA_TOOLS[0]);
        // console.log('<<tools', searchEngineTool.inputSchema.properties)
        const searchResult = await client.callTool({
            name: "search_engine",
            arguments: {
                query: instaQuery,
            },
        });

        let instaLinks = [];
        if (searchResult && searchResult.content && searchResult.content[0].text) {
            instaLinks = searchResult.content[0].text.match(/https:\/\/www\.instagram\.com\/[^\s)"]+/g) || [];
        } else {
            throw new Error("No content found in search result");
        }

        // const allInstagramProfiles = await getAllInstagramProfiles(instaLinks, client);
        console.log('allInstagramProfiles', instaLinks)
        return instaLinks;
    } catch (error) {
        console.error("LinkedIn search error:", error);
        return [];
    }
}