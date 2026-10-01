import { permanentRedirect } from "next/navigation";

// Template placeholder. This directory has no /reviews page, so it forwards.
export default function Page() {
  permanentRedirect("/");
}
