import 'dotenv/config';
import { defaultPort } from '@common/constants';

class AppConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): AppConfig {
    for (const k of keys) this.getValue(k, true);
    return this;
  }

  public getHost(): string {
    return this.getValue('HOST') || '0.0.0.0';
  }

  public getPort(): string | number {
    return this.getValue('PORT') || defaultPort;
  }

  public getAppSecret(): string | undefined {
    return this.getValue('APP_SECRET', true);
  }

  public getJwtExpired(): string | undefined {
    return this.getValue('JWT_EXPIRED', true);
  }
}

const appConfig = new AppConfig(process.env).ensureValues(['PORT', 'HOST']);

export { appConfig };
