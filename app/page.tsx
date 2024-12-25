import { AppSidebar } from "@/components/app-sidebar";
import CopyButton from "@/components/copy-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ClipboardCopyIcon, LoaderCircle } from "lucide-react";

const url = "https://webhook.site/88a3da47-9356-4fc3-8ea2-347c1feed63c";

export default function Home() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Webhook URL
                    <span className="font-medium text-md ml-2 ring-1 p-2 rounded-md ring-muted-foreground/30">
                      {url}
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-col flex justify-center items-center  rounded-xl bg-muted/50">
            <p className="text-center text-md my-4 font-bold">
              Your Unique Webhook URL
            </p>
            <p className="px-48 mb-6 text-center text-base text-muted-foreground">
              Simply configure your application to send events to your unique
              URL, and any incoming requests will appear right here on this page
              for you to view and analyze.
            </p>
            <div className="flex gap-2">
              <p className="font-medium bg-primary text-primary-foreground text-lg ml-2 ring-1 py-2 px-6 rounded-md ring-muted-foreground/30">
                {url}
              </p>
              <CopyButton url={url} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
