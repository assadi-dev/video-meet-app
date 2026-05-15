"use client";
import React from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { JoinRoomFormType, JoinRoomSchema } from "../schema";


const JoinRoomForm = () => {


  const form = useForm<JoinRoomFormType>({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      roomId: "",
    },
  });

  const isValid = form.formState.errors.roomId?.message ? false : true;
  const handleJoinRoom: SubmitHandler<JoinRoomFormType> = async (values) => {
    try {
      console.log(values.roomId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleJoinRoom)}
        className="grid grid-rows-2 gap-3"
      >
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">ID de la salle</FormLabel>
              <FormControl>
                <Input
                  placeholder="ID de la salle"
                  {...field}
                  className="bg-input border-border"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full bg-gradient-primary hover:opacity-90"
        >
          Rejoindre
        </Button>
      </form>
    </Form>
  );
};

export default JoinRoomForm;
