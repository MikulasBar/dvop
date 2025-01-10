

export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    available: boolean;
}

export function isValidBook(obj: any): boolean {
    return (
        typeof obj.title === 'string' &&
        typeof obj.author === 'string' &&
        typeof obj.year === 'number' &&
        typeof obj.available === 'boolean'
    );
}