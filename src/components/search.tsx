"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchProps = {
  defaultValue: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const Search = ({ defaultValue, onChange, placeholder }: SearchProps) => {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    300,
  );

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export { Search };
