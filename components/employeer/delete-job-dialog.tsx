"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteJobDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  jobTitle: string
}

export function DeleteJobDialog({ isOpen, onClose, onConfirm, jobTitle }: DeleteJobDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-custom">Delete Job Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the job listing for <span className="font-semibold">{jobTitle}</span>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-custom text-custom hover:bg-custom/10">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600 transition-colors">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
