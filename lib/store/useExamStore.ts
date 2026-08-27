import { create } from "zustand";
import { saveExamStateToLocal, loadExamStateFromLocal, clearExamStateFromLocal } from "../utils/idb-cache";

export type QuestionStatus = "not_visited" | "not_answered" | "answered" | "marked" | "answered_marked";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionItem {
  id: string;
  sectionName: string;
  orderIndex: number;
  content: {
    en: {
      question: string;
      options: QuestionOption[];
      explanation?: string;
    };
    hi: {
      question: string;
      options: QuestionOption[];
      explanation?: string;
    };
  };
  correctOptionId?: string;
  scoring: {
    positive: number;
    negative: number;
  };
  metadata?: {
    subject: string;
    topic: string;
    difficulty: "Easy" | "Medium" | "Hard";
  };
}

export interface ResponseRecord {
  selectedOptionId: string | null;
  status: QuestionStatus;
  timeSpentSeconds: number;
  markedForReview: boolean;
}

interface ExamState {
  testId: string | null;
  testTitle: string;
  durationSeconds: number;
  remainingSeconds: number;
  questions: QuestionItem[];
  currentQuestionIndex: number;
  currentSection: string;
  language: "en" | "hi";
  responses: Record<string, ResponseRecord>;
  isSubmitted: boolean;
  isTimerRunning: boolean;

  // Actions
  initializeExam: (testId: string, testTitle: string, durationSeconds: number, questions: QuestionItem[]) => Promise<void>;
  setCurrentQuestionIndex: (index: number) => void;
  setCurrentSection: (section: string) => void;
  setLanguage: (lang: "en" | "hi") => void;
  selectOption: (questionId: string, optionId: string) => void;
  clearResponse: (questionId: string) => void;
  saveAndNext: (questionId: string) => void;
  markForReviewAndNext: (questionId: string) => void;
  jumpToQuestion: (index: number) => void;
  decrementTimer: () => void;
  submitExam: () => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  testId: null,
  testTitle: "",
  durationSeconds: 3600,
  remainingSeconds: 3600,
  questions: [],
  currentQuestionIndex: 0,
  currentSection: "General Intelligence & Reasoning",
  language: "en",
  responses: {},
  isSubmitted: false,
  isTimerRunning: false,

  initializeExam: async (testId, testTitle, durationSeconds, questions) => {
    // Check if state exists in IndexedDB
    const cached = await loadExamStateFromLocal(testId);
    if (cached && !cached.isSubmitted) {
      set({
        testId,
        testTitle,
        durationSeconds,
        remainingSeconds: cached.remainingSeconds ?? durationSeconds,
        questions,
        currentQuestionIndex: cached.currentQuestionIndex ?? 0,
        currentSection: questions[cached.currentQuestionIndex ?? 0]?.sectionName || questions[0]?.sectionName || "Section 1",
        language: cached.language ?? "en",
        responses: cached.responses ?? {},
        isSubmitted: false,
        isTimerRunning: true,
      });
      return;
    }

    const initialResponses: Record<string, ResponseRecord> = {};
    questions.forEach((q, idx) => {
      initialResponses[q.id] = {
        selectedOptionId: null,
        status: idx === 0 ? "not_answered" : "not_visited",
        timeSpentSeconds: 0,
        markedForReview: false,
      };
    });

    const firstSection = questions[0]?.sectionName || "Section 1";

    set({
      testId,
      testTitle,
      durationSeconds,
      remainingSeconds: durationSeconds,
      questions,
      currentQuestionIndex: 0,
      currentSection: firstSection,
      language: "en",
      responses: initialResponses,
      isSubmitted: false,
      isTimerRunning: true,
    });

    saveExamStateToLocal(testId, {
      testId,
      remainingSeconds: durationSeconds,
      currentQuestionIndex: 0,
      language: "en",
      responses: initialResponses,
    });
  },

  setCurrentQuestionIndex: (index) => {
    const { questions, responses, currentQuestionIndex } = get();
    if (index < 0 || index >= questions.length) return;

    const currentQ = questions[currentQuestionIndex];
    const targetQ = questions[index];

    // If current was not_visited, set to not_answered
    const updatedResponses = { ...responses };
    if (currentQ && updatedResponses[currentQ.id]?.status === "not_visited") {
      updatedResponses[currentQ.id] = {
        ...updatedResponses[currentQ.id],
        status: "not_answered",
      };
    }

    if (targetQ && updatedResponses[targetQ.id]?.status === "not_visited") {
      updatedResponses[targetQ.id] = {
        ...updatedResponses[targetQ.id],
        status: "not_answered",
      };
    }

    set({
      currentQuestionIndex: index,
      currentSection: targetQ.sectionName,
      responses: updatedResponses,
    });

    const state = get();
    if (state.testId) {
      saveExamStateToLocal(state.testId, {
        testId: state.testId,
        remainingSeconds: state.remainingSeconds,
        currentQuestionIndex: index,
        language: state.language,
        responses: updatedResponses,
      });
    }
  },

  setCurrentSection: (section) => {
    const { questions } = get();
    const firstQIndex = questions.findIndex((q) => q.sectionName === section);
    if (firstQIndex !== -1) {
      get().setCurrentQuestionIndex(firstQIndex);
    }
  },

  setLanguage: (lang) => {
    set({ language: lang });
    const state = get();
    if (state.testId) {
      saveExamStateToLocal(state.testId, {
        testId: state.testId,
        remainingSeconds: state.remainingSeconds,
        currentQuestionIndex: state.currentQuestionIndex,
        language: lang,
        responses: state.responses,
      });
    }
  },

  selectOption: (questionId, optionId) => {
    set((state) => {
      const prev = state.responses[questionId] || {
        selectedOptionId: null,
        status: "not_answered",
        timeSpentSeconds: 0,
        markedForReview: false,
      };

      // Toggle off if already selected
      const newOption = prev.selectedOptionId === optionId ? null : optionId;
      let newStatus: QuestionStatus = prev.status;

      if (prev.markedForReview) {
        newStatus = newOption ? "answered_marked" : "marked";
      } else {
        newStatus = newOption ? "answered" : "not_answered";
      }

      const updated: Record<string, ResponseRecord> = {
        ...state.responses,
        [questionId]: {
          ...prev,
          selectedOptionId: newOption,
          status: newStatus,
        },
      };

      if (state.testId) {
        saveExamStateToLocal(state.testId, {
          testId: state.testId,
          remainingSeconds: state.remainingSeconds,
          currentQuestionIndex: state.currentQuestionIndex,
          language: state.language,
          responses: updated,
        });
      }

      return { responses: updated };
    });
  },

  clearResponse: (questionId) => {
    set((state) => {
      const prev = state.responses[questionId];
      if (!prev) return state;

      const newStatus: QuestionStatus = prev.markedForReview ? "marked" : "not_answered";
      const updated: Record<string, ResponseRecord> = {
        ...state.responses,
        [questionId]: {
          ...prev,
          selectedOptionId: null,
          status: newStatus,
        },
      };

      if (state.testId) {
        saveExamStateToLocal(state.testId, {
          testId: state.testId,
          remainingSeconds: state.remainingSeconds,
          currentQuestionIndex: state.currentQuestionIndex,
          language: state.language,
          responses: updated,
        });
      }

      return { responses: updated };
    });
  },

  saveAndNext: (questionId) => {
    const state = get();
    const prev = state.responses[questionId];
    if (!prev) return;

    const newStatus: QuestionStatus = prev.selectedOptionId ? "answered" : "not_answered";
    const updatedResponses = {
      ...state.responses,
      [questionId]: {
        ...prev,
        status: newStatus,
        markedForReview: false,
      },
    };

    const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
    const nextQ = state.questions[nextIndex];

    if (nextQ && updatedResponses[nextQ.id]?.status === "not_visited") {
      updatedResponses[nextQ.id] = {
        ...updatedResponses[nextQ.id],
        status: "not_answered",
      };
    }

    set({
      responses: updatedResponses,
      currentQuestionIndex: nextIndex,
      currentSection: nextQ ? nextQ.sectionName : state.currentSection,
    });

    if (state.testId) {
      saveExamStateToLocal(state.testId, {
        testId: state.testId,
        remainingSeconds: state.remainingSeconds,
        currentQuestionIndex: nextIndex,
        language: state.language,
        responses: updatedResponses,
      });
    }
  },

  markForReviewAndNext: (questionId) => {
    const state = get();
    const prev = state.responses[questionId];
    if (!prev) return;

    const newStatus: QuestionStatus = prev.selectedOptionId ? "answered_marked" : "marked";
    const updatedResponses = {
      ...state.responses,
      [questionId]: {
        ...prev,
        status: newStatus,
        markedForReview: true,
      },
    };

    const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
    const nextQ = state.questions[nextIndex];

    if (nextQ && updatedResponses[nextQ.id]?.status === "not_visited") {
      updatedResponses[nextQ.id] = {
        ...updatedResponses[nextQ.id],
        status: "not_answered",
      };
    }

    set({
      responses: updatedResponses,
      currentQuestionIndex: nextIndex,
      currentSection: nextQ ? nextQ.sectionName : state.currentSection,
    });

    if (state.testId) {
      saveExamStateToLocal(state.testId, {
        testId: state.testId,
        remainingSeconds: state.remainingSeconds,
        currentQuestionIndex: nextIndex,
        language: state.language,
        responses: updatedResponses,
      });
    }
  },

  jumpToQuestion: (index) => {
    get().setCurrentQuestionIndex(index);
  },

  decrementTimer: () => {
    const state = get();
    if (state.remainingSeconds <= 1) {
      set({ remainingSeconds: 0, isTimerRunning: false });
      get().submitExam();
    } else {
      const nextRemaining = state.remainingSeconds - 1;
      set({ remainingSeconds: nextRemaining });
    }
  },

  submitExam: () => {
    const state = get();
    set({ isSubmitted: true, isTimerRunning: false });
    if (state.testId) {
      clearExamStateFromLocal(state.testId);
    }
  },

  resetExam: () => {
    set({
      testId: null,
      testTitle: "",
      questions: [],
      currentQuestionIndex: 0,
      responses: {},
      isSubmitted: false,
      isTimerRunning: false,
    });
  },
}));
