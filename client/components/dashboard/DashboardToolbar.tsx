"use client";

import ResumeSearch from "./ResumeSearch";
import ResumeSort from "./ResumeSort";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function DashboardToolbar({
  search,
  setSearch,
  sort,
  setSort,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <ResumeSearch
        value={search}
        onChange={setSearch}
      />

      <ResumeSort
        value={sort}
        onChange={setSort}
      />
    </div>
  );
}