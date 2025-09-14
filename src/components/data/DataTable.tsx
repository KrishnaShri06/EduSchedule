import { useState } from "react";
import { Search, Plus, Upload, Download, Filter, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  title: string;
  description: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onBulkUpload?: () => void;
}

export function DataTable({ 
  title, 
  description, 
  columns, 
  data, 
  onAdd, 
  onEdit, 
  onDelete, 
  onBulkUpload 
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredData = data.filter(item =>
    columns.some(column =>
      String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortField 
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        const multiplier = sortDirection === "asc" ? 1 : -1;
        return aVal < bVal ? -1 * multiplier : aVal > bVal ? 1 * multiplier : 0;
      })
    : filteredData;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderCellValue = (value: any, key: string) => {
    if (key === 'status') {
      return (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      );
    }
    if (key === 'capacity' && typeof value === 'number') {
      return <span className="font-mono">{value}</span>;
    }
    return String(value);
  };

  return (
    <Card className="kpi-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {onBulkUpload && (
              <Button variant="outline" size="sm" onClick={onBulkUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {onAdd && (
              <Button size="sm" onClick={onAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={column.sortable ? "cursor-pointer hover:bg-muted/70" : ""}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortField === column.key && (
                        <span className="text-xs">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCellValue(item[column.key], column.key)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem 
                            onClick={() => onDelete(item)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sortedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No data found
          </div>
        )}
      </CardContent>
    </Card>
  );
}