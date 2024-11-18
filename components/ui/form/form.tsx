"use client";

import * as React from "react";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { Label, Paragraph, View, ViewProps, Form as TForm } from "tamagui";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return { formItemId: id, ...fieldState };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return <Label ref={ref} {...props} />;
});

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  any,
  { children: React.ReactNode } & ViewProps
>(({ children, ...props }, ref) => {
  const { formItemId } = useFormField();

  return React.cloneElement(children, {
    ref,
    ...props,
    accessibilityLabel: formItemId,
  });
});

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  React.ElementRef<typeof Paragraph>,
  React.ComponentPropsWithoutRef<typeof Paragraph>
>(({ className, ...props }, ref) => {
  return <Paragraph ref={ref} {...props} />;
});

FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  React.ElementRef<typeof Paragraph>,
  React.ComponentPropsWithoutRef<typeof Paragraph>
>(({ className, children, ...props }, ref) => {
  const { error } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Paragraph fontSize={12} color="red">
      {body}
    </Paragraph>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
