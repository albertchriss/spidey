import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card";
  
  import Link from "next/link";
  import { Button } from "~/components/ui/button";
  
  interface cardWrapperProps {
    children: React.ReactNode;
    header?: string;
    footer?: string;
    href?: string;
    className?: string;
  }
  
  export const CardWrapper = ({
    children,
    header,
    footer,
    href,
    className,
  }: cardWrapperProps) => {
    return (
      <Card className={`w-[80%] shadow-md ${className} h-fit`}>
        <CardHeader className="flex items-center justify-center">
          {header ? <CardTitle className="text-2xl">{header}</CardTitle> : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex items-center justify-center">
          {href ? (
            <Link href={href}>
              <Button variant="link">{footer}</Button>
            </Link>
          ) : (
            <p>{footer}</p>
          )}
        </CardFooter>
      </Card>
    );
  };
  