import { redirect } from "next/navigation";

export default function LegacyNewResumePage() {
  redirect("/dashboard/resume/new");
}
