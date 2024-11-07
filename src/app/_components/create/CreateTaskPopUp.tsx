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
import { useState, useTransition } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import {
  DateTimePicker,
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  TimeClock,
  TimeClockSlotProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { PopUp } from "../PopUp";

const slotProps: TimeClockSlotProps = {
  leftArrowIcon: { fontSize: "large" },
  rightArrowIcon: { fontSize: "large" },
  previousIconButton: {
    size: "medium",
  },
  nextIconButton: {
    size: "medium",
  },
};

const TaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  deadline: z.date(),
});

interface CreateTaskPopUpProps {
  //   playGif: () => void;
  isDisabled: boolean;
  title?: string;
  description?: string;
  date?: Date;
  userId: string;
}

export const CreateTaskPopUp = ({
  isDisabled,
  userId,
  title,
  description,
  date,
}: CreateTaskPopUpProps) => {
  const [isPending, startTransition] = useTransition();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createTask } = api.task.createTask.useMutation();
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
      setIsOpenDialog(false);
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
      <PopUp
        title="Create A Task"
        trigger="+"
        description="Define the task title, description (optional), and deadline"
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center"
          >
            <div className="flex w-full flex-row items-center justify-center gap-5">
              <div className="flex h-full w-[50%] flex-col space-y-4">
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
                          className="h-[250px] w-full resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full w-[50%]">
                <div className="flex h-full flex-col">
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
                      disabled={!selectedDate}
                      ampm={false}
                      slotProps={slotProps}
                      showViewSwitcher
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending || isDisabled}
              className="w-full"
            >
              Create
            </Button>
          </form>
        </Form>
      </PopUp>
    </LocalizationProvider>
  );
};
