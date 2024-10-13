import { cn } from "@/lib/utils";
import styles from "./common.module.css";

export const GridLineHorizontal = ({ ...props }) => {
  return (
    <>
      <div
        className={cn(styles.gridLineHorizontalDark, "hidden dark:block")}
        {...props}
      />
      <div
        className={cn(styles.gridLineHorizontal, "block dark:hidden")}
        {...props}
      />
    </>
  );
};

export const GridLineVertical = ({ ...props }) => {
  return (
    <>
      <div
        className={cn(styles.gridLineVerticalDark, "hidden dark:block")}
        {...props}
      />
      <div
        className={cn(styles.gridLineVertical, "block dark:hidden")}
        {...props}
      />
    </>
  );
};
