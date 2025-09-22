import { ACCOUNT_ID } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "DexScreener Agent",
            description: "AI agent for searching and analyzing cryptocurrency tokens on DexScreener",
            version: "1.0.0"
        },
        servers: [
            {
                // Enter the base and open url of your agent here, make sure it is reachable
                url: "https://agent-next-boilerplate.vercel.app/"
            }
        ],
        "x-mb": {
            // The account id of the user who created the agent found in .env file
            "account-id": ACCOUNT_ID,
            // The email of the user who created the agent
            email: "youremail@gmail.com",
            assistant: {
                name: "DexScreener Agent",
                description: "A specialized AI agent that searches for cryptocurrency tokens and provides detailed market information including prices, liquidity, volume, and trading data from DexScreener.",
                instructions: "You are a DexScreener search agent. When users ask about tokens, search for them using only the token name (like 'PEPE', 'DOGE', 'ETH') and return comprehensive market data including current price, trading volume, liquidity, market cap, and other relevant trading metrics. Extract the token name from user queries and use the DexScreener search endpoint to find matching tokens across all supported DEXes and chains.",
                tools: [],
                // Thumbnail image for your agent
                image: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/bitte.svg`,
                // The repo url for your agent https://github.com/your-username/your-agent-repo
                repo: 'https://github.com/BitteProtocol/agent-next-boilerplate',
                // The categories your agent supports ["DeFi", "DAO", "NFT", "Social"]
                categories: ["DeFi"],
                // The chains your agent supports 1 = mainnet, 8453 = base
                chainIds: [1, 8453]
            },
        },
        paths: {
            "/api/tools/dexscreener-search": {
                get: {
                    summary: "Search DexScreener for token information",
                    description: "Search for cryptocurrency tokens on DexScreener and return detailed market data including price, volume, liquidity, and trading information",
                    operationId: "searchDexScreener",
                    parameters: [
                        {
                            name: "q",
                            in: "query",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            description: "The token name or symbol to search for (e.g., 'PEPE', 'DOGE', 'ETH')"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful response with token data",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            schemaVersion: {
                                                type: "string",
                                                description: "Version of the schema"
                                            },
                                            pairs: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        chainId: {
                                                            type: "string",
                                                            description: "Blockchain network identifier"
                                                        },
                                                        dexId: {
                                                            type: "string",
                                                            description: "Decentralized exchange identifier"
                                                        },
                                                        url: {
                                                            type: "string",
                                                            description: "DexScreener URL for this pair"
                                                        },
                                                        pairAddress: {
                                                            type: "string",
                                                            description: "Smart contract address of the trading pair"
                                                        },
                                                        labels: {
                                                            type: "array",
                                                            items: { type: "string" },
                                                            description: "Labels or tags for this pair"
                                                        },
                                                        baseToken: {
                                                            type: "object",
                                                            properties: {
                                                                address: { type: "string", description: "Token contract address" },
                                                                name: { type: "string", description: "Token name" },
                                                                symbol: { type: "string", description: "Token symbol" }
                                                            }
                                                        },
                                                        quoteToken: {
                                                            type: "object",
                                                            properties: {
                                                                address: { type: "string", description: "Quote token contract address" },
                                                                name: { type: "string", description: "Quote token name" },
                                                                symbol: { type: "string", description: "Quote token symbol" }
                                                            }
                                                        },
                                                        priceNative: {
                                                            type: "string",
                                                            description: "Price in native blockchain currency"
                                                        },
                                                        priceUsd: {
                                                            type: "string",
                                                            description: "Price in USD"
                                                        },
                                                        txns: {
                                                            type: "object",
                                                            description: "Transaction statistics with time periods as keys",
                                                            additionalProperties: {
                                                                type: "object",
                                                                properties: {
                                                                    buys: { type: "number", description: "Number of buy transactions" },
                                                                    sells: { type: "number", description: "Number of sell transactions" }
                                                                }
                                                            }
                                                        },
                                                        volume: {
                                                            type: "object",
                                                            description: "Trading volume with time periods as keys",
                                                            additionalProperties: { type: "number" }
                                                        },
                                                        priceChange: {
                                                            type: "object",
                                                            description: "Price change percentages with time periods as keys",
                                                            additionalProperties: { type: "number" }
                                                        },
                                                        liquidity: {
                                                            type: "object",
                                                            properties: {
                                                                usd: { type: "number", description: "Liquidity in USD" },
                                                                base: { type: "number", description: "Base token liquidity" },
                                                                quote: { type: "number", description: "Quote token liquidity" }
                                                            }
                                                        },
                                                        fdv: {
                                                            type: "number",
                                                            description: "Fully diluted valuation"
                                                        },
                                                        marketCap: {
                                                            type: "number",
                                                            description: "Market capitalization"
                                                        },
                                                        pairCreatedAt: {
                                                            type: "number",
                                                            description: "Unix timestamp when the pair was created"
                                                        },
                                                        info: {
                                                            type: "object",
                                                            properties: {
                                                                imageUrl: { type: "string", description: "Token logo URL" },
                                                                websites: {
                                                                    type: "array",
                                                                    items: {
                                                                        type: "object",
                                                                        properties: { url: { type: "string" } }
                                                                    }
                                                                },
                                                                socials: {
                                                                    type: "array",
                                                                    items: {
                                                                        type: "object",
                                                                        properties: {
                                                                            platform: { type: "string", description: "Social media platform" },
                                                                            handle: { type: "string", description: "Social media handle" }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        boosts: {
                                                            type: "object",
                                                            properties: {
                                                                active: { type: "number", description: "Number of active boosts" }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad request - missing or invalid query parameter",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {},
    };

    return NextResponse.json(pluginData);
}
