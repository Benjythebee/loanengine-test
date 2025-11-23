import { Button } from "@/components/primitives/button"
import { Skeleton } from "@/components/primitives/skeleton"
import { PlaceholderCard } from "./card"



export const DisbursementTablePlaceholder = () => {

    return <PlaceholderCard title="Disbursement Settings" actionButton={<Button>Manage</Button>}>
                <Skeleton className="h-6 w-full" />
              </PlaceholderCard>
}