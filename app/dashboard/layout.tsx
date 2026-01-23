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

const items = [
  { title: 'Home', url: '/dashboard', icon: Home },
  { title: 'Categorias', url: 'categorias', icon: Calendar },
  { title: 'Tags', url: 'tags', icon: Search },
  { title: 'Jogos', url: 'jogos', icon: Gamepad2 },
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
                      {JSON.stringify(item.url)}
                      <SidebarMenuButton asChild>
                        <a
                          href={`${item.url}`}
                          className='flex items-center gap-2'
                        >
                          <item.icon className='size-4' />
                          <span>{item.title}</span>
                        </a>
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
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </SidebarProvider>
  );
}
