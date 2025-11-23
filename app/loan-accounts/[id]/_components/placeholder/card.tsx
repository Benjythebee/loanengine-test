import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { ReactNode } from 'react';


interface PlaceholderCardProps {
    title?: string;
    children: ReactNode;
    actionButton?: ReactNode;
}

export function PlaceholderCard({ title, children, actionButton }: PlaceholderCardProps) {
    return (
        <Card className="relative my-2">
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex justify-end">
                {actionButton && (
                    <div className="flex justify-end mt-4">
                        {actionButton}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}