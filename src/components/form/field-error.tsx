type FieldErrorProps = {
  errors?: Array<string> | null;
  id?: string;
};

const ErrorList = ({ errors, id }: FieldErrorProps) => {
  return errors?.length ? (
    <ul id={id} className="flex flex-col gap-1">
      {errors.map((error, i) => (
        <li key={i} className="text-[10px] text-red-500">
          {error}
        </li>
      ))}
    </ul>
  ) : null;
};

export { ErrorList };
