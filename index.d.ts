declare module 'fast-scan-dir-recursive' {
    export function scan(dir: string): Promise<string[]>;
  }
  