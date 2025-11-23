import { Button } from "@/components/primitives/button";
import { Card, CardContent, CardFooter } from "@/components/primitives/card";

import Link from "next/link";

export const NotFound = () => {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="grid gap-2">
          <h1 className="font-bold text-xl">404 - Page Not Found</h1>

          <p className="text-base">
            The page you are looking for does not exist.
          </p>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default NotFound;
