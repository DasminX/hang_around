import z, { ZodIssue, ZodType } from "zod";
import { InputValidationError } from "../errors";

export function parseInputBySchemaOrThrow<T extends ZodType<any, any, any>>(input: unknown, schema: T): z.infer<T> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    throw new InputValidationError(formatZodIssues(parsed.error.issues));
  }

  return parsed.data;
}

const formatZodIssues = (issues: ZodIssue[]) =>
  issues.reduce((prev: string[], curr: ZodIssue) => [...prev, getZodIssueMessage(curr)], []);

const getZodIssueMessage = (issue: ZodIssue) => {
  let message = `${issue.code} (${issue.path || "Path not specified"}): `;
  if ("keys" in issue) {
    message += issue.keys.join(" ");
  }
  if ("expected" in issue && "received" in issue) {
    message += `expected ${issue.expected}, but got ${issue.received}.`;
  }

  message += ` ${issue.message}.`;

  return message;
};
