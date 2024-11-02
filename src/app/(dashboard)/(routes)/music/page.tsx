"use client";

import Heading from "@/components/Heading";

import { MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/Loader";

import axios from "axios";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/Empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

export type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
  name?: string;
};


const MusicPage = () => {
  const [music, setMusic] = useState<string>();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);
      form.reset();

    } catch (error) {
      console.log("[Error in music generation]"+error);
      
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your music into prompt"
        Icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadom-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none
                     focus-visible:ring-0
                     focus-visible:ring-transparent
                     "
                     disabled={isLoading}
                     placeholder="Piano solo"
                     {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">

        {
          isLoading && (
            <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
              <Loader/>
            </div>
          )
        }
        {
          !music && !isLoading && (
            <div>
              <Empty label="No music generated!"/>
            </div>
          )
        }
        <div className="flex flex-col-reverse gap-y-4">
          
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
