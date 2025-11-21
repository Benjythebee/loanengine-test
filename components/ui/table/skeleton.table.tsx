import { Skeleton } from "@/components/primitives/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/primitives/table";

type TableSkeletonProps = {
  filterHeader?: React.ReactNode;
  childrenHeader: React.ReactNode;
  childrenBody: React.ReactNode;
}

export const TableSkeleton = ({filterHeader, childrenHeader, childrenBody}: TableSkeletonProps) => {

  return (
    <div className="w-full border rounded-lg">
      <div className="flex flex-wrap gap-3 px-2 py-6">{filterHeader}</div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {childrenHeader}
          </TableRow>
        </TableHeader>
        <TableBody>
          {childrenBody}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * EG:
 * {[...Array(rows || 3)].map((_, i) => (
              <TableCell>
                <Skeleton className="h-5 w-[100px]" />
              </TableCell>
          ))}
 */