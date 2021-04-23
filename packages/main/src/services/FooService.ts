import type { BaseService } from './BaseService';
import { Inject, Service } from './Service';
// import { add } from "/@shared/sharedLib";

export class FooService extends Service {
  @Inject('BaseService')
  private baseService!: BaseService;

  /**
   * Example for inject and shared lib
   */
  async foo(): Promise<unknown> {
    const result = await this.baseService.getBasicInformation();
    const sum = 3; //add(1, 2);
    this.log(`Call function imported from /shared folder! 1 + 2 = ${sum}`);
    return {
      ...result,
      foo: 'bar',
    };
  }
}
