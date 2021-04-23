import type { Ref } from 'vue';
import { computed } from 'vue';

export function useSum(a: Ref<number>, b: Ref<number>) {
  return computed(() => a.value + b.value);
}
