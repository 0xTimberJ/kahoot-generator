import * as XLSX from "xlsx";
import { QuizQuestion } from "./types";

export const exportToExcel = (questions: QuizQuestion[], topic: string) => {
  if (!questions || questions.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(questions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Kahoot");

  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "EEEEEE" } },
    };
  }

  XLSX.writeFile(
    workbook,
    `kahoot-quiz-${topic.replace(/\s+/g, "-").toLowerCase()}.xlsx`
  );
};
