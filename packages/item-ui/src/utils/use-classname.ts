import classnames from 'classnames'
import { computed } from 'vue'



export function useClassname(component: string) {
  const prefix = 'item-'
  const componentName = `${prefix}${component}`

  const c = (...args: BEMType[]) => {
    let result = componentName;
    if (args.length > 0) {
      args.forEach((item) => {
        if (Array.isArray(item)) {
          const val1 = item[0];
          const val2 = item[1];
          if (val2 === 'B' || !val2) result += `-${val1}`;
          else if (val2 === 'E') result += `__${val1}`;
          else if (val2 === 'M') result += `--${val1}`;
        } else {
          result += `-${item}`;
        }
      });
    }
    return result;
  }

  const ce = (e: string): BEMType => [e, 'E'];
  const cm = (m: string): BEMType => [m, 'M'];

  const cx = (classFun: CxClassFun) => {
    return computed(() => classnames(classFun()));
  }

  return {
    c,
    ce,
    cm,
    cx,
  }
}

type CxClassFun = () => string | (string | Record<string, boolean>)[] | Record<string, boolean>
type BEMType = string | [string, 'B' | 'E' | 'M' | undefined]
