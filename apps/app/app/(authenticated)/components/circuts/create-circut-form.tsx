"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { ProductPriceAmountType, ProductPriceType } from "@prisma/client";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/design-system/components/ui/form";
import { Input } from "@repo/design-system/components/ui/input";
import { toast, useToast } from "@repo/design-system/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DashboardHeader from "../dashboard/dashboard-header";
// import { CreatePriceForm } from "./create-price-form";
// import { useCreateProduct } from "@repo/features/product/mutations/use-create-product";

export const createCircutForm = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  prices: z
    .array(
      z.object({
        type: z.enum(["one_time", "recurring"]),
        recurringInterval: z.enum(["month", "year"]).optional(),
        amountType: z.enum(["fixed", "custom", "free"]),
        amount: z.number().min(0).optional(),
        minimumAmount: z.number().min(0).optional(),
        maximumAmount: z.number().min(0).optional(),
        presetAmount: z.number().min(0).optional(),
      }),
    )
    .min(1, {
      message: "At least one price must be added.",
    }),
});

type CircutFormValues = z.infer<typeof createCircutForm>;

export function CreateCircutForm() {
  // const mutation = useCreateProduct();
  const form = useForm<CircutFormValues>({
    resolver: zodResolver(createCircutForm),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: CircutFormValues) {
    // mutation.mutate(data, {
    //   onSuccess: () => {
    //     toast({ title: "product created successfully" });
    //   },
    //   onError: () => {
    //     toast({ title: "cannot create product" });
    //   },
    //   onSettled: () => {},
    // });
  }

  return (
    <div className=" mx-auto rounded-2xl ">
      <div className="p-8">
        <DashboardHeader title="Create a new Circut Agent">
          <Button>Go back</Button>
        </DashboardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-transparent"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              // disabled={mutation.isPending}
              type="submit"
              className="w-full"
            >
              Create Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
