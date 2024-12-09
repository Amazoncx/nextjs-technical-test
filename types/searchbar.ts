export interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
    value?: string;
}