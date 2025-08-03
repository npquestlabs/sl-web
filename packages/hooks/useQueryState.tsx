import { useLocation, useNavigate } from 'react-router';
import { useCallback, useMemo } from 'react';

/**
 * Defines how to parse a query parameter from a string and serialize it back.
 * @template T The data type to parse the query parameter into.
 */
export interface QueryParamDef<T> {
  /**
   * Parses the string value from the URL into the desired type `T`.
   * The input can be `null` if the parameter is not present.
   */
  parse: (value: string | null) => T;
  /**
   * Serializes the value of type `T` back into a string for the URL.
   * Returning `null` or an empty string will remove the parameter.
   */
  serialize: (value: T) => string | null;
}

/**
 * A generic, type-safe hook to manage state in the URL search parameters.
 * It uses a parser object to handle serialization and deserialization.
 *
 * @template T The data type of the state.
 * @param key The key of the search parameter in the URL.
 * @param parser An object with `parse` and `serialize` methods.
 */
export function useQueryState<T>(key: string, parser: QueryParamDef<T>) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const value: T = useMemo(
    () => parser.parse(searchParams.get(key)),
    [searchParams, key, parser],
  );

  const setValue = useCallback(
    (newValue: T) => {
      const newSearchParams = new URLSearchParams(location.search);
      const serializedValue = parser.serialize(newValue);

      if (serializedValue === null || serializedValue === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, serializedValue);
      }

      navigate(`${location.pathname}?${newSearchParams.toString()}`, {
        replace: true,
      });
    },
    [location.pathname, location.search, navigate, key, parser],
  );

  return [value, setValue] as const;
}

/**
 * Parser for simple string values. An empty string is treated as a non-existent value.
 */
export const parseAsString: QueryParamDef<string | null> = {
  parse: (value) => value,
  serialize: (value) => value,
};

/**
 * Parser for integer values. Defaults to null if parsing fails.
 */
export const parseAsInteger: QueryParamDef<number | null> = {
  parse: (value) => {
    if (value === null) return null;
    const num = parseInt(value, 10);
    return isNaN(num) ? null : num;
  },
  serialize: (value) => (value === null ? null : value.toString()),
};

/**
 * Parser for float values. Defaults to null if parsing fails.
 */
export const parseAsFloat: QueryParamDef<number | null> = {
  parse: (value) => {
    if (value === null) return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  },
  serialize: (value) => (value === null ? null : value.toString()),
};

/**
 * Parser for boolean values. Serializes `false` to `null` to remove the key.
 */
export const parseAsBoolean: QueryParamDef<boolean> = {
  parse: (value) => value === 'true',
  serialize: (value) => (value ? 'true' : null),
};
