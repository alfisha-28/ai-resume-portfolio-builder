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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-1">
      <ResumeSearch value={search} onChange={setSearch} />
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <ResumeSort value={sort} onChange={setSort} />
      </div>
    </div>
  );
}