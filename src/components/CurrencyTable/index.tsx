import React, { useMemo, useState } from "react";
import {
  currencies,
  CURRENCY_TYPE_LABELS,
  type Currency,
  type CurrencyType,
} from "@site/src/data/currencies";
import styles from "./styles.module.css";

const TYPE_ORDER: CurrencyType[] = ["main_fiat", "sub_fiat", "main_crypto", "sub_crypto", "virtual"];

function matches(c: Currency, q: string): boolean {
  if (!q) return true;
  const haystack = `${c.code} ${c.name} ${c.base ?? ""}`.toLowerCase();
  // Every whitespace-separated term must match, so "milli ton" finds milliTON.
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default function CurrencyTable(): JSX.Element {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<CurrencyType | "all">("all");

  const counts = useMemo(() => {
    const byType = { all: currencies.length } as Record<CurrencyType | "all", number>;
    for (const t of TYPE_ORDER) byType[t] = currencies.filter((c) => c.type === t).length;
    return byType;
  }, []);

  const rows = useMemo(
    () => currencies.filter((c) => (type === "all" || c.type === type) && matches(c, query)),
    [query, type],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search by code or name — e.g. JPY, yen, bitcoin"
          aria-label="Search currencies by code or name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.chips} role="group" aria-label="Filter by currency type">
          {(["all", ...TYPE_ORDER] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              className={`${styles.chip} ${type === t ? styles.chipActive : ""}`}
              onClick={() => setType(t)}
            >
              {t === "all" ? "All" : CURRENCY_TYPE_LABELS[t]}
              <span className={styles.count}>{counts[t]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.status} aria-live="polite">
        {rows.length === currencies.length
          ? `Showing all ${currencies.length} currencies`
          : `Showing ${rows.length} of ${currencies.length} currencies`}
      </div>

      {rows.length === 0 ? (
        <div className={styles.empty}>
          No currency matches “{query}”. Codes are matched exactly — check the spelling, or clear
          the filter to browse the full list.
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th className={styles.num}>Decimals</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.code}>
                  <td className={styles.code}>
                    <code>{c.code}</code>
                  </td>
                  <td>
                    {c.name}
                    {c.conversion && <span className={styles.conversion}>{c.conversion}</span>}
                    {c.sameAs && (
                      <span className={styles.conversion}>
                        same unit as <code>{c.sameAs}</code>
                      </span>
                    )}
                  </td>
                  <td className={styles.type}>{CURRENCY_TYPE_LABELS[c.type]}</td>
                  <td className={styles.num}>{c.decimals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
