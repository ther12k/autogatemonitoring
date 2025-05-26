// File: src/components/specialized/CustomTable.jsx //
// ============================================================ //
import React, { useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SearchX, Loader2 } from "lucide-react";

const CustomTable = ({
  columns,
  data = [],
  loading,
  showPagination = true,
  showSearch = false, // Optional: Add a search bar
  searchPlaceholder = "Search...",
  initialRowsPerPage = 5,
  onRowClick, // Optional: callback for row click
}) => {
  const [page, setPage] = useState(1); // 1-indexed
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sortColumn, setSortColumn] = useState(columns.length > 0 ? columns[0].id : "");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (columnId) => {
    if (!columns.find(c => c.id === columnId)?.sortable) return;
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let processedData = [...data];

    // Filtering
    if (showSearch && searchTerm) {
      processedData = processedData.filter((row) =>
        columns.some(col => {
          const value = col.accessor ? col.accessor(row) : row[col.id];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Sorting
    if (sortColumn) {
      processedData.sort((a, b) => {
        const valA = columns.find(c => c.id === sortColumn)?.accessor
                     ? columns.find(c => c.id === sortColumn).accessor(a)
                     : a[sortColumn];
        const valB = columns.find(c => c.id === sortColumn)?.accessor
                     ? columns.find(c => c.id === sortColumn).accessor(b)
                     : b[sortColumn];

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return processedData;
  }, [data, columns, sortColumn, sortDirection, searchTerm, showSearch]);

  const totalRows = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = showPagination
    ? filteredAndSortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : filteredAndSortedData;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1); // Reset to first page
  };

  // Pagination items logic
  const getPaginationItems = () => {
      const items = [];
      const maxPagesToShow = 5; // Max number of page links to show
      const halfMax = Math.floor(maxPagesToShow / 2);

      if (totalPages <= maxPagesToShow) {
          for (let i = 1; i <= totalPages; i++) items.push(i);
      } else {
          if (page <= halfMax + 1) {
              for (let i = 1; i <= maxPagesToShow -1; i++) items.push(i);
              items.push('ellipsis-end');
              items.push(totalPages);
          } else if (page >= totalPages - halfMax) {
              items.push(1);
              items.push('ellipsis-start');
              for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) items.push(i);
          } else {
              items.push(1);
              items.push('ellipsis-start');
              for (let i = page - halfMax +1 ; i <= page + halfMax -1; i++) items.push(i);
              items.push('ellipsis-end');
              items.push(totalPages);
          }
      }
      return items;
  };


  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex justify-between items-center">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.className}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.id)}
                      className="px-0 hover:bg-transparent"
                    >
                      {column.label}
                      {sortColumn === column.id && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                    Loading data...
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex} // Prefer a unique row.id
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} className={column.cellClassName}>
                      {column.cell ? column.cell(row) : (column.accessor ? column.accessor(row) : row[column.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <SearchX className="h-12 w-12 mb-2" />
                    No results found.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalRows > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((page - 1) * rowsPerPage + 1, totalRows)}
            {' - '}
            {Math.min(page * rowsPerPage, totalRows)} of {totalRows} rows
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={String(rowsPerPage)}
              onValueChange={handleRowsPerPageChange}
            >
              <SelectTrigger className="w-[80px] h-9">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50, 100].map(val => (
                  <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(page - 1); }}
                    disabled={page === 1}
                    isActive={false}
                  />
                </PaginationItem>
                {getPaginationItems().map((item, index) => (
                    <PaginationItem key={index}>
                        {typeof item === 'number' ? (
                            <PaginationLink
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(item); }}
                                isActive={page === item}
                            >
                                {item}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }}
                    disabled={page === totalPages}
                    isActive={false}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;