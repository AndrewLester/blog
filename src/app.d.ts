/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
        breadcrumbs?: import('$lib/types').Breadcrumb[];
    }
    // interface Platform {}
    interface Stuff {
        breadcrumbs?: import('$lib/types').Breadcrumb[];
    }
}
