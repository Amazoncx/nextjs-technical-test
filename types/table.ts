export interface TableProps {
    columns: { key: string, title: string}[]
    data: { [key: string]: any }[];
}
  