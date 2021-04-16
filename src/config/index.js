import dev from './env/dev';
import prod from './env/prod';

const env = process.env.NODE_ENV || 'production';
console.log(`env: ${env}`);
export default (env === 'development' ? dev : prod);
