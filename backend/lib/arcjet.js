import arcjet , {tokenBucket , shield , detectBot} from "@arcjet/node";
import "dotenv/config";

// Initialize Arcjet with your API key

export const aj= arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // shield protects your application from malicious traffic and DDoS attacks such as SQL injection, XSS, and other common web vulnerabilities. It can also help prevent brute force attacks and other types of abuse.
        shield({mode:"LIVE"}),
        detectBot({
            // block all bots except for the ones that you allow. You can find the list of categories in the Arcjet documentation. For example, if you want to block all bots except for search engine bots, you can use the following code:    
            mode:"LIVE",
            // allow is an array of categories that you want to allow through the bot detection. You can find the list of categories in the Arcjet documentation. For example, if you want to allow search engine bots, you can use the following code:
            allow:["CATEGORY:SEARCH_ENGINE"]

        }),

        //rate limiting 

        tokenBucket({
            mode:"LIVE",
            // limit is the maximum number of requests that can be made in a given time window. The default is 100 requests per minute.
            refillRate:5,
            interval:60,
            capacity:10,
            
        }),
    ]
})