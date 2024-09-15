import z, { ZodIssue } from "zod";

import { InputValidationError } from "../errors";

export type ZodIssueMessage = { path: string; code: string; expected?: string; received?: string };

export function parseInputBySchemaOrThrow<T>(input: unknown, schema: z.ZodType<T>): T {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    throw new InputValidationError(formatZodIssues(parsed.error.issues));
  }

  return parsed.data;
}

const formatZodIssues = (issues: ZodIssue[]) =>
  issues.reduce((prev: ZodIssueMessage[], curr: ZodIssue) => [...prev, getZodIssueMessage(curr)], []);

const getZodIssueMessage = (issue: ZodIssue): ZodIssueMessage => {
  return {
    path: issue.path.at(0) as string,
    code: issue.message === "Required" ? "REQUIRED" : issue.message,
    ...("expected" in issue && { expected: issue.expected as string }),
    ...("received" in issue && { received: issue.received as string }),
  };
};
