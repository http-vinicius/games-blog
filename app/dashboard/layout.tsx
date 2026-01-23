'use client';

import * as React from 'react';

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Gamepad2,
  Eye,
  BookOpenText,
  Users,
  IdCard,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Notícias', url: '/noticias', icon: Inbox },
  { title: 'Categorias', url: '/categorias', icon: Calendar },
  { title: 'Tags', url: '/tags', icon: Search },
  { title: 'Jogos', url: '/jogos', icon: Gamepad2 },
  { title: 'Reviews', url: '/reviews', icon: Eye },
  { title: 'Guias/Tutoriais', url: '/guias-tutoriais', icon: BookOpenText },
  { title: 'Usuários', url: '/usuarios', icon: Users },
  { title: 'Cargos/Funções', url: '/cargos-funcoes', icon: IdCard },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className='flex items-center gap-2'>
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
        </Sidebar>
      </SidebarProvider>
      {children}
    </>
  );
}
