'use client';

import * as React from 'react';

import {
  Calendar,
  Gamepad2,
  Home,
  IdCard,
  Search,
  Settings,
  Users,
  NotebookPen,
} from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Posts', url: 'posts', icon: NotebookPen },
  { title: 'Jogos', url: 'jogos', icon: Gamepad2 },
  { title: 'Categorias', url: 'categorias', icon: Calendar },
  { title: 'Tags', url: 'tags', icon: Search },
  { title: 'Usuários', url: 'usuarios', icon: Users },
  { title: 'Cargos/Funções', url: 'cargos-funcoes', icon: IdCard },
  { title: 'Configurações', url: 'configuracoes', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <Sidebar className='shrink-0'>
          <SidebarHeader>MY GAME NEWS</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/dashboard/${item.url}`}
                          className='flex items-center gap-2'
                        >
                          <item.icon className='size-4' />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className='justify-items-center flow-root p-10'>
            <ThemeToggle />
          </SidebarFooter>
        </Sidebar>
        <main className='flex flex-1 p-6'>{children}</main>
      </div>
    </SidebarProvider>
  );
}
