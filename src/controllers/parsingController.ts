import { Request, Response } from 'express';
import parsingService from '../services/parsingService';
import openAIService from '../services/openAIService';

class ParsingController
 {
  async processData(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await openAIService.parseData(data, "");
      res.status(200).json({ success: true, result });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

export default new ParsingController
();