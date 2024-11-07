"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { CardWrapper } from "../CardWrapper";
import { useState, useTransition } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import {
  DateTimePicker,
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, TextField } from "@mui/material";
import { DateCalendar, TimeClock } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";

const TaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  deadline: z.date(),
});

interface CreateTaskCardProps {
  //   playGif: () => void;
  isDisabled: boolean;
  title?: string;
  description?: string;
  date?: Date;
  userId: string;
}

export const CreateTaskCard = ({
  isDisabled,
  userId,
  title,
  description,
  date,
}: CreateTaskCardProps) => {
  const [isPending, startTransition] = useTransition();
  const { mutate: createTask } = api.task.createTask.useMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: title ?? undefined,
      description: description ?? undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof TaskSchema>) => {
    startTransition(() => {
      createTask({ ...data, userId });
      router.push("/tasklist");
    });
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    date ? dayjs(date) : null,
  );

  const [inputValue, setInputValue] = useState(
    selectedDate ? selectedDate.format("DD/MM/YYYY HH:mm") : "",
  );
  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate((prev) => {
      // Retain the time from the previous date, only update the date
      const newDateValue = newDate
        ? newDate
            .set("hour", prev?.hour() || 0)
            .set("minute", prev?.minute() || 0)
        : null;

      setInputValue(
        newDateValue ? newDateValue.format("DD/MM/YYYY HH:mm") : "",
      );
      handleInputChange(
        newDateValue ? newDateValue.format("DD/MM/YYYY HH:mm") : "",
      );
      return newDateValue;
    });
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedDate((prev) => {
      // Retain the date from the previous selection, only update the time
      const newTimeValue = newTime
        ? prev?.set("hour", newTime.hour()).set("minute", newTime.minute()) ||
          null
        : null;

      setInputValue(
        newTimeValue ? newTimeValue.format("DD/MM/YYYY HH:mm") : "",
      );
      handleInputChange(
        newTimeValue ? newTimeValue.format("DD/MM/YYYY HH:mm") : "",
      );
      return newTimeValue;
    });
  };

  // Handle input change, converting from string to Date
  const handleInputChange = (stringDate: string) => {
    // Convert the input string to a Date object
    const parsedDate = dayjs(stringDate, "DD/MM/YYYY HH:mm").toDate();

    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      // Update the form field with the Date object
      form.setValue("deadline", parsedDate);
    } else {
      console.error("Invalid date format");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CardWrapper header="Make a Task!" className="z-10 mt-[100px] bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center gap-5 space-y-4 md:flex-row"
          >
            <div className="flex flex-col space-y-4 md:w-[50%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Make a coffee"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>mo nulis apapun boleh :{")"}</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I want to make a nice hot coffee"
                        className="h-[50%] w-full resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>mo nulis apapun boleh :{")"}</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending || isDisabled}>
                Create
              </Button>
            </div>
            <div className="h-full">
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="--/--/----   00:00"
                          {...field}
                          value={inputValue}
                        />
                      </FormControl>
                      {/* <FormDescription>mo nulis apapun boleh :{")"}</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-center">
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <TimeClock
                    value={selectedDate}
                    onChange={handleTimeChange}
                    ampm
                  />
                </div>
              </div>
            </div>
            {/* <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Pesan</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Make a coffee"
                        className="max-h-32 w-full"
                        {...field}
                    />
                    </FormControl>
                    <FormDescription>mo nulis apapun boleh :{")"}</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            /> */}
          </form>
        </Form>
      </CardWrapper>
    </LocalizationProvider>
  );
};
