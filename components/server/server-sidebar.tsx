import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await CurrentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }

  let textChannels = [];
  let audioChannels = [];
  let videoChannels = [];
  let members = [];

  //   const members = server?.members.filter(
  //     (member) => member.profileId !== profile.id
  //   );
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  server?.members.forEach((member) => {
    if (member.profileId !== profile.id) {
      members.push(member);
    }
  });
  server?.channels.forEach((channel) => {
    if (channel.type === ChannelType.TEXT) {
      textChannels.push(channel);
    } else if (channel.type === ChannelType.AUDIO) {
      audioChannels.push(channel);
    } else if (channel.type === ChannelType.VIDEO) {
      videoChannels.push(channel);
    }
  });

  return (
    <div className="flex flex-col h-full text-primary w-full  dark:bg-[#2B2D31] bg-[#f0f0f0c9]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
