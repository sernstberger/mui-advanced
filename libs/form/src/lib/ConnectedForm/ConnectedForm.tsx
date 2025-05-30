import React from 'react';
import {
  FormProvider,
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

export interface ConnectedFormProps<
  TFieldValues extends FieldValues = FieldValues
> {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  schema?: ZodSchema<TFieldValues>;
  formProps?: UseFormProps<TFieldValues>;
  methods?: UseFormReturn<TFieldValues>;
  noValidate?: boolean;
  id?: string;
  'data-testid'?: string;
  className?: string;
}

export function ConnectedForm<TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit,
  onError,
  schema,
  formProps,
  methods: externalMethods,
  noValidate = true,
  id,
  'data-testid': dataTestId,
  className,
}: ConnectedFormProps<TFieldValues>) {
  // Use external methods if provided, otherwise create our own
  const internalMethods = useForm<TFieldValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    ...formProps,
  });

  const methods = externalMethods || internalMethods;

  const handleSubmit = onSubmit
    ? methods.handleSubmit(onSubmit, onError)
    : undefined;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        noValidate={noValidate}
        id={id}
        data-testid={dataTestId}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}
