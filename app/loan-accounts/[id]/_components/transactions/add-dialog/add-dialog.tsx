'use client'
import { Button } from "@/components/primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/primitives/dialog/dialog";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { Separator } from "@/components/primitives/separator";
import { backendData } from "@/mock/data";
import { STATUS_TYPES, TRANSACTION_TYPES, TransactionType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { LucidePlusCircle } from "lucide-react";
import { ComponentProps, useState } from "react";
import { useLoanID } from "../../../id-provider";

type AddTXDialogProps = ComponentProps<typeof Dialog> & {
  disabled?: boolean;
  isOpen?: boolean;
};

export function AddTXDialog(props: AddTXDialogProps) {
  const { disabled = false, isOpen = false,...rest } = props;
  const [open, setOpen] = useState(isOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen} {...rest}>
      <DialogTrigger asChild>
        <Button data-testid="add-button" className="cursor-pointer" disabled={disabled}>
          <LucidePlusCircle /> Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogAddTransactionForm onClose={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export const DialogAddTransactionForm = ({onClose}:{onClose?: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { loanID } = useLoanID();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const now = new Date();
    const dates = {
      transactionDate: new Date(`${formData.get("transactionDate")} ${now.toTimeString().split(' ')[0]}`),
      valueDate: new Date(`${formData.get("valueDate")} ${now.toTimeString().split(' ')[0]}`),
    }

    if(dates.transactionDate > new Date()){
      setError("Transaction date cannot be in the future.");
      return;
    }
    if(dates.valueDate > new Date()){
      setError("Value date cannot be in the future.");
      return;
    }

    const row = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      transactionDate: dates.transactionDate.toISOString(),
      valueDate: dates.valueDate.toISOString(),
      type: formData.get("type") as TransactionType,
      status: formData.get("status") as any,
      description: formData.get("description") as string,
      debit: Number(formData.get("debit")),
      credit: Number(formData.get("credit")),
      closingBalance: 0, // Placeholder, will be calculated later
    };

    if (row.debit === 0 && row.credit === 0) {
      setError("Either debit or credit must be greater than zero.");
      return;
    } else if (row.debit > 0 && row.credit > 0) {
      setError("Only one of debit or credit can be greater than zero.");
      return;
    }

    setLoading(true);
    const c = backendData.get(loanID);
    row.closingBalance =
      (c?.closingBalance || 0) +
      (Number(row.credit) || 0) -
      (Number(row.debit) || 0);

    if (c) {
      c.rows.push(row);
      c.closingBalance = row.closingBalance;
      backendData.set(loanID, c!);
    }

    // Add your API call here to submit the transaction
    try {
      // Invalidate and refetch the transactions query
      queryClient.invalidateQueries({ queryKey: ["transactions", loanID, 0] });

      // Close the dialog
      onClose && onClose(false);
    } catch (error) {
      setError("Failed to add transaction. Please try again.");
    }
    setLoading(false);
  };


  return  <form id="dw" onSubmit={handleSubmit}>
          <DialogTitle className="py-2">
            Add Transaction
          </DialogTitle>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="transactionDate">Transaction Date</Label>
              <Input
                disabled={loading}
                required
                aria-required="true"
                id="transactionDate"
                name="transactionDate"
                type="date"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="valueDate">Value Date</Label>
              <Input
                disabled={loading}
                required
                aria-required="true"
                id="valueDate"
                name="valueDate"
                type="date"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type">Type</Label>
              <Select disabled={loading} required aria-required="true" name="type">
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
              <Select disabled={loading} required aria-required="true" name="status">
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
              <Input disabled={loading} id="description" name="description" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 grid gap-3">
                <Label htmlFor="debit">Debit</Label>
                <Input
                  disabled={loading}
                  required
                  aria-required="true"
                  id="debit"
                  name="debit"
                  type="number"
                  defaultValue={0}
                  step="0.01"
                />
              </div>
              <Separator orientation="vertical" className="mx-2" title="or" />
              <div className="flex-1 grid gap-3">
                <Label htmlFor="credit">Credit</Label>
                <Input
                  required
                  aria-required="true"
                  disabled={loading}
                  id="credit"
                  name="credit"
                  type="number"
                  defaultValue={0}
                  step="0.01"
                />
              </div>
            </div>
          </div>
            {error && <div data-testid="error-message" className="text-red-500 mr-auto my-2">{error}</div>}
          <DialogFooter className="mt-3 ">

              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={loading} type="submit">Save changes</Button>

          </DialogFooter>
        </form>
}
