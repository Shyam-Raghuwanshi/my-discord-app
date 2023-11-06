import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/ToggleMode";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
  const profile = await CurrentProfile();

  if (!profile) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-neutral-900">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10" />
      <ScrollArea className="flex-1 w-full">
        {servers?.map((srv) => (
          <div key={srv.id} className="mb-4">
            <NavigationItem
              id={srv.id}
              imageUrl={srv.imageUrl}
              name={srv.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
