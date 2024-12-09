import { TableProps } from '@/types/table';
import React from 'react';

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {data.length === 0 && (
                <tr>
                    <td colSpan={columns.length} className="text-center">No se encontraron resultados</td>
                </tr>
            )}
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                    <td key={colIndex}>{row[column.key]}</td>
                ))}
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;