import OpenAI from 'openai'; // Default import
import dotenv from 'dotenv';
import { promises as fs } from 'fs'; 

// Load environment variables from .env file
dotenv.config();

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI();
  }

  // Method to parse data using OpenAI
  public async parseData(prompt: any, instructions: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `In 3 sentances what are some fun facts about: ${prompt.data}` }],
      });

      const parsedData = response.choices[0]?.message?.content?.trim();
      if (!parsedData) throw new Error('Failed to parse data.');

      return parsedData;
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      throw new Error('Failed to parse data using OpenAI.');
    }
  }

    // Method to read text from a file and parse it using OpenAI
    public async parseDataFromFile(filePath: string, instructions: string): Promise<string> {
        try {
          // Read the file content
          const fileContent = await fs.readFile(filePath, 'utf-8');
    
          // Pass the file content and instructions to the parseData method
          const parsedData = await this.parseData(fileContent, instructions);
    
          return parsedData;
        } catch (error) {
          console.error('Error reading from file or parsing data:', error);
          throw new Error('Failed to parse data from file using OpenAI.');
        }
    }

  
}

export default new OpenAIService();


// AZURE IMPLEMENTATION


// import { AzureKeyCredential } from "@azure/core-auth";
// import dotenv from 'dotenv';
// import { AzureOpenAI } from "openai";
// const deployment = "Your Azure OpenAI deployment";
// const apiVersion = "2024-04-01-preview";
// const options = { azureADTokenProvider, deployment, apiVersion }
// const client = new AzureOpenAI(options);

// // Load environment variables from the .env file
// dotenv.config();

// class OpenAIService {
//   private client: AzureOpenAI;
//   private deploymentName: string;

//   constructor() {
//     const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
//     const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
//     const apiKey = process.env.AZURE_OPENAI_API_KEY;
//     this.deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || '';

//     if (!endpoint || !apiKey) {
//       throw new Error('Azure OpenAI endpoint or API key is not set in the environment variables.');
//     }

//     this.client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
//   }

//   // Method to generate a completion using the Azure OpenAI API
//   public async generateCompletion(prompt: string): Promise<string> {
//     try {
//       const result = await this.client.g(this.deploymentName, {
//         prompt: prompt,
//         maxTokens: 100,
//         temperature: 0.7,
//       });

//       const completionText = result.choices[0]?.text.trim();
//       if (!completionText) {
//         throw new Error('Failed to generate completion.');
//       }

//       return completionText;
//     } catch (error) {
//       console.error('Error communicating with Azure OpenAI:', error);
//       throw new Error('Failed to generate completion using Azure OpenAI.');
//     }
//   }
// }

// export default new OpenAIService();