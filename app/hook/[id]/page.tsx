import { AppSidebar } from "@/components/app-sidebar";
import CopyButton from "@/components/copy-button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/h/${id}`;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar hookId={id} />
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
            <p className="text-center text-xl my-4 font-bold">
              Your unique URL
            </p>
            <p className="md:px-48 mb-6 text-center text-base text-muted-foreground">
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
