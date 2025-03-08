"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { PanelLeftClose, PanelRightClose, SquarePlus } from "lucide-react";

const Sider = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [chatsData, setChatsData] = useState<
    {
      _id: string;
      title: string;
      videoId: string;
    }[]
  >([]);
  const fetchChatsData = useQuery(api.chats.getChatsMetaDataByUser, {
    userId: user?.id || "",
  });

  useEffect(() => {
    if (user?.id && fetchChatsData) setChatsData(fetchChatsData);
  }, [user?.id, fetchChatsData]);

  const toggleSider = () => setOpen((val) => !val);

  return (
    <div>
      <div
        className={`fixed z-[60] top-0 ${open ? "left-24 md:left-42" : "left-0"}`}
      >
        <Button
          variant="outline"
          onClick={toggleSider}
          className="cursor-pointer"
          tooltip={open ? "Close" : "Open"}
        >
          {open ? <PanelLeftClose /> : <PanelRightClose />}
        </Button>
      </div>

      <div
        className={`fixed top-0 left-0 backdrop-blur overflow-auto h-full z-50 ${open ? "w-24 md:w-44" : "hidden"}`}
      >
        <div className="flex py-2 items-center justify-center">
          <Button tooltip="New Video" asChild>
            <Link href="/dashboard">
              <p className="hidden md:block">Create New</p>
              <SquarePlus />
            </Link>
          </Button>
        </div>

        <div className="w-full border"></div>

        <div className="pt-2 flex flex-col gap-3 items-center justify-center">
          {!user && !chatsData.length ? (
            <Spinner />
          ) : (
            chatsData?.map((chat) => (
              <Button
                asChild
                variant="outline"
                key={chat.videoId}
                tooltip={chat.title}
                className="cursor-pointer"
              >
                <Link
                  href={`/video/${chat.videoId}/analysis`}
                  className="max-w-40 overflow-hidden text-nowrap text-ellipsis text-left"
                >
                  <p className="hidden md:block">{chat.title.slice(0, 20)}</p>
                  <p className="block md:hidden">{chat.title.slice(0, 5)}</p>
                </Link>
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sider;
