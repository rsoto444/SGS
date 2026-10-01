import { permanentRedirect } from "next/navigation";

// Template placeholder. This directory has no /pricing page, so it forwards.
export default function Page() {
  permanentRedirect("/advertise");
}
