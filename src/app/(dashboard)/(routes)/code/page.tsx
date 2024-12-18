"use client";

import Heading from "@/components/Heading";

import { Code } from "lucide-react";
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/Empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkDown from "react-markdown";

export type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
  name?: string;
};


const CodePage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

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
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
      }

      const newMessages = [ userMessage, ...messages];

      const response = await axios.post("/api/code", {
        messages: newMessages
      });
      
      const modelMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: response.data
      }  

      setMessages((current) => [...current, userMessage, modelMessage]);

    } catch (error) {
      console.log("[Error in conversation]"+error);
      
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code generation"
        description="Our most advanced conversation model"
        Icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                     placeholder="Simple togle button using react hooks."
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
          messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No conversation started!"/>
            </div>
          )
        }
        <div className="flex flex-col-reverse gap-y-4">
          {
            messages?.map((message, i) => (
              <div key={i} 
                className={cn("p-8 w-full  flex items-start gap-x-8 rounded-lg ",
                  message.role === "user" ? "bg-white border border-black/10"
                  : "bg-muted"
                 )}
              >
                {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                <ReactMarkDown 
                  components={{
                    pre: ({node, ...props}) => (
                      <div className="overflow-auto  w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props}/>
                      </div>
                    ),
                    code: ({node, ...props}) => (
                      <code className="bg-black/10 rounded-lg p-1" 
                      {...props}/>
                    )
                   }}
                >
                {message.content || ""}

                 
                </ReactMarkDown>
                 
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default CodePage;
