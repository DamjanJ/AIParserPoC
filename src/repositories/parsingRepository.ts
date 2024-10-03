class ParsingRepository {
  async parseData(data: string): Promise<void> {
    console.log('Data to be parsed:', data);
  }
}

export default new ParsingRepository();