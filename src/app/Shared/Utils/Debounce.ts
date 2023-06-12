import { debounce } from 'underscore';

export function Debounce(ms: any) {
  return (target: any, key: any, descriptor: any) => {
    descriptor.value = debounce(descriptor.value, ms);
    return descriptor;
  };
}
