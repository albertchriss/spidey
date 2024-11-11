"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { useEffect, useState, useTransition } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  TimeClock,
  TimeClockSlotProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import type { Task } from "~/server/db/schema";
import { HiPlus } from "react-icons/hi";
import { CreateButton } from "./CreateButton";
import { useTaskContext } from "../tasklist/TaskContext";

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
  userId: string;
}

export const CreateTab = ({ userId }: CreateTaskPopUpProps) => {
  // state
  const {
    title,
    description,
    date,
    taskId,
    handleUpdateData,
    handleEditData,
    setIsOpenDialog,
    setUndefined,
  } = useTaskContext();
  const [isCreate, setIsCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    date ? dayjs(date) : null,
  );
  const [inputValue, setInputValue] = useState(
    selectedDate ? selectedDate.format("DD/MM/YYYY HH:mm") : "",
  );

  // mutation functions
  const { mutate: createTask } = api.task.createTask.useMutation({
    onMutate: (data) => {
      handleUpdateData([data as Task]);
    },
    onSuccess: (data) => {
      if (data) {
        handleEditData(data);
      }
      setUndefined();
    },
    // onError ntar atur
  });
  const { mutate: updateTask } = api.task.updateTask.useMutation({
    onMutate: (data) => {
      handleEditData(data as Task);
    },
    onSuccess: () => {
      setUndefined();
    },
  });

  // form
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: title ?? undefined,
      description: description ?? undefined,
      deadline: date ?? undefined,
    },
  });

  // handle use effect
  useEffect(() => {
    form.reset({
      title: title ?? "",
      description: description ?? "",
      deadline: date ?? undefined,
    });
    setSelectedDate(date ? dayjs(date) : null);
    setInputValue(date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "");
  }, [title, description, date]);
  useEffect(() => {
    if (isCreate) {
      setUndefined();
    }
  }, [isCreate]);

  // functions
  const onSubmit = (data: z.infer<typeof TaskSchema>) => {
    if (!taskId) {
      startTransition(() => {
        createTask({ ...data, userId });
      });
    } else {
      startTransition(() => {
        updateTask({ ...data, id: taskId });
      });
    }
    setIsOpenDialog(false);
    form.reset();
    setSelectedDate(null);
    setInputValue("");
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate((prev) => {
      // Retain the time from the previous date, only update the date
      const newDateValue = newDate
        ? newDate
            .set("hour", prev?.hour() ?? 0)
            .set("minute", prev?.minute() ?? 0)
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
        ? (prev?.set("hour", newTime.hour()).set("minute", newTime.minute()) ??
          null)
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
      <CreateButton
        title={`${taskId ? "Edit" : "Create"} a task`}
        trigger={
          <span className="flex h-full items-center gap-3">
            Create Task
            <HiPlus className="inline-block text-lg font-bold" />
          </span>
        }
        description="Define the task title, description (optional), and deadline"
        setIsCreate={setIsCreate}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center"
          >
            <div className="flex w-full items-center justify-end gap-5">
              <div className="flex h-full min-w-[10px] flex-1 flex-col space-y-4">
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
              <div className="h-full w-[600px] shrink-0">
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
            <Button type="submit" disabled={isPending} className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </CreateButton>
    </LocalizationProvider>
  );
};
