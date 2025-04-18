import Fuse from 'fuse.js';
import type { Meme } from '$lib/types';

/**
 * Fetches the list of memes from the `memes_list.json` file.
 * @returns {Promise<Meme[]>} A promise that resolves to the list of memes.
 */
export async function getMemes(): Promise<Meme[]> {
    const response = await fetch('/memes_list.json');
    if (!response.ok) {
        throw new Error('Failed to fetch memes list');
    }
    return response.json();
}

/**
 * Extracts all unique categories from the given meme list.
 * @param {Meme[]} memeList - The list of memes.
 * @returns {string[]} An array of unique categories.
 */
export function getCategories(memeList: Meme[]): string[] {
    const allCategories = new Set<string>();
    memeList.forEach((meme) => {
        const pathParts = meme.name.split('/');
        pathParts.pop(); // Remove the file name
        pathParts.forEach((category) => allCategories.add(category));
    });
    return Array.from(allCategories);
}

/**
 * Extracts all unique file extensions from the given meme list.
 * @param {Meme[]} memeList - The list of memes.
 * @returns {string[]} An array of unique file extensions.
 */
export function getExtensions(memeList: Meme[]): string[] {
    const extensions = new Set<string>();
    memeList.forEach((meme) => {
        const extension = meme.name.split('.').pop();
        if (extension) {
            extensions.add(extension);
        }
    });
    return Array.from(extensions);
}

/**
 * Filters the meme list based on the search query using fuzzy searching.
 * @param {string} search - The search query.
 * @param {Meme[]} memeList - The list of memes to search in.
 * @returns {Meme[]} The filtered list of memes.
 */
export function search(search: string, memeList: Meme[]): Meme[] {
    const fuseOptions = {
        keys: ['name', 'name.split("/")'],
        threshold: 0.4, // Higher threshold allows for more lenient matches
        distance: 100, // Increases tolerance for typos
        ignoreLocation: true, // Ignores the position of the match in the string
    };
    const fuse = new Fuse(memeList, fuseOptions);
    return search.trim() ? fuse.search(search).map((result) => result.item) : memeList;
}
