import parsingRepository from '../repositories/parsingRepository';

class ParsingService {
  async processData(data: any): Promise<string> {
    // Business logic
    console.log('data',data)
    const processedData = `Processed: ${data}`;

    // Interact with the repository (e.g., save to database)
    await parsingRepository.parseData(processedData);

    return processedData;
  }
}

export default new ParsingService();