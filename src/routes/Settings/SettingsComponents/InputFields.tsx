import React from "react";
import { useFetcher } from "react-router-dom";

export interface InputFieldType<T> {
  label: string;
  name: T;
  defaultValue: string;
  placeholder: string;
}

export default function InputFields({
  inputs,
}: {
  inputs: InputFieldType<string>[];
}) {
  const fetcher = useFetcher();

  return (
    <div>
      <fetcher.Form method="post" id="search-form" role="search">
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {inputs.map((input, index) => {
            return (
              <li key={index}>
                <label>
                  {input.label}
                  <input
                    name={input.name}
                    defaultValue={input.defaultValue}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") e.preventDefault();
                    }}
                  />
                </label>
              </li>
            );
          })}
        </ul>
        <button type="submit">Test</button>
      </fetcher.Form>
    </div>
  );
}
