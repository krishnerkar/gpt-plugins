"use client";

import * as React from "react";
import * as PluginDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";

const PluginDialog = PluginDialogPrimitive.Root;

const PluginDialogTrigger = PluginDialogPrimitive.Trigger;

const PluginDialogPortal = ({
  className,
  children,
  ...props
}: PluginDialogPrimitive.AlertDialogPortalProps) => (
  <PluginDialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {children}
    </div>
  </PluginDialogPrimitive.Portal>
);
PluginDialogPortal.displayName = PluginDialogPrimitive.Portal.displayName;

const PluginDialogOverlay = React.forwardRef<
  React.ElementRef<typeof PluginDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof PluginDialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <PluginDialogPrimitive.Overlay
    className={cn(
      "animate-in fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity",
      className
    )}
    {...props}
    ref={ref}
  />
));
PluginDialogOverlay.displayName = PluginDialogPrimitive.Overlay.displayName;

const PluginDialogContent = React.forwardRef<
  React.ElementRef<typeof PluginDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PluginDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <PluginDialogPortal>
    <PluginDialogOverlay />
    <PluginDialogPrimitive.Content
      ref={ref}
      className={cn(
        "animate-in fade-in-90 slide-in-from-bottom-10 sm:zoom-in-90 sm:slide-in-from-bottom-0 fixed z-50 grid w-full max-w-4xl scale-100 gap-4 bg-white p-6 opacity-100 sm:rounded-lg md:w-full",
        "dark:bg-slate-900",
        className
      )}
      {...props}
    />
  </PluginDialogPortal>
));
PluginDialogContent.displayName = PluginDialogPrimitive.Content.displayName;

const PluginDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-left",
      className
    )}
    {...props}
  />
);
PluginDialogHeader.displayName = "PluginDialogHeader";

const PluginDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
PluginDialogFooter.displayName = "PluginDialogFooter";

const PluginDialogTitle = React.forwardRef<
  React.ElementRef<typeof PluginDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof PluginDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <PluginDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold text-slate-900",
      "dark:text-slate-50",
      className
    )}
    {...props}
  />
));
PluginDialogTitle.displayName = PluginDialogPrimitive.Title.displayName;

const PluginDialogDescription = React.forwardRef<
  React.ElementRef<typeof PluginDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof PluginDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <PluginDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500", "dark:text-slate-400", className)}
    {...props}
  />
));
PluginDialogDescription.displayName =
  PluginDialogPrimitive.Description.displayName;

const PluginDialogAction = React.forwardRef<
  React.ElementRef<typeof PluginDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof PluginDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <PluginDialogPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-slate-900 py-2 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
      className
    )}
    {...props}
  />
));
PluginDialogAction.displayName = PluginDialogPrimitive.Action.displayName;

const PluginDialogCancel = React.forwardRef<
  React.ElementRef<typeof PluginDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof PluginDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <PluginDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      "mt-2 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-transparent py-2 px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 sm:mt-0",
      className
    )}
    {...props}
  />
));
PluginDialogCancel.displayName = PluginDialogPrimitive.Cancel.displayName;

export {
  PluginDialog,
  PluginDialogTrigger,
  PluginDialogContent,
  PluginDialogHeader,
  PluginDialogFooter,
  PluginDialogTitle,
  PluginDialogDescription,
  PluginDialogAction,
  PluginDialogCancel,
};
