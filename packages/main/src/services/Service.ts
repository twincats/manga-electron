import type { Logger, LoggerFacade } from '../logger';

export const INJECTIONS_SYMBOL = Symbol('__injections__');

export function Inject(type: string) {
  return function (target: any, propertyKey: string): void {
    if (!Reflect.has(target, INJECTIONS_SYMBOL)) {
      Reflect.set(target, INJECTIONS_SYMBOL, []);
    }
    if (!type) {
      throw new Error(`Inject recieved type: ${type}!`);
    } else {
      Reflect.get(target, INJECTIONS_SYMBOL).push({ type, field: propertyKey });
    }
  };
}

export class Service {
  readonly name: string;
  private logger: LoggerFacade;

  constructor(logger: Logger) {
    this.name = Object.getPrototypeOf(this).constructor.name;
    this.logger = logger.createLoggerFor(this.name);
  }

  protected log(m: any, ...a: any[]): void {
    this.logger.log(`[${this.name}] ${m}`, ...a);
  }

  protected error(m: any, ...a: any[]): void {
    this.logger.error(`[${this.name}] ${m}`, ...a);
  }

  protected warn(m: any, ...a: any[]): void {
    this.logger.warn(`[${this.name}] ${m}`, ...a);
  }
}
