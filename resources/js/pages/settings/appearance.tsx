import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/ui/appearance-tabs';
import HeadingSmall from '@/components/ui/heading-small';
import { type BreadcrumbItem } from '@/types';
import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"
import { SiteHeader } from "@/components/ui/site-header"
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
   <SidebarProvider
                   style={
                     {
                       "--sidebar-width": "calc(var(--spacing) * 72)",
                       "--header-height": "calc(var(--spacing) * 12)",
                     } as React.CSSProperties
                   }
                 >
                   <AppSidebar variant="inset" />
                   <SidebarInset>
                     <SiteHeader siteName='Appearance' />
                    
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
    </SidebarInset>
                </SidebarProvider>
    );
}
