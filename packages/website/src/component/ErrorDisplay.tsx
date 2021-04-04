import Message from "./Message";

export default function ErrorDisplay({ error }: { error: Error | undefined }) {
  return error ? <Message>{error.toString()}</Message> : null;
}
