export default abstract class BaseService {
  private readonly repository: any
  constructor(repository: any) {
    this.repository = repository
  }

  async find() {
    
  }
}
