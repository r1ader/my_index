import { ref } from "vue";

export function useRouteHash() {
    const hash = ref(location.hash.replace('#', ''))
    window.addEventListener('hashchange', () => {
        hash.value = location.hash.replace('#', '')
    })
    return hash
}
