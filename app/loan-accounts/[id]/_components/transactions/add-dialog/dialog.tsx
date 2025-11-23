import { Button } from "@/components/primitives/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/primitives/dialog/dialog"
import { Input } from "@/components/primitives/input"
import { Label } from "@/components/primitives/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/primitives/select"
import { Separator } from "@/components/primitives/separator"
import { backendData } from "@/mock/data"
import { STATUS_TYPES, TRANSACTION_TYPES, TransactionType } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { LucidePlusCircle } from "lucide-react"
import { useState } from "react"
import { useLoanID } from "../../../id-provider"

export function AddTXDialog({disabled}:{disabled?:boolean}) {
    const { loanID } = useLoanID()
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null);
        const formData = new FormData(e.currentTarget)

        const row = {
            id: Math.random().toString(36).substr(2, 9), // Generate a random ID
            transactionDate: new Date(formData.get('transactionDate') as string).toISOString(),
            valueDate: new Date(formData.get('valueDate') as string).toISOString(),
            type: formData.get('type') as TransactionType,
            status: formData.get('status') as any,
            description: formData.get('description') as string,
            debit: Number(formData.get('debit')),
            credit: Number(formData.get('credit')),
            closingBalance: 0, // Placeholder, will be calculated later
        }

        if(row.debit === 0 && row.credit === 0){
            setError("Either debit or credit must be greater than zero.");
            return;
        }else if (row.debit > 0 && row.credit > 0){
            setError("Only one of debit or credit can be greater than zero.");
            return;
        }
        

        const c = backendData.get(loanID)
        row.closingBalance = (c?.closingBalance || 0) + (Number(row.credit) || 0) - (Number(row.debit) || 0);
        console.log('New Row:', row);
        if(c){
            c.rows.push(row);
            c.closingBalance = row.closingBalance;
            backendData.set(loanID, c!)
        }
        
        // Add your API call here to submit the transaction
        try {
            // Invalidate and refetch the transactions query
            queryClient.invalidateQueries({ queryKey: ['transactions', loanID,0] })
            
            // Close the dialog
            setOpen(false)
        } catch (error) {
            console.error('Failed to add transaction:', error)
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" disabled={disabled}><LucidePlusCircle /> Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
      <form id='dw' onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="transactionDate">Transaction Date</Label>
              <Input required aria-required="true" id="transactionDate" name="transactionDate" type="date" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="valueDate">Value Date</Label>
              <Input required aria-required="true" id="valueDate" name="valueDate" type="date" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type">Type</Label>
              <Select required aria-required="true" name="type">
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select required aria-required="true" name="status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_TYPES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 grid gap-3">
                <Label htmlFor="debit">Debit</Label>
                <Input required aria-required="true" id="debit" name="debit" type="number" defaultValue={0} step="0.01" />
              </div>
              <Separator orientation="vertical" className="mx-2" title='or' />
              <div className="flex-1 grid gap-3">
                <Label htmlFor="credit">Credit</Label>
                <Input required aria-required="true" id="credit" name="credit" type="number" defaultValue={0} step="0.01" />
              </div>
            </div>
          </div>
          <DialogFooter>
            {error && <div className="text-red-500 mr-auto">{error}</div>}
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )

}