import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";


export async function mcpClient() {
  try {
    // Debug package installation
    // checkBrightDataPackage();

    // console.log('<< calling client transport');
    
    // Try different command variations
    const commandOptions = [
      // { command: "npx", args: ["@brightdata/mcp"] },
      // { command: "npx", args: ["brightdata-mcp"] },
      // { command: "node", args: [`${__dirname}/node_modules/@brightdata/mcp/bin/mcp`] },
      { command: "node", args: [`${process.cwd()}/node_modules/@brightdata/mcp/server.js`] }
    ];

    let transport;
    let lastError;

    for (const cmdOption of commandOptions) {
      try {
        console.log(`Trying command: ${cmdOption.command} ${cmdOption.args.join(' ')}`);
        
        transport = new StdioClientTransport({
          command: cmdOption.command,
          args: cmdOption.args,
          env: {
            API_TOKEN: process.env.API_TOKEN,
            WEB_UNLOCKER_ZONE: process.env.WEB_UNLOCKER_ZONE,
          },
          cwd: process.cwd()
        });

        const client = new Client({
          name: "brightdata-client",
          version: "1.0.0",
        });

        console.log('<< client created');
        await client.connect(transport);
        console.log('<< client connected successfully');
        return client;

      } catch (error) {
        console.log(`Command failed: ${cmdOption.command} ${cmdOption.args.join(' ')} - ${error.message}`);
        lastError = error;
        continue;
      }
    }

    throw lastError || new Error('All command options failed');

  } catch (error) {
    console.error("Error initializing MCP client:", error);
    return null;
  }
}
