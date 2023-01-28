import { fileURLToPath } from 'url';
import { dirname } from 'path';
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

export default CURRENT_DIR;