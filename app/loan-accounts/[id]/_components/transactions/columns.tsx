'use client'
import {type TransactionRow, type Status, type TransactionType} from '@/types'
import {Checkbox} from '@/components/primitives/checkbox'
import {type  ColumnDef} from '@tanstack/react-table'
import { Badge } from '../../../../../components/primitives/badge'
import { cn } from '@/lib/utils'
import { ArrowDown01Icon, ArrowUp10Icon, ArrowUpDownIcon } from 'lucide-react'


const columns: ColumnDef<TransactionRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    )
  },
  {
    meta:{
      label:'Transaction date'
    },
    accessorKey: 'transactionDate',
    header: ({column})=>{
      return <div className='flex cursor-pointer items-center' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Transaction date {column.getIsSorted() === "asc"?<ArrowDown01Icon className='size-4'/> : <ArrowUp10Icon className='size-4' />}
      </div>
    },
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        {row.getValue<string>('transactionDate').split('T')[1] /*//.split('T')[0] */}
      </div>
    )
  },
  {
    header: 'Value date',
    accessorKey: 'valueDate',
    cell: ({ row }) => <div>{row.getValue<string>('valueDate')!.split('T')[0]}</div>,
    enableSorting: true,
    meta: {
      filterVariant: 'range'
    }
  },
  {
    header: 'Transaction type',
    accessorKey: 'type',
    cell: ({ row }) => {
      const transactionType = row.getValue('type')  as TransactionType;

      const styles = cn('bg-purple-600/10 text-purple-600 focus-visible:ring-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400 dark:focus-visible:ring-purple-400/40 [a&]:hover:bg-purple-600/5 dark:[a&]:hover:bg-purple-400/5')

      return (
        <Badge className={(cn('border-none focus-visible:outline-none'), styles)}>{transactionType}</Badge>
      )
    },
    enableSorting: false,
    meta: {
      filterVariant: 'select'
    }
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.getValue('status')  as Status;

      const styles = {
        'CLEARED': cn('bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5'),
        'PENDING': cn('bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5'),
        'FAILED': cn('bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5'),
      }

      return (
        <Badge className={(cn('border-none focus-visible:outline-none'), styles[status])}>{status}</Badge>
      )
    },
    meta: {
      filterVariant: 'select',
    }
  },{
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
    enableSorting: false,
    meta: {
      filterVariant: 'text'
    }
  },{
    header: 'Debit',
    accessorKey: 'debit',
    cell: ({ row }) => {
      const val = row.getValue('debit');
      return <div>{val ? `$${val.toLocaleString()}` : ''}</div>
    },
    enableSorting: false,
    meta: {
      filterVariant: 'range'
    }
  },{
    header: 'Credit',
    accessorKey: 'credit',
    cell: ({ row }) => {
      const val = row.getValue('credit');
      return <div>{val ? `$${val.toLocaleString()}` : ''}</div>
    },
    enableSorting: false,
    meta: {
      filterVariant: 'range'
    }
  },
  {
    header: 'Closing balance',
    accessorKey: 'closingBalance',
    cell: ({ row }) => <div>{row.getValue('closingBalance')?.toLocaleString()}</div>,
    enableSorting: false
  }
]


export default columns;