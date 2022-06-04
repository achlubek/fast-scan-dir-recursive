# fast-scan-dir-recursive
Scans a directory recursively while avoiding recursion and being parallel and fast

Example usage:
```typescript
import { scan } from "fast-scan-dir-recursive";
const files = await scan.scan(dir); 
```