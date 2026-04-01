export type Offering = {
  id: number;
  label: string;
  components: string[];
  useCases: string[];
};

export type Project = {
  id: string;
  name: string;
  createdAt: string;
  offerings: Offering[];
};

export type AppView = "login" | "dashboard" | "project-detail" | "workflow" | "brochure";
