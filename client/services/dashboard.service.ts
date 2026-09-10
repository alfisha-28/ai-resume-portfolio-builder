// This file is intentionally kept as a re-export shim.
// All resume operations have been consolidated into resume.service.ts.
// This file can be safely deleted. It remains to avoid breaking any
// accidental imports during transition.

export {
  getResumes as getDashboardResumes,
  createResume,
  deleteResume,
} from "./resume.service";