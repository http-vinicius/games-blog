'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type RootProps = React.PropsWithChildren<{ className?: string }>;
type SlotProps = React.PropsWithChildren<{ className?: string }>;

const Root = ({ children, className }: RootProps) => (
  <Card className={cn('w-full max-w-sm', className)}>{children}</Card>
);

const Header = ({ children, className }: SlotProps) => (
  <CardHeader
    className={cn('flex flex-row items-center justify-between', className)}
  >
    {children}
  </CardHeader>
);

const Title = ({ children, className }: SlotProps) => (
  <CardTitle className={cn('truncate', className)}>{children}</CardTitle>
);

const Action = ({ children, className }: SlotProps) => (
  <CardAction className={cn('shrink-0', className)}>{children}</CardAction>
);

const Content = ({ children, className }: SlotProps) => (
  <CardContent className={className}>{children}</CardContent>
);

const Footer = ({ children, className }: SlotProps) => (
  <CardFooter className={className}>{children}</CardFooter>
);

export const CardUI = Object.assign(Root, {
  Header,
  Title,
  Action,
  Content,
  Footer,
});
