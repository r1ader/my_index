import { computed, ref, unref } from "vue";
import { marked } from "./index";

export function useRouteHash() {
    const hash = ref(location.hash.replace('#', ''))
    window.addEventListener('hashchange', () => {
        hash.value = location.hash.replace('#', '')
    })
    return hash
}

export function useMarked(marked_text) {
    return computed(() => marked(unref(marked_text)))
}
